import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number:      '1',
    label:       'Integration',
    description: 'Omegas 3, 6, 7, 9 incorporate into phospholipid bilayers, restoring membrane fluidity and receptor sensitivity.',
  },
  {
    number:      '2',
    label:       'Activation',
    description: 'Carotenoids and Vitamin E neutralize oxidative stress — reducing the root driver of visible aging and systemic inflammation.',
  },
  {
    number:      '3',
    label:       'Repair',
    description: 'Omega-7 stimulates collagen synthesis and mucosal restoration across gut, skin, and barrier tissue.',
  },
  {
    number:      '4',
    label:       'Optimization',
    description: 'Phytosterols and selenium regulate hormonal, metabolic, and immune pathways — whole-body support from one daily capsule.',
  },
];

export default function CellularScience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-himalayan-green mb-5"
        >
          The Mechanism
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[680px] mb-16"
        >
          <h2
            className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            How CEOVIA Works —
            <br />
            From Cell to System
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            Every capsule triggers a four-step biological cascade.
          </p>
        </motion.div>

        {/* Process diagram */}
        <div className="relative">
          {/* Dashed connecting line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="hidden lg:block absolute top-[2.75rem] left-[7%] right-[7%] h-px origin-left"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, #D4860A 0, #D4860A 8px, transparent 8px, transparent 20px)`,
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              >
                {/* Amber number circle */}
                <div className="w-[3.25rem] h-[3.25rem] rounded-full border-2 border-omega-amber bg-white flex items-center justify-center mb-6 relative z-10">
                  <span className="font-display text-xl font-semibold text-omega-amber leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Label */}
                <h3 className="font-sans font-semibold text-base text-text-dark mb-3">
                  {step.label}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
