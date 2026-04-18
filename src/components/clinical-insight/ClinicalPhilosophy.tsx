'use client'

import { motion } from 'framer-motion'
import { clinicalPhilosophy } from '@/data/clinicalInsight'
import { fadeUp, viewport } from '@/lib/motion'

export default function ClinicalPhilosophy() {
  return (
    <section id="overview" className="section-white scroll-mt-32">
      <motion.div
        className="section-wrapper py-20 md:py-28"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
      >
        <div className="mx-auto max-w-[46rem]">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            {clinicalPhilosophy.label}
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            {clinicalPhilosophy.title}
          </h2>

          <div className="mt-8 space-y-4 md:space-y-5">
            {clinicalPhilosophy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-[family-name:var(--font-sans)] text-body-lg text-text-dark">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-12 border-l-4 border-himalayan-green/70 bg-clinical-white px-6 py-6 font-[family-name:var(--font-display)] text-[1.28rem] italic leading-relaxed text-deep-green md:px-8">
            {clinicalPhilosophy.callout}
          </blockquote>
        </div>
      </motion.div>
    </section>
  )
}
