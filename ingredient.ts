// sanity-schemas/ingredient.ts
// CEOVIA — Ingredient entity
// Powers: Science page, RAG responses, Evidence Badges, AI Concierge grounding

export default {
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  icon: () => '🌿',
  fields: [
    // ── IDENTITY ────────────────────────────────────────────────────────────
    {
      name: 'name',
      title: 'Common Name',
      type: 'string',
      description: 'e.g. "Sea Buckthorn Seed Oil"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'scientificName',
      title: 'Scientific Name',
      type: 'string',
      description: 'e.g. "Hippophae rhamnoides"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'inciName',
      title: 'INCI Name',
      type: 'string',
      description: 'International Nomenclature for labelling/EFSA',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },

    // ── CLAIMS & BENEFITS (Layer 1 only — consumer-safe) ────────────────────
    {
      name: 'layer1Claims',
      title: 'Consumer-Safe Claims (Layer 1)',
      description: 'ONLY "supports / helps maintain / designed to support" language. No disease names. Used on homepage and product pages.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(8),
    },

    // ── MECHANISM OF ACTION (Layer 2/3 — professional/science) ──────────────
    {
      name: 'mechanismOfAction',
      title: 'Mechanism of Action Blocks',
      description: 'Used on Science page and Practitioner Portal ONLY. Maximum 3 blocks for AI retrieval optimisation.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'mechanismBlock',
        fields: [
          { name: 'pathway',     type: 'string', title: 'Biological Pathway', description: 'e.g. "Phospholipid Bilayer Repair"' },
          { name: 'description', type: 'text',   title: 'Mechanism Description', rows: 3 },
          { name: 'layer',       type: 'string', title: 'Layer Classification',
            options: { list: [
              { title: 'Layer 2 — Professional', value: 'layer2' },
              { title: 'Layer 3 — Evidence Only', value: 'layer3' },
            ]},
            validation: (Rule) => Rule.required(),
          },
        ],
        preview: { select: { title: 'pathway' } },
      }],
      validation: (Rule) => Rule.max(3).warning('Keep concise for AI retrieval — max 3 mechanism blocks'),
    },

    // ── CLINICAL STUDIES ────────────────────────────────────────────────────
    {
      name: 'clinicalStudies',
      title: 'Clinical Studies',
      description: 'Every study must have a citation, finding, and limitation note. Required for Evidence Badge assignment.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'study',
        fields: [
          { name: 'citation',      type: 'string', title: 'Citation', description: 'e.g. "Chan et al. (2024)"', validation: (Rule) => Rule.required() },
          { name: 'pubmedId',      type: 'string', title: 'PubMed ID or DOI' },
          { name: 'journal',       type: 'string', title: 'Journal Name' },
          { name: 'studyType',     type: 'string', title: 'Study Type',
            options: { list: [
              { title: 'RCT — Peer-Reviewed Human', value: 'rct' },
              { title: 'Meta-Analysis', value: 'meta' },
              { title: 'Cohort Study', value: 'cohort' },
              { title: 'In-Vivo (Animal)', value: 'invivo' },
              { title: 'In-Vitro (Lab)', value: 'invitro' },
              { title: 'Traditional / Historical Use', value: 'traditional' },
            ]},
            validation: (Rule) => Rule.required(),
          },
          { name: 'evidenceBadge', type: 'string', title: 'Evidence Badge Level',
            description: 'Assigned by Compliance Critic Agent based on study type',
            options: { list: [
              { title: '🥇 Gold — Human RCT',         value: 'gold' },
              { title: '🥈 Silver — In-Vivo/In-Vitro', value: 'silver' },
              { title: '🥉 Bronze — Traditional Use',  value: 'bronze' },
              { title: '◇ Hypothesis',                 value: 'hypothesis' },
            ]},
            validation: (Rule) => Rule.required(),
          },
          { name: 'participantCount', type: 'number', title: 'Participant Count (if applicable)' },
          { name: 'dose',            type: 'string', title: 'Dose Used', description: 'e.g. "1,000mg/day"' },
          { name: 'duration',        type: 'string', title: 'Study Duration', description: 'e.g. "90 days"' },
          {
            name: 'finding',
            title: 'Key Finding',
            type: 'text',
            rows: 3,
            description: 'Max 200 characters for AI retrieval optimisation',
            validation: (Rule) => Rule.required().max(200),
          },
          {
            name: 'limitationNote',
            title: 'Limitation Note',
            type: 'text',
            rows: 2,
            description: 'REQUIRED: Always note limitations to avoid regulatory challenge',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'compliantFraming',
            title: 'Compliant Consumer Framing',
            type: 'text',
            rows: 3,
            description: 'Layer 1 safe version of this finding — no disease names, "supports" language only',
          },
        ],
        preview: {
          select: { title: 'citation', subtitle: 'evidenceBadge' },
          prepare({ title, subtitle }) {
            const badge = { gold: '🥇', silver: '🥈', bronze: '🥉', hypothesis: '◇' }[subtitle] || '—';
            return { title: `${badge} ${title}` };
          },
        },
      }],
    },

    // ── BIOACTIVE PROFILE ───────────────────────────────────────────────────
    {
      name: 'bioactiveProfile',
      title: 'Bioactive Profile',
      type: 'array',
      of: [{
        type: 'object',
        name: 'bioactive',
        fields: [
          { name: 'compound',      type: 'string', title: 'Compound Name', description: 'e.g. "Omega-7 (Palmitoleic Acid)"' },
          { name: 'concentration', type: 'string', title: 'Concentration', description: 'e.g. "~40%"' },
          { name: 'benefit',       type: 'string', title: 'Layer 1 Benefit Statement' },
          { name: 'mechanism',     type: 'text',   title: 'Layer 2/3 Mechanism (Science page only)', rows: 2 },
        ],
        preview: { select: { title: 'compound', subtitle: 'concentration' } },
      }],
    },

    // ── APPROVED CLAIMS REGISTRY ─────────────────────────────────────────────
    {
      name: 'approvedClaims',
      title: 'Approved Claims by Market',
      description: 'Claims validated for each regulatory market. The AI Concierge ONLY uses claims from this list.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'marketClaim',
        fields: [
          { name: 'market',    type: 'string', title: 'Market',
            options: { list: [
              { title: 'USA (FDA)', value: 'usa' },
              { title: 'EU (EFSA)', value: 'eu' },
              { title: 'UAE (MOH)', value: 'uae' },
              { title: 'UK (MHRA)', value: 'uk' },
              { title: 'Saudi Arabia (SFDA)', value: 'sa' },
              { title: 'Global (All Markets)', value: 'global' },
            ]},
          },
          { name: 'claim',     type: 'text', title: 'Approved Claim Text', rows: 2 },
          { name: 'layer',     type: 'string', title: 'Layer',
            options: { list: [
              { title: 'Layer 1 — Consumer', value: 'layer1' },
              { title: 'Layer 2 — Professional', value: 'layer2' },
              { title: 'Layer 3 — Evidence Only', value: 'layer3' },
            ]},
          },
          { name: 'status',    type: 'string', title: 'Approval Status',
            options: { list: [
              { title: '✅ Approved', value: 'approved' },
              { title: '🔄 Under Review', value: 'review' },
              { title: '❌ Rejected', value: 'rejected' },
            ]},
          },
          { name: 'approvedBy',   type: 'string', title: 'Approved By (name/role)' },
          { name: 'approvedDate', type: 'date',   title: 'Approval Date' },
        ],
        preview: {
          select: { title: 'market', subtitle: 'claim', media: 'status' },
        },
      }],
    },

    // ── RELATED ENTITIES ─────────────────────────────────────────────────────
    {
      name: 'relatedProducts',
      title: 'Products Containing This Ingredient',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'relatedConcerns',
      title: 'Health Concerns This Addresses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Occasion tags for AISO — e.g. "skin hydration", "joint comfort", "immune resilience"',
    },

    // ── SEO & AEO ────────────────────────────────────────────────────────────
    {
      name: 'seoTitle',     type: 'string', title: 'SEO Title' },
    { name: 'seoDescription', type: 'text',   title: 'SEO Meta Description', rows: 2,
      validation: (Rule) => Rule.max(160) },
    { name: 'aeoFAQBlocks',
      title: 'AEO — FAQ Blocks for AI Citation',
      description: 'Structured Q&A for ChatGPT/Perplexity/Gemini citation optimisation',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', title: 'Question' },
          { name: 'answer',   type: 'text',   title: 'Answer (Layer 1 language)', rows: 3 },
        ],
      }],
    },
  ],

  preview: {
    select: { title: 'name', subtitle: 'scientificName' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `🌿 ${subtitle || ''}` };
    },
  },
};
