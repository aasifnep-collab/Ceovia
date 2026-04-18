export type MechanismLayer = {
  id: string
  label: string
  intro: string
  bullets: { term: string; detail: string }[]
}

export type OmegaRow = {
  name: string
  concentration: string
  role: string
}

export type BioactiveRow = {
  compound: string
  category: string
  clinicalRole: string
}

export type Phase = {
  number: number
  title: string
  description: string
  outcomeStatement: string
}

export type Pillar = {
  id: string
  icon: string
  title: string
  summary: string
  mechanism: string
  bioactives: string
  outcomeStatement: string
}

export type ResearchDomain = {
  domain: string
  summary: string
  limitationNote: string
  citations?: string[]
}

export const clinicalInsightHero = {
  tag: 'Clinical Insight',
  title: 'The Science Behind Whole-Body Support',
  subheading:
    "A concise view of CEOVIA's bioactive architecture, support model, and clinical rationale — shaped for practitioners, clinics, and professional partners.",
  cta: 'Explore the Science →',
}

export const clinicalPhilosophy = {
  label: 'The Clinical Philosophy',
  title: 'One Integrated Biology. One System.',
  paragraphs: [
    'CEOVIA is built on a simple principle: visible wellness rarely belongs to one isolated pathway. Skin quality, cellular resilience, energy steadiness, and immune balance tend to move together.',
    'That is why the platform is framed as a structured daily programme, not a single-claim supplement. The intention is to support the biological terrain behind whole-body vitality.',
    'Ingredient-level literature around Himalayan Sea Buckthorn suggests broad systems relevance. CEOVIA translates that complexity into a clearer, more usable protocol.',
  ],
  callout:
    'Clinical value is easier to interpret when support is coordinated across systems rather than reduced to one symptom or one isolated input.',
}

export const mechanismLayers: MechanismLayer[] = [
  {
    id: 'cellular',
    label: 'Cellular Level',
    intro:
      'Ingredient-level research suggests Sea Buckthorn bioactives may be relevant at the membrane, oxidative, and signalling level — areas that often shape resilience before visible outcomes appear.',
    bullets: [
      {
        term: 'Membrane support',
        detail:
          'A broad fatty-acid profile is studied for its relevance to membrane fluidity and barrier integrity, especially in tissues that rely on lipid balance.',
      },
      {
        term: 'Oxidative buffering',
        detail:
          'Carotenoids, tocopherols, and polyphenolic compounds are studied for their relevance to oxidative stress management.',
      },
      {
        term: 'Barrier signalling',
        detail:
          'Palmitoleic acid and related lipids are discussed in the literature in connection with epithelial resilience and surface comfort.',
      },
      {
        term: 'Nutrient orchestration',
        detail:
          'A coordinated matrix may offer broader biological relevance than an isolated single compound.',
      },
    ],
  },
  {
    id: 'system',
    label: 'System Level',
    intro:
      'The ingredient draws interest not because it belongs to one organ system, but because it appears relevant where tissues, signalling, and recovery processes overlap.',
    bullets: [
      {
        term: 'Skin and mucosal systems',
        detail:
          'Research often explores barrier comfort, hydration support, and tissue integrity across lipid-rich epithelial surfaces.',
      },
      {
        term: 'Immune modulation',
        detail:
          'Ingredient-level evidence suggests relevance to balanced immune function rather than overstimulated responses.',
      },
      {
        term: 'Metabolic steadiness',
        detail:
          'The literature often places Sea Buckthorn within broader discussions of energy steadiness, nutrient handling, and systemic resilience.',
      },
      {
        term: 'Adaptive support',
        detail:
          'Some evidence explores relevance to internal balance and day-to-day resilience, though interpretation should remain ingredient-level and clinically cautious.',
      },
    ],
  },
  {
    id: 'outcome',
    label: 'Outcome Layer',
    intro:
      'CEOVIA presents this biology as a structured support model. The aim is to help practitioners understand how ingredient-level evidence may relate to observable wellbeing patterns over time.',
    bullets: [
      {
        term: 'Visible surface quality',
        detail:
          'Hydration support, barrier comfort, and skin appearance are often the most visible expressions of broader system steadiness.',
      },
      {
        term: 'Steadier daily vitality',
        detail:
          'When biological load is better regulated, daily energy and resilience may feel more even and sustainable.',
      },
      {
        term: 'Recovery readiness',
        detail:
          'Ingredient-level evidence suggests relevance to recovery-oriented processes rather than quick-stimulus effects.',
      },
      {
        term: 'Protocol coherence',
        detail:
          'The 90-day structure is intended to support consistency, observation, and a more disciplined reading of experience over time.',
      },
    ],
  },
]

export const mechanismCallout =
  'This is not framed as supplementation alone. It is a structured support model designed to begin at the membrane level and extend outward across broader systems.'

