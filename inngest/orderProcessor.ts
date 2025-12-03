import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

/**
 * Order created processor
 * - Generates an email subject & body using AI Gemini if configured
 * - Sends email using Nodemailer (SMTP) using env vars
 *
 * Environment variables required to enable full functionality:
 * - GEMINI_API_KEY: API key for Gemini (optional — fallback template used if absent)
 * - GEMINI_MODEL: model id to call, e.g. 'models/gemini-2.5-flash' (optional)
 * - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL — for sending email
 */

async function generateEmailWithGemini(prompt: string) {
  const key = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  if (!key) {
    console.log('[orderProcessor] GEMINI_API_KEY not set, using fallback template')
    return null
  }

  try {
    console.log('[orderProcessor] Calling Gemini API with model:', model)
    // Use the correct Gemini API v1 endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/${model.replace('models/', '')}:generateContent?key=${key}`
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
        topP: 0.8,
      },
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const txt = await res.text()
      console.warn('[orderProcessor] Gemini response not ok', res.status, txt.substring(0, 200))
      return null
    }

    const json = await res.json()
    console.log('[orderProcessor] Gemini response:', JSON.stringify(json).substring(0, 300))
    // Extract text from Gemini v1 response format
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || null
    if (text) {
      console.log('[orderProcessor] ✓ Gemini generated email content successfully')
      console.log('[orderProcessor] Generated text preview:', text.substring(0, 100) + '...')
    }
    return text
  } catch (err) {
    console.error('[orderProcessor] Gemini call failed', err)
    return null
  }
}

function renderFallbackEmail(order: any, items: any[]) {
  const lines = items.map((it: any) => `- ${it.name || 'Product'} x${it.quantity} — $${(it.price || 0).toFixed(2)}`)
  return `Halo,\n\nTerima kasih telah berbelanja dengan kami! Pesanan Anda telah kami terima dan sedang diproses.\n\nNomor Pesanan: ${order.id}\n\nBerikut ringkasan pesanan Anda:\n\n${lines.join('\n')}\n\nTotal: $${order.total.toFixed(2)}\n\nPesanan Anda akan dikirim dalam 1-2 hari kerja. Kami akan mengirimkan tracking number melalui email.\n\nJika Anda memiliki pertanyaan, silakan hubungi customer service kami.\n\nTerima kasih,\nTim Toko`
}

export async function handleOrderCreated(event: any) {
  try {
    const payload = event?.data ?? event
    const { order, items, email } = payload

    // Fetch user details
    let userName = 'Pelanggan'
    try {
      const user = await prisma.user.findUnique({ where: { id: order.userId } })
      if (user?.firstName) {
        userName = user.firstName
        if (user.lastName) {
          userName += ` ${user.lastName}`
        }
      }
      console.log('[orderProcessor] User name fetched:', userName)
    } catch (e) {
      console.log('[orderProcessor] Could not fetch user details, using default greeting')
    }

    // Load full product details for email
    const detailedItems: any[] = []
    for (const it of items) {
      try {
        const prod = await prisma.product.findUnique({ where: { id: it.productId } })
        detailedItems.push({ ...it, name: prod?.name, price: prod?.price })
      } catch (e) {
        detailedItems.push(it)
      }
    }

    // Build prompt for Gemini with user name
    const itemListText = detailedItems.map((d) => `${d.name || 'Product'} x${d.quantity} — $${(d.price || 0).toFixed(2)}`).join('\n')
    const prompt = `Write a professional order confirmation email in Indonesian for a customer named: ${userName}. Store: ShopHub. Address them by their name in the greeting (e.g., Yth. Bapak/Ibu ${userName}). Items:\n${itemListText}\nTotal: $${(order.total || 0).toFixed(2)}.\n\nKeep it professional and warm.`;

    let generated = await generateEmailWithGemini(prompt)
    if (!generated) {
      generated = renderFallbackEmail(order, detailedItems)
      console.warn("Generating AI message failed!");
    }

    const generatedContent = generated
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007bff; }
        .header h1 { color: #007bff; margin: 0; }
        .header p { color: #666; margin: 5px 0 0 0; }
        .order-number { background: #f0f8ff; padding: 12px; border-left: 4px solid #007bff; margin: 15px 0; }
        .order-number strong { color: #007bff; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f9f9f9; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #007bff; }
        .content { white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✓ Konfirmasi Pesanan</h1>
          <p>Terima kasih telah berbelanja dengan kami!</p>
        </div>

        <div class="order-number">
          <strong>Nomor Pesanan:</strong> ${order.id}
        </div>

        <div class="content">
${generatedContent}
        </div>

        <table>
          <thead>
            <tr>
              <th>Produk</th>
              <th style="text-align:center;">Qty</th>
              <th style="text-align:right;">Harga</th>
            </tr>
          </thead>
          <tbody>
            ${detailedItems.map((it: any) => `
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;">${it.name || 'Product'}</td>
              <td style="padding:12px;border-bottom:1px solid #eee;text-align:center;">${it.quantity}</td>
              <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;">$${(it.price || 0).toFixed(2)}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p><strong>Email:</strong> lnvvalerie60@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Prepare Nodemailer transporter
    const host = process.env.SMTP_HOST!
    const port = Number(process.env.SMTP_PORT! || 587)
    const user = process.env.SMTP_USER!
    const pass = process.env.SMTP_PASS!
    const from = process.env.FROM_EMAIL! || 'lnvvalerie60@gmail.com'

    if (!host || !user || !pass) {
      console.warn('[orderProcessor] SMTP not configured — skipping email send')
      return { status: 'no-smtp' }
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    })

    console.log('[orderProcessor] Nodemailer transporter configured with:', { host, port, user, secure: port === 465 })

    const mail = {
      from,
      to: email,
      subject: `Konfirmasi Pesanan — ${order.id}`,
      text: generated,
      html: htmlContent,
    }

    console.log('[orderProcessor] Sending email to:', email, 'from:', from)
    const info = await transporter.sendMail(mail)
    console.log('[orderProcessor] Email sent', info.messageId, 'to:', email)
    return { status: 'sent', messageId: info.messageId }
  } catch (err) {
    console.error('[orderProcessor] error', err)
    throw err
  }
}
