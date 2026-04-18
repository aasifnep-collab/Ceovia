// sanity-schemas/product.ts
export const product = {
  name: 'product', title: 'Product', type: 'document', icon: () => '💊',
  fields: [
    { name: 'name',        type: 'string', title: 'Product Name', validation: (R) => R.required() },
    { name: 'slug',        type: 'slug',   title: 'Slug', options: { source: 'name' }, validation: (R) => R.required() },
    { name: 'shopifyId',   type: 'string', title: 'Shopify Product ID' },
    { name: 'tagline',     type: 'string', title: 'Dynamic Tagline', description: 'Changes per variant — e.g. "A complete system designed for consistency."' },

    // Variants (30-day / 60-day / 90-day / Subscription)
    { name: 'variants', title: 'Purchase Variants', type: 'array',
      of: [{ type: 'object', name: 'variant', fields: [
        { name: 'label',          type: 'string', title: 'Label', description: 'e.g. "90-Day System"' },
        { name: 'shopifyVariantId', type: 'string', title: 'Shopify Variant ID' },
        { name: 'capsules',       type: 'number', title: 'Capsules' },
        { name: 'days',           type: 'number', title: 'Supply Days' },
        { name: 'priceAED',       type: 'number', title: 'Price (AED)' },
        { name: 'priceUSD',       type: 'number', title: 'Price (USD)' },
        { name: 'priceGBP',       type: 'number', title: 'Price (GBP)' },
        { name: 'priceEUR',       type: 'number', title: 'Price (EUR)' },
        { name: 'perDayCost',     type: 'string', title: 'Per-Day Cost (display)', description: 'e.g. "$2.50/day"' },
        { name: 'isRecommended',  type: 'boolean', title: 'Show "Recommended" Badge?' },
        { name: 'tagline',        type: 'string', title: 'Variant-Specific Tagline' },
        { name: 'subscriptionSave', type: 'string', title: 'Subscription Saving', description: 'e.g. "Save 20% — AED 660/month"' },
      ], preview: { select: { title: 'label', subtitle: 'days' }, prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}-day supply` }) } }],
    },

    // Layer 1 benefits (consumer-facing)
    { name: 'layer1Benefits', title: 'Key Benefits (Layer 1 — Consumer)', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'benefit',  type: 'string', title: 'Benefit Statement', description: 'Must use "supports/helps maintain/designed to support" language only' },
        { name: 'studyRef', type: 'string', title: 'Study Reference (links to Evidence Library)', description: 'e.g. "Chan et al. (2024)" — does NOT appear in consumer copy but powers Science page link' },
      ]}],
    },

    // 90-Day Phase Descriptions
    { name: 'phases', title: '90-Day Phase Descriptions', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'phase',          type: 'string', title: 'Phase Name', description: 'e.g. "Reset"' },
        { name: 'days',           type: 'string', title: 'Days Range', description: 'e.g. "1–30"' },
        { name: 'consumerCopy',   type: 'text', title: 'Consumer Description (Layer 1)', rows: 3 },
        { name: 'checkpointNote', type: 'string', title: 'Checkpoint Note', description: 'e.g. "Take your Day 30 photo."' },
      ], preview: { select: { title: 'phase', subtitle: 'days' } } }],
    },

    // Usage protocol
    { name: 'usageProtocol', title: 'Usage Protocol', type: 'object', fields: [
      { name: 'capsulesPerDay', type: 'number', title: 'Capsules Per Day' },
      { name: 'timing',        type: 'string', title: 'Timing Instruction', description: 'e.g. "With breakfast or a light meal containing healthy fats"' },
      { name: 'minimumDays',   type: 'number', title: 'Minimum Duration (days)' },
      { name: 'maxSafeDose',   type: 'string', title: 'Maximum Safe Dose', description: 'e.g. "Up to 4 capsules/day (2,000mg)"' },
    ]},

    // Compliance
    { name: 'disclaimer', title: 'Required Disclaimer', type: 'text', rows: 3,
      description: 'Non-negotiable — must appear on all product pages',
      validation: (R) => R.required(),
    },
    { name: 'markets', title: 'Available Markets', type: 'array',
      of: [{ type: 'string', options: { list: ['usa','eu','uae','uk','sa','global'] } }],
    },

    // Related
    { name: 'ingredients', title: 'Key Ingredients', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ingredient' }] }],
    },
  ],
  preview: { select: { title: 'name' }, prepare: ({ title }) => ({ title, subtitle: '💊 Product' }) },
};


// ─────────────────────────────────────────────────────────────────────────────
// sanity-schemas/claim.ts
// The Compliance Critic Agent pulls from this registry to validate all content.
// ─────────────────────────────────────────────────────────────────────────────
export const claim = {
  name: 'claim', title: 'Approved Claim', type: 'document', icon: () => '✅',
  fields: [
    { name: 'text',       type: 'text', title: 'Claim Text', rows: 2, validation: (R) => R.required() },
    { name: 'category',   type: 'string', title: 'Category',
      options: { list: ['skin','immunity','cardiovascular','cognitive','digestive','hormonal','energy','joint','eye','hair'] },
    },
    { name: 'layer',      type: 'string', title: 'Layer Classification',
      options: { list: [
        { title: 'Layer 1 — Consumer-Safe', value: 'layer1' },
        { title: 'Layer 2 — Professional',  value: 'layer2' },
        { title: 'Layer 3 — Evidence Only', value: 'layer3' },
      ]},
      validation: (R) => R.required(),
    },
    { name: 'status',     type: 'string', title: 'Status',
      options: { list: [
        { title: '✅ Approved', value: 'approved' },
        { title: '🔄 Under Review', value: 'review' },
        { title: '❌ Rejected', value: 'rejected' },
        { title: '🚫 Prohibited — Auto-Block', value: 'prohibited' },
      ]},
      validation: (R) => R.required(),
    },
    { name: 'applicableMarkets', type: 'array',
      title: 'Approved Markets',
      of: [{ type: 'string', options: { list: ['usa','eu','uae','uk','sa','global'] } }],
    },
    { name: 'evidenceBadge', type: 'string', title: 'Evidence Level',
      options: { list: [
        { title: '🥇 Gold — Human RCT',        value: 'gold' },
        { title: '🥈 Silver — In-Vivo/Vitro',  value: 'silver' },
        { title: '🥉 Bronze — Traditional Use', value: 'bronze' },
        { title: '◇ Hypothesis',               value: 'hypothesis' },
      ]},
    },
    { name: 'sourceStudy',   type: 'string',  title: 'Source Study Citation' },
    { name: 'approvedBy',    type: 'string',  title: 'Approved By' },
    { name: 'approvedDate',  type: 'date',    title: 'Approval Date' },
    { name: 'notes',         type: 'text',    title: 'Internal Notes', rows: 2 },
  ],
  preview: {
    select: { title: 'text', subtitle: 'layer', status: 'status' },
    prepare: ({ title, subtitle, status }) => {
      const icon = { approved: '✅', review: '🔄', rejected: '❌', prohibited: '🚫' }[status] || '—';
      return { title: `${icon} ${title?.slice(0, 60)}…`, subtitle };
    },
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// sanity-schemas/marketRule.ts
// Drives market-specific filtering in the Compliance Critic Agent.
// ─────────────────────────────────────────────────────────────────────────────
export const marketRule = {
  name: 'marketRule', title: 'Market Rule', type: 'document', icon: () => '🌍',
  fields: [
    { name: 'marketCode', type: 'string', title: 'Market Code',
      options: { list: [
        { title: 'USA — FDA', value: 'usa' },
        { title: 'EU — EFSA', value: 'eu' },
        { title: 'UAE — MOH', value: 'uae' },
        { title: 'UK — MHRA', value: 'uk' },
        { title: 'Saudi Arabia — SFDA', value: 'sa' },
      ]},
      validation: (R) => R.required(),
    },
    { name: 'currency',           type: 'string', title: 'Currency Code', description: 'e.g. "AED"' },
    { name: 'currencySymbol',     type: 'string', title: 'Currency Symbol', description: 'e.g. "AED"' },
    { name: 'regulatoryFramework', type: 'string', title: 'Regulatory Framework', description: 'e.g. "FDA 21 CFR Part 101"' },
    { name: 'mandatoryDisclaimer', type: 'text', title: 'Mandatory Disclaimer', rows: 3, validation: (R) => R.required() },
    { name: 'prohibitedTerms', title: 'Prohibited Terms for This Market', type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'requiredLanguages', title: 'Required Content Languages', type: 'array',
      of: [{ type: 'string', options: { list: ['en','ar','fr','de','es'] } }],
    },
    { name: 'arabicContentRequired', type: 'boolean', title: 'Arabic Content Required?', initialValue: false },
    { name: 'halalCertRequired',     type: 'boolean', title: 'Halal Cert Display Required?', initialValue: false },
    { name: 'influencerDisclosure',  type: 'text', title: 'Influencer Disclosure Requirement', rows: 2 },
    { name: 'notes',                 type: 'text', title: 'Internal Compliance Notes', rows: 3 },
  ],
  preview: {
    select: { title: 'marketCode', subtitle: 'regulatoryFramework' },
    prepare: ({ title, subtitle }) => ({ title: `🌍 ${title?.toUpperCase()}`, subtitle }),
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// sanity-schemas/blogPost.ts
// SEO Content Agent produces drafts. Compliance Critic scores before publish.
// ─────────────────────────────────────────────────────────────────────────────
export const blogPost = {
  name: 'blogPost', title: 'Blog Post', type: 'document', icon: () => '📝',
  fields: [
    { name: 'title',    type: 'string', title: 'Title', validation: (R) => R.required() },
    { name: 'slug',     type: 'slug',   title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() },
    { name: 'excerpt',  type: 'text', title: 'Excerpt / Meta Description', rows: 2,
      validation: (R) => R.required().max(160),
    },

    // Layer Classification — ENFORCED
    { name: 'layerClassification', type: 'string', title: 'Content Layer',
      description: 'CRITICAL: This determines which pages this content can appear on.',
      options: { list: [
        { title: 'Layer 1 — Consumer (Homepage, Product, Social, Ads)', value: 'layer1' },
        { title: 'Layer 2 — Professional (Practitioner Portal, B2B)',   value: 'layer2' },
        { title: 'Layer 3 — Evidence Only (Science Page, Dossier)',     value: 'layer3' },
      ]},
      validation: (R) => R.required(),
    },

    // Compliance Score (set by Compliance Critic Agent)
    { name: 'complianceScore', type: 'number', title: 'Compliance Score (0–100)',
      description: 'Set by Compliance Critic Agent. 95–100 = Direct Pass, 80–94 = Auto-Fix, <80 = Flag for Review',
      validation: (R) => R.min(0).max(100),
    },
    { name: 'complianceStatus', type: 'string', title: 'Compliance Status',
      options: { list: [
        { title: '✅ Direct Pass (95–100)', value: 'pass' },
        { title: '🟡 Auto-Fixed (80–94)',   value: 'fixed' },
        { title: '🔴 Flagged (<80)',         value: 'flagged' },
        { title: '⏳ Pending Review',        value: 'pending' },
      ]},
    },
    { name: 'complianceViolations', type: 'array', title: 'Compliance Violation Log',
      of: [{ type: 'string' }],
    },

    // Content
    { name: 'body', type: 'array', title: 'Body Content',
      of: [
        { type: 'block' },
        { type: 'object', name: 'evidenceBlock', title: 'Evidence Block',
          fields: [
            { name: 'citation',     type: 'string', title: 'Study Citation' },
            { name: 'finding',      type: 'text',   title: 'Finding', rows: 2 },
            { name: 'badge',        type: 'string', title: 'Evidence Badge',
              options: { list: ['gold','silver','bronze','hypothesis'] },
            },
            { name: 'limitationNote', type: 'string', title: 'Limitation Note' },
          ],
        },
      ],
    },

    // AISO — Occasion Tagging
    { name: 'occasionTags', title: 'AISO — Occasion Tags', type: 'array',
      description: 'Life scenarios for AI search optimisation (ChatGPT, Perplexity, Gemini)',
      of: [{ type: 'object', name: 'occasionTag', fields: [
        { name: 'scenario',        type: 'string', title: 'Life Scenario', description: 'e.g. "Skin hydration during air travel"' },
        { name: 'triggerKeywords', type: 'array',  title: 'Trigger Keywords', of: [{ type: 'string' }] },
        { name: 'targetQuery',     type: 'string', title: 'Target AI Query', description: 'e.g. "What to take for dry skin on long flights"' },
        { name: 'recommendedProduct', type: 'string', title: 'Recommended Product Variant' },
      ], preview: { select: { title: 'scenario' } } }],
    },

    // AEO
    { name: 'faqBlocks', title: 'FAQ Blocks for Featured Snippets', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'question', type: 'string', title: 'Question' },
        { name: 'answer',   type: 'text',   title: 'Answer (Layer 1 language)', rows: 3 },
      ]}],
    },

    // Metadata
    { name: 'disclaimer',        type: 'boolean', title: 'Mandatory Disclaimer Included?', initialValue: false,
      validation: (R) => R.required(),
    },
    { name: 'applicableMarkets', type: 'array', title: 'Approved Markets',
      of: [{ type: 'string', options: { list: ['usa','eu','uae','uk','sa','global'] } }],
    },
    { name: 'author',            type: 'string', title: 'Author' },
    { name: 'publishedAt',       type: 'datetime', title: 'Published At' },
    { name: 'approvedBy',        type: 'string',   title: 'Approved By' },
    { name: 'approvedAt',        type: 'datetime', title: 'Approval Date' },

    // SEO
    { name: 'seoTitle',          type: 'string', title: 'SEO Title' },
    { name: 'seoDescription',    type: 'text', title: 'SEO Description', rows: 2,
      validation: (R) => R.max(160),
    },
    { name: 'featuredImage',     type: 'image', title: 'Featured Image',
      options: { hotspot: true },
    },
    { name: 'relatedIngredients', type: 'array', title: 'Related Ingredients',
      of: [{ type: 'reference', to: [{ type: 'ingredient' }] }],
    },
  ],
  orderings: [
    { title: 'Published Date (newest)', name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    { title: 'Compliance Score', name: 'complianceScoreDesc',
      by: [{ field: 'complianceScore', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'complianceStatus', media: 'featuredImage' },
    prepare: ({ title, subtitle, media }) => {
      const icon = { pass: '✅', fixed: '🟡', flagged: '🔴', pending: '⏳' }[subtitle] || '📝';
      return { title: `${icon} ${title}`, media };
    },
  },
};
