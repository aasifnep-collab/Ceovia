// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA — Body Systems / Outcomes Data
// src/data/outcomes.js
//
// Source: CEOVIA Distributor & Partner Presentation — A-CellularScale6v.pdf
//
// The "Six Systems of Cellular Bioactivation" — CEOVIA's outcome framework.
// Each system maps a body domain to visible + measurable health endpoints,
// the bioactives responsible, and the expected timeline to first signal.
//
// Field schema:
//   id           — kebab-case identifier (used as slug / anchor)
//   system       — display name of the body system
//   tagline      — one-line clinical hook (evidence-neutral language)
//   description  — 2–3 sentence consumer explanation
//   icon         — icon name (map to your icon library in the component)
//   color        — Tailwind colour key for accent colouring
//   biomarkers   — array of measurable outcomes
//   keyBioactives — bioactive IDs from bioactives.js that drive this system
//   timeline     — { firstSignal, established, peak } — weeks
// ─────────────────────────────────────────────────────────────────────────────

export const outcomes = [
  {
    id:          'skin-radiance',
    system:      'Skin & Radiance',
    tagline:     'Cellular hydration from within — the bioactive glow',
    description:
      'Sea Buckthorn\'s unique Omega-7 (Palmitoleic Acid) mirrors the skin\'s own natural fat, replenishing cell membranes directly. Combined with 30+ carotenoids and Vitamins A, C, and E, CEOVIA supports collagen synthesis, skin tone evenness, and sustained hydration at the cellular level — not topically.',
    icon:        'sparkles',
    color:       'gold',
    biomarkers: [
      'Skin hydration (transepidermal water loss reduction)',
      'Collagen density (dermal ultrasound)',
      'Skin tone uniformity',
      'Fine line depth reduction',
      'Sebum balance',
    ],
    keyBioactives: ['omega-7', 'vitamin-a', 'vitamin-c', 'beta-carotene', 'vitamin-e-alpha-tocopherol'],
    timeline: {
      firstSignal:  4,   // weeks — initial hydration and tone improvement
      established:  8,   // weeks — measurable collagen changes visible
      peak:         12,  // weeks — full protocol completion
    },
  },

  {
    id:          'cardiovascular',
    system:      'Cardiovascular',
    tagline:     'Lipid balance, vascular integrity, endothelial resilience',
    description:
      'The combination of all four Omegas (3, 6, 7, 9), phytosterols, and isorhamnetin creates a multi-pathway approach to cardiovascular support — addressing lipid profiles, vascular wall strength, and platelet aggregation. Omega-7\'s unique role in endothelial regeneration makes CEOVIA distinctly effective beyond standard fish-oil supplementation.',
    icon:        'heart',
    color:       'orange',
    biomarkers: [
      'Total cholesterol and LDL reduction',
      'HDL elevation',
      'Triglyceride levels',
      'C-reactive protein (hs-CRP)',
      'Endothelial function (FMD)',
      'Blood pressure (systolic / diastolic)',
    ],
    keyBioactives: ['omega-7', 'omega-3', 'omega-9', 'isorhamnetin', 'beta-sitosterol', 'quercetin'],
    timeline: {
      firstSignal:  6,
      established:  10,
      peak:         12,
    },
  },

  {
    id:          'immune-resilience',
    system:      'Immune Resilience',
    tagline:     'Innate and adaptive immunity — calibrated, not stimulated',
    description:
      'CEOVIA does not "boost" immunity — it calibrates it. Selenium activates glutathione peroxidase (the body\'s master antioxidant enzyme), while quercetin stabilises mast cells and modulates inflammatory pathways. Vitamins A, C, D, and E complete the immune co-factor matrix for both innate response speed and adaptive memory accuracy.',
    icon:        'shield',
    color:       'green',
    biomarkers: [
      'Glutathione levels',
      'Natural killer (NK) cell activity',
      'Immunoglobulin levels (IgA, IgG)',
      'Inflammatory cytokine panel (IL-6, TNF-α)',
      'Illness frequency and severity',
      'Recovery time',
    ],
    keyBioactives: ['selenium', 'quercetin', 'vitamin-c', 'vitamin-a', 'vitamin-d', 'vitamin-e-alpha-tocopherol'],
    timeline: {
      firstSignal:  3,
      established:  8,
      peak:         12,
    },
  },

  {
    id:          'hormonal-balance',
    system:      'Hormonal Balance',
    tagline:     'Endocrine calibration via lipid and phytosterol co-factors',
    description:
      'Hormones are synthesised from cholesterol — and CEOVIA\'s lipid-rich bioactive matrix provides the structural co-factors hormonal pathways depend on. Vitamin D functions as a steroid hormone precursor; phytosterols modulate androgen metabolism; selenium supports thyroid enzyme activation. CEOVIA works with the endocrine system\'s own intelligence, not against it.',
    icon:        'scales',
    color:       'gold',
    biomarkers: [
      'Thyroid panel (TSH, T3, T4)',
      'Cortisol (AM/PM rhythm)',
      'DHEA-S',
      'Testosterone (free and total)',
      'Oestradiol / Progesterone ratio',
      'Insulin sensitivity (HOMA-IR)',
    ],
    keyBioactives: ['vitamin-d', 'selenium', 'beta-sitosterol', 'stigmasterol', 'omega-7', 'vitamin-e-tocotrienols'],
    timeline: {
      firstSignal:  6,
      established:  10,
      peak:         12,
    },
  },

  {
    id:          'gut-integrity',
    system:      'Gut Integrity',
    tagline:     'Mucosal regeneration — the cellular foundation of digestion',
    description:
      'Omega-7 (Palmitoleic Acid) is the primary fatty acid in mucosal tissue. CEOVIA\'s high Omega-7 concentration directly supports the regeneration of gut epithelial cells — reducing intestinal permeability (leaky gut), supporting the microbiome, and restoring the mucosal barrier that governs nutrient absorption and immune gating.',
    icon:        'leaf',
    color:       'green',
    biomarkers: [
      'Intestinal permeability markers (zonulin)',
      'Microbiome diversity score',
      'Short-chain fatty acid (SCFA) production',
      'Bloating and digestive comfort (patient-reported)',
      'Secretory IgA (sIgA)',
    ],
    keyBioactives: ['omega-7', 'omega-3', 'quercetin', 'catechins', 'proanthocyanidins', 'ellagic-acid'],
    timeline: {
      firstSignal:  3,
      established:  7,
      peak:         10,
    },
  },

  {
    id:          'cognitive-clarity',
    system:      'Cognitive Clarity',
    tagline:     'Neuronal membrane integrity and sustained mental performance',
    description:
      'The brain is 60% fat — and the quality of that fat determines neural signal speed and mitochondrial efficiency. CEOVIA\'s Omega-3 and Omega-7 support neuronal membrane fluidity, while carotenoids (lutein, zeaxanthin) and Vitamin E protect against oxidative stress in neural tissue. Selenium\'s role in thyroid activation provides downstream cognitive energy.',
    icon:        'brain',
    color:       'orange',
    biomarkers: [
      'Cognitive performance (trail-making, Stroop)',
      'Working memory score',
      'Mental fatigue (VAS)',
      'Reaction time',
      'Mood and anxiety scores (PHQ-9, GAD-7)',
    ],
    keyBioactives: ['omega-3', 'omega-7', 'lutein', 'zeaxanthin', 'vitamin-e-alpha-tocopherol', 'selenium'],
    timeline: {
      firstSignal:  4,
      established:  8,
      peak:         12,
    },
  },
];

// ── SYSTEMS MAP (keyed by id — for fast lookups) ──────────────────────────
export const outcomesById = Object.fromEntries(
  outcomes.map(o => [o.id, o])
);
