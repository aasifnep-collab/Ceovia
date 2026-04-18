import type { Metadata } from 'next'
import EntryHero from '@/components/ui/EntryHero'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title: 'Our Story — CEOVIA',
  description: 'The story behind CEOVIA and the 90-day wellness system.',
}

export default function AboutPage() {
  return (
    <>
      <EntryHero
        variant="brand"
        id="about-heading"
        eyebrow="Our Story"
        heading="About CEOVIA"
        description="The story behind CEOVIA and the 90-day wellness system."
        align="left"
        actions={[
          { href: '/science', label: 'The Evidence Framework', variant: 'secondary' },
          { href: '/products/ceovia-90-day', label: 'Start Your System' },
        ]}
      />
      <section className="section-white">
        <div className="section-wrapper py-20 md:py-24">
          <div className="max-w-prose-narrow mx-auto">

            <div className="space-y-6">
              <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed">
                CEOVIA was built around a single ingredient: Himalayan Sea Buckthorn
                seed oil — one of the most bioactively complex plant extracts in the
                world, and one of the least known outside of clinical nutrition circles.
              </p>
              <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed">
                The 90-day system is the product of that starting point: not a quick
                supplement, but a structured daily practice designed for consistency.
              </p>
              <p className="font-sans text-body-md text-[#4A5C52] leading-relaxed">
                Full story coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
