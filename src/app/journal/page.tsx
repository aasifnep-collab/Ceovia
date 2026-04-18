import type { Metadata } from 'next'
import Link from 'next/link'
import EntryHero from '@/components/ui/EntryHero'
import JournalCard from '@/components/journal/JournalCard'
import { journalArticles } from '@/lib/journal'

export const metadata: Metadata = {
  title: 'Journal — CEOVIA',
  description:
    'The CEOVIA Journal. Thoughtful perspectives on cellular wellness, longevity, supplement science, beauty from within, and measurable transformation.',
}

export default function JournalPage() {
  return (
    <>
      <EntryHero
        variant="utility"
        id="journal-heading"
        eyebrow="Perspectives on Wellness"
        heading="The CEOVIA Journal"
        description="Thoughtful perspectives on cellular wellness, longevity, supplement science, beauty from within, and the rituals that support measurable transformation."
      />

      <section className="section-white">
        <div className="section-wrapper py-20 md:py-28">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {journalArticles.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/journal"
              className="inline-flex items-center justify-center rounded-full border border-[#B9C8BF] bg-white px-7 py-3 font-sans text-[0.95rem] font-medium tracking-[0.01em] text-[#12452E] transition-all duration-200 hover:border-[#12452E] hover:bg-[#F7FAF8]"
            >
              Explore the Journal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
