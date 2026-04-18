'use client'

/**
 * ProgramSelector — bottle-count selector and purchase CTA.
 *
 * Variants: 1 Bottle (2-Month Supply) | 2 Bottles (4-Month Supply, best value).
 * Defaults to 2-bottles.
 *
 * State: selectedId — drives card highlight, price row, and CTA label.
 * Fires 'ceovia:variant' custom DOM event on selection so StickyMobileCTA
 * stays in sync without a shared context.
 *
 * Accessibility:
 * - Each card is a <button> with aria-pressed
 * - CTA is a <button type="button">
 * - Focus-visible rings on all interactive elements
 */

import { useState } from 'react'
import { useAddToCart } from '@/hooks/useAddToCart'

type Variant = {
  id: string
  label: string
  protocolLabel: string
  capsules: string
  duration: string
  price: number
  aed: number
  pricePerBottle: number
  saving: string | null
  recommended?: boolean
}

const VARIANTS: Variant[] = [
  {
    id: '1-bottle',
    label: '1 Bottle',
    protocolLabel: 'Foundational Supply',
    capsules: '120 Capsules',
    duration: '60-Day Supply',
    price: 150,
    aed: 550,
    pricePerBottle: 150,
    saving: null,
  },
  {
    id: '2-bottles',
    label: '2 Bottles',
    protocolLabel: 'Recommended 90-Day Path',
    capsules: '240 Capsules',
    duration: '120-Day Supply',
    price: 249,
    aed: 913,
    pricePerBottle: 125,
    saving: 'Save AED 187 (17%)',
    recommended: true,
  },
]

