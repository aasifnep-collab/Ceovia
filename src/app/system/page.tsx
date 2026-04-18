import type { Metadata } from 'next'
import Link from 'next/link'
import EntryHero from '@/components/ui/EntryHero'
import CtaBanner from '@/components/sections/CtaBanner'
import DisclaimerBlock from '@/components/ui/DisclaimerBlock'

export const metadata: Metadata = {
  title: 'The System — CEOVIA',
  description:
    'A structured 90-day protocol designed for consistent daily use. Three phases: Reset, Restore, Optimise.',
}

const phases = [
  {
    number: '01',
    name: 'Reset',
    days: 'Days 1–30',
    description:
      'Supports your body\'s natural balance and daily function. The foundation phase — establishing the daily habit that makes the system work.',
  },
  {
    number: '02',
    name: 'Restore',
    days: 'Days 31–60',
    description:
      'Supports skin hydration, energy, and immune resilience. Consistency through the middle phase is where the 90-day structure earns its design.',
  },
  {
    number: '03',
    name: 'Optimise',
    days: 'Days 61–90',
    description:
      'Supports whole-body balance and long-term consistency. The completion phase — designed for those who committed to the full protocol.',
  },
]

export default function SystemPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <EntryHero
        variant="brand"
        id="system-heading"
        eyebrow="The Protocol"
        heading="The 90-Day System"
        description="Three distinct phases. One continuous system designed for consistent daily use across 90 days. Not a course of treatment — a structured daily practice."
        actions={[
          { href: '/products/ceovia-90-day', label: 'Start Your System' },
          { href: '/ingredients', label: 'View the Ingredient', variant: 'secondary' },
        ]}
      />

      {/* ── Phases ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="phases-heading"
        className="bg-[#F4F6F5] border-y border-[#C8D1CB]/40"
      >
        <div className="section-wrapper py-20 md:py-28">

          <h2
            id="phases-heading"
            className="sr-only"
          >
            The three phases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="bg-white rounded-2xl p-8 border border-[#C8D1CB]/40 shadow-sm"
              >
                <p
                  aria-hidden="true"
                  className="font-display text-[5rem] leading-none text-[#C8D1CB] select-none mb-6"
                >
                  {phase.number}
                </p>

                <p className="font-sans text-label-sm uppercase tracking-widest text-[#4A5C52] mb-2">
                  {phase.days}
                </p>

                <h3 className="font-sans text-base font-medium text-[#0E5A36] mb-3">
                  {phase.name}
                </h3>

                <p className="font-sans text-sm text-[#4A5C52] leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol note ───────────────────────────────────────── */}
      <section className="section-white">
        <div className="section-wrapper py-20 md:py-28">
          <div className="max-w-prose-narrow mx-auto text-center">

            <h2 className="font-display text-display-md text-green-600 mb-6">
              Consistency Is the Protocol
            </h2>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-4">
              The 90-day structure exists because the bioactive compound profile in
              Sea Buckthorn seed oil is designed for consistent daily intake — not
              occasional use.
            </p>

            <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed mb-10">
              Two capsules daily. With a meal containing healthy fats. Every day.
              For 90 days.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products/ceovia-90-day" className="btn-primary">
                Choose Your Program
              </Link>
              <Link href="/ingredients" className="btn-secondary">
                View the Ingredient
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
