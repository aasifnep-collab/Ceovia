import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const systems = [
  {
    id:        'skin',
    icon:      '✦',
    name:      'Skin & Radiance',
    outcome:   'Deep hydration, elasticity, luminosity — visible improvement by Day 60–90.',
    marker:    'TEWL reduction',
  },
  {
    id:        'cardio',
    icon:      '◈',
    name:      'Cardiovascular',
    outcome:   'Improved lipid profiles, endothelial function — measurable by Day 90.',
    marker:    'LDL / HDL ratio',
  },
  {
    id:        'immune',
    icon:      '◉',
    name:      'Immune Resilience',
    outcome:   'Reduced inflammatory biomarkers, strengthened mucosal immunity.',
    marker:    'CRP levels',
  },
  {
    id:        'hormonal',
    icon:      '◎',
    name:      'Hormonal Balance',
    outcome:   'Phytosterols support endocrine equilibrium at every life stage.',
    marker:    'Cortisol normalisation',
  },
  {
    id:        'gut',
    icon:      '◆',
    name:      'Gut Integrity',
    outcome:   'Omega-7 repairs the intestinal mucosal lining.',
    marker:    'Bloating reduction, microbiome diversity',
  },
  {
    id:        'cognitive',
    icon:      '◇',
    name:      'Cognitive Clarity',
    outcome:   'Improved mood, sleep quality, focus from Day 30–60.',
    marker:    'Self-reported cognitive scores',
  },
];

export default function MultiSystemOutcomes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 bg-clinical-white">
      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-himalayan-green mb-5"
        >
          The Outcomes
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[640px] mb-14"
        >
          <h2
            className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Six Body Systems.
            <br />
            One Daily Capsule.
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            No single-ingredient supplement addresses this breadth.
            CEOVIA does — by design.
          </p>
        </motion.div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
              className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-himalayan-green text-lg mb-4">
                {sys.icon}
              </div>

              {/* System name */}
              <h3 className="font-sans font-semibold text-[0.9375rem] text-text-dark mb-2">
                {sys.name}
              </h3>

              {/* Outcome */}
              <p className="font-sans text-sm text-text-muted leading-relaxed flex-1 mb-4">
                {sys.outcome}
              </p>

              {/* Key marker */}
              <div className="pt-4 border-t border-neutral-100">
                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-omega-amber font-medium">
                  Key marker
                </span>
                <p className="font-sans text-sm text-text-dark mt-0.5">
                  {sys.marker}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
