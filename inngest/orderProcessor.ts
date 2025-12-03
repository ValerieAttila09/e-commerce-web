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
  const key = process.env.GEMINI_API_KEY!
  const model = process.env.GEMINI_MODEL! || 'models/gemini-2.5-flash'
  if (!key) {
    console.log('[orderProcessor] GEMINI_API_KEY not set, using fallback template')
    return null
  }

  try {
    // Use the correct Gemini API v1 endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/${model.replace('models/', '')}:generateContent?key=${key}`
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
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
      console.warn('[orderProcessor] Gemini response not ok', res.status, txt)
      return null
    }

    const json = await res.json()
    // Extract text from Gemini v1 response format
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || null
    if (text) {
      console.log('[orderProcessor] Gemini generated email content')
    }
    return text
  } catch (err) {
    console.error('[orderProcessor] Gemini call failed', err)
    return null
  }
}

function renderFallbackEmail(order: any, items: any[]) {
  const lines = items.map((it: any) => `- ${it.name || 'Product'} x${it.quantity} — $${(it.price || 0).toFixed(2)}`)
  return `Halo ${order.userId},\n\nTerima kasih, pesanan Anda sedang diproses. Berikut ringkasan pesanan Anda:\n\n${lines.join('\n')}\n\nTotal: $${order.total.toFixed(2)}\n\nKami akan mengabari Anda ketika pesanan dikirim.\n\nSalam,\nTim Toko`
}

export async function handleOrderCreated(event: any) {
  try {
    const payload = event?.data ?? event
    const { order, items, email } = payload

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

    // Build prompt for Gemini
    const itemListText = detailedItems.map((d) => `${d.name || 'Product'} x${d.quantity} — $${(d.price || 0).toFixed(2)}`).join('\n')
    const prompt = `You are a friendly e-commerce assistant. Write a concise, polite order confirmation email for a customer in Indonesian. Include a short greeting, a thank you, the order summary (with product names, quantities and prices), the total price, and next steps (shipment and support). Keep it under 250 words.\n\nOrder summary:\n${itemListText}\n\nTotal: $${(order.total || 0).toFixed(2)}`

    let generated = await generateEmailWithGemini(prompt)
    if (!generated) {
      generated = renderFallbackEmail(order, detailedItems)
    }

    // Prepare Nodemailer transporter
    const host = process.env.SMTP_HOST!
    const port = Number(process.env.SMTP_PORT! || 587)
    const user = process.env.SMTP_USER!
    const pass = process.env.SMTP_PASS!
    const from = process.env.FROM_EMAIL! || 'no-reply@example.com'

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

    const mail = {
      from,
      to: email,
      subject: `Konfirmasi Pesanan — ${order.id}`,
      text: generated,
      html: `<pre style="font-family:inherit;white-space:pre-wrap">${generated}</pre>`,
    }

    const info = await transporter.sendMail(mail)
    console.log('[orderProcessor] Email sent', info.messageId)
    return { status: 'sent', messageId: info.messageId }
  } catch (err) {
    console.error('[orderProcessor] error', err)
    throw err
  }
}
