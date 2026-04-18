'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAnimations } from '@/hooks/useAnimations'
import { viewport } from '@/lib/motion'

const compounds = [
  {
    name: 'Essential Fatty Acids',
    detail: 'Omega-3, 6, 7, 9',
    description:
      'A complete omega profile — including the rare Omega-7 — found in high concentration in Sea Buckthorn seed oil and not commonly available from a single plant source.',
  },
  {
    name: 'Vitamin E Complex',
    detail: 'Tocopherols & Tocotrienols',
    description:
      'Eight naturally occurring forms of Vitamin E — four tocopherols and four tocotrienols — present together in the seed oil matrix as they appear in nature.',
  },
  {
    name: 'Carotenoids',
    detail: 'Beta-Carotene, Lycopene & Xanthophylls',
    description:
      'A spectrum of carotenoid compounds present in concentrations rarely matched outside this species, contributing to the oil\'s characteristic depth and bioactive density.',
  },
  {
    name: 'Phytosterols',
    detail: 'Plant Sterol Complex',
    description:
      'A naturally occurring sterol fraction forming part of the bioactive matrix unique to Sea Buckthorn seed — integral to the full-spectrum profile of CEOVIA.',
  },
  {
    name: 'Polyphenols',
    detail: 'Flavonoids & Phenolic Acids',
    description:
      'A broad phenolic fraction including flavonoids and hydroxycinnamic acid derivatives — part of what distinguishes a whole-oil extract from isolated compounds.',
  },
  {
    name: 'Organic Acids',
    detail: 'Malic, Quinic & Tartaric Acids',
    description:
      'Naturally present in Sea Buckthorn, these organic acids contribute to the compositional integrity of the oil and its place within the broader bioactive profile.',
  },
]

export default function Ingredients() {
  const { containerDelayed, fadeUp, fadeUpSubtle } = useAnimations()

  return (
    <section
      aria-labelledby="ingredients-heading"
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
            id="ingredients-heading"
            eyebrow="The Formula"
            heading="190+ Bioactive Compounds, One Source"
            subheading="Every compound in CEOVIA is derived from a single origin — wild-harvested Sea Buckthorn from the Himalayan highlands. No blending, no isolates."
          />
        </motion.div>

        {/* Compound grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {compounds.map((compound) => (
            <motion.article
              key={compound.name}
              variants={fadeUpSubtle}
              className="card-grey rounded-xl p-7 border border-grey-100"
            >
              {/* Gold accent line */}
              <div className="w-8 h-px bg-gold-400 mb-5" aria-hidden="true" />

              <h3 className="font-display text-display-sm text-green-600">
                {compound.name}
              </h3>
              <p className="font-sans text-label-sm uppercase tracking-widest text-[#4A5C52] mt-1 mb-4">
                {compound.detail}
              </p>
              <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                {compound.description}
              </p>
            </motion.article>
          ))}
        </div>

      </motion.div>
    </section>
  )
}