export const omegas: OmegaRow[] = [
  {
    name: 'Omega-3',
    concentration: 'Present naturally',
    role: 'Studied for its relevance to membrane fluidity, inflammatory balance, and recovery-oriented signalling.',
  },
  {
    name: 'Omega-6',
    concentration: 'Present naturally',
    role: 'Relevant to barrier structure, surface lipid architecture, and broader skin-support physiology.',
  },
  {
    name: 'Omega-7',
    concentration: 'Approx. 40%',
    role: 'A rarer fatty acid discussed in the literature in relation to epithelial support, tissue comfort, and surface resilience.',
  },
  {
    name: 'Omega-9',
    concentration: 'Present naturally',
    role: 'Included within the broader lipid profile that supports whole-system structural and metabolic relevance.',
  },
]

export const bioactiveMatrixLine =
  'This is not a simple formulation. It is a biological matrix whose value comes from how the compounds relate to one another.'

export const bioactives: BioactiveRow[] = [
  { compound: 'Palmitoleic Acid', category: 'Fatty Acid', clinicalRole: 'Studied for epithelial support, surface comfort, and barrier-related resilience.' },
  { compound: 'Alpha-Linolenic Acid', category: 'Essential Lipid', clinicalRole: 'Associated with membrane function and broader inflammatory balance.' },
  { compound: 'Linoleic Acid', category: 'Essential Lipid', clinicalRole: 'Relevant to barrier lipid structure and skin integrity support.' },
  { compound: 'Oleic Acid', category: 'Monounsaturated Lipid', clinicalRole: 'Contributes to the overall lipid environment and cellular flexibility.' },
  { compound: 'Tocopherols', category: 'Vitamin E Complex', clinicalRole: 'Studied for antioxidant support and protection from oxidative load.' },
  { compound: 'Carotenoids', category: 'Phytonutrient', clinicalRole: 'Support antioxidant defence and are frequently discussed in skin-health literature.' },
  { compound: 'Phytosterols', category: 'Plant Sterol', clinicalRole: 'Studied for membrane-related support and systemic inflammatory balance.' },
  { compound: 'Polyphenols', category: 'Phenolic Compounds', clinicalRole: 'Relevant to oxidative buffering and broader cellular protection pathways.' },
  { compound: 'Flavonoids', category: 'Plant Bioactives', clinicalRole: 'Studied for vascular, antioxidant, and adaptive resilience support.' },
  { compound: 'Phospholipids', category: 'Structural Lipid', clinicalRole: 'Important to membrane architecture and transport dynamics.' },
  { compound: 'Trace Minerals', category: 'Micronutrients', clinicalRole: 'Provide cofactors that support biological efficiency and recovery processes.' },
  { compound: 'Amino Acids', category: 'Matrix Components', clinicalRole: 'Contribute to broader structural and signalling context within the extract matrix.' },
  { compound: 'Organic Acids', category: 'Supportive Compounds', clinicalRole: 'Part of the broader ingredient profile linked to metabolic and antioxidant relevance.' },
  { compound: 'Xanthophyll Pigments', category: 'Carotenoid Family', clinicalRole: 'Associated with antioxidant activity and tissue-level protection mechanisms.' },
  { compound: 'Minor Polar Lipids', category: 'Lipid Fraction', clinicalRole: 'Part of the complexity that distinguishes a full-spectrum extract from isolated fractions.' },
]

export const phases: Phase[] = [
  {
    number: 1,
    title: 'Month 1 — Reset',
    description:
      'The first phase is designed around consistency and biological exposure. This period is best framed as foundational rather than outcome-led.',
    outcomeStatement:
      'Early changes may be subtle and are best interpreted as an adjustment period rather than a visible shift.',
  },
  {
    number: 2,
    title: 'Month 2 — Rebuild',
    description:
      'With daily intake established, the middle phase supports the conditions where barrier quality, resilience, and tissue steadiness may become more noticeable.',
    outcomeStatement:
      'This is often the phase where ingredient-level support may begin to feel more coherent across comfort, steadiness, and surface quality.',
  },
  {
    number: 3,
    title: 'Month 3 — Sustain',
    description:
      'The final phase is about reinforcing stability. The protocol encourages observation of durability rather than chasing an early response.',
    outcomeStatement:
      'The goal is a more sustainable pattern of support that fits a structured wellness routine rather than short-cycle use.',
  },
]

export const ninetyDayCallout =
  'The 90-day format is a protocol choice, not a quick-cycle promise. It creates a practical window for consistency, observation, and a more disciplined interpretation of experience.'

