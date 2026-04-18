'use client'

/**
 * SystemBlueprint — CEOVIA System Blueprint section
 *
 * Pillar data: exact copy from CEOVIA_Technical_Platform_Blueprint_V3.pdf
 * Design spec: Blueprint PDF §DESIGN SPECIFICATIONS
 *
 * Two-layer UX architecture (non-negotiable per spec):
 *   Layer 1 — Title + anchor line (always visible, page-load state)
 *   Layer 2 — Bullets + clinical note (revealed on hover desktop / tap mobile)
 *   Transition: ease-in-out, 220ms, smooth downward expand via Framer Motion
 *
 * No icons — existing site does not use an icon library.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAnimations } from '@/hooks/useAnimations'
import { viewport } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────────────────
// Pillar data — exact copy from PDF, do not paraphrase
// ─────────────────────────────────────────────────────────────────────────────

interface Pillar {
  id:           number
  title:        string
  anchor:       string
  bullets:      string[]
  clinicalNote: string
  isLongevity?: boolean
}

const PILLARS: Pillar[] = [
  {
    id:           1,
    title:        'Skin & Radiance',
    anchor:       'From membrane repair to visible luminosity.',
    bullets: [
      'Restores the skin lipid barrier and deep moisture factor',
      'Activates collagen-producing cells for firmer, more elastic skin',
      'Protects against oxidative dullness from within',
    ],
    clinicalNote: 'Clinically measurable improvement in skin hydration and TEWL at 60–90 days.',
  },
  {
    id:           2,
    title:        'Cellular Energy',
    anchor:       'Cellular efficiency, not stimulation.',
    bullets: [
      'Protects mitochondria from the inside — preserving ATP output',
      'Supports mental clarity and sustained focus throughout the day',
      'Reduces the cellular inflammation that underlies fatigue',
    ],
    clinicalNote: 'Tocopherols shield mitochondrial membranes from lipid peroxidation — energy from biology, not stimulants.',
  },
  {
    id:           3,
    title:        'Immune Resilience',
    anchor:       'Balanced response, not overreaction.',
    bullets: [
      "Activates the body's natural defence cells (NK cells, T-lymphocytes)",
      'Supports balance between under- and over-active immune states',
      "Repairs the mucosal lining — the body's first immune barrier",
    ],
    clinicalNote: "Selenium and quercetin together activate glutathione peroxidase — the body's master antioxidant enzyme.",
  },
  {
    id:           4,
    title:        'Hormonal & Metabolic Balance',
    anchor:       'Supports hormonal balance at receptor level.',
    bullets: [
      'Supports hormonal harmony across estrogen and androgen pathways',
      'Helps regulate thyroid function and metabolic rate',
      "Improves the body's insulin response and energy regulation",
    ],
    clinicalNote: 'Clinically relevant reduction in menopausal symptom scores documented in peer-reviewed RCTs.',
  },
  {
    id:           5,
    title:        'Gut & Mucosal Integrity',
    anchor:       'A healthy gut is the foundation of everything.',
    bullets: [
      'Repairs the intestinal lining — reducing permeability and discomfort',
      'Supports a balanced gut microbiome environment',
      'Maintains the epithelial cells lining the entire digestive tract',
    ],
    clinicalNote: 'Omega-7 is one of only two known compounds that directly repair mucosal membrane tissue in vivo.',
  },
  {
    id:           6,
    title:        'Cognitive & Emotional Clarity',
    anchor:       'Mental sharpness and emotional steadiness — biologically grounded.',
    bullets: [
      'Supports neuronal membrane health for clearer thinking',
      'Crosses the blood-brain barrier to reduce neuroinflammation',
      'Supports the gut-brain axis for mood and sleep regulation',
    ],
    clinicalNote: 'Improved mood, sleep quality, and cognitive clarity reported within 30–60 days.',
  },
  {
    id:           7,
    title:        'Longevity & Cellular Protection',
    anchor:       'Address the mechanisms of aging, not just its symptoms.',
    bullets: [
      "Activates the body's own cellular antioxidant defence pathways",
      'Supports the biological processes associated with cellular longevity',
      'Protects against the glycation that degrades collagen and elastin over time',
    ],
    clinicalNote: 'Quercetin activates senolytic pathways; isorhamnetin activates SIRT1 (sirtuin longevity pathway).',
    isLongevity:  true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Core pillar card (Pillars 1–6)
// ─────────────────────────────────────────────────────────────────────────────

function CorePillarCard({ pillar }: { pillar: Pillar }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="rounded-xl cursor-pointer select-none"
      style={{
        background: '#FFFFFF',
        borderLeft: isExpanded ? '6px solid #2E6B47' : '4px solid #3E8A5F',
        boxShadow:  isExpanded ? '0 4px 16px rgba(30, 60, 45, 0.10)' : 'none',
        padding:    '24px 28px 24px 24px',
        transition: 'border-left 220ms ease-in-out, box-shadow 220ms ease-in-out',
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsExpanded((prev) => !prev) }}
      aria-expanded={isExpanded}
    >
      {/* Layer 1 — always visible */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="font-display font-semibold mb-2"
            style={{ color: '#1A3D2B', fontSize: '19px' }}
          >
            {pillar.title}
          </h3>
          <p
            className="font-sans italic leading-snug"
            style={{ color: '#3E8A5F', fontSize: '16px' }}
          >
            {pillar.anchor}
          </p>
        </div>
        <span
          className="shrink-0 self-end font-sans font-medium leading-none"
          style={{
            color:      '#3E8A5F',
            fontSize:   '12px',
            transition: 'transform 220ms ease-in-out',
            transform:  isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {/* Layer 2 — revealed on hover (desktop) / tap (mobile) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key={`layer2-${pillar.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="mt-5 space-y-2.5">
              {pillar.bullets.map((bullet, i) => (
                <li key={i} className="font-sans flex gap-2.5 items-start">
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: '#3E8A5F' }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                  <span style={{ color: '#3D3D3D', fontSize: '16px' }}>{bullet}</span>
                </li>
              ))}
            </ul>
            <p
              className="font-sans italic mt-5 leading-relaxed"
              style={{ color: '#3E8A5F', fontSize: '15px' }}
            >
              {pillar.clinicalNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Longevity card (Pillar 7 — Outcome Layer)
// Full-width · gold accent · always slightly elevated
// ─────────────────────────────────────────────────────────────────────────────

function LongevityCard({ pillar }: { pillar: Pillar }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="col-span-1 sm:col-span-2 rounded-xl cursor-pointer select-none"
      style={{
        background: '#FDF8E8',
        borderLeft: '14px solid #B8960C',
        boxShadow:  '0 6px 20px rgba(184, 150, 12, 0.12)',
        padding:    '32px 36px',
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsExpanded((prev) => !prev) }}
      aria-expanded={isExpanded}
    >
      {/* Eyebrow */}
      <p
        className="font-sans font-bold uppercase mb-3"
        style={{ color: '#B8960C', fontSize: '13px', letterSpacing: '0.12em' }}
        aria-hidden="true"
      >
        ★&nbsp;&nbsp;THE OUTCOME LAYER
      </p>

      {/* Layer 1 — always visible */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="font-display font-semibold mb-2"
            style={{ color: '#1A3D2B', fontSize: '19px' }}
          >
            {pillar.title}
          </h3>
          <p
            className="font-sans italic leading-snug"
            style={{ color: '#B8960C', fontSize: '16px' }}
          >
            {pillar.anchor}
          </p>
        </div>
        <span
          className="shrink-0 self-end font-sans font-medium leading-none"
          style={{
            color:      '#B8960C',
            fontSize:   '12px',
            transition: 'transform 220ms ease-in-out',
            transform:  isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {/* Layer 2 — revealed on hover (desktop) / tap (mobile) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="layer2-longevity"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="mt-5 space-y-2.5">
              {pillar.bullets.map((bullet, i) => (
                <li key={i} className="font-sans flex gap-2.5 items-start">
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: '#B8960C' }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                  <span style={{ color: '#3D3D3D', fontSize: '16px' }}>{bullet}</span>
                </li>
              ))}
            </ul>
            <p
              className="font-sans italic mt-5 leading-relaxed"
              style={{ color: '#B8960C', fontSize: '15px' }}
            >
              {pillar.clinicalNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export default function SystemBlueprint() {
  const { containerDelayed, fadeUp } = useAnimations()

  const corePillars     = PILLARS.filter((p) => !p.isLongevity)
  const longevityPillar = PILLARS.find((p) => p.isLongevity)!

  return (
    <section
      id="system-blueprint"
      aria-labelledby="system-blueprint-heading"
      className="section-white"
      style={{ background: '#F7FAF8' }}
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
            id="system-blueprint-heading"
            eyebrow="THE SYSTEM"
            heading="The CEOVIA System Blueprint"
            subheading="Every bioactive maps to a biological function. Six body systems. One daily capsule."
          />
        </motion.div>

        {/* Pillar grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {corePillars.map((pillar) => (
            <CorePillarCard key={pillar.id} pillar={pillar} />
          ))}

          {/* Longevity card spans both columns */}
          <LongevityCard pillar={longevityPillar} />
        </motion.div>

        {/* Closing statement */}
        <motion.p
          variants={fadeUp}
          className="font-sans italic text-center mt-14 max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#3D3D3D', fontSize: '16px' }}
        >
          190+ bioactives. Naturally co-occurring. This is not supplementation. This is biological recalibration.
        </motion.p>
      </motion.div>
    </section>
  )
}
