# CEOVIA — Claude / Codex Prompt Guide
## How to Build the Website in VS Code Using AI

This guide tells you exactly what prompts to give Claude or Codex at each step.
Copy the prompts. Paste them. The output will match the CEOVIA blueprint.

---

## SECTION 1 — PROJECT SCAFFOLD

### Prompt 1A: Initialise the Project

```
Create a new Next.js 15 project with the following configuration:
- App Router (not Pages Router)
- TypeScript 5.4
- Tailwind CSS 3.4
- src/ directory structure
- ESLint + Prettier
- Install: @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
- Install: @sanity/client next-sanity
- Install: @shopify/hydrogen (for Shopify Plus)
- Install: framer-motion (for scroll animations)
- Install: next/font (for Cormorant Garamond + DM Sans)

After scaffolding, copy the provided tailwind.config.js into the project root (replacing the default).
```

### Prompt 1B: Font Setup

```
In src/app/layout.tsx, configure next/font to load:
1. Cormorant_Garamond from Google Fonts:
   - weights: ['300', '400', '500', '600', '700']
   - styles: ['normal', 'italic']
   - subsets: ['latin']
   - variable: '--font-display'
   
2. DM_Sans from Google Fonts:
   - weights: ['300', '400', '500', '600']
   - subsets: ['latin']
   - variable: '--font-sans'

Apply both font variables to the html element.
Update tailwind.config.js fontFamily to use var(--font-display) for 'display'
and var(--font-sans) for 'sans'.
```

### Prompt 1C: Project Directory Structure

```
Create the following directory structure for the CEOVIA project:

src/
  app/
    (marketing)/          # Public marketing pages
      page.tsx            # Homepage
      products/
        [handle]/
          page.tsx        # Product page
      90-day-system/
        page.tsx
      science/
        page.tsx
      blog/
        page.tsx
        [slug]/
          page.tsx
      for-clinics/
        page.tsx
      for-distributors/
        page.tsx
      about/
        page.tsx
      faq/
        page.tsx
    (checkout)/           # Checkout flow
    (pro)/                # Gated practitioner portal
      practitioners/
        page.tsx
    api/
      ai/
        chat/
          route.ts        # Smart Chat Agent endpoint
        compliance/
          route.ts        # Compliance Critic scoring endpoint
      webhooks/
        shopify/
          route.ts
  components/
    ui/                   # Primitive UI components
      Button.tsx
      Badge.tsx
      EvidenceBadge.tsx
      Card.tsx
      Accordion.tsx
      Modal.tsx
    layout/
      Navbar.tsx
      Footer.tsx
      TrustBar.tsx        # Scrolling certification ticker
    sections/             # Page section components
      Hero.tsx
      Benefits.tsx
      NinetyDaySystem.tsx
      ProgramSelector.tsx
      WhyItWorks.tsx
      TrustAndQuality.tsx
      ScienceCTA.tsx
      ProfessionalCTA.tsx
    product/
      VariantSelector.tsx
      ProductHero.tsx
      IngredientScience.tsx
      FAQ.tsx
    compliance/
      DisclaimerBlock.tsx
      EvidenceBadge.tsx
      LayerTag.tsx        # Visual indicator of content layer
  lib/
    sanity/
      client.ts
      queries.ts
    shopify/
      client.ts
      cart.ts
    ai/
      middleware.ts       # Governance context builder
      compliance.ts       # Compliance Critic logic
    utils/
      geo.ts              # Market detection
      formatting.ts
  types/
    ceovia.ts             # TypeScript types for all entities
```

---

## SECTION 2 — HOMEPAGE

### Prompt 2A: Hero Section

