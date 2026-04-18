'use client'

import { useMemo, useState } from 'react'
import { researchDisclaimer, researchDomains, researchStats } from '@/data/clinicalInsight'
import EvidenceDrawer from '@/components/evidence/EvidenceDrawer'
import { BODY_SYSTEM_LABELS, type BodySystemTag, type DrawerMode } from '@/data/evidence'

type DrawerState =
  | { open: false; mode: DrawerMode; domain: BodySystemTag | null }
  | { open: true; mode: DrawerMode; domain: BodySystemTag | null }

const domainIdMap: Record<string, BodySystemTag> = {
  'Dermatology Research': 'dermatology',
  'Mucosal & Epithelial Health': 'mucosal',
  'Oxidative Stress & Recovery': 'oxidative',
  'Immune & Adaptive Resilience': 'immune',
  'Metabolic & Whole-Body Vitality': 'metabolic',
}

const metricCtas = ['View studies →', 'Explore timeline →', 'Browse by system →']

export default function ResearchGateway() {
  const [drawer, setDrawer] = useState<DrawerState>({
    open: false,
    mode: 'all',
    domain: null,
  })

  const cards = useMemo(
    () =>
      researchDomains.map((domain) => ({
        ...domain,
        domainId: domainIdMap[domain.domain] ?? 'dermatology',
      })),
    [],
  )

  const openDrawer = (mode: DrawerMode, domain: BodySystemTag | null = null) => {
    setDrawer({ open: true, mode, domain })
  }

  return (
    <>
      <section id="research" className="section-grey scroll-mt-32">
        <div className="section-wrapper py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
              Research Gateway
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
              Where the evidence clusters
            </h2>
            <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
              The research landscape around Sea Buckthorn is broad. For web clarity, it is best organised into domains that practitioners can scan quickly without losing scientific context.
            </p>

            <div className="mt-10 grid gap-4 rounded-2xl border border-himalayan-green/10 bg-white px-5 py-5 md:grid-cols-3 md:px-6">
              {researchStats.map((stat, index) => (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => openDrawer(index === 0 ? 'all' : index === 1 ? 'timeline' : 'systems')}
                  aria-haspopup="dialog"
                  className="rounded-xl border border-himalayan-green/10 bg-clinical-white px-5 py-5 text-left transition-colors duration-200 hover:border-himalayan-green/20"
                >
                  <p className="font-[family-name:var(--font-display)] text-[2.1rem] leading-none text-deep-green">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-sans)] text-sm uppercase tracking-[0.08em] text-text-muted">
                    {stat.label}
                  </p>
                  <span className="mt-5 inline-flex font-[family-name:var(--font-sans)] text-sm font-medium text-himalayan-green">
                    {metricCtas[index]}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {cards.map((domain) => (
                <button
                  key={domain.domain}
                  type="button"
                  onClick={() => openDrawer('filtered', domain.domainId)}
                  aria-haspopup="dialog"
                  className="rounded-2xl border border-himalayan-green/12 bg-white p-6 text-left transition-colors duration-200 hover:border-himalayan-green/20"
                >
                  <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
                    {domain.domain}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-sans)] text-body-md text-text-dark">
                    {domain.summary}
                  </p>
                  <p className="mt-5 flex items-start gap-2 font-[family-name:var(--font-sans)] text-sm italic text-text-muted">
                    <span aria-hidden="true">ⓘ</span>
                    <span>{domain.limitationNote}</span>
                  </p>
                  <span className="mt-5 inline-flex font-[family-name:var(--font-sans)] text-sm font-medium text-himalayan-green">
                    Browse related studies →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-himalayan-green/8 px-6 py-6 md:px-8">
              <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-text-muted">
                {researchDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <EvidenceDrawer
        open={drawer.open}
        mode={drawer.mode}
        initialDomain={drawer.domain}
        onClose={() => setDrawer((current) => ({ ...current, open: false }))}
      />
    </>
  )
}
