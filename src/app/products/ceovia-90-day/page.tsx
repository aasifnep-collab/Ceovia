/**
 * CEOVIA Product Page — /products/ceovia-90-day
 *
 * Primary conversion page for high-intent visitors arriving from
 * the homepage or direct links.
 *
 * Section order (follows purchase decision arc):
 *  1. ProductHero       — identity + benefit proof
 *  2. ProgramSelector   — variant selection + Add to Cart
 *  3. Formulation       — the ingredient and its sourcing
 *  4. How to Use        — protocol clarity
 *  5. FAQ               — objection removal
 *  6. Trust & Quality   — credentialing before close
 *  7. CtaBanner         — conversion close
 *     DisclaimerBlock   — mandatory regulatory disclaimer
 *
 * COMPLIANCE: Layer 1 only. All consumer-facing copy uses approved
 * verbs (supports / helps maintain / designed to support /
 * formulated to support). No mechanism claims. No disease names.
 */

import type { Metadata } from 'next'
import ProductHero      from '@/components/product/ProductHero'
import ProgramSelector  from '@/components/product/ProgramSelector'
import Accordion        from '@/components/product/Accordion'
import type { AccordionItem } from '@/components/product/Accordion'
import StickyMobileCTA  from '@/components/product/StickyMobileCTA'
import SectionHeader    from '@/components/ui/SectionHeader'
import EvidenceBadge    from '@/components/ui/EvidenceBadge'
import DisclaimerBlock  from '@/components/ui/DisclaimerBlock'
import CtaBanner        from '@/components/sections/CtaBanner'
import Link             from 'next/link'
import JsonLd           from '@/components/seo/JsonLd'
import { buildPageMetadata, getCanonicalUrl } from '@/lib/metadata'
import { getCeoviaOffers } from '@/lib/shopify/offers'

// ── Page metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = buildPageMetadata({
  title: 'CEOVIA — 90-Day Wellness System',
  description:
    'A structured daily supplement designed to support skin, energy, and overall wellness. Powered by Himalayan Sea Buckthorn seed oil.',
  path: '/products/ceovia-90-day',
})

// ── Section data ─────────────────────────────────────────────────────────────

const formulationFeatures = [
  {
    title: 'Full-spectrum ingredient profile',
    body: 'One botanical source delivering Omega 3, 6, 7 and 9 together in a single daily format.',
  },
  {
    title: '190+ bioactive compounds',
    body: 'A concise proof point for formulation depth, without requiring a full science review on this page.',
  },
  {
    title: 'Supercritical CO₂ extraction',
    body: 'A solvent-free extraction method chosen to preserve the ingredient profile with a cleaner finish.',
  },
  {
    title: 'Third-party quality standards',
    body: 'Halal certified, tested for purity, and produced without fillers or unnecessary additives.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Take 2 capsules daily',
    body: 'Use the same 2-capsule serving each day. Each serving delivers 1,000mg of CEOVIA sea buckthorn seed oil.',
  },
  {
    number: '2',
    title: 'Take with a meal',
    body: 'Breakfast or lunch is ideal. A meal containing healthy fats can help make the routine easier to keep consistent.',
  },
  {
    number: '3',
    title: 'Stay consistent',
    body: 'The format is designed for daily use. If you want the full protocol context, you can review the 90-day system separately.',
  },
]

const faqItems: AccordionItem[] = [
  {
    q: 'When is the best time to take CEOVIA?',
    a: 'Take 2 capsules with breakfast or any meal containing healthy fats. Morning timing supports habit consistency, but any consistent daily time works.',
  },
  {
    q: 'What is included in each bottle?',
    a: 'CEOVIA is currently offered as a 60-Day Program and a 90-Day System. Select the option that matches the routine you want to follow at checkout.',
  },
  {
    q: 'Which option is best if I want to follow the full protocol?',
    a: 'The 90-Day System is the recommended path if you want the full CEOVIA protocol in one uninterrupted purchase.',
  },
  {
    q: 'When should I reorder?',
    a: 'If you begin with the 60-Day Program, reorder before your final week so your routine is not interrupted.',
  },
  {
    q: 'Can I take CEOVIA with other supplements?',
    a: 'In general, yes. If you have specific concerns or are taking medications, consult your healthcare professional before use.',
  },
  {
    q: 'Is CEOVIA suitable during pregnancy or nursing?',
    a: 'Consult your healthcare provider before use if pregnant, nursing, or taking medication.',
  },
  {
    q: 'How do I purchase CEOVIA?',
    a: 'CEOVIA is currently available as a one-time purchase. Select your preferred supply option and proceed directly to secure checkout.',
  },
  {
    q: 'How is quality verified?',
    a: 'CEOVIA is Halal certified, third-party tested for purity and potency, and produced without fillers or artificial additives.',
  },
]

