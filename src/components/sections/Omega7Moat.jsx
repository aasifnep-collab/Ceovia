import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '15–35%', label: 'Palmitoleic Acid concentration' },
  { value: '4,000m+', label: 'Altitude of Himalayan sourcing' },
  { value: '2',       label: 'Plant sources with meaningful Omega-7 on earth' },
];

export default function Omega7Moat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 bg-deep-green relative overflow-hidden">
      {/* Subtle grain */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden="true" />
      {/* Amber ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-omega-amber/6 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-white/40 mb-5"
        >
          The Rarest Active
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[700px] mb-14"
        >
          <h2
            className="font-display font-medium text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Omega-7. The Ingredient No
            <br />
            <span className="text-omega-amber">Competitor Can Replicate.</span>
          </h2>
          <p className="font-sans text-white/60 text-lg leading-relaxed max-w-[560px]">
            Palmitoleic Acid at 15–35% concentration. Found at meaningful levels in only
            two plant sources on earth. One of them is CEOVIA.
          </p>
        </motion.div>

        {/* 50/50 split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — large stat callouts */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="space-y-10"
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="font-display font-semibold text-omega-amber leading-none mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {value}
                </div>
                <div className="font-sans text-sm text-white/55 tracking-wide">
                  {label}
                </div>
                {i < stats.length - 1 && (
                  <div className="mt-10 h-px bg-white/10 w-full" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right — editorial copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            <div className="border-l-2 border-omega-amber pl-8 space-y-6 mb-10">
              <p className="font-sans text-white/75 text-base leading-relaxed">
                Omega-7 integrates directly into cell membrane phospholipid bilayers —
                restoring mucosal integrity, activating collagen synthesis, and modulating
                inflammatory signaling. This is a mechanism, not a marketing claim.
              </p>
              <p className="font-sans text-white/75 text-base leading-relaxed">
                Sourcing at altitude increases oil density. Pharmaceutical-grade extraction
                preserves the full bioactive profile. No mass-market brand achieves this
                concentration from a single botanical source.
              </p>
            </div>

            <button className="font-sans text-sm font-medium text-omega-amber underline underline-offset-4 hover:text-amber-400 transition-colors duration-200">
              Read the clinical dossier →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
