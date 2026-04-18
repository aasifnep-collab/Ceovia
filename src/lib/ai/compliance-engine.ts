/**
 * CEOVIA Compliance Engine
 * Pure TypeScript — zero LLM calls, zero external dependencies.
 *
 * Source spec: CEOVIA_Codex_Prompt_Guide.md lines 281–321
 *
 * Scoring model:
 *   Base score:          70
 *   Positive signals:    +5 or +10 per signal (each term counted once)
 *   No disease names:    +10 bonus
 *   Layer 2/3 content:   +5 bonus (professional classification)
 *   Mandatory disclaimer: +10 bonus
 *   Prohibited term:     hard cap at 79 (overrides all positives)
 *   Yellow flag term:    −5 per occurrence (only applied when score ≥ 80)
 *   Final clamp:         [0, 100]
 *
 * Scoring order matters:
 *   Positives are summed first, then the prohibited hard-cap is applied,
 *   then yellow-flag deductions run — but only if the capped score is still ≥ 80.
 *   This ensures prohibited content can never be rescued by positive signals.
 *
 * Response time target: < 50ms (no async, no I/O)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Layer = 'layer1' | 'layer2' | 'layer3'

export type Market = 'uae' | 'ksa' | 'eu' | 'uk' | 'usa' | 'global'

export type ComplianceStatus = 'approved' | 'review' | 'rejected'

export interface ComplianceInput {
  content: string
  layer: Layer
  market: Market
}

export interface Violation {
  term: string
  type: 'prohibited' | 'yellow_flag'
  position: number
  suggestion: string
}

export interface ComplianceResult {
  score: number
  status: ComplianceStatus
  violations: Violation[]
  suggestions: string[]
  autoFixedContent?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule tables — SOURCE: CEOVIA_Codex_Prompt_Guide.md lines 281–321
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PROHIBITED TERMS
 * A single match forces the final score to max 79, regardless of positive signals.
 * Codex categories: drug verbs | clinical descriptors | drug-like verbs
 *
 * NOTE: Disease/condition names and named pathogens have been moved to REDIRECTED_TERMS.
 * In the chat route, user messages containing those terms receive a deterministic
 * healthcare redirect rather than a compliance refusal — no model call is made either way.
 * This list retains only terms that constitute an illegal claim verb or clinical descriptor.
 */
const PROHIBITED_TERMS: string[] = [
  // Medical / drug verbs — stem + inflected form (Codex line 282)
  // Both forms are listed so that "can treat" and "treats" are caught equally.
  // Word-boundary matching in findOccurrences ensures "treat" does NOT match
  // inside "treats", "treatment", or "mistreat" — those are caught by their own entries.
  'treat',    'treats',
  'cure',     'cures',
  'heal',     'heals',
  'prevent',  'prevents',
  'reverse',  'reverses',

  // Clinical descriptors (Codex line 283)
  'immunomodulatory',
  'neuroprotective',
  'anti-tumor',

  // Drug-like verbs — stem + inflected form
  // "boosts" remains a yellow-flag per Codex quick-reference table (Codex line 286)
  'stimulate', 'stimulates',
  'control',   'controls',
  'halt',      'halts',
  'arrest',    'arrests',
]

/**
 * REDIRECTED TERMS — health condition names and named pathogens
 *
 * User messages containing these terms are intercepted before any model call in the
 * chat route and receive a deterministic branded redirect to a healthcare professional.
 * They are intentionally NOT in PROHIBITED_TERMS so that:
 *   - A user asking "I have arthritis, can CEOVIA help?" gets a calm redirect, not a refusal
 *   - The validate route (marketing copy review) still penalises disease names via DISEASE_TERMS
 *
 * To add a term: append here AND to DISEASE_TERMS if it is a condition/pathogen name.
 */
export const REDIRECTED_TERMS: string[] = [
  // Original condition names and named pathogens
  'arthritis',
  'hepatitis',
  'dementia',
  'melasma',
  'ulcers',
  'herpes',
  'influenza',
  'e. coli',
  'adenoviruses',
  'diphtheria',
  // Consumer-facing condition names — second tier (Gap 2)
  // Catches common health queries that should receive the deterministic
  // healthcare redirect rather than reaching the model.
  'acne',
  'cancer',
  'diabetes',
  'depression',
  'anxiety',
  'eczema',
  'psoriasis',
  'alopecia',
  'rosacea',
  'lupus',
  'fibromyalgia',
  'thyroid',
  'obesity',
  'asthma',
  'migraine',
]

