// src/components/ui/SectionLabel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA section eyebrow label
// Uppercase Inter, 11px, 0.15em tracking — per brand spec
//
// Colors: green (default) | amber | bronze | muted
// ─────────────────────────────────────────────────────────────────────────────

const colors = {
  green:  'text-himalayan-green',
  amber:  'text-omega-amber',
  bronze: 'text-bronze',
  muted:  'text-text-muted',
  white:  'text-white/70',
};

export default function SectionLabel({ children, color = 'green', className = '' }) {
  return (
    <p
      className={[
        'font-sans font-medium uppercase tracking-[0.15em]',
        'text-[0.6875rem] leading-none mb-4',
        colors[color],
        className,
      ].join(' ')}
    >
      {children}
    </p>
  );
}
