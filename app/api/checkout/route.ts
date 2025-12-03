import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendInngestEvent } from '@/lib/inngest'
import { handleOrderCreated } from '@/inngest/orderProcessor'

/**
 * POST /api/checkout
 * Body: { email: string, items: { productId: number, quantity: number }[] }
 * - Creates an Order (status pending)
 * - Returns order object
 * - Emits Inngest event `order.created` with order and items
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, items } = body

    if (!email || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Find or create user by email — lightweight approach (no password flow here)
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({ data: { email, password: '' } })
    }

    // Calculate total and create order + items
    let total = 0
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: 0,
        status: 'pending',
      },
    })

    for (const it of items) {
      const prod = await prisma.product.findUnique({ where: { id: it.productId } })
      if (!prod) continue
      const price = prod.price
      const lineTotal = price * (it.quantity || 1)
      total += lineTotal

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: prod.id,
          quantity: it.quantity || 1,
          price,
        },
      })

      // optionally decrement stock (business rule)
      // await prisma.product.update({ where: { id: prod.id }, data: { stock: Math.max(0, prod.stock - (it.quantity || 1)) } })
    }

    // update order total
    const updated = await prisma.order.update({ where: { id: order.id }, data: { total } })

    const payload = { order: updated, items, email }

    // Emit Inngest event for background processing (webhook forwarding / production use)
    sendInngestEvent('order.created', payload).catch((e) => console.error('[POST /api/checkout] Inngest error', e))

    // Direct handler invocation for email (dev/testing — no webhook needed)
    // In production, remove this and rely on Inngest webhook forwarding or worker registration
    handleOrderCreated(payload).catch((e) => {
      console.error('[POST /api/checkout] Email handler error:', e instanceof Error ? e.message : String(e))
    })

    return NextResponse.json({ order: updated })
  } catch (err) {
    console.error('[POST /api/checkout] error', err)
    return NextResponse.json({ error: 'checkout failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
