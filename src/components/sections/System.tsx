'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAnimations } from '@/hooks/useAnimations'
import { viewport } from '@/lib/motion'

const phases = [
  {
    number: '01',
    label: 'Days 1–30',
    title: 'Reset',
    description:
      'Cellular membranes begin absorbing the full-spectrum bioactive matrix. Sleep quality improves. Brain fog lifts. Energy begins to stabilise.',
  },
  {
    number: '02',
    label: 'Days 31–60',
    title: 'Restore',
    description:
      'Skin hydration and elasticity become visible. Omega-7 reaches mucosal saturation. Mood steadies.',
  },
  {
    number: '03',
    label: 'Days 61–90',
    title: 'Optimize',
    description:
      'Collagen synthesis peaks. Skin barrier, cardiovascular markers, and hormonal balance all respond. Transformation is measurable.',
  },
]

export default function System() {
  const { containerDelayed, fadeUp } = useAnimations()

  return (
    <section
      aria-labelledby="system-heading"
      className="section-white"
    >
      <motion.div
        className="section-wrapper py-20 md:py-28"
        variants={containerDelayed}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >

        {/* Section header */}
        <motion.div variants={fadeUp} className="flex justify-center mb-16">
          <SectionHeader
            id="system-heading"
            eyebrow="How It Works"
            heading="The 90-Day System"
            subheading="90 days is the clinically validated minimum for measurable outcomes across skin, cardiovascular, and immune endpoints."
          />
        </motion.div>

        {/* Phase steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grey-100 rounded-2xl overflow-hidden">
          {phases.map((phase) => (
            <motion.div
              key={phase.number}
              variants={fadeUp}
              className="bg-white p-8 md:p-10"
            >
              {/* Phase number — large display type as decoration */}
              <p
                className="font-display text-[5rem] leading-none text-grey-100 select-none mb-6"
                aria-hidden="true"
              >
                {phase.number}
              </p>

              <p className="font-sans text-label-sm uppercase tracking-widest text-[#4A5C52] mb-3">
                {phase.label}
              </p>

              <h3 className="font-display text-display-md text-green-600 mb-4">
                {phase.title}
              </h3>

              <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-body-sm text-[#4A5C52] text-center mt-10 max-w-prose-narrow mx-auto"
        >
          The 90-day structure is a design principle, not a guarantee. Individual
          experience varies. Consult your healthcare provider before beginning
          any new supplement programme.
        </motion.p>

      </motion.div>
    </section>
  )
}
