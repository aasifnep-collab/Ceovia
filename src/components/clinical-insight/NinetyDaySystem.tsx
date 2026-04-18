'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { phases, ninetyDayCallout } from '@/data/clinicalInsight'
import { EASE_OUT } from '@/lib/motion'

export default function NinetyDaySystem() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="protocol" className="section-grey scroll-mt-32">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            90-Day System
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            A protocol built for consistency, not intensity
          </h2>
          <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
            The structure is designed to help practitioners frame expectation, adherence, and observation over a meaningful time horizon.
          </p>

          <div className="relative mt-14 hidden md:grid md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16.66%] right-[16.66%] top-9 h-px bg-himalayan-green/20" />
            {phases.map((phase, index) => (
              <motion.article
                key={phase.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: index * 0.08 }}
                className="relative"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-himalayan-green/25 bg-white font-[family-name:var(--font-display)] text-[2rem] text-deep-green">
                    {phase.number}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                      Phase {phase.number}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-display-sm text-deep-green">
                      {phase.title}
                    </h3>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-sans)] text-body-md text-text-dark">{phase.description}</p>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[1.1rem] italic text-himalayan-green">
                  {phase.outcomeStatement}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 space-y-8 md:hidden">
            {phases.map((phase) => (
              <article key={phase.number} className="relative pl-10">
                <div className="absolute left-3 top-0 h-full w-px bg-himalayan-green/20" />
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-himalayan-green text-clinical-white">
                  <span className="font-[family-name:var(--font-sans)] text-[10px] font-medium">{phase.number}</span>
                </div>
                <p className="font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                  Phase {phase.number}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-display-sm text-deep-green">
                  {phase.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-sans)] text-body-md text-text-dark">{phase.description}</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[1.05rem] italic text-himalayan-green">
                  {phase.outcomeStatement}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-clinical-white px-6 py-6 md:px-8">
            <p className="font-[family-name:var(--font-sans)] text-body-md text-text-dark">
              {ninetyDayCallout}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
