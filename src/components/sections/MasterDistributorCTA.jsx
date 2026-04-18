import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function MasterDistributorCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-clinical-white">

      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-himalayan-green mb-0"
        >
          Take the Next Step
        </motion.p>
      </div>

      {/* Two-column panels */}
      <div className="max-w-7xl mx-auto px-6 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 border border-neutral-200 rounded-3xl overflow-hidden">

          {/* Left — Consumer */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="px-10 py-14 bg-white flex flex-col justify-between"
          >
            <div>
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-text-muted mb-5 block">
                For You
              </span>
              <h2
                className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
              >
                Start Your
                <br />
                90-Day Protocol.
              </h2>
              <p className="font-sans text-text-muted text-base leading-relaxed mb-8 max-w-[380px]">
                90-day guarantee. Free shipping. Cancel subscription anytime.
              </p>
            </div>
            <button className="btn-amber self-start">
              Shop CEOVIA →
            </button>
          </motion.div>

          {/* Vertical divider with monogram — desktop only */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-neutral-100 relative">
            <div className="absolute inset-0 bg-neutral-100" />
            <div className="relative z-10 bg-clinical-white border border-neutral-200 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="font-display text-sm font-semibold text-himalayan-green leading-none">C</span>
            </div>
          </div>

          {/* Right — Distributor */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="px-10 py-14 bg-clinical-white flex flex-col justify-between border-t border-neutral-200 lg:border-t-0"
          >
            <div>
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-text-muted mb-5 block">
                For Partners
              </span>
              <h2
                className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
              >
                Become a
                <br />
                Master Distributor.
              </h2>
              <p className="font-sans text-text-muted text-base leading-relaxed mb-8 max-w-[380px]">
                Exclusive territory. Day 1 compliance. GCC, EU, and Asia-Pacific
                openings available now.
              </p>
            </div>
            <button className="btn-primary self-start">
              Request Distributor Brief →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-10 mt-0"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-8">
          <div className="font-sans text-xs text-text-muted">
            AK Pharma Inc. · Miami, FL
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@akpharmausa.com"
              className="font-sans text-xs text-text-muted hover:text-himalayan-green transition-colors duration-200"
            >
              info@akpharmausa.com
            </a>
            <a
              href="https://ceovia.com"
              className="font-sans text-xs text-text-muted hover:text-himalayan-green transition-colors duration-200"
            >
              ceovia.com
            </a>
          </div>
          <div className="font-sans text-xs text-neutral-300">
            © {new Date().getFullYear()} AK Pharma Inc.
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
