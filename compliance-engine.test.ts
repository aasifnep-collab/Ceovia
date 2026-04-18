/**
 * compliance-engine.test.ts
 * Manual test suite — run with: npx tsx compliance-engine.test.ts
 *
 * Run these cases before wiring the route.
 * Every case documents expected behaviour so failures are immediately obvious.
 *
 * Scoring model recap (see compliance-engine.ts for full detail):
 *   Base 70 + positive signals → prohibited hard-cap at 79 → yellow-flag −5 each (if ≥80) → clamp [0,100]
 *
 * Word-boundary note (Groups 9–10):
 *   findOccurrences now enforces word boundaries so stem forms ('treat', 'prevent', …)
 *   do NOT match inside inflected forms ('treats', 'prevents', …) or compound words
 *   ('treatment', 'preventing'). Each entry in PROHIBITED_TERMS is matched independently
 *   as a whole word only.
 *
 * Expected scores used in assertions are derived from the rule tables.
 * If you change a rule weight, update the expected values here too.
 */

import { validate, validateBatch, checkRedirected } from './src/lib/ai/compliance-engine'
import { detectHandoff }                             from './src/lib/ai/concierge-prompt'

// ─────────────────────────────────────────────────────────────────────────────
// Minimal test runner (no jest/vitest needed for Phase 1 manual verification)
// ─────────────────────────────────────────────────────────────────────────────

