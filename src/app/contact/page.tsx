import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactInquirySystem from '@/components/contact/ContactInquirySystem'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact — CEOVIA',
  description:
    'Connect with the CEOVIA team for product support, clinical enquiries, or distribution partnerships.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="section-white">
      <div className="section-wrapper py-24 md:py-32">
        <ContactHero />
        <ContactInquirySystem />
      </div>
    </section>
  )
}
