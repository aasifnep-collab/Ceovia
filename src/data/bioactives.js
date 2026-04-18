// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA — Bioactives Data
// src/data/bioactives.js
//
// Source: CEOVIA Distributor & Partner Presentation — A-CellularScale6v.pdf
//
// CEOVIA's Sea Buckthorn delivers 190+ bioactives from a single plant source.
// Categorised into 6 compound families, each with clinical relevance noted.
//
// Field schema:
//   id          — kebab-case identifier
//   name        — compound name (display)
//   family      — compound family key (links to FAMILIES map)
//   concentration — typical range in the finished product (string, or null if trace)
//   role        — primary physiological function (brief, evidence-neutral)
//   keyBiomarker — true if this compound is featured in CEOVIA's evidence dossier
// ─────────────────────────────────────────────────────────────────────────────

// ── COMPOUND FAMILIES ─────────────────────────────────────────────────────
export const FAMILIES = {
  omegas:       { label: 'Omega Fatty Acids',   color: 'orange', count: 4  },
  carotenoids:  { label: 'Carotenoids',          color: 'gold',   count: 30 },
  vitamins:     { label: 'Fat-Soluble Vitamins', color: 'green',  count: 4  },
  phytosterols: { label: 'Phytosterols',         color: 'grey',   count: 8  },
  flavonoids:   { label: 'Flavonoids & Phenols', color: 'grey',   count: 20 },
  minerals:     { label: 'Minerals & Trace',     color: 'grey',   count: 12 },
};

