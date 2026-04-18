import Image from 'next/image'
import EntryHero from '@/components/ui/EntryHero'

export default function Hero() {
  return (
    <EntryHero
      id="hero-heading"
      variant="brand"
      layout="split"
      fullHeight
      align="left"
      eyebrow="POWERED BY HIMALAYA"
      heading="A Clinically Structured Daily Wellness System"
      description="A premium daily system powered by Himalayan Sea Buckthorn bioactives, designed to support skin, energy, and whole-body wellness through a measured 90-day routine."
      meta={
        <>
          <p className="max-w-prose-narrow font-sans text-[0.92rem] font-normal leading-relaxed text-white/72 md:text-[1rem]">
            Derived from Himalayan Sea Buckthorn Bioactives
          </p>
          <p className="mt-4 max-w-prose-narrow font-display text-[1.35rem] leading-[1.25] tracking-[-0.015em] text-white/92 md:text-[1.55rem]">
            Built for consistency, evidence discipline, and premium daily use
          </p>
        </>
      }
      actions={[
        { href: '/products/ceovia-90-day', label: 'Start Your 90-Day System' },
        { href: '/science', label: 'Learn the Science', variant: 'secondary' },
      ]}
      media={
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-[10%] top-[8%] h-[78%] rounded-[2rem] bg-[radial-gradient(circle_at_top,#eff6f2_0%,#dde9e1_45%,transparent_75%)] blur-2xl"
          />
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-[#D8E1DB] bg-white shadow-[0_24px_60px_rgba(16,38,28,0.1)] md:max-w-[420px]">
            <Image
              src="/images/ceovia-bottle.png"
              alt="CEOVIA Sea Buckthorn Softgel bottle"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 45vw"
              className="object-contain p-6 md:p-8"
            />
          </div>
        </>
      }
    />
  )
}
