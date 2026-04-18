// src/components/ui/Button.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA Button component
//
// Variants:
//   primary   — Himalayan Green fill — commitment, purchase, primary action
//   secondary — Green outline — exploration, learn more
//   amber     — Omega Amber fill — urgency, energy, distributor CTAs
//   ghost     — Transparent + underline — inline text links
//
// Sizes: sm | md (default) | lg
// ─────────────────────────────────────────────────────────────────────────────

const variants = {
  primary:   'bg-himalayan-green text-white border-2 border-himalayan-green shadow-cta hover:bg-green-600 hover:shadow-cta-hover hover:-translate-y-px active:translate-y-0',
  secondary: 'bg-transparent text-himalayan-green border-2 border-himalayan-green hover:bg-green-50 hover:border-green-600',
  amber:     'bg-omega-amber text-white border-2 border-omega-amber shadow-amber-cta hover:bg-amber-600 hover:-translate-y-px active:translate-y-0',
  ghost:     'bg-transparent text-himalayan-green border-2 border-transparent underline underline-offset-4 hover:text-green-700',
};

const sizes = {
  sm:  'px-5 py-2 text-sm gap-1.5',
  md:  'px-8 py-3.5 text-[0.9375rem] gap-2',
  lg:  'px-10 py-4 text-base gap-2',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={[
        'inline-flex items-center justify-center font-sans font-medium rounded-pill',
        'transition-all duration-250 ease-ceovia-out cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalayan-green/30',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
