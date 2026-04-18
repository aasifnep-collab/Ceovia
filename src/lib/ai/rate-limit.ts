/**
 * CEOVIA — In-memory rate limiter
 *
 * Sliding window: tracks per-IP request timestamps within a 60-second window.
 * Expired timestamps are pruned on every check — no background cleanup required.
 *
 * Limit is read from CEOVIA_AI_RATE_LIMIT at module load.
 * Default: 10 requests / IP / 60 seconds.
 *
 * Production note: replace `store` with an Upstash Redis client when the site
 * scales past single-instance deployment. The interface is identical.
 */

export interface RateLimitResult {
  allowed:   boolean
  remaining: number
  limit:     number
  resetAt:   number  // Unix ms — when the oldest in-window request expires
}

const WINDOW_MS = 60_000
const LIMIT     = parseInt(process.env.CEOVIA_AI_RATE_LIMIT ?? '10', 10)

// IP → array of request timestamps (ms) within the current window
const store = new Map<string, number[]>()

/**
 * Check and record a request for the given IP.
 * Mutates the store — call once per request, not multiple times.
 *
 * @example
 * const rl = checkRateLimit('203.0.113.42')
 * if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now         = Date.now()
  const windowStart = now - WINDOW_MS

  // Prune timestamps outside the current window
  const timestamps = (store.get(ip) ?? []).filter((ts) => ts > windowStart)

  if (timestamps.length >= LIMIT) {
    return {
      allowed:   false,
      remaining: 0,
      limit:     LIMIT,
      resetAt:   timestamps[0] + WINDOW_MS,
    }
  }

  timestamps.push(now)
  store.set(ip, timestamps)

  return {
    allowed:   true,
    remaining: LIMIT - timestamps.length,
    limit:     LIMIT,
    resetAt:   (timestamps[0] ?? now) + WINDOW_MS,
  }
}

/**
 * Standard rate-limit headers for inclusion in every AI route response.
 * Mirrors the RateLimit-* draft spec (draft-ietf-httpapi-ratelimit-headers).
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'x-ratelimit-limit':     String(result.limit),
    'x-ratelimit-remaining': String(result.remaining),
    'x-ratelimit-reset':     String(Math.ceil(result.resetAt / 1000)),  // Unix seconds
  }
}