```
Build the CEOVIA homepage Hero section as a React Server Component.

Brand context:
- Premium wellness supplement brand. Himalayan Sea Buckthorn seed oil. 
- Tone: luxury skincare brand, NOT a supplement. Zero clinical language above the fold.
- Visual: full-bleed background (dark forest green #1A4731 or cream #F7F4EE — choose one based on impact)
- Font: Cormorant Garamond for headline, DM Sans for subheadline and CTAs

Exact content:
- Headline: "Rejuvenation From Within"
- Subheadline: "A clinically structured 90-day system designed to support skin, energy, and overall wellness."
- Primary CTA: "Start Your 90-Day System" (links to /products/ceovia-90-day)
- Secondary CTA: "Learn the Science" (links to /science)
- Trust signals below CTA: three pills — "190+ Bioactive Compounds" | "90-Day Clinical System" | "5-Market Global Architecture"

Requirements:
- Hero image: accept a heroImage prop (next/image)
- Animated entry: headline fades up with 0.6s delay, subheadline at 0.8s, CTAs at 1s
- Primary CTA: bg-ceovia-green text-white hover:bg-ceovia-green-700 shadow-cta
- Secondary CTA: border border-ceovia-green text-ceovia-green hover:bg-ceovia-cream
- Mobile: single column, CTA full-width, thumb-zone placement (bottom 40% viewport)
- Desktop: centered or two-column with product imagery right
- NO ingredient names. NO percentages. NO science terms. Layer 1 language ONLY.
```

### Prompt 2B: Program Selector (Choose Your Program)

```
Build the ProgramSelector component for the CEOVIA homepage.

Display 3 purchase options as cards:

1. "30-Day Starter" — AED 275 / $75 USD — "A simple starting point for daily wellness support." — NOT recommended
2. "90-Day System ⭐ Recommended" — AED 825 / $225 USD — "The complete clinical system." — VISUALLY ELEVATED with "Recommended" badge, larger card, ceovia-gold border
3. "Subscription Plan" — AED 440 / $120/month — "Save 20%. Pause anytime." — Secondary positioning

Requirements:
- 90-day card is pre-selected by default
- Selecting a card updates a per-day cost display below: "That's just $2.50/day — less than a coffee"
- "Start Your System" CTA below the cards — links to /products/ceovia-[selected-variant]
- Display price in both AED and USD (geo-detect market, default to AED for UAE/GCC, USD for global)
- Tailwind only. No external UI libraries.
- Framer Motion for card selection animation (scale 1.02 on selected)
- Show subscription saving prominently: "Save 20% — cancel anytime"
```

### Prompt 2C: Trust Bar (Scrolling Certification Ticker)

```
Build a TrustBar component that scrolls horizontally.

Items to display (repeat twice for infinite scroll illusion):
- "🌿 190+ Bioactive Compounds"
- "🏭 WHO cGMP Certified"
- "☪️ Halal Certified"
- "🇺🇸 Made in USA"
- "🔬 Supercritical CO₂ Extracted"
- "🧪 Third-Party Tested"
- "🌱 Non-GMO Verified"
- "📋 No Fillers, No Binders"

Requirements:
- CSS animation using keyframes: ticker 30s linear infinite
- Pause on hover
- Separator between items: "·" in ceovia-gold
- Background: ceovia-green-600, text: white
- Font: DM Sans 0.8125rem font-medium tracking-wider uppercase
- Full-width strip, 40px height
- Accessible: aria-label="CEOVIA product certifications"
```

---

## SECTION 3 — PRODUCT PAGE

### Prompt 3A: Variant Selector with Dynamic Content

```
Build the VariantSelector component for the CEOVIA product page.

Variants data structure (passed as prop):
[
  { id: '30day', label: '30-Day Starter', capsules: 60, days: 30, priceAED: 275, priceUSD: 75, tagline: 'Daily wellness support in a simple routine.' },
  { id: '60day', label: '60-Day Program', capsules: 120, days: 60, priceAED: 550, priceUSD: 150, tagline: 'One complete box. Best entry into the CEOVIA system.', isRecommended: true },
  { id: '90day', label: '90-Day System', capsules: 180, days: 90, priceAED: 825, priceUSD: 225, tagline: 'The complete clinical system. Structured across three phases: Reset, Restore, Optimize.' },
  { id: 'subscription', label: 'Subscription Plan', capsules: 120, days: 60, priceAED: 440, priceUSD: 120, tagline: 'Monthly delivery. Save 20%. Cancel anytime.', isSub: true },
]

Requirements:
- Default selected: '90day'
- On selection change: update displayed tagline, price, per-day cost, and CTA text
- "Recommended" badge on 90day: ceovia-gold border + "⭐ Recommended" label
- Per-day framing: calculate and display dynamically — "That's AED [x] / $[x] per day"
- Subscription delta: show "You save 20%" for subscription option
- Add to Cart CTA: "Start Your [X]-Day System" or "Subscribe & Save 20%"
- Sticky variant selector on scroll (desktop: stays in viewport)
- Zero mismatch tolerance: tagline, price, CTA all update atomically
```

