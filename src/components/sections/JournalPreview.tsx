import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import JournalCard from '@/components/journal/JournalCard'
import { getFeaturedJournalArticles } from '@/lib/journal'

const featuredArticles = getFeaturedJournalArticles(3)

export default function JournalPreview() {
  return (
    <section
      aria-labelledby="journal-preview-heading"
      className="section-white"
    >
      <div className="section-wrapper py-20 md:py-28">
        <div className="mb-14 flex justify-center">
          <div className="max-w-prose-narrow text-center">
            <SectionHeader
              id="journal-preview-heading"
              eyebrow="Perspectives on Wellness"
              heading="The CEOVIA Journal"
            />
            <p className="mt-5 font-sans text-body-md leading-relaxed text-[#4A5C52]">
              Thoughtful perspectives on cellular wellness, longevity, supplement
              science, beauty from within, and the rituals that support measurable
              transformation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredArticles.map((article) => (
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
  )
}