/**
 * Returns the first REDIRECTED_TERM found in `content` (case-insensitive), or null.
 * Used by the chat route pre-flight to decide whether to return a redirect response.
 */
export function checkRedirected(content: string): string | null {
  const lower = content.toLowerCase()
  for (const term of REDIRECTED_TERMS) {
    if (lower.includes(term.toLowerCase())) return term
  }
  return null
}

/**
 * DISEASE / CONDITION TERMS — subset of PROHIBITED_TERMS
 * Used to determine the "no disease names" positive bonus (+10).
 * If none of these appear, the content earns +10.
 */
const DISEASE_TERMS = new Set<string>([
  'arthritis',
  'hepatitis',
  'dementia',
  'melasma',
  'ulcers',
  'herpes',
  'influenza',
  'e. coli',
  'adenoviruses',
  'diphtheria',
])

/**
 * YELLOW FLAG TERMS — −5 per occurrence, applied only when score ≥ 80
 * Codex lines 288–292.
 * "boosts" is flagged here (not prohibited) per Codex quick-reference table.
 */
const YELLOW_FLAG_TERMS: string[] = [
  'boosts',     // Codex line 289
  'improves',   // Codex line 290
  'increases',  // Codex line 291
]

/**
 * POSITIVE SIGNALS — score bonuses, each term counted once per submission
 * Codex lines 294–298.
 * Three additional bonuses are computed separately (no disease names, layer, disclaimer).
 */
const POSITIVE_SIGNALS: Array<{ term: string; points: 5 | 10 }> = [
  { term: 'supports',            points: 5 },  // Codex line 295
  { term: 'helps maintain',      points: 5 },  // Codex line 295
  { term: 'designed to support', points: 5 },  // Codex line 295
]

/**
 * AUTO-FIX SUBSTITUTION MAP — 6 pairs from Codex lines 314–320
 * Keys are lowercased. Applied case-insensitively to produce autoFixedContent.
 * Covers both prohibited terms and the "boosts" yellow flag.
 */
const SUBSTITUTION_MAP: Record<string, string> = {
  'treats':           'supports',
  'cures':            'is designed to support',
  'prevents':         'helps maintain',
  'boosts':           'supports',
  'immunomodulatory': "designed to support your body's natural resilience",
  'neuroprotective':  'supports healthy brain and nervous system function',
}

/**
 * DISCLAIMER PHRASES — presence adds +10 to compliance score
 * Matches any standard regulatory disclaimer variant.
 */
const DISCLAIMER_PHRASES: string[] = [
  'not intended to diagnose',
  'not evaluated by',
  'these statements have not been evaluated',
  'consult your healthcare',
  'consult a healthcare provider',
]

/**
 * MARKET-SPECIFIC OVERRIDES
 * Extend global rules with market-specific prohibited/yellow-flag/positive terms.
 * Populated as market-specific legal review surfaces new requirements.
 */
const MARKET_OVERRIDES: Partial<Record<Market, {
  additionalProhibited?: string[]
  additionalYellowFlags?: string[]
  additionalPositiveSignals?: Array<{ term: string; points: 5 | 10 }>
}>> = {
  uae: { additionalProhibited: [] },
  ksa: { additionalProhibited: [] },
  eu:  { additionalProhibited: [] },
  uk:  { additionalProhibited: [] },
  usa: { additionalProhibited: [] },
}

// ─────────────────────────────────────────────────────────────────────────────
// Status thresholds
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_THRESHOLDS = {
  approved: 80, // score ≥ 80 → approved
  review:   60, // score ≥ 60 → review
                // score < 60  → rejected
} as const

