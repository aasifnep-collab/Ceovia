'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { pillars } from '@/data/clinicalInsight'
import { EASE_OUT } from '@/lib/motion'

function PillarIcon({ icon }: { icon: string }) {
  if (icon === 'skin') {
    return <span aria-hidden="true" className="text-lg">◌</span>
  }
  if (icon === 'repair') {
    return <span aria-hidden="true" className="text-lg">✧</span>
  }
  if (icon === 'immune') {
    return <span aria-hidden="true" className="text-lg">△</span>
  }
  return <span aria-hidden="true" className="text-lg">◐</span>
}

export default function ClinicalFramework() {
  const [openId, setOpenId] = useState<string | null>(pillars[0].id)

  return (
    <section id="framework" className="section-white scroll-mt-32">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            Clinical Framework
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            Four pillars that organise the evidence into practice
          </h2>
          <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
            These pillars are not framed as separate product claims. They are a practitioner-facing way to understand how ingredient-level evidence clusters across whole-body support domains.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => {
              const isOpen = openId === pillar.id
              const panelId = `${pillar.id}-panel`
              const buttonId = `${pillar.id}-button`

              return (
                <div
                  key={pillar.id}
                  className={[
                    'rounded-2xl border border-himalayan-green/12 transition-all duration-200 shadow-[0_1px_0_rgba(45,106,79,0.03)]',
                    isOpen ? 'bg-himalayan-green/10' : 'bg-white',
                  ].join(' ')}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : pillar.id)}
                    className="flex w-full items-start gap-4 p-6 text-left md:p-7"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-himalayan-green/10 text-himalayan-green">
                      <PillarIcon icon={pillar.icon} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] leading-tight text-deep-green">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 font-[family-name:var(--font-sans)] text-body-md text-text-muted">
                        {pillar.summary}
                      </p>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="space-y-4 border-t border-himalayan-green/10 pt-5">
                            <div>
                              <p className="font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                                Mechanism
                              </p>
                              <p className="mt-2 font-[family-name:var(--font-sans)] text-body-md text-text-dark">
                                {pillar.mechanism}
                              </p>
                            </div>
                            <div>
                              <p className="font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                                Supporting Bioactives
                              </p>
                              <p className="mt-2 font-[family-name:var(--font-sans)] text-body-md text-text-dark">
                                {pillar.bioactives}
                              </p>
                            </div>
                            <div>
                              <p className="font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                                Outcome Statement
                              </p>
                              <p className="mt-2 font-[family-name:var(--font-display)] text-[1.05rem] italic text-deep-green">
                                {pillar.outcomeStatement}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