export const pillars: Pillar[] = [
  {
    id: 'skin-barrier',
    icon: 'skin',
    title: 'Skin & Barrier Function',
    summary:
      'Ingredient-level research often centres on barrier comfort, hydration support, and visible skin quality.',
    mechanism:
      'The lipid matrix appears relevant to epithelial integrity, surface resilience, and oxidative balance.',
    bioactives:
      'Omega-7, linoleic acid, carotenoids, tocopherols.',
    outcomeStatement:
      'May help support a stronger-looking barrier, greater surface comfort, and more consistent-looking skin over time.',
  },
  {
    id: 'cellular-repair',
    icon: 'repair',
    title: 'Cellular Repair & Recovery',
    summary:
      'The extract is studied for how its matrix may support recovery-oriented biological processes.',
    mechanism:
      'Antioxidant compounds and structural lipids may help maintain a more resilient environment for repair signalling.',
    bioactives:
      'Tocopherols, polyphenols, phospholipids, carotenoids.',
    outcomeStatement:
      'May help support a steadier recovery profile and a more resilient response to everyday stressors.',
  },
  {
    id: 'immune-resilience',
    icon: 'immune',
    title: 'Immune Resilience',
    summary:
      'The literature often discusses Sea Buckthorn in the context of balanced immune support rather than stimulation.',
    mechanism:
      'Its broad matrix may help support balanced immune function and tissue-level resilience.',
    bioactives:
      'Polyphenols, flavonoids, phytosterols, essential fatty acids.',
    outcomeStatement:
      'May help support balanced immune resilience within a broader whole-body support framework.',
  },
  {
    id: 'hormonal-balance',
    icon: 'balance',
    title: 'Adaptive Balance',
    summary:
      'Some ingredient-level research explores internal balance and day-to-day resilience, though claims should remain cautious.',
    mechanism:
      'System-wide lipid and antioxidant support may contribute to a steadier internal environment.',
    bioactives:
      'Omega matrix, phytosterols, carotenoids, trace micronutrients.',
    outcomeStatement:
      'May help support a steadier internal environment relevant to everyday wellbeing.',
  },
]

export const researchStats = [
  { value: '200+', label: 'Peer-reviewed studies' },
  { value: '40+', label: 'Years of clinical research' },
  { value: '6', label: 'Major body systems with documented evidence' },
]

export const researchDomains: ResearchDomain[] = [
  {
    domain: 'Dermatology Research',
    summary:
      'A significant portion of the literature explores skin comfort, barrier function, hydration-related outcomes, and appearance support in connection with Sea Buckthorn bioactives.',
    limitationNote:
      'These findings are ingredient-level and do not on their own establish finished-product outcomes.',
  },
  {
    domain: 'Mucosal & Epithelial Health',
    summary:
      'Research frequently examines tissues that depend on lipid integrity and surface resilience, especially where comfort and barrier quality are relevant.',
    limitationNote:
      'Mechanistic relevance should be interpreted cautiously and not as a direct treatment claim.',
  },
  {
    domain: 'Oxidative Stress & Recovery',
    summary:
      'Antioxidant-rich fractions are studied for their relevance to oxidative balance and recovery-oriented biological conditions.',
    limitationNote:
      'Oxidative support is a broad physiological concept and should not be overstated as a disease-specific claim.',
  },
  {
    domain: 'Immune & Adaptive Resilience',
    summary:
      'The evidence base often frames Sea Buckthorn as relevant to balanced immune function and general resilience rather than stimulation.',
    limitationNote:
      'Evidence should be positioned as supportive and system-oriented, not as proof of immune intervention.',
  },
  {
    domain: 'Metabolic & Whole-Body Vitality',
    summary:
      'Some research discusses broader relevance to energy steadiness, nutrient handling, and whole-body resilience in the context of a complex lipid matrix.',
    limitationNote:
      'These associations remain ingredient-level and require careful compliance framing when translated into brand language.',
  },
]

export const researchDisclaimer =
  'The research described here reflects published ingredient-level evidence surrounding Himalayan Sea Buckthorn and related bioactive fractions. It should not be read as proof of finished-product efficacy for CEOVIA. Clinical judgment and regulatory review remain essential.'

export const partnerProgramme = {
  label: 'Partner Programme',
  title: 'Join the CEOVIA Clinical Partner Network',
  subtext:
    'CEOVIA partners with a selective network of clinics, dermatologists, integrative practitioners, and wellness professionals who share a commitment to evidence-based, whole-body care.',
  dossierPrompt:
    'Receive the full CEOVIA Clinical Dossier — bioactive, mechanism, and evidence documentation for clinical reference.',
}

export const partnerBenefits: string[] = [
  'Clinical dossier access for practitioner reference',
  'Structured protocol education for team alignment',
  'Selective wholesale and professional pricing pathways',
  'Co-branded education support where appropriate',
  'Territory and partner suitability review for distributors',
  'Direct CEOVIA contact for clinical and commercial discussions',
]
