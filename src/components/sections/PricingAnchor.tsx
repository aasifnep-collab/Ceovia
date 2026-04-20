/**
 * PricingAnchor — a live Shopify pricing reference between System and Evidence.
 *
 * Reads as footnote-level metadata: price point + system context.
 * No animation, no hover effects, no decorative elements.
 * Server component — zero JS.
 */
import { getCeoviaOffers } from '@/lib/shopify/offers'

export default async function PricingAnchor() {
  const offers = await getCeoviaOffers()
  const starterOffer = offers.find((offer) => offer.key === '60day') ?? offers[0]
  const recommendedOffer = offers.find((offer) => offer.key === '90day') ?? offers[offers.length - 1]

  return (
    <div className="bg-white border-y border-[#C8D1CB]/40 py-3">
      <div className="section-wrapper text-center">
        <a
          href="/products/ceovia-90-day"
          className="font-sans text-sm text-[#4A5C52] tracking-wide hover:text-[#0E5A36] transition-colors duration-200"
        >
          {starterOffer.title} {starterOffer.priceDisplay} · Recommended {recommendedOffer.title} {recommendedOffer.priceDisplay} · Live Shopify pricing
        </a>
      </div>
    </div>
  )
}