const trustItems = [
  'GMP-Certified Manufacturing',
  'Halal Certified',
  'Supercritical CO₂ Extracted',
  'Third-Party Tested',
  'No Fillers. No Binders. No Artificial Additives.',
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage() {
  const offers = await getCeoviaOffers()
  const recommendedOffer = offers.find((offer) => offer.key === '90day') ?? offers[0]

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CEOVIA Softgel Capsules',
    description:
      'A structured daily supplement powered by Himalayan Sea Buckthorn seed oil to support skin, energy, and whole-body wellness.',
    image: [getCanonicalUrl('/images/ceovia-bottle.png')],
    brand: {
      '@type': 'Brand',
      name: 'CEOVIA',
    },
    sku: 'ceovia-90-day-system',
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      sku: offer.variantId,
      name: offer.title,
      priceCurrency: offer.priceCurrency,
      price: offer.priceAmount.toString(),
      availability: offer.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: getCanonicalUrl('/products/ceovia-90-day'),
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <JsonLd data={[productSchema, faqSchema]} />

      {/* ── 1. Product Hero ───────────────────────────────────────── */}
      <ProductHero />

      {/* ── 2. Variant Selector + Pricing ────────────────────────── */}
      <ProgramSelector offers={offers} />

      {/* ── 3. Formulation ────────────────────────────────────────── */}
      <section
        aria-labelledby="formulation-heading"
        className="section-grey"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <div className="max-w-prose-narrow text-center mx-auto">
              <SectionHeader
                id="formulation-heading"
                eyebrow="Quick Proof"
                heading="What you need to know before you buy"
              />
              {/* Evidence tier badge — peer-reviewed human research */}
              <div className="mt-4 flex justify-center">
                <EvidenceBadge tier="gold" />
              </div>
            </div>
          </div>

          {/* Body copy */}
          <p className="font-sans text-body-md text-[#4A5C52] max-w-prose-narrow mx-auto text-center leading-relaxed mb-14">
            CEOVIA keeps the ingredient story concise here: one daily format, one full-spectrum botanical source, and one quality standard you can verify. If you want the deeper science, ingredient profile, or full 90-day context, those pages are linked below.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {formulationFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#F4F6F5] p-6 rounded-xl border border-[#C8D1CB]/40"
              >
                <h3 className="font-sans text-xs font-medium tracking-widest uppercase text-[#0E5A36]">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-[#4A5C52] mt-2 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/science"
              className="inline-flex items-center justify-center rounded-full border border-[#B9C8BF] bg-white px-6 py-3 font-sans text-sm font-medium text-[#12452E] transition-all duration-200 hover:border-[#12452E] hover:bg-[#F7FAF8]"
            >
              Explore the Science
            </Link>
            <Link
              href="/system"
              className="inline-flex items-center justify-center rounded-full border border-[#B9C8BF] bg-white px-6 py-3 font-sans text-sm font-medium text-[#12452E] transition-all duration-200 hover:border-[#12452E] hover:bg-[#F7FAF8]"
            >
              View the 90-Day System
            </Link>
            <Link
              href="/ingredients"
              className="inline-flex items-center justify-center rounded-full border border-[#B9C8BF] bg-white px-6 py-3 font-sans text-sm font-medium text-[#12452E] transition-all duration-200 hover:border-[#12452E] hover:bg-[#F7FAF8]"
            >
              Read the Ingredient Profile
            </Link>
          </div>

        </div>
      </section>

      {/* ── 4. How to Use ─────────────────────────────────────────── */}
      <section
        aria-labelledby="howto-heading"
        className="section-white"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <SectionHeader
              id="howto-heading"
              eyebrow="Daily Use"
              heading="How to take it"
            />
          </div>

          <p className="mx-auto mb-12 max-w-prose-narrow text-center font-sans text-body-md leading-relaxed text-[#4A5C52]">
            This section is intentionally practical. For the broader protocol philosophy, use the 90-day system page. Here, the goal is simply to make daily use clear.
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex-1">
                {/* Large step number — decorative */}
                <p
                  aria-hidden="true"
                  className="font-display text-[5rem] leading-none text-[#C8D1CB] select-none mb-5"
                >
                  {step.number}
                </p>

                <h3 className="font-sans text-sm font-medium text-[#0E5A36] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="font-sans text-sm text-[#4A5C52] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/system"
              className="font-sans text-sm font-medium text-[#0E5A36] underline-offset-2 hover:underline"
            >
              View the 90-Day System →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 5. FAQ ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="faq-heading"
        className="section-grey"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <SectionHeader
              id="faq-heading"
              eyebrow="Purchase Questions"
              heading="Before you check out"
            />
          </div>

          <div className="max-w-[760px] mx-auto">
            <Accordion items={faqItems} />
          </div>

        </div>
      </section>

      {/* ── 6. Trust & Quality ────────────────────────────────────── */}
      <section
        aria-labelledby="trust-heading"
        className="section-white"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <SectionHeader
              id="trust-heading"
              eyebrow="Order Confidence"
              heading="What comes with every order"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="bg-[#F4F6F5] border border-[#C8D1CB]/40 rounded-xl px-5 py-4 text-center"
              >
                <p className="font-sans text-xs font-medium tracking-widest uppercase text-[#0E5A36] whitespace-nowrap">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. Final CTA Banner ───────────────────────────────────── */}
      <CtaBanner />

      {/* ── Sticky mobile CTA — mobile only, synced with ProgramSelector ── */}
      <StickyMobileCTA initialOffer={recommendedOffer} />

      {/* ── Mandatory disclaimer — must sit above Footer ──────────── */}
      <DisclaimerBlock text="CEOVIA is a food supplement. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult a healthcare professional before use if pregnant, nursing, or taking medication." />

    </>
  )
}