### Prompt 3B: Evidence Badge Component

```
Build a reusable EvidenceBadge component.

Props: type ('gold' | 'silver' | 'bronze' | 'hypothesis'), citation?: string, onClick?: () => void

Visual design:
- Gold   (#C9A961): "● Peer-Reviewed Human RCT"
- Silver (#87A878): "○ In-Vivo / In-Vitro Studies"  
- Bronze (#C4956A): "△ Traditional / Historical Use"
- Hypothesis (#9CA3AF): "◇ Mechanism Proposed"

Each badge: pill shape, 10px font, icon + text, optional click to reveal citation tooltip
Tooltip on click: show study name, year, finding (max 200 chars), limitation note
Animation: subtle pulse animation ('badge-pulse') to draw attention in science contexts
Accessible: role="button" when clickable, aria-label describing the evidence type
```

---

## SECTION 4 — COMPLIANCE API ENDPOINT

### Prompt 4A: Compliance Critic Agent Route

```
Build a Next.js API route at src/app/api/ai/compliance/route.ts

This is the Compliance Critic Agent. It receives content text and returns a compliance score.

Input (POST body):
{
  content: string,    // The content to scan
  layer: 'layer1' | 'layer2' | 'layer3',  // Target layer
  market: string      // Target market code (usa/eu/uae/uk/sa)
}

Logic:
1. Check for PROHIBITED terms (score immediately below 80 if found):
   - Medical/drug verbs: treats, cures, heals, prevents, reverses
   - Clinical descriptors: immunomodulatory, neuroprotective, anti-tumor
   - Condition names: arthritis, hepatitis, dementia, melasma, ulcers
   - Pathogens: herpes, influenza, E. coli, adenoviruses, diphtheria
   - Drug-like verbs: boosts, stimulates, controls, halts, arrests (as primary claim verbs)
   
2. Check for YELLOW FLAG terms (reduce score by 5 per occurrence if score >= 80):
   - "boosts" (as standalone claim)
   - "improves" without qualifier
   - "increases" without qualifier
   - Any percentage claim without study anchor

3. Check for POSITIVE signals (increase score):
   - Uses "supports" / "helps maintain" / "designed to support" (+5 each)
   - Includes mandatory disclaimer (+10)
   - Layer 2/3 content on correct pages (+5)
   - No disease names (+10)
   
4. Scoring:
   - Start at 70
   - Apply checks above
   - Cap at 100

5. Return:
{
  score: number,
  status: 'pass' | 'fixed' | 'flagged',
  violations: string[],     // List of specific violations found
  suggestions: string[],    // Auto-fix suggestions
  autoFixedContent?: string // If status is 'fixed', return the auto-corrected text
}

Auto-fix replacements:
"treats" → "supports"
"cures" → "is designed to support"
"prevents" → "helps maintain"
"boosts" → "supports"
"immunomodulatory" → "designed to support your body's natural resilience"
"neuroprotective" → "supports healthy brain and nervous system function"
```

---

## SECTION 5 — SMART CHAT AGENT

### Prompt 5A: Chat API Route

