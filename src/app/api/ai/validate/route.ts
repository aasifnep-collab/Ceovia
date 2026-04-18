/**
 * POST /api/ai/validate
 * Compliance Critic — deterministic, no LLM, no external calls.
 *
 * Request:  { content: string, layer: 'layer1'|'layer2'|'layer3', market: string }
 * Response: { score, status, violations, suggestions, autoFixedContent? }
 *
 * Design guarantees:
 *   - Never returns 500 on valid input — compliance failure is a safe failure mode
 *   - Always responds; the engine itself cannot throw on valid strings
 *   - Response time target: < 50ms
 *   - Raw content is never logged — privacy surface before privacy policy is reviewed
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { validate, type Market, type Layer } from '@/lib/ai/compliance-engine'
import crypto from 'crypto'

// ─────────────────────────────────────────────────────────────────────────────
// Input schema
// ─────────────────────────────────────────────────────────────────────────────

const RequestSchema = z.object({
  content: z
    .string()
    .min(1, 'Content cannot be empty')
    .max(2000, 'Content exceeds the 2,000 character limit'),
  layer: z.enum(['layer1', 'layer2', 'layer3']),
  market: z
    .enum(['uae', 'ksa', 'eu', 'uk', 'usa', 'global'])
    .default('global'),
})

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  // ── Validate input ─────────────────────────────────────────────────────────
  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  const { content, layer, market } = parsed.data

  // ── Run compliance engine ──────────────────────────────────────────────────
  // Pure TypeScript — cannot throw unless there is a code bug.
  // Wrapped in try/catch to guarantee a response in all cases.
  let result
  try {
    result = validate({
      content,
      layer: layer as Layer,
      market: market as Market,
    })
  } catch (err) {
    console.error(JSON.stringify({
      event:     'compliance_engine_error',
      requestId,
      market,
      layer,
      error:     err instanceof Error ? err.message : 'Unknown error',
      ts:        new Date().toISOString(),
    }))
    return NextResponse.json(
      { error: 'Compliance engine failed. Content not validated.' },
      { status: 500, headers: { 'x-ceovia-request-id': requestId } }
    )
  }

  const durationMs = Date.now() - startTime

  // ── Structured log — Vercel captures console.log automatically ─────────────
  // Fields logged: metadata only. Raw content intentionally excluded.
  console.log(JSON.stringify({
    event:           'compliance_validate',
    requestId,
    market,
    layer,
    inputLength:     content.length,
    score:           result.score,
    status:          result.status,
    violationsFound: result.violations.length,
    violationTypes:  [...new Set(result.violations.map((v) => v.type))],
    autoFixApplied:  result.autoFixedContent !== undefined,
    durationMs,
    ts:              new Date().toISOString(),
  }))

  // ── Respond ────────────────────────────────────────────────────────────────
  return NextResponse.json(result, {
    status: 200,
    headers: {
      'x-ceovia-request-id': requestId,
      'x-ceovia-score':      String(result.score),
      'x-ceovia-status':     result.status,
    },
  })
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
