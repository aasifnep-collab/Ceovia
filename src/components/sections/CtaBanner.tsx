'use client'

import { motion } from 'framer-motion'
import { useAnimations } from '@/hooks/useAnimations'
import { viewport } from '@/lib/motion'

export default function CtaBanner() {
  const { containerDelayed, fadeUp } = useAnimations()

  return (
    <section
      aria-labelledby="cta-heading"
      className="section-green-dark"
    >
      <motion.div
        className="section-wrapper py-20 md:py-28 text-center"
        variants={containerDelayed}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          aria-hidden="true"
          className="font-sans text-label-md uppercase tracking-widest text-gold-400 select-none mb-5"
        >
          Begin Today
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="cta-heading"
          variants={fadeUp}
          className="font-display text-display-xl text-white max-w-[20ch] mx-auto"
        >
          Your 90-Day System Begins Here
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-body-lg text-white/75 mt-6 max-w-prose-narrow mx-auto leading-relaxed"
        >
          Join a growing global community investing in a structured,
          science-informed approach to daily wellness.
        </motion.p>

        {/* CTAs — inverted palette for dark background */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/products/ceovia-90-day"
            className="inline-flex items-center justify-center gap-2 font-sans font-medium text-[0.9375rem] tracking-[0.01em] bg-white text-green-600 rounded-pill px-7 py-3 transition-all duration-200 hover:bg-grey-50 shadow-md hover:shadow-lg"
          >
            Start Your System
          </a>
          <a
            href="/science"
            className="inline-flex items-center justify-center gap-2 font-sans font-medium text-[0.9375rem] tracking-[0.01em] border-2 border-white/60 text-white rounded-pill px-7 py-3 transition-all duration-200 hover:border-white hover:bg-white/10"
          >
            Learn the Science
          </a>
        </motion.div>

      </motion.div>
    </section>
  )
}