// ── BIOACTIVES ARRAY ──────────────────────────────────────────────────────
export const bioactives = [

  // ── OMEGA FATTY ACIDS ─────────────────────────────────────────────────
  {
    id:             'omega-7',
    name:           'Omega-7 (Palmitoleic Acid)',
    family:         'omegas',
    concentration:  '15–35%',
    role:           'Cellular membrane repair, mucosal regeneration, insulin sensitivity modulation',
    keyBiomarker:   true,
    note:           'Rarest of the 4 Omegas. CEOVIA\'s key differentiator — Sea Buckthorn is one of the only plant sources delivering meaningful Omega-7 concentrations.',
  },
  {
    id:             'omega-9',
    name:           'Omega-9 (Oleic Acid)',
    family:         'omegas',
    concentration:  '15–35%',
    role:           'Anti-inflammatory signalling, cardiovascular lipid profile support, skin barrier reinforcement',
    keyBiomarker:   false,
  },
  {
    id:             'omega-6',
    name:           'Omega-6 (Linoleic Acid)',
    family:         'omegas',
    concentration:  '10–20%',
    role:           'Structural component of cell membranes, skin hydration, eicosanoid precursor',
    keyBiomarker:   false,
  },
  {
    id:             'omega-3',
    name:           'Omega-3 (Alpha-Linolenic Acid)',
    family:         'omegas',
    concentration:  '2–6%',
    role:           'Anti-inflammatory cascade modulation, neurological membrane fluidity',
    keyBiomarker:   false,
  },

  // ── CAROTENOIDS (30+) ──────────────────────────────────────────────────
  {
    id:             'beta-carotene',
    name:           'Beta-Carotene',
    family:         'carotenoids',
    concentration:  null,
    role:           'Pro-vitamin A precursor, antioxidant, photoprotection',
    keyBiomarker:   true,
  },
  {
    id:             'lycopene',
    name:           'Lycopene',
    family:         'carotenoids',
    concentration:  null,
    role:           'Singlet oxygen quenching, cardiovascular endothelial protection',
    keyBiomarker:   false,
  },
  {
    id:             'zeaxanthin',
    name:           'Zeaxanthin',
    family:         'carotenoids',
    concentration:  null,
    role:           'Macular pigment density, blue-light filtration, retinal antioxidant defence',
    keyBiomarker:   false,
  },
  {
    id:             'lutein',
    name:           'Lutein',
    family:         'carotenoids',
    concentration:  null,
    role:           'Macular protection, skin photoprotection, antioxidant',
    keyBiomarker:   false,
  },
  {
    id:             'beta-cryptoxanthin',
    name:           'Beta-Cryptoxanthin',
    family:         'carotenoids',
    concentration:  null,
    role:           'Pro-vitamin A activity, bone metabolism support, anti-inflammatory',
    keyBiomarker:   false,
  },
  {
    id:             'alpha-carotene',
    name:           'Alpha-Carotene',
    family:         'carotenoids',
    concentration:  null,
    role:           'Antioxidant, pro-vitamin A activity',
    keyBiomarker:   false,
  },
  {
    id:             'astaxanthin',
    name:           'Astaxanthin',
    family:         'carotenoids',
    concentration:  null,
    role:           'Potent antioxidant (500× vitamin E), mitochondrial protection, skin elasticity',
    keyBiomarker:   false,
  },
  {
    id:             'canthaxanthin',
    name:           'Canthaxanthin',
    family:         'carotenoids',
    concentration:  null,
    role:           'Antioxidant, photoprotection',
    keyBiomarker:   false,
  },
  {
    id:             'phytoene',
    name:           'Phytoene',
    family:         'carotenoids',
    concentration:  null,
    role:           'UV protection precursor, skin brightening',
    keyBiomarker:   false,
  },
  {
    id:             'phytofluene',
    name:           'Phytofluene',
    family:         'carotenoids',
    concentration:  null,
    role:           'UV protection, antioxidant, skin tone evenness',
    keyBiomarker:   false,
  },

  // ── FAT-SOLUBLE VITAMINS ───────────────────────────────────────────────
  {
    id:             'vitamin-e-alpha-tocopherol',
    name:           'Vitamin E — Alpha-Tocopherol',
    family:         'vitamins',
    concentration:  null,
    role:           'Lipid peroxidation inhibition, immune modulation, skin membrane integrity',
    keyBiomarker:   true,
  },
  {
    id:             'vitamin-e-gamma-tocopherol',
    name:           'Vitamin E — Gamma-Tocopherol',
    family:         'vitamins',
    concentration:  null,
    role:           'Reactive nitrogen species scavenging, anti-inflammatory',
    keyBiomarker:   false,
  },
  {
    id:             'vitamin-e-tocotrienols',
    name:           'Vitamin E — Tocotrienols',
    family:         'vitamins',
    concentration:  null,
    role:           'Neuroprotection, cholesterol regulation, anti-cancer research activity',
    keyBiomarker:   false,
  },
  {
    id:             'vitamin-a',
    name:           'Vitamin A (Retinol equivalents)',
    family:         'vitamins',
    concentration:  null,
    role:           'Epithelial integrity, immune function, vision, gene expression',
    keyBiomarker:   true,
  },
  {
    id:             'vitamin-d',
    name:           'Vitamin D',
    family:         'vitamins',
    concentration:  null,
    role:           'Calcium homeostasis, immune regulation, hormonal cascade modulation',
    keyBiomarker:   false,
  },
  {
    id:             'vitamin-k',
    name:           'Vitamin K (K1 + K2)',
    family:         'vitamins',
    concentration:  null,
    role:           'Coagulation, osteocalcin activation, arterial calcification prevention',
    keyBiomarker:   false,
  },
  {
    id:             'vitamin-c',
    name:           'Vitamin C (Ascorbic Acid)',
    family:         'vitamins',
    concentration:  null,
    role:           'Collagen synthesis, antioxidant regeneration, immune activation',
    keyBiomarker:   true,
  },

  // ── PHYTOSTEROLS ──────────────────────────────────────────────────────
  {
    id:             'beta-sitosterol',
    name:           'Beta-Sitosterol',
    family:         'phytosterols',
    concentration:  null,
    role:           'LDL cholesterol displacement at intestinal absorption, anti-inflammatory, BPH support',
    keyBiomarker:   false,
  },
  {
    id:             'stigmasterol',
    name:           'Stigmasterol',
    family:         'phytosterols',
    concentration:  null,
    role:           'Cholesterol modulation, anti-inflammatory, progesterone precursor research',
    keyBiomarker:   false,
  },
  {
    id:             'campesterol',
    name:           'Campesterol',
    family:         'phytosterols',
    concentration:  null,
    role:           'Cholesterol reduction, cardiovascular support',
    keyBiomarker:   false,
  },

  // ── FLAVONOIDS & PHENOLS ──────────────────────────────────────────────
  {
    id:             'quercetin',
    name:           'Quercetin',
    family:         'flavonoids',
    concentration:  null,
    role:           'Anti-inflammatory (COX-2 inhibition), antiviral, mast cell stabilisation, allergy modulation',
    keyBiomarker:   true,
  },
  {
    id:             'isorhamnetin',
    name:           'Isorhamnetin',
    family:         'flavonoids',
    concentration:  null,
    role:           'Metabolic syndrome support, adipogenesis inhibition, cardiovascular protection',
    keyBiomarker:   true,
    note:           'Signature flavonoid of Sea Buckthorn — rare in other plant sources.',
  },
  {
    id:             'kaempferol',
    name:           'Kaempferol',
    family:         'flavonoids',
    concentration:  null,
    role:           'Apoptosis modulation, anti-inflammatory, neuroprotection',
    keyBiomarker:   false,
  },
  {
    id:             'rutin',
    name:           'Rutin',
    family:         'flavonoids',
    concentration:  null,
    role:           'Capillary integrity, anti-inflammatory, antioxidant',
    keyBiomarker:   false,
  },
  {
    id:             'proanthocyanidins',
    name:           'Proanthocyanidins (OPCs)',
    family:         'flavonoids',
    concentration:  null,
    role:           'Vascular wall reinforcement, collagen cross-linking, antioxidant cascade',
    keyBiomarker:   false,
  },
  {
    id:             'catechins',
    name:           'Catechins',
    family:         'flavonoids',
    concentration:  null,
    role:           'Antioxidant, metabolic support, gut microbiome modulation',
    keyBiomarker:   false,
  },
  {
    id:             'ellagic-acid',
    name:           'Ellagic Acid',
    family:         'flavonoids',
    concentration:  null,
    role:           'DNA protection, anti-carcinogenic activity, gut microbiome support',
    keyBiomarker:   false,
  },

  // ── MINERALS & TRACE ELEMENTS ─────────────────────────────────────────
  {
    id:             'selenium',
    name:           'Selenium',
    family:         'minerals',
    concentration:  null,
    role:           'Glutathione peroxidase co-factor, thyroid hormone metabolism, immune activation',
    keyBiomarker:   true,
  },
  {
    id:             'zinc',
    name:           'Zinc',
    family:         'minerals',
    concentration:  null,
    role:           'Enzyme co-factor (200+ enzymes), immune response, wound healing, testosterone synthesis',
    keyBiomarker:   false,
  },
  {
    id:             'magnesium',
    name:           'Magnesium',
    family:         'minerals',
    concentration:  null,
    role:           'ATP synthesis co-factor, nerve conduction, muscle relaxation, insulin sensitivity',
    keyBiomarker:   false,
  },
  {
    id:             'iron',
    name:           'Iron',
    family:         'minerals',
    concentration:  null,
    role:           'Haemoglobin synthesis, oxygen transport, mitochondrial electron transport',
    keyBiomarker:   false,
  },
];

// ── HEADLINE STAT ─────────────────────────────────────────────────────────
// Used in copy blocks and infographics
export const BIOACTIVE_HEADLINE = {
  total:         '190+',
  families:      6,
  keyMarkers:    bioactives.filter(b => b.keyBiomarker).length,
  uniqueToPlant: ['Omega-7 (Palmitoleic Acid)', 'Isorhamnetin'],
};
