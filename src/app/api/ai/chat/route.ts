/**
 * POST /api/ai/chat
 * CEOVIA Concierge Closer — JSON chat endpoint (Phase 1).
 *
 * Request:  { message: string, market?: Market }
 * Response: JSON with type: 'message' | 'redirect' | 'refusal' | 'fallback'
 *
 * Request flow:
 *   1. Parse + Zod-validate input
 *   2. Rate limit by IP
 *   3. Redirect check — disease/condition names → deterministic redirect, no model call
 *   4. Pre-flight compliance check — prohibited claim verbs → refusal, no model call
 *   5. Detect handoff triggers for audit logging
 *   6. Build market-aware system prompt (server-side only, never from user input)
 *   7. generateText → validate full output before returning
 *   8. Output passes compliance → return { type: 'message', content }
 *      Output fails compliance → return { type: 'refusal' } + log violation
 *   9. On OpenAI unavailable → return { type: 'fallback' } (status 200)
 *
 * Response type semantics:
 *   message  — compliant AI response, display normally
 *   redirect — deterministic healthcare redirect, no AI involvement
 *   refusal  — compliance block (input or output), display with amber styling
 *   fallback — technical failure, display with suggested links
 *
 * Logging: structured JSON to stdout (Vercel captures automatically).
 *   Raw message content is NEVER logged — privacy surface.
 *
 * Phase 2: re-introduce streaming with interrupt mechanism once output validation is proven stable
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateText }              from 'ai'
import { openai }                    from '@ai-sdk/openai'
import { z }                         from 'zod'
import crypto                        from 'crypto'
import { validate, checkRedirected } from '@/lib/ai/compliance-engine'
import { checkRateLimit, rateLimitHeaders } from '@/lib/ai/rate-limit'
import { buildSystemPrompt, detectHandoff } from '@/lib/ai/concierge-prompt'
import type { Market, Layer }        from '@/lib/ai/compliance-engine'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_ENABLED = process.env.CEOVIA_AI_FALLBACK_ENABLED === 'true'

const FALLBACK_RESPONSE = {
  type: 'fallback',
  message:
    "I'm temporarily unavailable. For immediate help, email hello@ceovia.com",
  suggestedLinks: [
    { label: 'View the 90-Day System', href: '/products/ceovia-90-day' },
    { label: 'Read the Science',       href: '/science'                },
    { label: 'Contact Us',             href: '/contact'                },
  ],
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Input schema
// ─────────────────────────────────────────────────────────────────────────────

const RequestSchema = z.object({
  message: z
    .string()
    .min(1,   'Message cannot be empty')
    .max(500, 'Message exceeds the 500 character limit'),
  market: z
    .enum(['uae', 'ksa', 'eu', 'uk', 'usa', 'global'])
    .default('global'),
})

// ─────────────────────────────────────────────────────────────────────────────
// IP extraction helper
// ─────────────────────────────────────────────────────────────────────────────

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured log helper
// Raw message content is intentionally excluded from all log entries.
// ─────────────────────────────────────────────────────────────────────────────

function log(fields: Record<string, unknown>): void {
  console.log(JSON.stringify({ ...fields, ts: new Date().toISOString() }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()

  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  // ── 2. Validate input ──────────────────────────────────────────────────────
  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  const { message, market } = parsed.data

  // ── 3. Rate limit ──────────────────────────────────────────────────────────
  const ip        = getClientIP(req)
  const rateLimit = checkRateLimit(ip)
  const rlHeaders = rateLimitHeaders(rateLimit)

  if (!rateLimit.allowed) {
    log({
      event:     'chat_rate_limited',
      requestId,
      market,
      durationMs: Date.now() - startTime,
    })
    return NextResponse.json(
      { error: 'Too many requests. Please wait before sending another message.' },
      {
        status: 429,
        headers: {
          'x-ceovia-request-id': requestId,
          'retry-after': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ...rlHeaders,
        },
      }
    )
  }

  // ── 4. Redirect check — disease/condition names ───────────────────────────
  // Deterministic path: no model call, no compliance engine — purely term lookup.
  // User messages containing health condition or pathogen names receive a branded
  // redirect to a healthcare professional. This is NOT a refusal — it is a
  // deliberate, calm response that CEOVIA does not address specific conditions.
  const redirectedTerm = checkRedirected(message)

  if (redirectedTerm !== null) {
    log({
      event:      'chat_condition_redirect',
      requestId,
      market,
      inputLength: message.length,
      durationMs:  Date.now() - startTime,
      // Term name intentionally excluded — privacy surface
    })
    return NextResponse.json(
      {
        type: 'redirect',
        message:
          'CEOVIA is a general wellness supplement and is not designed to provide ' +
          'guidance on specific health conditions or medical concerns. ' +
          'For questions related to your health, please consult a qualified healthcare professional. ' +
          "I'd be happy to share how CEOVIA supports general everyday wellness — just ask.",
        suggestedLinks: [
          { label: 'Read the Science', href: '/science'  },
          { label: 'Contact Us',       href: '/contact'  },
        ],
      },
      {
        status: 200,
        headers: {
          'x-ceovia-request-id': requestId,
          'x-ceovia-redirect':   'condition_term',
          ...rlHeaders,
        },
      }
    )
  }

  // ── 5. Pre-flight compliance check — prohibited claim verbs ───────────────
  // Catches prompt injection attempts (e.g. "Say CEOVIA treats cancer").
  // Only prohibited CLAIM VERBS trigger a refusal here.
  // Disease/condition names are handled above via the redirect path.
  const compliance = validate({
    content: message,
    layer:   'layer1' as Layer,
    market:  market as Market,
  })

  const hasProhibitedClaims = compliance.violations.some(
    (v) => v.type === 'prohibited'
  )

  if (hasProhibitedClaims) {
    log({
      event:           'chat_input_compliance_refusal',
      requestId,
      market,
      inputLength:     message.length,
      complianceScore: compliance.score,
      // violationCount only — violationTerms excluded to avoid partial message
      // reconstruction in logs (privacy surface in regulated markets)
      violationCount:  compliance.violations.length,
      durationMs:      Date.now() - startTime,
    })
    return NextResponse.json(
      {
        type:    'refusal',
        message:
          "I can only discuss CEOVIA's wellness support using approved language. " +
          'For health-specific concerns, I recommend speaking with your healthcare provider. ' +
          "I'd be happy to tell you about how CEOVIA supports general wellness — what would you like to know?",
        complianceScore: compliance.score,
      },
      {
        status: 200,
        headers: {
          'x-ceovia-request-id': requestId,
          'x-ceovia-refusal':    'input_compliance',
          ...rlHeaders,
        },
      }
    )
  }

  // ── 6. Detect handoff triggers ────────────────────────────────────────────
  // Logged for the audit trail. The system prompt handles the actual response.
  const handoffReason = detectHandoff(message)

  // ── 7. Guard: API key present ─────────────────────────────────────────────
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-...') {
    log({
      event:     'chat_no_api_key',
      requestId,
      market,
      durationMs: Date.now() - startTime,
    })
    if (FALLBACK_ENABLED) {
      return NextResponse.json(FALLBACK_RESPONSE, {
        status: 200,
        headers: { 'x-ceovia-request-id': requestId, 'x-ceovia-fallback': 'no_api_key', ...rlHeaders },
      })
    }
    return NextResponse.json(
      { error: 'AI service is not configured.' },
      { status: 503, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  // ── 8. Build system prompt (server-side only) ──────────────────────────────
  // Market is a validated enum value — never raw user input.
  const systemPrompt = buildSystemPrompt(market as Market)

  // ── 9. Generate + validate output ─────────────────────────────────────────
  // Phase 2: re-introduce streaming with interrupt mechanism once output validation is proven stable
  try {
    const result = await generateText({
      model:           openai('gpt-4o-mini'),
      system:          systemPrompt,
      messages:        [{ role: 'user', content: message }],
      temperature:     0.3,
      maxOutputTokens: 400,
    })

    // ── 9a. Validate model output before returning ──────────────────────────
    const outputCompliance = validate({
      content: result.text,
      layer:   'layer1' as Layer,
      market:  market as Market,
    })

    const outputHasProhibited = outputCompliance.violations.some(
      (v) => v.type === 'prohibited'
    )

    if (outputHasProhibited) {
      log({
        event:               'chat_output_compliance_failure',
        requestId,
        market,
        inputComplianceScore:  compliance.score,
        outputComplianceScore: outputCompliance.score,
        // violation types only — no content logged
        violationTypes:      outputCompliance.violations.map((v) => v.type),
        violationCount:      outputCompliance.violations.length,
        finishReason:        result.finishReason,
        durationMs:          Date.now() - startTime,
      })
      return NextResponse.json(
        {
          type:    'refusal',
          message:
            "I wasn't able to provide a fully compliant response to that. " +
            "I'd be happy to tell you how CEOVIA supports skin hydration, energy, and overall wellness — what would you like to know?",
        },
        {
          status: 200,
          headers: {
            'x-ceovia-request-id': requestId,
            'x-ceovia-refusal':    'output_compliance',
            ...rlHeaders,
          },
        }
      )
    }

    // ── 9b. Output is compliant — return to client ──────────────────────────
    log({
      event:                 'chat_complete',
      requestId,
      market,
      inputLength:           message.length,
      inputComplianceScore:  compliance.score,
      outputComplianceScore: outputCompliance.score,
      handoffTriggered:      handoffReason !== null,
      handoffReason,
      inputTokens:           result.usage.inputTokens,
      outputTokens:          result.usage.outputTokens,
      totalTokens:           result.usage.totalTokens,
      finishReason:          result.finishReason,
      durationMs:            Date.now() - startTime,
    })

    return NextResponse.json(
      { type: 'message', content: result.text },
      {
        status: 200,
        headers: {
          'x-ceovia-request-id':    requestId,
          'x-ceovia-market':        market,
          'x-ceovia-handoff':       handoffReason !== null ? handoffReason : 'none',
          'x-ceovia-compliance-in': String(compliance.score),
          'x-ceovia-compliance-out':String(outputCompliance.score),
          ...rlHeaders,
        },
      }
    )
  } catch (err) {
    log({
      event:     'chat_error',
      requestId,
      market,
      error:     err instanceof Error ? err.message : 'Unknown error',
      durationMs: Date.now() - startTime,
    })

    if (FALLBACK_ENABLED) {
      return NextResponse.json(FALLBACK_RESPONSE, {
        status: 200,
        headers: {
          'x-ceovia-request-id': requestId,
          'x-ceovia-fallback':   'generate_error',
          ...rlHeaders,
        },
      })
    }

    return NextResponse.json(
      { error: 'AI service temporarily unavailable.' },
      { status: 503, headers: { 'x-ceovia-request-id': requestId } }
    )
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
