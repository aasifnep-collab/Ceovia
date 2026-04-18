'use client'

import EntryHero from '@/components/ui/EntryHero'
import ProductImageCarousel from '@/components/product/ProductImageCarousel'

const benefits = [
  '120 capsules per bottle',
  '2 capsules daily with food',
  'One-time purchase with secure checkout',
  'Halal certified and third-party tested',
]

export default function ProductHero() {
  return (
    <EntryHero
      id="product-hero-heading"
      variant="product"
      layout="split"
      align="left"
      eyebrow="Choose Your CEOVIA Supply"
      heading="The Daily CEOVIA Protocol, Ready to Start"
      description="Select the supply that fits your routine, understand exactly how to take it, and move to checkout with confidence. CEOVIA arrives as a 2-capsule daily format built for consistent use."
      actions={[
        { href: '#purchase-selector-heading', label: 'Choose Your Supply' },
        { href: '/science', label: 'Explore the Science', variant: 'secondary' },
      ]}
      footer={
        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A857]"
              />
              <span className="font-sans text-body-sm text-white/74">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      }
      media={<ProductImageCarousel />}
    />
  )
}
