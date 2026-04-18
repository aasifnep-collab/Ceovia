'use client'

import { useState } from 'react'

export type AccordionItem = {
  q: string
  a: string
}

type Props = {
  items: AccordionItem[]
}

export default function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const btnId   = `faq-btn-${i}`
        const panelId = `faq-panel-${i}`

        return (
          <div
            key={i}
            className="border border-[#C8D1CB]/40 rounded-xl bg-white overflow-hidden"
          >
            <button
              type="button"
              id={btnId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between text-left px-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A36] focus-visible:outline-offset-2"
            >
              <span className="font-sans text-sm font-medium text-[#2B2B2B] pr-8">
                {item.q}
              </span>
              {/* + rotates to × when open */}
              <span
                aria-hidden="true"
                className={[
                  'shrink-0 text-[#4A5C52] text-xl font-normal leading-none transition-transform duration-200',
                  isOpen ? 'rotate-45' : '',
                ].join(' ')}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="px-6 pb-6 pt-0"
              >
                <p className="font-sans text-sm text-[#4A5C52] leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
