import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numericTarget = parseInt(String(target).replace(/\D/g, ''), 10);
    if (isNaN(numericTarget)) { setDisplay(target); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {typeof target === 'string' && target.includes('+')
        ? `${display}+`
        : display}
      {suffix}
    </span>
  );
}

const trustStats = [
  { value: '190+', label: 'Bioactives' },
  { value: '90',   label: '90-Day System', suffix: '-Day' },
  { value: '200+', label: 'Studies' },
  { value: '6',    label: 'Body Systems' },
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col bg-clinical-white overflow-hidden"
    >
      {/* Deep green decorative element — top right */}
      <div
        className="absolute top-0 right-0 w-[45vw] h-[70vh] bg-deep-green rounded-bl-[80px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle grain on the green shape */}
      <div
        className="absolute top-0 right-0 w-[45vw] h-[70vh] bg-grain opacity-30 rounded-bl-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center flex-1 max-w-7xl mx-auto w-full px-6 pt-24 pb-12 gap-12 lg:gap-0">

        {/* Left — 55% copy */}
        <div className="w-full lg:w-[55%] lg:pr-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-himalayan-green mb-5"
          >
            Himalayan Sea Buckthorn · Single Source
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-medium text-text-dark leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
          >
            A Cellular Bioactivation
            <br />
            System. Not a
            <br />
            <em className="text-himalayan-green not-italic">Supplement.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.33, 1, 0.68, 1] }}
            className="font-sans text-text-muted text-lg leading-relaxed mb-10 max-w-[480px]"
          >
            190+ bioactives. One daily capsule.
            90 days to measurable transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.34, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn-primary">
              Start My Protocol
            </button>
            <button className="font-sans font-medium text-[0.9375rem] text-himalayan-green underline underline-offset-4 hover:text-green-700 transition-colors duration-200 py-3 px-2">
              See the Science →
            </button>
          </motion.div>
        </div>

        {/* Right — 45% product visual */}
        <div className="w-full lg:w-[45%] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            className="relative w-full max-w-[420px] aspect-[3/4]"
          >
            {/* IMAGE: CEOVIA product bottle hero shot on transparent/white background */}
            <div className="w-full h-full rounded-3xl bg-green-50 border border-green-100 flex items-end justify-center pb-10">
              <div className="text-center">
                <div className="font-display text-4xl font-semibold text-himalayan-green mb-1">CEOVIA</div>
                <div className="font-sans text-xs text-text-muted uppercase tracking-[0.15em]">90-Day System</div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -left-4 top-1/3 bg-white rounded-xl shadow-lg px-4 py-3 border border-neutral-100">
              <div className="font-display text-2xl font-semibold text-omega-amber leading-none">190+</div>
              <div className="font-sans text-[0.625rem] text-text-muted uppercase tracking-wide mt-0.5">Bioactives</div>
            </div>
            <div className="absolute -right-4 bottom-1/4 bg-deep-green rounded-xl px-4 py-3">
              <div className="font-display text-2xl font-semibold text-white leading-none">All 4</div>
              <div className="font-sans text-[0.625rem] text-white/60 uppercase tracking-wide mt-0.5">Omegas</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust bar — below fold */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative z-10 border-t border-neutral-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-neutral-200">
          {trustStats.map(({ value, label, suffix }, i) => (
            <div key={label} className="px-6 first:pl-0 last:pr-0 text-center">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-himalayan-green leading-none mb-1">
                <CountUp target={value} suffix={suffix} duration={1800} />
              </div>
              <div className="font-sans text-xs text-text-muted uppercase tracking-[0.1em]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
