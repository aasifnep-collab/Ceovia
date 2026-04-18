# CEOVIA Website

CEOVIA is a premium wellness website built with Next.js and Tailwind CSS. This repository contains the public-facing marketing site, product pages, journal, clinical insight experience, concierge AI endpoint, and the internal evidence-library staging workflow used for research curation.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Shopify Storefront API
- Vercel AI SDK / OpenAI

## Project Structure

```text
src/
  app/                      App Router pages and API routes
  components/               UI, sections, evidence, product, layout, contact
  data/                     Site data, clinical insight data, evidence JSON
  hooks/                    Client-side hooks
  lib/                      AI, Shopify, motion, journal helpers
scripts/
  audit-evidence-staging.ts Internal evidence staging audit runner
public/
  images/                   Brand and product assets
```

## Key Routes

- `/` — homepage
- `/products/ceovia-90-day` — primary product page
- `/science` — science landing page
- `/clinical-insight` — clinical insight experience
- `/journal` — editorial / blog section
- `/about`
- `/contact`
- `/practitioners`

Redirects configured in `next.config.ts`:

- `/blog` → `/journal`
- `/start` → `/products/ceovia-90-day`
- `/consumers` → product page
- `/clinics` → `/practitioners`
- `/distributors` → `/contact`

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Environment Variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Minimum variables for storefront/product functionality:

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
- `NEXT_PUBLIC_CEOVIA_SELLING_PLAN_ID` (optional until selling plans are live)

Additional AI / ops variables used in the codebase:

- `OPENAI_API_KEY`
- `CEOVIA_AI_FALLBACK_ENABLED`
- `CEOVIA_AI_RATE_LIMIT`

Notes:

- `.env.local` is intentionally gitignored.
- The app will still render without every optional variable, but Shopify purchase flows and AI concierge behavior depend on correct setup.

## Evidence System

The repository includes two evidence layers:

### 1. Live evidence layer

Used by the CEOVIA evidence UI:

- `src/data/evidence/studies-meta.json`
- `src/data/evidence/studies-detail.json`
- `src/data/evidence/interpretations.json`

### 2. Internal staging workflow

Used for curation, review, and release preparation:

- `src/data/evidence/staging/pubmed-extraction-template.ts`
- `src/data/evidence/staging/normalize.ts`
- `src/data/evidence/staging/audit.ts`
- `src/data/evidence/staging/README.md`

Run the internal staging audit:

```bash
npm run audit:evidence-staging
```

This reports:

- records by status
- compliance status counts
- missing checklist items
- blocked records
- normalization-ready records

## Concierge AI

The project includes a compliance-aware concierge endpoint:

- `src/app/api/ai/chat/route.ts`

It includes:

- input validation with Zod
- rate limiting
- redirect logic for condition-sensitive prompts
- compliance filtering
- OpenAI-backed response generation
- fallback behavior for technical failure

## Styling

This project uses Tailwind CSS v3.

Key files:

- `tailwind.config.js`
- `postcss.config.js`
- `src/app/globals.css`

The site uses the App Router root layout in:

- `src/app/layout.tsx`

## Notes for Contributors

- Do not commit `.env.local`, `.next`, or `node_modules`.
- Keep evidence content conservative and source-grounded.
- Do not place unreviewed staging content directly into the live evidence JSON files.
- Preserve the current brand styling unless a task explicitly calls for design changes.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run audit:evidence-staging
```

## Deployment

The repo is ready for deployment on Vercel or another Next.js-compatible platform.

Before deploying, confirm:

- Shopify env vars are set
- OpenAI env vars are set if concierge AI is enabled
- evidence JSON has only approved live records

