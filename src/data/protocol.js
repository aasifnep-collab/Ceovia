// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA — 90-Day Protocol Data
// src/data/protocol.js
//
// Source: CEOVIA Distributor & Partner Presentation — A-CellularScale6v.pdf
//
// The CEOVIA Cellular Bioactivation System is structured as a 3-phase,
// 90-day protocol. Each phase has a distinct cellular priority and a set
// of expected milestones the user experiences week-by-week.
//
// Field schema:
//   id          — kebab-case identifier
//   phase       — phase number (1, 2, 3)
//   name        — phase display name
//   subtitle    — one-line phase descriptor
//   days        — { start, end } — inclusive day range
//   color       — Tailwind colour key for phase accent
//   icon        — icon name
//   mechanism   — what is happening at the cellular level
//   description — consumer-facing explanation (2–3 sentences)
//   milestones  — array of week-by-week experiences
//   dosage      — usage note for this phase (if phased dosing applies)
// ─────────────────────────────────────────────────────────────────────────────

export const protocol = [
  {
    id:       'reset',
    phase:    1,
    name:     'Reset',
    subtitle: 'Cellular Foundation',
    days:     { start: 1, end: 30 },
    color:    'green',
    icon:     'refresh',
    mechanism:
      'The body begins clearing oxidative debris and re-establishing lipid membrane quality. Omega-7 starts integrating into cell membranes. Selenium activates glutathione peroxidase — the master antioxidant enzyme. The gut mucosal lining begins regenerating.',
    description:
      'The first 30 days are about preparing your cells to receive. CEOVIA\'s bioactives begin systematically addressing the cellular-level deficiencies that accumulate from modern diet, stress, and environmental load. You may notice subtle improvements in digestion and energy before visible changes appear — this is the foundation being laid.',
    milestones: [
      {
        week:  1,
        days:  '1–7',
        title: 'Cellular Priming',
        signals: [
          'Digestive rhythm begins to settle',
          'Sleep onset may improve',
          'Initial gut comfort changes (may include adjustment period)',
        ],
      },
      {
        week:  2,
        days:  '8–14',
        title: 'Antioxidant Activation',
        signals: [
          'Glutathione system upregulation begins',
          'Reduced afternoon energy dip (anecdotal)',
          'Skin may feel more hydrated',
        ],
      },
      {
        week:  3,
        days:  '15–21',
        title: 'Mucosal Renewal',
        signals: [
          'Gut epithelial cell turnover (3–5 day cycle — new cells now nutrient-rich)',
          'Bloating reduction in many users',
          'Subtle improvement in skin tone evenness',
        ],
      },
      {
        week:  4,
        days:  '22–30',
        title: 'Foundation Set',
        signals: [
          'Cell membrane lipid composition shifting',
          'Inflammatory markers beginning to reduce',
          'Energy consistency (not intensity) improving',
        ],
      },
    ],
    dosage: 'Standard daily dose. Take with food to enhance fat-soluble bioactive absorption.',
  },

  {
    id:       'restore',
    phase:    2,
    name:     'Restore',
    subtitle: 'Cellular Repair',
    days:     { start: 31, end: 60 },
    color:    'orange',
    icon:     'layers',
    mechanism:
      'Membrane composition has shifted — cells are now structurally stronger. Hormonal co-factors become active as lipid sufficiency improves. The immune system calibration enters its adaptive phase. Collagen synthesis accelerates as Vitamin C and carotenoid levels stabilise.',
    description:
      'Days 31–60 are when cellular repair becomes visible. The bioactive compounds established in Phase 1 now have enough concentration and membrane integration to produce measurable outcomes. Users consistently report this as the phase where they first notice friends commenting on their appearance — not because of a single dramatic change, but because multiple systems are restoring simultaneously.',
    milestones: [
      {
        week:  5,
        days:  '31–37',
        title: 'Visible Skin Changes',
        signals: [
          'Skin luminosity and hydration noticeably improved',
          'Fine lines appear less pronounced',
          'Under-eye area improvement reported',
        ],
      },
      {
        week:  6,
        days:  '38–44',
        title: 'Cardiovascular Response',
        signals: [
          'Exercise tolerance improvement',
          'Recovery time between physical activity reduces',
          'Blood pressure improvements detectable (with monitoring)',
        ],
      },
      {
        week:  7,
        days:  '45–51',
        title: 'Hormonal Rebalancing',
        signals: [
          'Menstrual cycle regularity improvements (female users)',
          'Mood stability and reduced irritability',
          'Libido improvement reported by both sexes',
        ],
      },
      {
        week:  8,
        days:  '52–60',
        title: 'Cognitive Lift',
        signals: [
          'Mental clarity and focus improvement',
          'Reduced "brain fog" incidents',
          'Working memory performance improvement',
        ],
      },
    ],
    dosage: 'Standard daily dose. Consistency is critical — bioactive concentration is accumulating.',
  },

  {
    id:       'optimize',
    phase:    3,
    name:     'Optimize',
    subtitle: 'Cellular Performance',
    days:     { start: 61, end: 90 },
    color:    'gold',
    icon:     'zap',
    mechanism:
      'Full systemic integration. Cell membrane composition has been substantially remodelled with Omega-7. All six body systems are operating from the upgraded cellular substrate. The body shifts from repair mode to performance mode — sustaining and amplifying the gains made in Phases 1 and 2.',
    description:
      'The final 30 days are about optimisation. The cellular infrastructure built over 60 days now functions as a platform for peak performance across all six systems. Users completing Phase 3 report consistent, sustained outcomes — not acute effects — because the change has happened at the structural level. This is the difference between supplementation and true bioactivation.',
    milestones: [
      {
        week:  9,
        days:  '61–67',
        title: 'Immune Calibration Complete',
        signals: [
          'Measurable natural killer (NK) cell activity improvement',
          'Inflammatory markers at new baseline (lower)',
          'Illness resilience — exposure without infection in some users',
        ],
      },
      {
        week:  10,
        days:  '68–74',
        title: 'Metabolic Efficiency',
        signals: [
          'Insulin sensitivity improvement detectable in HbA1c panel',
          'Consistent energy throughout the day (no spikes/crashes)',
          'Body composition shifts (fat:muscle ratio) becoming apparent',
        ],
      },
      {
        week:  11,
        days:  '75–81',
        title: 'Full Skin Protocol',
        signals: [
          'Collagen density measurably improved (dermal ultrasound)',
          'Skin hydration at sustained new high',
          'Hair strength and shine improvement reported',
        ],
      },
      {
        week:  12,
        days:  '82–90',
        title: 'Peak Bioactivation',
        signals: [
          'All 6 systems operating at new cellular baseline',
          'Sustained energy, clarity, resilience as new normal',
          'Users report this as "feeling like themselves, but better"',
        ],
      },
    ],
    dosage: 'Standard daily dose. Begin planning continuation programme for sustained outcomes.',
  },
];

// ── PROTOCOL SUMMARY ────────────────────────────────────────────────────
export const PROTOCOL_SUMMARY = {
  name:           'The Cellular Bioactivation System',
  tagline:        'Reset. Restore. Optimize.',
  totalDays:      90,
  phases:         protocol.length,
  totalWeeks:     13,
  pricing: {
    usd:          225,
    aed:          825,
    eur:          130,
    currency:     ['USD', 'AED', 'EUR'],
  },
  continuationCycle: 90, // days — recommended re-order cycle
};

// ── PROTOCOL MAP (keyed by id) ────────────────────────────────────────────
export const protocolById = Object.fromEntries(
  protocol.map(p => [p.id, p])
);
