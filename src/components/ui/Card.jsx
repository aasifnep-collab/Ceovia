// src/components/ui/Card.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA Card component
//
// Variants:
//   default   — white background, subtle border + shadow, hover lift
//   warm      — clinical-white background, no hover lift
//   featured  — white background, amber border — "Recommended" / highlighted
//   dark      — deep green background, white text — dark section cards
// ─────────────────────────────────────────────────────────────────────────────

const variants = {
  default:  'bg-white border border-neutral-200 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250',
  warm:     'bg-clinical-white border border-neutral-200',
  featured: 'bg-white border-2 border-omega-amber shadow-bronze',
  dark:     'bg-deep-green/60 border border-white/10 backdrop-blur-sm',
};

export default function Card({ children, variant = 'default', className = '', ...props }) {
  return (
    <div
      className={[
        'rounded-xl p-6',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
