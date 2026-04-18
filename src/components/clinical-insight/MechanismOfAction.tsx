'use client'

import type { ComponentType, ReactNode } from 'react'
import TabGroup from '@/components/ui/TabGroup'
import Accordion from '@/components/ui/Accordion'
import { mechanismCallout, mechanismLayers } from '@/data/clinicalInsight'

type TabItem = {
  id: string
  label: string
  content: ReactNode
}

type TabGroupProps = {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

type AccordionItem = {
  id: string
  question: string
  answer: string
  intro: string
  bullets: { term: string; detail: string }[]
}

type AccordionProps = {
  items: AccordionItem[]
  renderAnswer?: (item: AccordionItem) => ReactNode
  allowMultiple?: boolean
  className?: string
}

const TypedTabGroup = TabGroup as ComponentType<TabGroupProps>
const TypedAccordion = Accordion as ComponentType<AccordionProps>

function Panel({ intro, bullets }: { intro: string; bullets: { term: string; detail: string }[] }) {
  return (
    <div className="rounded-2xl bg-clinical-white p-6 md:p-8">
      <p className="font-[family-name:var(--font-sans)] text-body-lg text-text-dark">{intro}</p>
      <ul className="mt-6 space-y-4">
        {bullets.map((bullet) => (
          <li key={bullet.term} className="font-[family-name:var(--font-sans)] text-body-md text-text-dark">
            <span className="font-medium text-deep-green">{bullet.term}: </span>
            <span>{bullet.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MechanismOfAction() {
  const tabs = mechanismLayers.map((layer) => ({
    id: layer.id,
    label: layer.label,
    content: <Panel intro={layer.intro} bullets={layer.bullets} />,
  }))

  const accordionItems = mechanismLayers.map((layer) => ({
    id: layer.id,
    question: layer.label,
    answer: layer.intro,
    intro: layer.intro,
    bullets: layer.bullets,
  }))

  return (
    <section id="mechanism" className="section-grey scroll-mt-32">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            Mechanism of Action
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            A three-layer view of biological support
          </h2>
          <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
            The value of the ingredient matrix is best understood in layers: what it may support at the cellular level, how that translates across systems, and how a protocol can help make those outcomes observable.
          </p>

          <div className="mt-14 hidden md:block">
            <TypedTabGroup tabs={tabs} defaultTab={mechanismLayers[0].id} />
          </div>

          <div className="mt-12 md:hidden">
            <TypedAccordion
              items={accordionItems}
              renderAnswer={(item) => (
                <Panel intro={item.intro} bullets={item.bullets} />
              )}
            />
          </div>

          <div className="mt-12 rounded-2xl border border-himalayan-green/15 bg-white px-6 py-6 md:px-8">
            <p className="font-[family-name:var(--font-sans)] text-body-md text-deep-green">
              {mechanismCallout}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
