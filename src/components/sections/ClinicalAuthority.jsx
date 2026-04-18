import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Peer-Reviewed Studies' },
  { value: '40+',  label: 'Years of Clinical Research' },
  { value: '6',    label: 'Body Systems with Documented Evidence' },
  { value: '~23%', label: 'Skin Hydration Improvement at 90 Days', cite: 'Chan et al., 2024' },
];

export default function ClinicalAuthority() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 bg-deep-green relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-himalayan-green/10 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-white/40 mb-5"
        >
          The Science
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[640px] mb-16"
        >
          <h2
            className="font-display font-medium text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Built on Decades of
            <br />
            <span className="text-omega-amber">Peer-Reviewed Research.</span>
          </h2>
        </motion.div>

        {/* Stat blocks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-16"
        >
          {stats.map(({ value, label, cite }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
              className="bg-deep-green px-8 py-8"
            >
              <div
                className="font-display font-semibold text-omega-amber leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {value}
              </div>
              <div className="font-sans text-sm text-white/65 leading-snug mb-1">
                {label}
              </div>
              {cite && (
                <div className="font-sans text-[0.625rem] text-white/30 mt-1">
                  {cite}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-[680px] mb-12"
        >
          <div className="w-8 h-0.5 bg-omega-amber mb-6" />
          <blockquote className="font-display text-xl font-medium text-white leading-snug mb-5"
            style={{ fontStyle: 'italic' }}>
            "Sea Buckthorn is one of the most comprehensively studied medicinal plants in the world.
            Its Omega-7 content is unmatched in the plant kingdom."
          </blockquote>
          <cite className="font-sans text-sm text-white/40 not-italic">
            — Integrative Medicine Specialist [Placeholder]
          </cite>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="font-sans text-xs text-white/25 max-w-[600px]"
        >
          Research cited refers to bioactive compounds in CEOVIA's formulation.
          These studies do not constitute product-specific medical claims.
          Individual results may vary. Consult a qualified healthcare practitioner before use.
        </motion.p>
      </div>
    </section>
  );
}