function scoreToStatus(score: number): ComplianceStatus {
  if (score >= STATUS_THRESHOLDS.approved) return 'approved'
  if (score >= STATUS_THRESHOLDS.review)   return 'review'
  return 'rejected'
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function normalise(text: string): string {
  return text.toLowerCase().trim()
}

/**
 * Return all character positions where `term` appears in `content` (case-insensitive),
 * requiring word boundaries — the character immediately before and after the match
 * must be non-alphanumeric (or the string edge).
 *
 * Word-boundary enforcement is necessary because PROHIBITED_TERMS now contains both
 * stem ("treat") and inflected ("treats") forms. Without it, "treat" would match
 * inside "treats", "treatment", "mistreat", etc., causing false positives.
 *
 * Implementation uses indexOf (not regex) to handle special characters like "E. coli"
 * and "anti-tumor" safely. The boundary check is a simple character-class test.
 */
function findOccurrences(content: string, term: string): number[] {
  const positions: number[] = []
  const lower     = normalise(content)
  const lowerTerm = normalise(term)
  if (!lowerTerm) return positions
  let idx = lower.indexOf(lowerTerm)
  while (idx !== -1) {
    const charBefore = idx > 0                              ? lower[idx - 1]                    : ''
    const charAfter  = idx + lowerTerm.length < lower.length ? lower[idx + lowerTerm.length]    : ''
    const boundaryOk = !/[a-z0-9]/.test(charBefore) && !/[a-z0-9]/.test(charAfter)
    if (boundaryOk) positions.push(idx)
    idx = lower.indexOf(lowerTerm, idx + 1)
  }
  return positions
}

/**
 * Apply SUBSTITUTION_MAP to content (case-insensitive, preserves surrounding text).
 * Only called when at least one fixable violation exists.
 */
function applySubstitutions(content: string): string {
  let fixed = content
  for (const [prohibited, replacement] of Object.entries(SUBSTITUTION_MAP)) {
    const escaped = prohibited.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')
    fixed = fixed.replace(regex, replacement)
  }
  return fixed
}

/**
 * Returns true if content includes any recognised disclaimer phrase.
 */
function hasDisclaimerPhrase(content: string): boolean {
  const lower = normalise(content)
  return DISCLAIMER_PHRASES.some((phrase) => lower.includes(phrase))
}

/**
 * Merge global rule lists with any market-specific overrides.
 */
function resolveRulesForMarket(market: Market) {
  const overrides = MARKET_OVERRIDES[market] ?? {}
  return {
    prohibited:     [...PROHIBITED_TERMS,    ...(overrides.additionalProhibited    ?? [])],
    yellowFlags:    [...YELLOW_FLAG_TERMS,    ...(overrides.additionalYellowFlags   ?? [])],
    positiveSignals:[...POSITIVE_SIGNALS,     ...(overrides.additionalPositiveSignals ?? [])],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core engine
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validate content against CEOVIA compliance rules.
 *
 * Never throws — always returns a ComplianceResult.
 * Malformed / empty input returns { score: 0, status: 'rejected' }.
 *
 * @example
 * validate({ content: 'Supports healthy skin.', layer: 'layer1', market: 'uae' })
 * // → { score: 85, status: 'approved', violations: [], suggestions: [...] }
 */
export function validate(input: ComplianceInput): ComplianceResult {
  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!input?.content || typeof input.content !== 'string' || input.content.trim() === '') {
    return {
      score: 0,
      status: 'rejected',
      violations: [],
      suggestions: ['Content is empty or malformed.'],
    }
  }

  const { content, layer, market } = input
  const rules = resolveRulesForMarket(market)

  let hasProhibited   = false
  let diseaseFound    = false
  let positivePoints  = 0
  const prohibitedViolations: Violation[] = []
  const yellowViolations: Violation[]     = []

  // ── Step 1: Scan prohibited terms ─────────────────────────────────────────
  for (const term of rules.prohibited) {
    const positions = findOccurrences(content, term)
    if (positions.length === 0) continue

    hasProhibited = true
    if (DISEASE_TERMS.has(term.toLowerCase())) diseaseFound = true

    for (const position of positions) {
      const substitution = SUBSTITUTION_MAP[term.toLowerCase()]
      prohibitedViolations.push({
        term,
        type: 'prohibited',
        position,
        suggestion: substitution
          ? `Replace "${term}" with "${substitution}"`
          : `Remove "${term}" — disease and condition names are not permitted in ${layer} content`,
      })
    }
  }

  // ── Step 2: Scan yellow flag terms ────────────────────────────────────────
  for (const term of rules.yellowFlags) {
    const positions = findOccurrences(content, term)
    if (positions.length === 0) continue

    for (const position of positions) {
      const substitution = SUBSTITUTION_MAP[term.toLowerCase()]
      yellowViolations.push({
        term,
        type: 'yellow_flag',
        position,
        suggestion: substitution
          ? `Consider replacing "${term}" with "${substitution}"`
          : `Consider rewording "${term}" to reduce regulatory ambiguity`,
      })
    }
  }

  // ── Step 3: Positive signals (each distinct term counts once) ─────────────
  const triggeredTerms = new Set<string>()
  for (const signal of rules.positiveSignals) {
    if (!triggeredTerms.has(signal.term) && findOccurrences(content, signal.term).length > 0) {
      positivePoints += signal.points
      triggeredTerms.add(signal.term)
    }
  }

  // ── Step 4: Bonus — no disease names ──────────────────────────────────────
  // +10 when content contains no condition/pathogen names
  if (!diseaseFound) positivePoints += 10

  // ── Step 5: Bonus — professional layer classification ─────────────────────
  // +5 when content is correctly submitted under layer2/layer3
  if (layer === 'layer2' || layer === 'layer3') positivePoints += 5

  // ── Step 6: Bonus — mandatory disclaimer present ──────────────────────────
  if (hasDisclaimerPhrase(content)) positivePoints += 10

  // ── Step 7: Build initial score ───────────────────────────────────────────
  let score = 70 + positivePoints

  // ── Step 8: Hard cap — prohibited terms override all positives ────────────
  // Guaranteed: any content with a prohibited term scores ≤ 79
  if (hasProhibited) score = Math.min(score, 79)

  // ── Step 9: Yellow flag deductions (only when score ≥ 80) ─────────────────
  // If prohibited cap already brought score below 80, yellow flags don't compound
  if (score >= 80 && yellowViolations.length > 0) {
    score -= 5 * yellowViolations.length
  }

  // ── Step 10: Clamp to [0, 100] ────────────────────────────────────────────
  score = Math.min(100, Math.max(0, score))

  // ── Step 11: Combine all violations ──────────────────────────────────────
  // Yellow flag violations are always reported for transparency,
  // even when their score deduction was not applied.
  const allViolations: Violation[] = [...prohibitedViolations, ...yellowViolations]

  // ── Step 12: Build summary suggestions ───────────────────────────────────
  const suggestions: string[] = []

  if (allViolations.length === 0 && score >= 80) {
    suggestions.push('Content meets compliance standards for this market and layer.')
  }
  if (score < 80 && allViolations.length > 0) {
    suggestions.push(
      `${allViolations.length} issue(s) found. Apply auto-fix or review manually before publishing.`
    )
  }
  if (layer === 'layer3' && score < 90) {
    suggestions.push('Layer 3 content requires expert review before publishing.')
  }
  if (!hasDisclaimerPhrase(content)) {
    suggestions.push('Add the mandatory regulatory disclaimer to unlock +10 compliance points.')
  }

  // ── Step 13: Auto-fix ─────────────────────────────────────────────────────
  // Only generated when at least one violation has a known substitution.
  // Applies to both prohibited and yellow_flag violations.
  const fixableViolations = allViolations.filter(
    (v) => SUBSTITUTION_MAP[v.term.toLowerCase()] !== undefined
  )
  const autoFixedContent =
    fixableViolations.length > 0 ? applySubstitutions(content) : undefined

  return {
    score,
    status: scoreToStatus(score),
    violations: allViolations,
    suggestions,
    ...(autoFixedContent !== undefined && { autoFixedContent }),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Batch validation
// ─────────────────────────────────────────────────────────────────────────────

export interface BatchInput {
  items: ComplianceInput[]
}

export interface BatchResult {
  results: Array<ComplianceInput & { result: ComplianceResult }>
  summary: {
    total: number
    approved: number
    review: number
    rejected: number
    averageScore: number
  }
}

export function validateBatch(batch: BatchInput): BatchResult {
  const results = batch.items.map((item) => ({
    ...item,
    result: validate(item),
  }))

  const scores = results.map((r) => r.result.score)
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

  return {
    results,
    summary: {
      total:        results.length,
      approved:     results.filter((r) => r.result.status === 'approved').length,
      review:       results.filter((r) => r.result.status === 'review').length,
      rejected:     results.filter((r) => r.result.status === 'rejected').length,
      averageScore,
    },
  }
}
