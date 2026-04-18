import type { Metadata } from 'next'
import Link from 'next/link'
import EntryHero from '@/components/ui/EntryHero'
import EvidenceBadge from '@/components/ui/EvidenceBadge'
import CtaBanner from '@/components/sections/CtaBanner'
import DisclaimerBlock from '@/components/ui/DisclaimerBlock'

export const metadata: Metadata = {
  title: 'Ingredients — CEOVIA',
  description:
    '190+ bioactive compounds from supercritical CO₂-extracted Himalayan Sea Buckthorn seed oil. The only plant source of all four omegas simultaneously.',
}

const compounds = [
  {
    name: 'Omega-7 (Palmitoleic Acid)',
    concentration: '~40%',
    note: 'A rare fatty acid. Very few botanical sources provide it at meaningful concentrations.',
  },
  {
    name: 'Omega-3 (Alpha-Linolenic Acid)',
    concentration: 'Present',
    note: 'Part of the complete omega profile that makes Sea Buckthorn seed oil unique among plants.',
  },
  {
    name: 'Omega-6 (Linoleic Acid)',
    concentration: 'Present',
    note: 'Works alongside Omega-3 and Omega-9 in the full fatty acid matrix.',
  },
  {
    name: 'Omega-9 (Oleic Acid)',
    concentration: 'Present',
    note: 'Completes the four-omega profile. No other single plant source provides all four simultaneously.',
  },
  {
    name: 'Vitamin E (Tocopherols)',
    concentration: 'High',
    note: 'Fat-soluble antioxidant preserved by supercritical CO₂ extraction. Heat-based methods destroy it.',
  },
  {
    name: 'Carotenoids (incl. Beta-Carotene)',
    concentration: 'High',
    note: 'The pigment complex responsible for Sea Buckthorn\'s characteristic colour and bioactive depth.',
  },
  {
    name: 'Phytosterols',
    concentration: 'Present',
    note: 'Structural plant compounds that support the overall bioactive profile.',
  },
  {
    name: 'Flavonoids & Polyphenols',
    concentration: 'Present',
    note: 'The antioxidant layer of the full-spectrum extract.',
  },
]

export default function IngredientsPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <EntryHero
        variant="brand"
        id="ingredients-heading"
        eyebrow="The Ingredient"
        heading="Himalayan Sea Buckthorn Seed Oil"
        description="Wild-harvested from high-altitude Himalayan valleys. Extracted using supercritical CO₂ — no heat, no solvents, 190+ bioactive compounds preserved at full potency."
        meta={
          <div className="flex justify-center">
            <EvidenceBadge tier="gold" />
          </div>
        }
        actions={[
          { href: '/science', label: 'View the Evidence Framework', variant: 'secondary' },
          { href: '/products/ceovia-90-day', label: 'Start Your System' },
        ]}
      />

      {/* ── Why this ingredient ─────────────────────────────────── */}
      <section
        aria-labelledby="uniqueness-heading"
        className="bg-[#F4F6F5] border-y border-[#C8D1CB]/40"
      >
        <div className="section-wrapper py-20 md:py-28">

          <div className="max-w-prose-narrow mx-auto text-center mb-14">
            <h2
              id="uniqueness-heading"
              className="font-display text-display-md text-green-600"
            >
              The Only Plant Source of All Four Omegas
            </h2>
            <p className="font-sans text-body-md text-[#4A5C52] mt-5 leading-relaxed">
              Most omega supplements provide one or two fatty acids.
              Sea Buckthorn seed oil — uniquely among plants — provides
              Omega 3, 6, 7, and 9 in a single source.
            </p>
          </div>

          {/* Compound grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {compounds.map((compound) => (
              <div
                key={compound.name}
                className="bg-white rounded-xl p-6 border border-[#C8D1CB]/40"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-sans text-xs font-medium tracking-widest uppercase text-[#0E5A36]">
                    {compound.name}
                  </h3>
                  <span className="font-sans text-xs text-[#4A5C52] whitespace-nowrap shrink-0">
                    {compound.concentration}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#4A5C52] leading-relaxed">
                  {compound.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extraction method ───────────────────────────────────── */}
      <section
        aria-labelledby="extraction-heading"
        className="section-white"
      >
        <div className="section-wrapper py-20 md:py-28">
          <div className="max-w-prose-narrow mx-auto text-center">

            <h2
              id="extraction-heading"
              className="font-display text-display-md text-green-600 mb-6"
            >
              Supercritical CO₂ Extraction
            </h2>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-4">
              Pharmaceutical-grade extraction that uses pressurised CO₂ to isolate
              the oil without heat or chemical solvents. The result: a complete
              bioactive profile that heat-based methods cannot achieve.
            </p>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-10">
              No solvents. No heat degradation. 190+ biologically active compounds
              preserved at full potency.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/science" className="btn-secondary">
                View the Evidence Framework
              </Link>
              <Link href="/products/ceovia-90-day" className="btn-primary">
                Start Your System
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <DisclaimerBlock text="CEOVIA is a food supplement. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult a healthcare professional before use if pregnant, nursing, or taking medication." />
    </>
  )
}
