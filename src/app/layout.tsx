import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ai/ChatWidget'
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker'
import GoogleTagManager from '@/components/analytics/GoogleTagManager'
import JsonLd from '@/components/seo/JsonLd'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CEOVIA — Clinically Structured Wellness',
    template: '%s',
  },
  description:
    'A clinically structured 90-day system designed to support skin, energy, and overall wellness. Powered by 190+ bioactive compounds from Himalayan Sea Buckthorn seed oil.',
  metadataBase: new URL('https://ceovia.com'),
  alternates: {
    canonical: 'https://ceovia.com',
  },
  openGraph: {
    title: 'CEOVIA — Clinically Structured Wellness',
    description:
      'A clinically structured 90-day system designed to support skin, energy, and overall wellness.',
    siteName: 'CEOVIA',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ceovia.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CEOVIA — clinically structured wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEOVIA — Clinically Structured Wellness',
    description:
      'A clinically structured 90-day system designed to support skin, energy, and overall wellness.',
    images: ['https://ceovia.com/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CEOVIA',
    url: 'https://ceovia.com',
    logo: 'https://ceovia.com/images/ceovia-logo.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@ceovia.com',
      availableLanguage: ['English'],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CEOVIA',
    url: 'https://ceovia.com',
    inLanguage: 'en',
  }

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
        <GoogleTagManager />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <AnalyticsTracker />

        {/* Skip navigation link — visible on keyboard focus only */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          {children}
        </main>

        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