```
Build a Next.js API route at src/app/api/ai/chat/route.ts

This is the CEOVIA Smart Chat Agent (Phase 1 — Website).

System behaviour:
- Role: Premium wellness concierge, NOT a general AI assistant
- Scope: Product questions, 90-day system explanation, pricing, qualification, human handoff
- Out of scope: Medical advice, diagnosis, drug interactions, regulatory statements

System prompt to send to OpenAI:
"You are the CEOVIA Smart Chat concierge. You help visitors understand CEOVIA's 
90-day Sea Buckthorn seed oil system, qualify their needs, and guide them toward 
the right program. You ONLY use approved claims from context. You NEVER diagnose, 
treat, or provide medical advice. You always use 'supports,' 'helps maintain,' or 
'designed to support' language. You never use disease names in consumer responses. 
If asked a medical question, you say: 'For specific health concerns, I recommend 
speaking with your healthcare provider. I can tell you about how CEOVIA supports 
general wellness.' If the user mentions a specific drug or medication, immediately 
offer to connect them with a specialist.

Available product context:
- CEOVIA 90-Day System: 180 softgel capsules (1.5 boxes), AED 825 / $225 USD
- Contains supercritical CO₂ extracted Himalayan Sea Buckthorn seed oil
- 190+ bioactive compounds including Omega 3, 6, 7, 9
- Take 2 capsules daily with a meal containing healthy fats
- 3 phases: Reset (days 1-30), Restore (days 31-60), Optimize (days 61-90)
- Approved claims: supports skin hydration, helps maintain energy, supports joint comfort,
  supports immune function, supports cardiovascular health, supports digestive ease,
  supports hormonal balance, supports cognitive clarity"

Implementation:
- Use OpenAI GPT-4o-mini (cost-efficient for chat)
- Temperature: 0.3 (some warmth but controlled)
- Max tokens: 400
- Stream response using ReadableStream
- Log all interactions to PostgreSQL for compliance audit trail (7-year retention)
- Trigger human handoff flag if: medical question detected, drug name mentioned, negative sentiment, B2B inquiry
```

---

## SECTION 6 — NAVIGATION

### Prompt 6A: Main Navigation

```
Build the CEOVIA Navbar component.

Logo: Ceovia wordmark (left-aligned) + tagline "Revitalization, Restoration & Rejuvenation" below it

Navigation items:
Left side (main nav):
- For Consumers → links to / (homepage)
- For Clinics → links to /for-clinics
- For Distributors → links to /for-distributors
- Science → links to /science

Right side:
- Blog (text link)
- Search icon
- Cart icon (with item count badge from Shopify)
- "Start 90-Day System" (primary CTA button — ceovia-green background)

Requirements:
- Sticky on scroll — shrinks slightly and adds backdrop blur after 60px scroll
- Mobile: hamburger menu, drawer from right, full-width links
- Active state: gold underline on current page
- B2B nav items ("For Clinics", "For Distributors") are EXPLICIT text links — NOT hidden in dropdowns
- Transparent on hero sections, solid white below
- Font: DM Sans medium, 14px, tracking-wide
- CTA button: rounded-pill, py-2 px-5, shadow-cta, hover:shadow-cta-hover
```

---

## SECTION 7 — PAGE-LEVEL COMMANDS

### Prompt 7A: Full Homepage Assembly

```
Assemble the complete CEOVIA homepage at src/app/(marketing)/page.tsx

Import and render these sections in this exact order:
1. <Hero /> — full-bleed, dark green or cream background
2. <TrustBar /> — scrolling certification ticker
3. <Benefits /> — "What You Can Expect" — 4 benefit cards
4. <NinetyDaySystem /> — 3-phase Reset/Restore/Optimize timeline
5. <ProgramSelector /> — 30/60/90-day + subscription cards  
6. <WhyItWorks /> — ingredient story (Layer 1 — no mechanism language)
7. <TrustAndQuality /> — certifications, GMP, Halal, CO₂ extraction
8. <ScienceCTA /> — "Backed by Research" bridge section
9. <ProfessionalCTA /> — "For Professionals" separate section

All sections: scroll-triggered fade-up animation (IntersectionObserver)
Page background: #F7F4EE (ceovia-cream)
No clinical/mechanism language on this page. Layer 1 ONLY throughout.
Include mandatory disclaimer in page footer.
```

### Prompt 7B: Quick Compliance Check Before Committing

