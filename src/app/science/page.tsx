import type { Metadata } from 'next'
import Link from 'next/link'
import EntryHero from '@/components/ui/EntryHero'
import SectionHeader from '@/components/ui/SectionHeader'
import EvidenceBadge from '@/components/ui/EvidenceBadge'
import CtaBanner from '@/components/sections/CtaBanner'
import DisclaimerBlock from '@/components/ui/DisclaimerBlock'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'The Science — CEOVIA',
  description:
    'The evidence framework behind CEOVIA. Peer-reviewed human research, in-vivo studies, and the bioactive profile of Himalayan Sea Buckthorn seed oil.',
  path: '/science',
})

const evidenceTiers = [
  {
    tier: 'gold' as const,
    label: 'Peer-Reviewed Human Research',
    description:
      'Randomised controlled trials and observational studies in human subjects. This is the most decision-relevant evidence tier for understanding how Sea Buckthorn has been studied in people.',
  },
  {
    tier: 'silver' as const,
    label: 'In-Vivo / In-Vitro Studies',
    description:
      'Animal models and cell-based studies demonstrating mechanisms relevant to the bioactive compounds in CEOVIA\'s formulation.',
  },
  {
    tier: 'bronze' as const,
    label: 'Traditional & Historical Use',
    description:
      'Sea Buckthorn has been used in Himalayan, Tibetan, and Ayurvedic traditions for centuries. Traditional use informs the context of modern research.',
  },
  {
    tier: 'hypothesis' as const,
    label: 'Proposed Mechanisms',
    description:
      'Mechanistic hypotheses based on the known compound profile. Flagged transparently — not presented as clinical outcomes.',
  },
]

const keyAreas = [
  {
    heading: 'Skin & Barrier Function',
    body: 'Omega-7 (palmitoleic acid) is a structural component of skin. Research in human subjects has examined Sea Buckthorn\'s relationship to skin hydration and barrier integrity.',
    badge: 'gold' as const,
  },
  {
    heading: 'Inflammatory Markers',
    body: 'In-vivo and in-vitro studies have explored the effects of Sea Buckthorn\'s polyphenol and carotenoid complex on inflammatory pathway markers.',
    badge: 'silver' as const,
  },
  {
    heading: 'Antioxidant Capacity',
    body: 'The combined Vitamin E, carotenoid, and flavonoid content of Sea Buckthorn seed oil contributes to a broad antioxidant profile discussed across the available literature.',
    badge: 'silver' as const,
  },
  {
    heading: 'Mucosal Health',
    body: 'Omega-7 has been investigated in the context of mucosal membrane integrity. Sea Buckthorn berry oil has more extensive research in this area than seed oil specifically.',
    badge: 'bronze' as const,
  },
]

export default function SciencePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <EntryHero
        variant="brand"
        id="science-heading"
        eyebrow="Evidence Framework"
        heading="The Science Behind CEOVIA"
        description="We apply a tiered evidence framework. Every claim on this site is tagged to its evidence tier. We do not overstate. Where research is limited, we say so."
        actions={[
          { href: '/ingredients', label: 'View the Ingredient', variant: 'secondary' },
          { href: '/products/ceovia-90-day', label: 'Start Your System' },
        ]}
      />

      {/* ── Evidence tier key ───────────────────────────────────── */}
      <section
        aria-labelledby="tiers-heading"
        className="bg-[#F4F6F5] border-y border-[#C8D1CB]/40"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <SectionHeader
              id="tiers-heading"
              eyebrow="How We Present Evidence"
              heading="Evidence Tier Key"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {evidenceTiers.map((item) => (
              <div
                key={item.tier}
                className={[
                  'rounded-2xl p-7 md:p-8 transition-colors duration-200',
                  item.tier === 'gold'
                    ? 'bg-[#FCFAF5] border border-[#D9C58C]/35 shadow-[0_1px_0_rgba(217,197,140,0.14)]'
                    : item.tier === 'silver'
                      ? 'bg-[#F8FBF8] border border-[#C8D8C6]/32 shadow-[0_1px_0_rgba(46,125,90,0.05)]'
                      : item.tier === 'bronze'
                        ? 'bg-[#FBF8F3] border border-[#D8C7A1]/28 shadow-[0_1px_0_rgba(184,167,108,0.08)]'
                        : 'bg-white border border-[#C8D1CB]/22 shadow-[0_1px_0_rgba(26,74,58,0.04)]'
                ].join(' ')}
              >
                <div className="mb-4">
                  <EvidenceBadge tier={item.tier} />
                </div>
                <h3 className="font-display text-[1.1rem] md:text-[1.25rem] leading-[1.2] text-[#1A4A3A] mb-3">
                  {item.label}
                </h3>
                <p className="max-w-[56ch] font-sans text-[0.95rem] text-[#4A5C52] leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research areas ──────────────────────────────────────── */}
      <section
        aria-labelledby="research-heading"
        className="section-white"
        id="research"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="flex justify-center mb-14">
            <SectionHeader
              id="research-heading"
              eyebrow="Research Context"
              heading="Key Research Areas"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {keyAreas.map((area) => (
              <div
                key={area.heading}
                className="rounded-2xl border border-[#C8D1CB]/24 bg-white p-7 md:p-8 shadow-[0_1px_0_rgba(26,74,58,0.04)]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display text-[1.1rem] leading-[1.2] text-[#1A4A3A]">
                    {area.heading}
                  </h3>
                  <EvidenceBadge tier={area.badge} />
                </div>
                <p className="font-sans text-[0.95rem] text-[#4A5C52] leading-7">
                  {area.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinical context ────────────────────────────────────── */}
      <section
        aria-labelledby="clinical-heading"
        className="bg-[#F4F6F5] border-y border-[#C8D1CB]/40"
        id="clinical"
      >
        <div className="section-wrapper py-20 md:py-28">
          <div className="max-w-prose-narrow mx-auto text-center">

            <h2
              id="clinical-heading"
              className="font-display text-display-md text-green-600 mb-6"
            >
              Our Position on Evidence
            </h2>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-4">
              CEOVIA is a food supplement — not a pharmaceutical. We do not claim
              to treat, cure, or prevent any disease. The research we reference
              relates to the bioactive compounds in Sea Buckthorn seed oil and is
              presented in its appropriate scientific context.
            </p>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-10">
              Where research supports a direction, we say so. Where it doesn&apos;t,
              we don&apos;t invent it.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/ingredients" className="btn-secondary">
                View the Ingredient
              </Link>
              <Link href="/products/ceovia-90-day" className="btn-primary">
                Start Your System
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <DisclaimerBlock text="CEOVIA is a food supplement. It is not intended to diagnose, treat, cure, or prevent any disease. These statements have not been evaluated by the FDA. Results may vary. Always consult a qualified healthcare provider before starting any new supplement." />
    </>
  )
}
