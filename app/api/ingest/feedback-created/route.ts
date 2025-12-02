import { NextResponse } from 'next/server'
import { handleFeedbackCreated } from '@/inngest/feedbackProcessor'

/**
 * This endpoint is intended to be used as a webhook target that Inngest calls
 * when the `feedback.created` event is emitted. Configure Inngest to POST to:
 *   https://<your-app>/api/ingest/feedback-created
 *
 * Optionally set `INNGEST_WEBHOOK_SECRET` in your environment and configure
 * Inngest to sign webhooks — this handler can be extended to verify signatures.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Inngest may send the event object in different envelope shapes depending
    // on how you forward events. Support the common shapes.
    const event = (body?.event) ? body.event : body

    const eventName = event?.name || body?.name

    console.log('[POST /api/ingest/feedback-created] received event:', eventName)

    if (eventName === 'feedback.created' || eventName === 'feedback.create') {
      // Normalize the payload shape we pass to our processor.
      const payload = event?.data ?? body?.data ?? body
      // Fire-and-forget is fine here; we still await to surface errors to Inngest.
      const result = await handleFeedbackCreated({ data: payload })
      return NextResponse.json({ ok: true, result })
    }

    // Unknown event — return 204 (no-op)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[POST /api/ingest/feedback-created] error:', err)
    return NextResponse.json({ error: 'processing failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
