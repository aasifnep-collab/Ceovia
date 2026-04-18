import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Terms of Use — CEOVIA',
    description: 'Terms governing use of the CEOVIA website, content, and storefront.',
    path: '/terms',
  }),
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="section-wrapper py-16">
        <h1 className="font-display text-display-lg text-green-600 mb-8">
          Terms of Use
        </h1>
        <div className="max-w-prose space-y-5 font-sans text-body-md text-[#4A5C52] leading-relaxed">
          <p>
            By using this website, you agree to use CEOVIA content and purchasing
            tools for lawful, personal, and business enquiry purposes only.
          </p>
          <p>
            Product information on this site is provided for general wellness
            education and ecommerce purposes. If you require legal, commercial, or
            policy clarification, contact{' '}
            <a className="text-[#0E5A36] underline underline-offset-2" href="mailto:legal@ceovia.com">
              legal@ceovia.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
