/**
 * EvidenceBadge — maps the CEOVIA evidence tier system to a visual badge.
 *
 * Uses the same .badge-* component classes defined in tailwind.config.js
 * so styling stays in one place. Server component.
 */

type BadgeTier = 'gold' | 'silver' | 'bronze' | 'hypothesis'

const tiers: Record<BadgeTier, { label: string; symbol: string; className: string }> = {
  gold:       { label: 'Gold',       symbol: '●', className: 'badge-gold' },
  silver:     { label: 'Silver',     symbol: '○', className: 'badge-silver' },
  bronze:     { label: 'Bronze',     symbol: '△', className: 'badge-bronze' },
  hypothesis: { label: 'Hypothesis', symbol: '◇', className: 'badge-hypothesis' },
}

type Props = { tier: BadgeTier }

export default function EvidenceBadge({ tier }: Props) {
  const { label, symbol, className } = tiers[tier]
  return (
    <span className={`${className} shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]`}>
      <span aria-hidden="true" className="text-[0.8em]">{symbol}</span>
      {label}
    </span>
  )
}
