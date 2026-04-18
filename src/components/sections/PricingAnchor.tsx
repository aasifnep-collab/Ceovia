/**
 * PricingAnchor — a static pricing reference between System and Evidence.
 *
 * Reads as footnote-level metadata: price point + system context.
 * No animation, no hover effects, no decorative elements.
 * Server component — zero JS.
 */
export default function PricingAnchor() {
  return (
    <div className="bg-white border-y border-[#C8D1CB]/40 py-3">
      <div className="section-wrapper text-center">
        <a
          href="/products/ceovia-90-day"
          className="font-sans text-sm text-[#4A5C52] tracking-wide hover:text-[#0E5A36] transition-colors duration-200"
        >
          From AED 550 / $150 · Best Value bundle: 2 Bottles for AED 913 / $249 · Clinical Luxury Daily System
        </a>
      </div>
    </div>
  )
}
