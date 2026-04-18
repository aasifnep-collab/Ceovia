import Link from 'next/link'
import type { ReactNode } from 'react'

type HeroAction = {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}

type HeroVariant = 'brand' | 'product' | 'utility'
type HeroLayout = 'stacked' | 'split'

type Props = {
  id: string
  eyebrow: string
  heading: string
  description: string
  actions?: HeroAction[]
  meta?: ReactNode
  footer?: ReactNode
  media?: ReactNode
  align?: 'center' | 'left'
  variant?: HeroVariant
  layout?: HeroLayout
  fullHeight?: boolean
}

const variantStyles: Record<
  HeroVariant,
  {
    section: string
    overlay: string
    bottomGlow: string
    shell: string
    contentWidth: string
    heading: string
    description: string
    actionPrimary: string
    actionSecondary: string
  }
> = {
  brand: {
    section: 'bg-deep-green text-white',
    overlay:
      'bg-[radial-gradient(circle_at_top_right,rgba(212,168,87,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_48%,rgba(255,255,255,0.03)_100%)]',
    bottomGlow: 'bg-gradient-to-b from-transparent to-white/6',
    shell: 'py-24 md:py-32',
    contentWidth: 'max-w-[72ch]',
    heading: 'text-[clamp(2.95rem,6vw,5.4rem)]',
    description: 'text-white/78',
    actionPrimary:
      'border border-omega-amber/70 bg-omega-amber text-deep-green hover:border-amber-600 hover:bg-amber-600',
    actionSecondary:
      'border border-white/28 bg-white/5 text-white hover:border-omega-amber/70 hover:bg-white/8',
  },
  product: {
    section: 'bg-deep-green text-white',
    overlay:
      'bg-[radial-gradient(circle_at_top_left,rgba(212,168,87,0.16),transparent_26%),radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0)_48%,rgba(14,28,20,0.18)_100%)]',
    bottomGlow: 'bg-gradient-to-b from-transparent to-[#0F1E15]/55',
    shell: 'py-16 md:py-24',
    contentWidth: 'max-w-[60ch]',
    heading: 'text-[clamp(2.8rem,5.6vw,5rem)]',
    description: 'text-white/76',
    actionPrimary:
      'border border-omega-amber/70 bg-omega-amber text-deep-green hover:border-amber-600 hover:bg-amber-600',
    actionSecondary:
      'border border-white/28 bg-white/5 text-white hover:border-omega-amber/70 hover:bg-white/8',
  },
  utility: {
    section: 'bg-[linear-gradient(180deg,#183224_0%,#1B3527_100%)] text-white',
    overlay:
      'bg-[radial-gradient(circle_at_top_right,rgba(212,168,87,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.015)_0%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.025)_100%)]',
    bottomGlow: 'bg-gradient-to-b from-transparent to-white/5',
    shell: 'py-16 md:py-20',
    contentWidth: 'max-w-[64ch]',
    heading: 'text-[clamp(2.6rem,5vw,4.55rem)]',
    description: 'text-white/74',
    actionPrimary:
      'border border-omega-amber/70 bg-omega-amber text-deep-green hover:border-amber-600 hover:bg-amber-600',
    actionSecondary:
      'border border-white/25 bg-white/5 text-white hover:border-omega-amber/70 hover:bg-white/8',
  },
}

function renderAction(
  action: HeroAction,
  className: string,
) {
  const classes = [
    'inline-flex items-center justify-center rounded-full px-7 py-3 font-sans text-[0.95rem] font-medium tracking-[0.01em] transition-all duration-200',
    className,
  ].join(' ')

  if (action.href.startsWith('#')) {
    return (
      <a key={action.href + action.label} href={action.href} className={classes}>
        {action.label}
      </a>
    )
  }

  return (
    <Link key={action.href + action.label} href={action.href} className={classes}>
      {action.label}
    </Link>
  )
}

export default function EntryHero({
  id,
  eyebrow,
  heading,
  description,
  actions = [],
  meta,
  footer,
  media,
  align = 'center',
  variant = 'brand',
  layout = media ? 'split' : 'stacked',
  fullHeight = false,
}: Props) {
  const styles = variantStyles[variant]
  const isSplit = layout === 'split' && media

  const alignClasses = isSplit || align === 'left' ? 'text-left' : 'mx-auto text-center'
  const actionAlign = isSplit || align === 'left' ? 'justify-start' : 'justify-center'

  return (
    <section aria-labelledby={id} className={styles.section}>
      <div
        className={[
          'section-wrapper relative overflow-hidden',
          styles.shell,
          fullHeight ? 'min-h-[calc(100vh-8rem)] flex items-center' : '',
        ].join(' ')}
      >
        <div aria-hidden="true" className={`absolute inset-0 ${styles.overlay}`} />
        <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-28 ${styles.bottomGlow}`} />

        <div
          className={[
            'relative w-full',
            isSplit
              ? 'grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:gap-12 lg:gap-20'
              : '',
          ].join(' ')}
        >
          <div className={`${styles.contentWidth} ${alignClasses}`}>
            <p
              aria-hidden="true"
              className="mb-6 font-sans text-label-md uppercase tracking-[0.18em] text-omega-amber"
            >
              {eyebrow}
            </p>

            <h1
              id={id}
              className={`font-display leading-[0.98] tracking-[-0.03em] text-white ${styles.heading}`}
            >
              {heading}
            </h1>

            {meta ? <div className="mt-5">{meta}</div> : null}

            <p className={`mt-6 max-w-[58ch] font-sans text-body-lg leading-relaxed ${styles.description}`}>
              {description}
            </p>

            {footer ? <div className="mt-7">{footer}</div> : null}

            {actions.length > 0 ? (
              <div className={`mt-10 flex flex-wrap gap-3 ${actionAlign}`}>
                {actions.map((action) =>
                  renderAction(
                    action,
                    action.variant === 'secondary' ? styles.actionSecondary : styles.actionPrimary,
                  ),
                )}
              </div>
            ) : null}
          </div>

          {isSplit ? <div className="relative flex items-center justify-center">{media}</div> : null}
        </div>
      </div>
    </section>
  )
}
