'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAnimations } from '@/hooks/useAnimations'
import { viewport } from '@/lib/motion'

const evidenceTiers = [
  {
    badge:       'Gold',
    badgeClass:  'badge-gold',
    symbol:      '●',
    title:       'Peer-Reviewed Human Research',
    description:
      'Randomised controlled trials and observational studies conducted in human populations, published in peer-reviewed journals. The highest tier in the CEOVIA evidence hierarchy.',
  },
  {
    badge:       'Silver',
    badgeClass:  'badge-silver',
    symbol:      '○',
    title:       'In-Vivo & In-Vitro Research',
    description:
      'Laboratory and animal model research providing mechanistic context and supporting pre-clinical understanding. Reviewed alongside human data, not in place of it.',
  },
  {
    badge:       'Bronze',
    badgeClass:  'badge-bronze',
    symbol:      '△',
    title:       'Traditional Use Documentation',
    description:
      'Documented historical and traditional use of Sea Buckthorn across Himalayan, Tibetan, and Central Asian cultures — providing ethnobotanical context for the compound profile.',
  },
  {
    badge:       'Hypothesis',
    badgeClass:  'badge-hypothesis',
    symbol:      '◇',
    title:       'Mechanism Proposed',
    description:
      'Plausible mechanisms identified through biochemical research but not yet confirmed in human trials. Labelled transparently so the distinction is always clear.',
  },
]

export default function Evidence() {
  const { containerDelayed, fadeUp } = useAnimations()

  return (
    <section
      aria-labelledby="evidence-heading"
      className="section-grey"
    >
      <motion.div
        className="section-wrapper py-20 md:py-28"
        variants={containerDelayed}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >

        {/* Section header */}
        <motion.div variants={fadeUp} className="flex justify-center mb-14">
          <SectionHeader
            id="evidence-heading"
            eyebrow="Evidence Framework"
            heading="Built on a Hierarchy of Evidence"
            subheading="CEOVIA classifies all supporting research using a standardised framework. Every claim is traceable. Every tier is clearly labelled."
          />
        </motion.div>

        {/* Evidence tier list */}
        <div className="max-w-container-narrow mx-auto space-y-4">
          {evidenceTiers.map((tier) => (
            <motion.div
              key={tier.badge}
              variants={fadeUp}
              className="card flex flex-col sm:flex-row items-start gap-5 p-7"
            >
              {/* Badge */}
              <div className="shrink-0 pt-0.5">
                <span className={tier.badgeClass}>
                  <span aria-hidden="true">{tier.symbol}</span>
                  {tier.badge}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-display-sm text-green-600 mb-2">
                  {tier.title}
                </h3>
                <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                  {tier.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Science CTA */}
        <motion.div variants={fadeUp} className="text-center mt-12">
          <a href="/science" className="btn-secondary">
            Learn the Science
          </a>
        </motion.div>

      </motion.div>
    </section>
  )
}
