import { NextResponse } from 'next/server'
import { handleOrderCreated } from '@/inngest/orderProcessor'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = (body?.event) ? body.event : body
    const eventName = event?.name || body?.name

    console.log('[POST /api/ingest/order-created] received', eventName)

    if (eventName === 'order.created' || eventName === 'order.create') {
      const payload = event?.data ?? body?.data ?? body
      const result = await handleOrderCreated(payload)
      return NextResponse.json({ ok: true, result })
    }

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[POST /api/ingest/order-created] error:', err)
    return NextResponse.json({ error: 'processing failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
