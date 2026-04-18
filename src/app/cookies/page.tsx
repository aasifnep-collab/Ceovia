import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Cookie Notice — CEOVIA',
    description: 'A brief overview of how CEOVIA uses cookies and similar technologies.',
    path: '/cookies',
  }),
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="section-wrapper py-16">
        <h1 className="font-display text-display-lg text-green-600 mb-8">
          Cookie Notice
        </h1>
        <div className="max-w-prose space-y-5 font-sans text-body-md text-[#4A5C52] leading-relaxed">
          <p>
            CEOVIA uses essential site technologies to support security, navigation,
            and storefront functionality. Limited analytics cookies may also be used
            when enabled to understand site performance and improve the customer
            experience.
          </p>
          <p>
            A more detailed policy will be published as the site’s analytics and
            consent tooling are finalised. For privacy or data requests, contact{' '}
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
