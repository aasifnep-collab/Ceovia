'use client'

import { useEffect, useMemo, useState } from 'react'

const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'mechanism', label: 'Mechanism' },
  { id: 'bioactives', label: 'Bioactives' },
  { id: 'protocol', label: '90-Day Protocol' },
  { id: 'framework', label: 'Clinical Framework' },
  { id: 'research', label: 'Research' },
  { id: 'partner', label: 'Partner Programme' },
]

export default function ClinicalInsightSubNav() {
  const [activeId, setActiveId] = useState('overview')
  const [visible, setVisible] = useState(false)

  const observerIds = useMemo(() => items.map((item) => item.id), [])

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = observerIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target?.id) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [observerIds])

  return (
    <div
      className={[
        'sticky top-[78px] z-40 border-b border-himalayan-green/10 bg-white/90 backdrop-blur-sm transition-all duration-300',
        visible ? 'translate-y-0 opacity-100 shadow-[0_1px_0_rgba(45,106,79,0.06)]' : '-translate-y-3 opacity-0',
      ].join(' ')}
    >
      <nav
        role="navigation"
        aria-label="Clinical Insight sections"
        className="section-wrapper overflow-x-auto py-3 md:py-4"
      >
        <div className="flex min-w-max items-center gap-3 whitespace-nowrap rounded-full bg-clinical-white/80 px-1 py-1 md:gap-4">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={[
                  'rounded-full border border-transparent px-3 py-2 font-[family-name:var(--font-sans)] text-[13px] tracking-wide transition-all duration-200',
                  isActive
                    ? 'border-himalayan-green/15 bg-himalayan-green/10 text-deep-green'
                    : 'text-text-muted hover:bg-white hover:text-text-dark',
                ].join(' ')}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
