// src/components/ui/StatBlock.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA Stat Block — single statistic with label and optional note
//
// Usage:
//   <StatBlock value="190+" label="Bioactives" note="single plant source" />
//   <StatBlock value="Omega-7" label="Rarest Fatty Acid" color="amber" large />
//
// Colors: green (default) | amber | bronze | white (for dark sections)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const valueColors = {
  green:  'text-himalayan-green',
  amber:  'text-omega-amber',
  bronze: 'text-bronze',
  white:  'text-white',
};

const labelColors = {
  green:  'text-text-dark',
  amber:  'text-text-dark',
  bronze: 'text-text-dark',
  white:  'text-white/80',
};

const noteColors = {
  green:  'text-text-muted',
  amber:  'text-text-muted',
  bronze: 'text-text-muted',
  white:  'text-white/50',
};

export default function StatBlock({
  value,
  label,
  note,
  color = 'green',
  large = false,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className={['text-center', className].join(' ')}
    >
      <div
        className={[
          'font-display font-semibold leading-none tracking-tight',
          large ? 'text-display-xl' : 'text-display-lg',
          valueColors[color],
        ].join(' ')}
      >
        {value}
      </div>
      <div
        className={[
          'font-sans font-medium mt-2',
          large ? 'text-base' : 'text-sm',
          labelColors[color],
        ].join(' ')}
      >
        {label}
      </div>
      {note && (
        <div className={['font-sans text-xs mt-1', noteColors[color]].join(' ')}>
          {note}
        </div>
      )}
    </motion.div>
  );
}
