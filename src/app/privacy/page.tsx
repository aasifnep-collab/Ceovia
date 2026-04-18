import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Under Review',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-amber-600 text-white px-4 py-3 text-center text-sm font-bold">
        UNDER LEGAL REVIEW — NOT FOR PUBLIC USE
      </div>
      <main className="section-wrapper py-16 opacity-50 pointer-events-none select-none">
        <h1 className="font-display text-display-lg text-green-600 mb-8">
          Privacy Policy
        </h1>
        <p className="font-sans text-body-md text-[#4A5C52]">
          This document is currently under legal review. For enquiries contact:{' '}
          <span className="text-[#0E5A36]">legal@ceovia.com</span>
        </p>
      </main>
    </div>
  )
}