let passed = 0
let failed = 0

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ✓  ${name}`)
    passed++
  } catch (err) {
    console.error(`  ✗  ${name}`)
    console.error(`     ${err instanceof Error ? err.message : err}`)
    failed++
  }
}

function expect(actual: unknown) {
  return {
    toBe(expected: unknown) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
      }
    },
    toBeGreaterThanOrEqual(n: number) {
      if (typeof actual !== 'number' || actual < n) {
        throw new Error(`Expected ≥ ${n}, got ${JSON.stringify(actual)}`)
      }
    },
    toBeLessThan(n: number) {
      if (typeof actual !== 'number' || actual >= n) {
        throw new Error(`Expected < ${n}, got ${JSON.stringify(actual)}`)
      }
    },
    toBeGreaterThan(n: number) {
      if (typeof actual !== 'number' || actual <= n) {
        throw new Error(`Expected > ${n}, got ${JSON.stringify(actual)}`)
      }
    },
    toHaveLength(n: number) {
      if (!Array.isArray(actual) || actual.length !== n) {
        throw new Error(`Expected length ${n}, got ${Array.isArray(actual) ? actual.length : 'non-array'}`)
      }
    },
    toContain(substr: string) {
      if (typeof actual !== 'string' || !actual.includes(substr)) {
        throw new Error(`Expected "${actual}" to contain "${substr}"`)
      }
    },
    notToContain(substr: string) {
      if (typeof actual === 'string' && actual.includes(substr)) {
        throw new Error(`Expected "${actual}" NOT to contain "${substr}"`)
      }
    },
    toBeDefined() {
      if (actual === undefined || actual === null) {
        throw new Error(`Expected value to be defined, got ${actual}`)
      }
    },
    toBeUndefined() {
      if (actual !== undefined) {
        throw new Error(`Expected undefined, got ${JSON.stringify(actual)}`)
      }
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Scoring reference — trace these manually if an assertion fails
//
// "A daily wellness supplement."
//   positives: none (0pt) | no disease names (+10) | no disclaimer (0)
//   score: 70 + 10 = 80 → approved
//
// "This product treats hair loss."
//   positives: none (0pt) | no disease names (+10) [treats is a verb, not a disease name]
//   score before cap: 70 + 10 = 80
//   prohibited cap (treats): min(80, 79) = 79 → review
//
// "Supports healthy skin. Designed to support wellness."
//   positives: supports (+5) + designed to support (+5) | no disease names (+10)
//   score: 70 + 5 + 5 + 10 = 90 → approved
//
// "Supports skin health and boosts energy."
//   positives: supports (+5) | no disease names (+10)
//   score before yellow: 70 + 5 + 10 = 85 ≥ 80 → yellow flag −5
//   final: 85 − 5 = 80 → approved
//
// "treats boosts"
//   positives: none | no disease names (+10)
//   score before cap: 70 + 10 = 80
//   prohibited cap (treats): min(80, 79) = 79
//   score < 80 → yellow flag deduction NOT applied
//   final: 79 → review
//
// All 3 positive signals + no-disease bonus + disclaimer:
//   supports (+5) + helps maintain (+5) + designed to support (+5) + no disease (+10) + disclaimer (+10) = +35
//   score: 70 + 35 = 105 → capped at 100
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nCEOVIA Compliance Engine — Test Suite\n')

// ── Group 1: Base scoring ─────────────────────────────────────────────────────
console.log('Group 1: Base scoring')

test('clean content returns score ≥ 70', () => {
  // "no disease names" bonus (+10) means clean content scores 80, not 70
  const result = validate({ content: 'A daily wellness supplement.', layer: 'layer1', market: 'global' })
  expect(result.score).toBeGreaterThanOrEqual(70)
})

test('clean content returns no violations', () => {
  const result = validate({ content: 'A daily wellness supplement.', layer: 'layer1', market: 'global' })
  expect(result.violations).toHaveLength(0)
})

test('score is capped at 100', () => {
  // All three positive signal terms + no disease names + disclaimer = +35 → 105, capped at 100
  const richContent =
    'Supports healthy skin. Helps maintain energy. Designed to support overall wellness. ' +
    'These statements have not been evaluated by any regulatory authority.'
  const result = validate({ content: richContent, layer: 'layer1', market: 'global' })
  expect(result.score).toBeLessThan(101)
  // Should actually hit exactly 100
  expect(result.score).toBe(100)
})

test('score is never below 0', () => {
  // Pile up yellow flags — even 6 × (−5) = −30 should not drop below 0
  const worstCase = 'boosts improves increases improves increases boosts'
  const result = validate({ content: worstCase, layer: 'layer1', market: 'global' })
  expect(result.score).toBeGreaterThanOrEqual(0)
})

// ── Group 2: Prohibited terms ─────────────────────────────────────────────────
console.log('\nGroup 2: Prohibited terms')

test('prohibited term forces score below 80', () => {
  // "treats" is prohibited — hard cap at 79
  // Trace: no positives, no disease names (+10) → 80, then cap → 79
  const result = validate({ content: 'This product treats hair loss.', layer: 'layer1', market: 'global' })
  expect(result.score).toBeLessThan(80)
})

test('prohibited term creates a violation of type prohibited', () => {
  const result = validate({ content: 'This product treats hair loss.', layer: 'layer1', market: 'global' })
  const prohibitedViolations = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibitedViolations.length).toBeGreaterThan(0)
})

test('multiple prohibited terms each create a violation entry', () => {
  // "treats" (1 occurrence) + "cures" (1 occurrence) = at least 2 prohibited violations
  const result = validate({ content: 'This treats and cures the condition.', layer: 'layer1', market: 'global' })
  const prohibitedViolations = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibitedViolations.length).toBeGreaterThanOrEqual(2)
})

test('prohibited term triggers auto-fix when substitution exists', () => {
  // "treats" has a substitution: "supports" — so autoFixedContent must be defined
  const result = validate({ content: 'This product treats hair loss.', layer: 'layer1', market: 'global' })
  expect(result.autoFixedContent).toBeDefined()
})

// ── Group 3: Yellow flag terms ────────────────────────────────────────────────
console.log('\nGroup 3: Yellow flag terms')

test('yellow flag reduces score by 5 when score ≥ 80', () => {
  // "supports" (+5) + no disease names (+10) = score 85 before yellow flag
  // "boosts" yellow flag → −5 → final 80
  const result = validate({
    content: 'This product supports skin health and boosts energy.',
    layer: 'layer1',
    market: 'global',
  })
  // Score would have been 85 without the yellow flag; it should be 80 with it
  expect(result.score).toBe(80)
  const yellowViolations = result.violations.filter((v) => v.type === 'yellow_flag')
  expect(yellowViolations.length).toBeGreaterThan(0)
})

test('yellow flag deduction is NOT applied when prohibited cap brings score below 80', () => {
  // Trace: "treats boosts" → no positives, no disease names (+10) → 80
  // prohibited cap (treats): min(80, 79) = 79
  // score 79 < 80 → yellow flag (boosts) deduction skipped
  // Score should be 79, not 74 (which it would be if yellow flag also subtracted)
  const result = validate({
    content: 'treats boosts',
    layer: 'layer1',
    market: 'global',
  })
  expect(result.score).toBe(79)
})

// ── Group 4: Status mapping ───────────────────────────────────────────────────
console.log('\nGroup 4: Status mapping')

test('score ≥ 80 returns status approved', () => {
  // "supports" (+5) + "designed to support" (+5) + no disease names (+10) = 90 → approved
  const result = validate({
    content: 'Supports healthy skin. Designed to support overall wellness.',
    layer: 'layer1',
    market: 'global',
  })
  expect(result.status).toBe('approved')
  expect(result.score).toBeGreaterThanOrEqual(80)
})

test('status is always one of approved / review / rejected', () => {
  const result = validate({ content: 'Any content at all', layer: 'layer1', market: 'global' })
  const validStatuses = ['approved', 'review', 'rejected']
  if (!validStatuses.includes(result.status)) {
    throw new Error(`Unexpected status: ${result.status}`)
  }
})

// ── Group 5: Auto-fix ─────────────────────────────────────────────────────────
console.log('\nGroup 5: Auto-fix')

test('auto-fix is absent when content has no violations', () => {
  const result = validate({ content: 'Clean content with no issues.', layer: 'layer1', market: 'global' })
  expect(result.autoFixedContent).toBeUndefined()
})

test('auto-fix replaces prohibited term with approved substitution', () => {
  // "treats" → "supports" per SUBSTITUTION_MAP
  const result = validate({ content: 'This treats the scalp naturally.', layer: 'layer1', market: 'global' })
  expect(result.autoFixedContent).toBeDefined()
  // autoFixedContent must not contain the original prohibited term
  expect(result.autoFixedContent as string).notToContain('treats')
  // and must contain the replacement
  expect(result.autoFixedContent as string).toContain('supports')
})

// ── Group 6: Market variants ──────────────────────────────────────────────────
console.log('\nGroup 6: Market variants')

test('UAE market validation runs and returns a result', () => {
  const result = validate({ content: 'Supports scalp health naturally.', layer: 'layer1', market: 'uae' })
  expect(result).toBeDefined()
  expect(result.score).toBeGreaterThanOrEqual(0)
})

test('KSA market validation runs and returns a result', () => {
  const result = validate({ content: 'Supports scalp health naturally.', layer: 'layer1', market: 'ksa' })
  expect(result).toBeDefined()
  expect(result.score).toBeGreaterThanOrEqual(0)
})

test('EU market validation runs and returns a result', () => {
  const result = validate({ content: 'Supports scalp health naturally.', layer: 'layer1', market: 'eu' })
  expect(result).toBeDefined()
  expect(result.score).toBeGreaterThanOrEqual(0)
})

// ── Group 7: Edge cases ───────────────────────────────────────────────────────
console.log('\nGroup 7: Edge cases')

test('empty string returns rejected with score 0', () => {
  const result = validate({ content: '', layer: 'layer1', market: 'global' })
  expect(result.status).toBe('rejected')
  expect(result.score).toBe(0)
})

test('null content returns rejected safely without throwing', () => {
  // @ts-expect-error — testing malformed input
  const result = validate({ content: null, layer: 'layer1', market: 'global' })
  expect(result.status).toBe('rejected')
})

test('2,000 character content processes in under 100ms', () => {
  const longContent = 'Supports healthy hair growth. '.repeat(70).slice(0, 2000)
  const start = Date.now()
  validate({ content: longContent, layer: 'layer1', market: 'global' })
  const durationMs = Date.now() - start
  if (durationMs > 100) {
    throw new Error(`Took ${durationMs}ms — expected < 100ms`)
  }
})

// ── Group 8: Batch validation ─────────────────────────────────────────────────
console.log('\nGroup 8: Batch validation')

test('batch validates multiple items and returns correct summary counts', () => {
  const result = validateBatch({
    items: [
      { content: 'Supports hair health naturally.',        layer: 'layer1', market: 'global' },
      { content: 'Designed to support scalp wellness.',    layer: 'layer1', market: 'uae'    },
      { content: 'Helps maintain healthy hair.',          layer: 'layer2', market: 'eu'     },
    ],
  })
  expect(result.summary.total).toBe(3)
  expect(result.results).toHaveLength(3)
  // All three use approved language → all should be approved
  expect(result.summary.approved).toBe(3)
})

// ── Group 9: Redirected terms (checkRedirected) ───────────────────────────────
console.log('\nGroup 9: Redirected terms')

test('checkRedirected returns matching term for original condition name', () => {
  // "arthritis" was in the original REDIRECTED_TERMS list
  const result = checkRedirected('I have arthritis — can CEOVIA help?')
  expect(result).toBe('arthritis')
})

test('checkRedirected returns matching term for extended condition name "eczema"', () => {
  // "eczema" is a Gap 2 addition — confirms the second-tier list is active
  const result = checkRedirected('Can CEOVIA help with my eczema?')
  expect(result).toBe('eczema')
})

test('checkRedirected returns first matching term when multiple conditions present', () => {
  // Returns the first match found in REDIRECTED_TERMS iteration order
  const result = checkRedirected('I have arthritis and diabetes')
  expect(result).toBeDefined()
})

test('checkRedirected returns null for clean product question', () => {
  const result = checkRedirected('What does the 90-day programme support?')
  expect(result).toBe(null)
})

test('checkRedirected is case-insensitive', () => {
  const result = checkRedirected('Suffering from ECZEMA — will CEOVIA help?')
  expect(result).toBeDefined()
})

test('checkRedirected returns null when message contains only approved wellness language', () => {
  const result = checkRedirected('Supports skin hydration and helps maintain energy.')
  expect(result).toBe(null)
})

// ── Group 10: Verb stem forms in PROHIBITED_TERMS ─────────────────────────────
console.log('\nGroup 10: Verb stem forms')

test('stem form "treat" (infinitive) triggers prohibited violation', () => {
  // "treat" without 's' — previously escaped pre-flight via exact-match gap
  const result = validate({ content: 'CEOVIA can treat this condition.', layer: 'layer1', market: 'global' })
  const prohibited = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibited.length).toBeGreaterThan(0)
  expect(result.score).toBeLessThan(80)
})

test('stem form "prevent" triggers prohibited violation', () => {
  // Key gap case from QA audit: "List every disease CEOVIA can prevent"
  const result = validate({ content: 'Can CEOVIA prevent hair loss?', layer: 'layer1', market: 'global' })
  const prohibited = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibited.length).toBeGreaterThan(0)
  expect(result.score).toBeLessThan(80)
})

test('stem form "cure" triggers prohibited violation', () => {
  const result = validate({ content: 'Nothing can cure it, but CEOVIA might help.', layer: 'layer1', market: 'global' })
  // "cure" (stem) should be caught; "treats"/"cures" are also tested elsewhere
  const prohibited = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibited.length).toBeGreaterThan(0)
  expect(result.score).toBeLessThan(80)
})

test('word boundary: stem "treat" does NOT match inside "treats"', () => {
  // "treats" is its own entry — "treat" must not double-count via substring matching
  const result = validate({ content: 'This product treats hair loss.', layer: 'layer1', market: 'global' })
  const treatViolations  = result.violations.filter((v) => v.term === 'treat')
  const treatsViolations = result.violations.filter((v) => v.term === 'treats')
  expect(treatViolations).toHaveLength(0)   // no false positive from substring
  expect(treatsViolations.length).toBeGreaterThan(0) // inflected form still caught
})

test('word boundary: stem "treat" does NOT match inside "treatment"', () => {
  // "treatment approach" should not trigger a prohibited violation
  const result = validate({ content: 'A treatment approach for scalp health.', layer: 'layer1', market: 'global' })
  const prohibited = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibited).toHaveLength(0)
  expect(result.score).toBeGreaterThanOrEqual(80)
})

test('word boundary: stem "prevent" does NOT match inside "preventing"', () => {
  const result = validate({ content: 'Designed for preventing moisture loss.', layer: 'layer1', market: 'global' })
  const prohibited = result.violations.filter((v) => v.type === 'prohibited')
  expect(prohibited).toHaveLength(0)
})

// ── Group 11: Handoff pattern validation (Gap 3 and Gap 4) ────────────────────
console.log('\nGroup 11: Handoff patterns')

test('Gap 3 — "blood pressure" alone triggers drug handoff (no qualifier required)', () => {
  // Previously required "blood pressure pill/tablet/medication"
  const result = detectHandoff('Does CEOVIA affect blood pressure?')
  expect(result).toBe('drug')
})

test('Gap 3 — "blood pressure medication" still triggers drug handoff (qualifier still works)', () => {
  const result = detectHandoff('I take blood pressure medication — is CEOVIA safe?')
  expect(result).toBe('drug')
})

test('Gap 4 — "pharmacy" alone triggers b2b handoff', () => {
  // Previously required "pharmacy procurement" as a compound phrase
  const result = detectHandoff('Can I stock CEOVIA at my pharmacy?')
  expect(result).toBe('b2b')
})

test('Gap 4 — "pharmacy procurement" still triggers b2b handoff (compound form still works)', () => {
  const result = detectHandoff('I handle pharmacy procurement for a regional chain.')
  expect(result).toBe('b2b')
})

test('clean wellness question triggers no handoff', () => {
  const result = detectHandoff('How does the 90-day programme support skin hydration?')
  expect(result).toBe(null)
})

// ─────────────────────────────────────────────────────────────────────────────
// Results summary
// ─────────────────────────────────────────────────────────────────────────────

console.log(`\n────────────────────────────────────`)
console.log(`Results: ${passed} passed, ${failed} failed`)

if (failed > 0) {
  console.log(`\n⚠  Fix failing tests before proceeding to validate route.\n`)
  process.exit(1)
} else {
  console.log(`\n✓  All tests passed. Ready to build validate route.\n`)
  process.exit(0)
}
