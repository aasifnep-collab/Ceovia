import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Privacy Notice — CEOVIA',
    description: 'A summary of how CEOVIA handles enquiries, storefront data, and customer privacy requests.',
    path: '/privacy',
  }),
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="section-wrapper py-16">
        <h1 className="font-display text-display-lg text-green-600 mb-8">
          Privacy Notice
        </h1>
        <div className="max-w-prose space-y-5 font-sans text-body-md text-[#4A5C52] leading-relaxed">
          <p>
            CEOVIA collects the details you submit through checkout and contact
            forms so the team can fulfil orders, respond to enquiries, and support
            customer service.
          </p>
          <p>
            Information is processed through CEOVIA&apos;s ecommerce and site
            infrastructure providers. If you would like to request access, correction,
            or deletion of your submitted information, contact{' '}
            <a className="text-[#0E5A36] underline underline-offset-2" href="mailto:privacy@ceovia.com">
              privacy@ceovia.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
