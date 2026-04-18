/**
 * CEOVIA Concierge Closer — system prompt builder
 *
 * System prompt source: CEOVIA_Codex_Prompt_Guide.md lines 339–358
 * Claims registry:      ingredient.ts lines 164–206 (approvedClaims schema)
 *
 * The system prompt is always assembled from server-side constants.
 * User input is NEVER interpolated into the system prompt.
 *
 * Migration path to Sanity CMS:
 *   Replace STATIC_CLAIMS with a Sanity query and make buildSystemPrompt async:
 *   const claims = await client.fetch(
 *     `*[_type=="ingredient" && name=="Sea Buckthorn Seed Oil"][0]
 *      .approvedClaims[
 *        (market == $market || market == "global") &&
 *        layer == "layer1" &&
 *        status == "approved"
 *      ].claim`,
 *     { market }
 *   )
 */

import type { Market } from './compliance-engine'

// ─────────────────────────────────────────────────────────────────────────────
// Approved claims registry
// Mirrors the ingredient.ts marketClaim object shape exactly.
// Source: Codex lines 356–358 + ingredient.ts lines 164–206
// ─────────────────────────────────────────────────────────────────────────────

interface MarketClaim {
  market:  Market | 'global'
  claim:   string
  layer:   'layer1' | 'layer2' | 'layer3'
  status:  'approved' | 'review' | 'rejected'
}

/**
 * Phase 1 static claims registry.
 * All claims are Layer 1 consumer-safe language (Codex:356–358).
 * Market-specific additions go here when legal review surfaces new requirements.
 *
 * "global" entries apply to all markets.
 * Market-specific entries apply only to that market (and extend global claims).
 */