```
Before I commit this content, check it against CEOVIA's compliance rules:

[PASTE CONTENT HERE]

Check for:
1. Any disease names (arthritis, hepatitis, dementia, melasma, eczema, etc.)
2. Drug-like verbs (treats, cures, prevents, heals, reverses, boosts as primary claim)
3. Clinical descriptors (immunomodulatory, neuroprotective, anti-tumor)
4. Named pathogens (herpes, influenza, E. coli)
5. Mechanism claims on consumer-facing copy (collagen synthesis, NF-κB, etc.)

Return: compliance score, violations list, and a rewritten version using approved language.
Target layer: Layer 1 (Consumer)
```

---

## SECTION 8 — ENVIRONMENT VARIABLES

Create a `.env.local` file with these keys (fill values from your accounts):

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Shopify Plus
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=ceovia.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_ADMIN_ACCESS_TOKEN=

# OpenAI
OPENAI_API_KEY=

# Database
DATABASE_URL=

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# HubSpot
HUBSPOT_API_KEY=

# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WEBHOOK_SECRET=

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=

# Algolia
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=
```

---

## SECTION 9 — DAILY BUILD WORKFLOW

Use this workflow every development session:

```
Morning Start:
1. Open VS Code
2. Run: npm run dev
3. Open: http://localhost:3000

When building a new component:
- Prompt Claude: "Build the [ComponentName] component for CEOVIA following the 
  design system in tailwind.config.js. Use Cormorant Garamond for display text, 
  DM Sans for body. Brand green: #1A4731. Gold accent: #C9A961. Cream background: 
  #F7F4EE. Layer 1 language only — no disease names, no mechanism claims."

Before committing content:
- Run Prompt 7B compliance check on any copy
- Verify: no disease names, no drug verbs, "supports/helps maintain" language only

When stuck on a bug:
- Prompt Codex: "Debug this Next.js 15 component. The issue is [describe]. 
  Here is the code: [paste code]"
```

---

## SECTION 10 — SANITY STUDIO SETUP

```
Install and configure Sanity Studio:

npm create sanity@latest -- --project [YOUR_PROJECT_ID] --dataset production --template clean

Then copy these schema files into sanity/schemas/:
- ingredient.ts
- content-schemas.ts (exports product, claim, marketRule, blogPost)

In sanity.config.ts, register all schemas:
import { ingredient } from './schemas/ingredient'
import { product, claim, marketRule, blogPost } from './schemas/content-schemas'

export default defineConfig({
  name: 'ceovia',
  title: 'CEOVIA Content Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [ingredient, product, claim, marketRule, blogPost] },
})
```

---

## QUICK REFERENCE — CEOVIA DESIGN TOKENS

| Token | Value | Use |
|-------|-------|-----|
| Brand Green | `#1A4731` | Primary CTA, headings, nav |
| Gold Accent | `#C9A961` | Evidence badges, underlines, recommended badge |
| Amber | `#E07B28` | Hover states, warm accents |
| Cream BG | `#F7F4EE` | Page background |
| Warm Card | `#EDE8DF` | Card backgrounds |
| Dark Text | `#1C1C1C` | Body copy |
| Display Font | Cormorant Garamond | Hero headlines, section titles |
| Body Font | DM Sans | All body copy, UI elements |
| Border Radius | 6px default, 999px pill | Cards, buttons |

## QUICK REFERENCE — COMPLIANCE RULES

| Term | Status | Replacement |
|------|--------|-------------|
| treats / cures / heals | 🔴 BLOCKED | supports / designed to support |
| prevents | 🔴 BLOCKED | helps maintain |
| immunomodulatory / neuroprotective | 🔴 BLOCKED | supports natural resilience |
| anti-tumor | 🔴 BLOCKED | supports healthy cellular function |
| arthritis / hepatitis / dementia / melasma | 🔴 BLOCKED | remove condition name |
| herpes / influenza / E. coli | 🔴 BLOCKED | supports immune resilience |
| boosts (as primary verb) | 🟡 FLAG | supports |
| collagen synthesis (Layer 1) | 🟡 FLAG | supports skin's natural renewal |
| hormonal balance (Layer 1) | 🟡 FLAG | supports overall wellbeing |
