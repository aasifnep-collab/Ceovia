import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JournalCard from '@/components/journal/JournalCard'
import {
  getJournalArticleBySlug,
  journalArticles,
} from '@/lib/journal'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getJournalArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found — CEOVIA',
    }
  }

  return {
    title: `${article.title} — CEOVIA Journal`,
    description: article.excerpt,
  }
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getJournalArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = journalArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3)

  return (
    <article className="section-white">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-[74ch]">
          <Link
            href="/journal"
            className="inline-flex items-center font-sans text-sm font-medium text-[#0E5A36] transition-colors duration-200 hover:text-[#0A4428]"
          >
            ← Back to Journal
          </Link>

          <div className="mt-10 border-b border-[#DCE5E0] pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#0E5A36]">
                {article.category}
              </span>
              <span className="font-sans text-[0.8rem] text-[#7B8B81]">
                {article.publishLabel}
              </span>
              <span className="font-sans text-[0.8rem] text-[#7B8B81]">
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-[#11261C]">
              {article.title}
            </h1>

            <p className="mt-6 max-w-[62ch] font-sans text-[1.05rem] leading-[1.9] text-[#4A5C52] md:text-[1.1rem]">
              {article.dek}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[2rem] leading-[1.12] tracking-[-0.02em] text-[#173126]">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-sans text-[1rem] leading-[1.95] text-[#4A5C52]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-[1.75rem] border border-[#DCE5E0] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFCFB_100%)] p-8">
            <h2 className="font-display text-[1.75rem] leading-[1.15] text-[#11261C]">
              Closing Perspective
            </h2>
            <p className="mt-5 font-sans text-[1rem] leading-[1.95] text-[#4A5C52]">
              {article.conclusion}
            </p>
            {article.cta && (
              <Link
                href="/products/ceovia-90-day"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#12452E] px-7 py-3 font-sans text-[0.95rem] font-medium tracking-[0.01em] text-white transition-all duration-200 hover:bg-[#0D3522]"
              >
                {article.cta}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-10 text-center">
            <p className="font-sans text-label-md uppercase tracking-widest text-[#0E5A36]">
              Continue Reading
            </p>
            <h2 className="mt-4 font-display text-display-lg text-[#11261C]">
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <JournalCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

