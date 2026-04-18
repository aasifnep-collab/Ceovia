import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ai/ChatWidget'
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
  title: 'CEOVIA — Rejuvenation From Within',
  description:
    'A clinically structured 90-day system designed to support skin, energy, and overall wellness. Powered by 190+ bioactive compounds from Himalayan Sea Buckthorn seed oil.',
  metadataBase: new URL('https://ceovia.com'),
  openGraph: {
    title: 'CEOVIA — Rejuvenation From Within',
    description:
      'A clinically structured 90-day system designed to support skin, energy, and overall wellness.',
    siteName: 'CEOVIA',
    locale: 'en_US',
    type: 'website',
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
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
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