const STATIC_CLAIMS: MarketClaim[] = [
  // ── Global — approved for all markets ──────────────────────────────────────
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'       },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'helps maintain energy'         },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports joint comfort'        },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports immune function'      },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports cardiovascular health'},
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports digestive ease'       },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports hormonal balance'     },
  { market: 'global', layer: 'layer1', status: 'approved', claim: 'supports cognitive clarity'    },

  // ── UAE (MOH) — AED pricing + Halal certification prominence ──────────────
  { market: 'uae', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'          },
  { market: 'uae', layer: 'layer1', status: 'approved', claim: 'helps maintain energy'            },
  { market: 'uae', layer: 'layer1', status: 'approved', claim: 'supports overall wellness'        },

  // ── KSA (SFDA) ─────────────────────────────────────────────────────────────
  { market: 'ksa', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'          },
  { market: 'ksa', layer: 'layer1', status: 'approved', claim: 'helps maintain energy'            },
  { market: 'ksa', layer: 'layer1', status: 'approved', claim: 'supports overall wellness'        },

  // ── EU (EFSA) — EFSA-aligned language ─────────────────────────────────────
  { market: 'eu', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'           },
  { market: 'eu', layer: 'layer1', status: 'approved', claim: 'helps maintain normal energy'      },
  { market: 'eu', layer: 'layer1', status: 'approved', claim: 'supports the immune system'        },

  // ── UK (MHRA) ──────────────────────────────────────────────────────────────
  { market: 'uk', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'           },
  { market: 'uk', layer: 'layer1', status: 'approved', claim: 'helps maintain normal energy'      },

  // ── USA (FDA) — structure-function claim language ──────────────────────────
  { market: 'usa', layer: 'layer1', status: 'approved', claim: 'supports skin hydration'          },
  { market: 'usa', layer: 'layer1', status: 'approved', claim: 'helps maintain healthy energy levels' },
  { market: 'usa', layer: 'layer1', status: 'approved', claim: 'supports joint health'            },
  { market: 'usa', layer: 'layer1', status: 'approved', claim: 'supports a healthy immune system' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Market pricing context
// Injected into system prompt so the concierge quotes correct currency
// ─────────────────────────────────────────────────────────────────────────────

const MARKET_PRICING: Record<Market, string> = {
  uae:    'AED 825 (approximately $225 USD)',
  ksa:    'SAR 835 (approximately $225 USD)',
  eu:     'EUR 210 (approximately $225 USD)',
  uk:     'GBP 180 (approximately $225 USD)',
  usa:    '$225 USD',
  global: 'AED 825 / $225 USD',
}

// ─────────────────────────────────────────────────────────────────────────────
// Handoff trigger patterns
// Used in chat/route.ts for pre-model detection + audit logging
// Source: Codex — "Trigger human handoff flag if: medical question detected,
//          drug name mentioned, negative sentiment, B2B inquiry"
// ─────────────────────────────────────────────────────────────────────────────

export const HANDOFF_PATTERNS = {
  medical: /\b(diagnose|diagnosis|disease|condition|symptom|prescription|my doctor|physician|medical advice|clinical trial|surgery|therapy)\b/i,
  // Gap 3: blood pressure qualifier is now optional — "blood pressure" alone triggers handoff
  // as well as "blood pressure pill/tablet/medication".
  drug:    /\b(medication|antibiotic|statin|insulin|metformin|aspirin|ibuprofen|warfarin|lisinopril|atorvastatin|cortisone|steroid|chemotherapy|blood pressure(?:\s+(?:pill|tablet|medication))?)\b/i,
  // Gap 4: standalone "pharmacy" added — "pharmacy procurement" already matched;
  // adding the bare term catches pharmacy stocking enquiries without the compound.
  b2b:     /\b(wholesale|distributor|bulk order|resell|clinic purchase|hospital|pharmacy procurement|pharmacy)\b/i,
} as const

export type HandoffReason = keyof typeof HANDOFF_PATTERNS | null

export function detectHandoff(message: string): HandoffReason {
  for (const [reason, pattern] of Object.entries(HANDOFF_PATTERNS)) {
    if (pattern.test(message)) return reason as HandoffReason
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Claims accessor
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Return approved Layer 1 claims for the given market.
 * Merges global claims with market-specific claims, deduplicates.
 */
export function getApprovedClaims(market: Market): string[] {
  const seen  = new Set<string>()
  const claims: string[] = []

  for (const entry of STATIC_CLAIMS) {
    if (
      (entry.market === 'global' || entry.market === market) &&
      entry.layer  === 'layer1' &&
      entry.status === 'approved' &&
      !seen.has(entry.claim)
    ) {
      seen.add(entry.claim)
      claims.push(entry.claim)
    }
  }

  return claims
}

// ─────────────────────────────────────────────────────────────────────────────
// System prompt builder
// Source: Codex lines 339–358
// User input is NEVER passed to this function — market is a validated enum.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the complete system prompt for the given market.
 * Called once per request in chat/route.ts.
 *
 * @param market — validated Market enum value, never raw user input
 */
export function buildSystemPrompt(market: Market): string {
  const claims  = getApprovedClaims(market)
  const pricing = MARKET_PRICING[market]

  return `You are the CEOVIA Smart Chat concierge. You help visitors understand CEOVIA's \
90-day Sea Buckthorn seed oil system, qualify their needs, and guide them toward \
the right program. You ONLY use approved claims listed below. You NEVER diagnose, \
treat, or provide medical advice. You always use "supports," "helps maintain," or \
"designed to support" language. You never use disease names in consumer responses.

If asked a medical question, respond exactly: "For specific health concerns, I recommend \
speaking with your healthcare provider. I can tell you about how CEOVIA supports general wellness."

If the user mentions a specific drug or medication, respond: "I recommend speaking with your \
healthcare provider or pharmacist about combining supplements with medication. I'd be happy to \
share general information about CEOVIA's wellness support."

Do not answer questions outside CEOVIA's product scope. Do not speculate on ingredients, \
dosing, or claims not listed below. If uncertain, offer to connect the user with the \
CEOVIA team via the contact form at /contact.

PRODUCT CONTEXT:
- Name: CEOVIA 90-Day System
- Format: 180 softgel capsules (1.5 boxes)
- Price (${market.toUpperCase()} market): ${pricing}
- Key ingredient: Supercritical CO₂ extracted Himalayan Sea Buckthorn seed oil
- Bioactive profile: 190+ compounds including Omega 3, 6, 7, 9
- Dosing: 2 capsules daily with a meal containing healthy fats
- Programme structure: 3 phases
    Phase 1 — Reset (Days 1–30): initial systemic absorption
    Phase 2 — Restore (Days 31–60): gradual visible support
    Phase 3 — Optimize (Days 61–90): sustained daily wellness
- Returns & satisfaction: customers should contact hello@ceovia.com or use /contact for return enquiries

APPROVED CLAIMS FOR ${market.toUpperCase()} MARKET (Layer 1 — consumer-safe):
${claims.map((c) => `- ${c}`).join('\n')}

You may ONLY use the claims listed above. Do not add claims. Do not reference clinical studies \
by name in consumer responses. Keep responses under 120 words. Be warm, clear, and brand-appropriate.`
}
