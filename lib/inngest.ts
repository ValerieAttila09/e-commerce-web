/*
 * Inngest helper — prefers the official SDK when available,
 * but falls back to the HTTP POST API so the runtime remains robust.
 *
 * Environment:
 * - `INNGEST_API_KEY` (optional) — used to authenticate with the Inngest API
 * - `INNGEST_API_URL` (optional) — override Inngest events endpoint
 */

let _inngestClient: any = null
let _inngestClientInitError: any = null

try {
  // Dynamic import so the SDK is optional during install/build.
  // If the sdk isn't present, we'll gracefully fall back to HTTP.
  // We intentionally don't assume any specific constructor signature —
  // creating the client is wrapped in try/catch so failures fall back.
  // If you install `@inngest/inngest`, the helper will attempt to use it.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('inngest')
  const Inngest = mod?.Inngest ?? mod?.default ?? mod
  if (Inngest) {
    try {
      _inngestClient = new Inngest({ name: 'e-commerce-web' })
    } catch (err) {
      _inngestClientInitError = err
      _inngestClient = null
      const msg = err instanceof Error ? err.message : String(err)
      console.warn('[inngest] SDK present but client init failed, will fallback to HTTP POST:', msg)
    }
  }
} catch (err) {
  // SDK not installed — continue using HTTP fallback.
  _inngestClient = null
}

export async function sendInngestEvent(name: string, data: any) {
  const apiKey = process.env.INNGEST_API_KEY
  if (!apiKey) {
    console.warn('[inngest] INNGEST_API_KEY not set — skipping event:', name)
    return
  }

  // If we have an initialized SDK client and it exposes a `send` method, prefer it.
  try {
    if (_inngestClient && typeof _inngestClient.send === 'function') {
      // Some SDK versions expose `send` or `run`, we attempt `send` first.
      try {
        // Best-effort: call send(name, data) or send({ name, data }) depending on SDK.
        // Wrap calls in try/catch and fall back to HTTP if signatures differ.
        try {
          // send as two-arg form
          // @ts-ignore
          await _inngestClient.send(name, data)
          return
        } catch (e) {
          // try object form
          // @ts-ignore
          await _inngestClient.send({ name, data })
          return
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.warn('[inngest] SDK send failed, falling back to HTTP POST:', msg)
      }
    }
  } catch (err) {
    console.warn('[inngest] error using SDK client, falling back to HTTP POST', err)
  }

  const apiUrl = process.env.INNGEST_API_URL || 'https://api.inngest.com/api/v0/events'

  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ name, data }),
    })
  } catch (err) {
    console.error('[inngest] failed to send event (HTTP fallback)', err)
  }
}
