'use client'

/**
 * StickyMobileCTA — persistent bottom bar on mobile only.
 *
 * Hidden on md: and above (desktop has hero CTA always in viewport).
 * Becomes visible after 200px scroll; hides when within 200px of the
 * page bottom (to avoid overlapping DisclaimerBlock / Footer).
 *
 * Syncs the selected variant from ProgramSelector via the
 * 'ceovia:variant' custom DOM event. Defaults to the
 * 2-bottle selection — matches ProgramSelector's initial state,
 * so the display is always correct without an initial handshake.
 *
 * Cart: uses useAddToCart hook — identical logic to ProgramSelector.
 * Each component holds its own hook instance (independent loading state).
 *
 * NOTE: pb-6 is the non-iOS fallback for safe-area inset.
 * For full notch support, add the @tailwindcss/safe-area plugin
 * and replace pb-6 with pb-safe.
 */

import { useState, useEffect } from 'react'
import { useAddToCart } from '@/hooks/useAddToCart'

type VariantInfo = {
  id: string
  label: string
  priceUSD: number
  priceAED: number
}

// Must match ProgramSelector's default selectedId = '2-bottles'
const DEFAULT_VARIANT: VariantInfo = {
  id: '2-bottles',
  label: '2 Bottles',
  priceUSD: 249,
  priceAED: 913,
}

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState<VariantInfo>(DEFAULT_VARIANT)
  const { addToCart, isLoading, isSuccess, error } = useAddToCart()
  const ctaLabel =
    variant.id === '2-bottles'
      ? 'Start Full Protocol'
      : 'Begin Supply'

  // ── Show / hide based on scroll position ────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrolled   = window.scrollY > 200
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 200
      setVisible(scrolled && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Sync selection from ProgramSelector ─────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<VariantInfo>
      setVariant(detail)
    }
    window.addEventListener('ceovia:variant', handler)
    return () => window.removeEventListener('ceovia:variant', handler)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={[
        'md:hidden fixed bottom-0 left-0 right-0 z-50',
        'transition-opacity duration-200',
        visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >

      {/* Error — absolute strip above the bar, disappears after 3000ms */}
      {error && (
        <div className="absolute bottom-full left-0 right-0 bg-white py-1 border-t border-[#C8D1CB]/60">
          <p className="font-sans text-xs text-red-600 text-center">
            {error}
          </p>
        </div>
      )}

      {/* Bar */}
      <div className="flex items-center justify-between gap-4 border-t border-[#C8D1CB]/60 bg-white px-5 py-3.5 pb-6 shadow-[0_-8px_24px_rgba(16,38,28,0.06)]">

        {/* Left: variant name + price */}
        <div className="min-w-0">
          <p className="font-sans text-sm font-medium leading-snug text-[#2B2B2B] truncate">
            {variant.label}
          </p>
          <p className="mt-0.5 font-sans text-xs text-[#4A5C52]">
            ${variant.priceUSD}
            <span className="ml-1">· AED {variant.priceAED}</span>
          </p>
        </div>

        {/* Right: Add to Cart */}
        <button
          type="button"
          disabled={isLoading || isSuccess}
          onClick={() => void addToCart(variant.id)}
          className={[
            'shrink-0 rounded-full px-4.5 py-3 font-sans text-[13px] font-medium leading-none transition-colors duration-200 sm:px-5',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A36] focus-visible:outline-offset-2',
            isLoading
              ? 'bg-[#0E5A36] text-white opacity-70 cursor-not-allowed'
              : isSuccess
                ? 'bg-[#0A4428] text-white'
              : 'bg-[#0E5A36] text-white hover:bg-[#0A4428]',
          ].join(' ')}
        >
          {isLoading ? 'Adding...' : isSuccess ? 'Added ✓' : ctaLabel}
        </button>

      </div>

    </div>
  )
}
