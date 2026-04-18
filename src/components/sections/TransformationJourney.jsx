import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const milestones = [
  {
    id:      'week-1-2',
    label:   'Week 1–2',
    title:   'The Shift Begins',
    summary: 'Sleep quality improves. Energy stabilises.',
    detail:  'The cellular foundation is being built — invisibly, but reliably. Omega-7 begins integrating into membrane phospholipid bilayers. Selenium activates glutathione peroxidase. The antioxidant cascade initiates.',
  },
  {
    id:      'week-3-4',
    label:   'Week 3–4',
    title:   'Early Signals',
    summary: 'Skin feels more hydrated. Digestion improves.',
    detail:  'These are the first confirmations. Gut epithelial cells have completed their 3–5 day renewal cycle — now carrying a full bioactive load. Mucosal integrity is measurably improved. Many users report this as the point they feel "different."',
  },
  {
    id:      'week-5-8',
    label:   'Week 5–8',
    title:   'The Transformation',
    summary: 'Luminosity becomes visible. Mood steadies.',
    detail:  'Energy is consistently higher. Skin luminosity and hydration are now externally visible. Cardiovascular and hormonal co-factors are active. You begin sharing your experience — because the change is no longer internal only.',
  },
  {
    id:      'day-90',
    label:   'Day 90',
    title:   'Measurable Results',
    summary: '~23% skin hydration improvement. Biomarkers respond.',
    detail:  'Improved cardiovascular markers. Hormonal balance restored. Collagen density measurably increased. This is not an acute effect — it is a new cellular baseline. The protocol is complete. You reorder.',
  },
];

export default function TransformationJourney() {
  const [activeId, setActiveId] = useState(null);
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
          Your Protocol
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[640px] mb-16"
        >
          <h2
            className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Progressive. Visible.
            <br />
            Measurable.
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            Every phase is designed. Every outcome is anticipated.
          </p>
        </motion.div>

        {/* Timeline — vertical mobile, horizontal desktop */}
        <div className="relative">

          {/* Horizontal connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-[1.375rem] left-0 right-0 h-px bg-neutral-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {milestones.map((m, i) => {
              const isActive = activeId === m.id;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  className="relative"
                >
                  {/* Milestone circle */}
                  <button
                    onClick={() => setActiveId(isActive ? null : m.id)}
                    className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 w-full text-left group focus-visible:outline-none"
                    aria-expanded={isActive}
                  >
                    {/* Amber dot */}
                    <div className={[
                      'flex-shrink-0 w-[1.75rem] h-[1.75rem] rounded-full border-2 transition-all duration-250 relative z-10 lg:mb-5',
                      isActive
                        ? 'bg-omega-amber border-omega-amber'
                        : 'bg-white border-neutral-300 group-hover:border-omega-amber',
                    ].join(' ')} />

                    <div>
                      {/* Label */}
                      <span className={[
                        'font-sans text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-200',
                        isActive ? 'text-omega-amber' : 'text-text-muted group-hover:text-omega-amber',
                      ].join(' ')}>
                        {m.label}
                      </span>

                      {/* Title */}
                      <h3 className={[
                        'font-sans font-semibold text-base mt-0.5 transition-colors duration-200',
                        isActive ? 'text-himalayan-green' : 'text-text-dark',
                      ].join(' ')}>
                        {m.title}
                      </h3>

                      {/* Summary */}
                      <p className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                        {m.summary}
                      </p>
                    </div>
                  </button>

                  {/* Expandable detail */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden lg:mt-4"
                      >
                        <div className="lg:ml-0 ml-[3.25rem] pt-3 pb-1">
                          <div className="bg-clinical-white rounded-xl border border-neutral-200 p-4">
                            <p className="font-sans text-sm text-text-muted leading-relaxed">
                              {m.detail}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