export default function ProgramSelector() {
  const [selectedId, setSelectedId] = useState<string>('2-bottles')
  const selected = VARIANTS.find((v) => v.id === selectedId) ?? VARIANTS[1]
  const { addToCart, isLoading, isSuccess, error } = useAddToCart()
  const ctaLabel =
    selected.id === '2-bottles'
      ? 'Start Recommended 90-Day Path'
      : 'Begin with Foundational Supply'

  const handleSelect = (v: Variant) => {
    setSelectedId(v.id)
    window.dispatchEvent(
      new CustomEvent('ceovia:variant', {
        detail: { id: v.id, label: v.label, priceUSD: v.price, priceAED: v.aed },
      })
    )
  }

  return (
    <section
      aria-labelledby="purchase-selector-heading"
      className="border-y border-[#C8D1CB]/40 bg-[#FBFCFB] py-16 shadow-[inset_0_-1px_0_rgba(200,209,203,0.28)] md:py-[4.5rem]"
    >
      <div className="section-wrapper">

        <div className="mx-auto mb-9 max-w-[42rem] text-center md:mb-10">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#0E5A36]">
            Select Your Protocol
          </p>
          <h2
            id="purchase-selector-heading"
            className="mt-3 font-display text-display-md text-[#0E5A36]"
          >
            Choose the supply that fits your routine
          </h2>
          <p className="mt-4 max-w-[39rem] mx-auto font-sans text-sm leading-relaxed text-[#4A5C52] md:text-[0.98rem]">
            Both options follow the same 2-capsule daily format. The recommended path gives you enough continuity to complete the 90-day protocol with room to stay consistent.
          </p>
          <p className="mt-3 max-w-[34rem] mx-auto font-sans text-xs leading-relaxed tracking-[0.01em] text-[#0E5A36]/82 md:text-sm">
            The recommended option is designed to align with CEOVIA&apos;s intended daily rhythm.
          </p>
        </div>

        {/* Variant cards — 2-column on sm+ */}
        <div className="mx-auto mb-11 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {VARIANTS.map((variant) => {
            const isSelected = variant.id === selectedId
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => handleSelect(variant)}
                aria-pressed={isSelected}
                className={[
                  'relative min-h-[244px] text-left rounded-[1.35rem] p-6 transition-all duration-300 sm:min-h-[260px] md:min-h-[272px]',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A4428] focus-visible:outline-offset-2',
                  isSelected
                    ? variant.recommended
                      ? 'bg-[#F3F8F4] border border-[#0A4428]/70 shadow-[0_10px_26px_rgba(16,38,28,0.08)] ring-1 ring-inset ring-[#D4A857]/30'
                      : 'bg-[#F7FAF8] border border-[#0A4428]/55 shadow-[0_8px_22px_rgba(16,38,28,0.06)]'
                    : variant.recommended
                      ? 'bg-white border border-[#D4A857]/45 hover:border-[#0A4428]/40 hover:shadow-[0_8px_24px_rgba(16,38,28,0.05)]'
                      : 'bg-white border border-[#C8D1CB]/60 hover:border-[#0A4428]/28 hover:shadow-[0_8px_22px_rgba(16,38,28,0.04)]',
                ].join(' ')}
              >

                {/* Selected checkmark — top-right */}
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#0A4428] flex items-center justify-center"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}

                {/* Recommended badge — above label */}
                {variant.recommended && (
                  <span className="mb-4 inline-flex rounded-full border border-[#D4A857]/65 bg-[#FCF7EA] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8B6914]">
                    Recommended
                  </span>
                )}

                <p className="mb-1.5 max-w-[20ch] font-sans text-[10px] font-medium uppercase leading-[1.35] tracking-[0.16em] text-[#0E5A36]">
                  {variant.protocolLabel}
                </p>

                {/* Uppercase label: "2 BOTTLES · 240 CAPSULES" */}
                <p className="mb-2.5 font-sans text-[11px] font-medium leading-[1.35] tracking-[0.12em] uppercase text-[#4A5C52]">
                  {variant.label.toUpperCase()} · {variant.capsules.toUpperCase()}
                </p>

                {/* Duration — serif heading */}
                <p className="mb-3 font-display text-display-sm leading-[1.04] text-[#0E5A36]">
                  {variant.duration}
                </p>

                {/* Price row */}
                <p className="font-sans text-xl font-medium text-[#2B2B2B]">
                  ${variant.price}
                  <span className="font-sans text-sm text-[#4A5C52] font-normal ml-2">
                    AED {variant.aed}
                  </span>
                </p>

                {/* Per bottle note */}
                <p className="font-sans text-xs text-[#4A5C52] mt-0.5">
                  ${variant.pricePerBottle} per bottle
                </p>

                <p className="mt-3 max-w-[28ch] font-sans text-xs leading-[1.65] text-[#4A5C52]">
                  {variant.id === '2-bottles'
                    ? 'Best for protocol continuity, fewer reorder decisions, and stronger value per bottle.'
                    : 'A concise way to begin the daily format before deciding on a longer path.'}
                </p>

                {/* Saving badge — only on variants that have one */}
                {variant.saving && (
                  <p className="mt-3 font-sans text-xs font-medium text-[#0E5A36]">
                    ✦ {variant.saving}
                  </p>
                )}

              </button>
            )
          })}
        </div>

        {/* CTA block — constrained width, centred */}
        <div className="mx-auto max-w-md rounded-[1.5rem] bg-white/72 px-2 py-1.5">

          {/* Primary Add to Cart */}
          <button
            type="button"
            disabled={isLoading || isSuccess}
            onClick={() => void addToCart(selected.id)}
            className={[
              'w-full rounded-full py-[1.1rem] font-sans text-[1rem] font-medium tracking-[0.01em] transition-all duration-200',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A36] focus-visible:outline-offset-2',
              isLoading
                ? 'bg-[#0E5A36] text-white opacity-70 cursor-not-allowed'
                : isSuccess
                ? 'bg-[#0A4428] text-white'
                : 'bg-[#0E5A36] text-white hover:bg-[#0A4428]',
            ].join(' ')}
          >
            {isLoading
              ? 'Adding...'
              : isSuccess
              ? 'Added ✓'
              : `${ctaLabel} →`}
          </button>

          {/* Trust microcopy */}
          <p className="mx-auto mt-4 max-w-[27rem] text-center font-sans text-[11px] leading-relaxed tracking-[0.02em] text-[#4A5C52]">
            Third-Party Tested · Halal Certified · No Fillers · Secure Checkout
          </p>

          {/* Error message */}
          {error && (
            <p className="font-sans text-xs text-red-600 text-center mt-2">
              {error}
            </p>
          )}

          {/* Science link */}
          <a
            href="/system"
            className="mt-5 block text-center font-sans text-sm font-medium text-[#0E5A36] hover:underline underline-offset-2"
          >
            View the 90-Day System →
          </a>

        </div>

      </div>
    </section>
  )
}
