import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Shipping & Returns — CEOVIA',
  description: 'CEOVIA shipping policy, delivery times, and returns process.',
  path: '/shipping',
})

export default function ShippingPage() {
  return (
    <section aria-labelledby="shipping-heading" className="section-white">
      <div className="section-wrapper py-20 md:py-28">
        <div className="max-w-prose-narrow mx-auto">

          <h1
            id="shipping-heading"
            className="font-display text-display-md text-green-600 mb-10"
          >
            Shipping & Returns
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="font-sans text-sm font-medium tracking-widest uppercase text-[#0E5A36] mb-3">
                Shipping
              </h2>
              <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                Orders are processed within 1–2 business days. Delivery times vary
                by region. International shipping is available. Full shipping rates
                and timelines will be confirmed at checkout.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-sm font-medium tracking-widest uppercase text-[#0E5A36] mb-3">
                Returns
              </h2>
              <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                We offer a 30-day satisfaction policy on unopened products. If you
                are not satisfied, contact us within 30 days of delivery. Opened
                products are not eligible for return due to food safety regulations.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-sm font-medium tracking-widest uppercase text-[#0E5A36] mb-3">
                Orders
              </h2>
              <p className="font-sans text-body-sm text-[#4A5C52] leading-relaxed">
                CEOVIA is currently available as a one-time purchase. Order
                updates, shipping confirmation, and delivery tracking will be
                sent by email after checkout.
              </p>
            </div>

            <p className="font-sans text-body-xs text-[#4A5C52] leading-relaxed border-t border-[#C8D1CB]/40 pt-8">
              For shipping or returns enquiries, please use the contact form so the
              CEOVIA team can route your request correctly.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/products/ceovia-90-day" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
