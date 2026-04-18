/**
 * CEOVIA — In-memory rate limiter
 *
 * Sliding window: tracks per-IP request timestamps within a 60-second window.
 * Expired timestamps are pruned on every check — no background cleanup required.
 *
 * Limit is read from CEOVIA_AI_RATE_LIMIT at module load.
 * Default: 6 requests / IP / 60 seconds (reduced from 10 for tighter abuse protection).
 *
 * Hardening in this version:
 *   1. MAX_STORE_SIZE — caps the Map at 10,000 IPs. An attacker rotating IPs
 *      cannot grow this map unboundedly and exhaust server memory. On overflow
 *      the oldest entry is evicted before inserting the new IP.
 *   2. UNKNOWN_IP_LIMIT — requests arriving with no extractable IP share a
 *      single key ('unknown') with a tighter limit (3 req/60s). This prevents
 *      proxy-stripped IPs from bypassing rate limits entirely.
 *   3. Reduced default from 10 → 6 to reduce cost exposure per IP.
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

const WINDOW_MS        = 60_000
const LIMIT            = parseInt(process.env.CEOVIA_AI_RATE_LIMIT ?? '6', 10)
const UNKNOWN_IP_LIMIT = 3
const MAX_STORE_SIZE   = 10_000

// IP → array of request timestamps (ms) within the current window
const store = new Map<string, number[]>()

/**
 * Evict the oldest Map entry when the store is at capacity.
 * Map iteration order is insertion order, so .keys().next() is the oldest.
 */
function evictOldestIfFull(): void {
  if (store.size >= MAX_STORE_SIZE) {
    const oldest = store.keys().next().value
    if (oldest !== undefined) store.delete(oldest)
  }
}

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
  const limit       = ip === 'unknown' ? UNKNOWN_IP_LIMIT : LIMIT

  // Prune timestamps outside the current window
  const timestamps = (store.get(ip) ?? []).filter((ts) => ts > windowStart)

  if (timestamps.length >= limit) {
    return {
      allowed:   false,
      remaining: 0,
      limit,
      resetAt:   timestamps[0] + WINDOW_MS,
    }
  }

  timestamps.push(now)

  if (!store.has(ip)) evictOldestIfFull()
  store.set(ip, timestamps)

  return {
    allowed:   true,
    remaining: limit - timestamps.length,
    limit,
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
