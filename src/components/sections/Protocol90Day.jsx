import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const phases = [
  {
    id:      'reset',
    step:    '01',
    name:    'Reset',
    days:    'Days 1–30',
    body:    'Cellular membranes begin absorbing the full bioactive matrix. Sleep stabilises. Energy lifts. The foundation is being laid.',
  },
  {
    id:      'restore',
    step:    '02',
    name:    'Restore',
    days:    'Days 31–60',
    body:    'Skin hydration becomes visible. Mucosal integrity improves. Mood steadies. Your biology begins confirming what you sense.',
  },
  {
    id:      'optimize',
    step:    '03',
    name:    'Optimize',
    days:    'Days 61–90',
    body:    'Collagen synthesis peaks. Cardiovascular and hormonal markers respond. Transformation is measurable — and you reorder.',
  },
];

export default function Protocol90Day() {
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
          The System
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[680px] mb-14"
        >
          <h2 className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            90 Days Is Not a Marketing Choice.
            <br />
            It Is a Biology Fact.
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            One full cellular renewal cycle. Three structured phases. Measurable outcomes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
              className="bg-deep-green rounded-2xl p-8 border border-white/10 flex flex-col"
            >
              {/* Amber step number */}
              <span className="font-mono text-[2.5rem] font-light text-omega-amber leading-none mb-6 select-none">
                {phase.step}
              </span>

              {/* Days badge */}
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white/40 mb-3">
                {phase.days}
              </span>

              {/* Phase name */}
              <h3 className="font-display text-2xl font-medium text-white leading-none mb-4">
                {phase.name}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-omega-amber/50 mb-5" />

              {/* Body */}
              <p className="font-sans text-sm text-white/60 leading-relaxed flex-1">
                {phase.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
