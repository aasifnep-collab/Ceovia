import Link from 'next/link'
import {
  getJournalArticleHref,
  type JournalArticle,
} from '@/lib/journal'

type Props = {
  article: JournalArticle
}

export default function JournalCard({ article }: Props) {
  const articleHref = getJournalArticleHref(article.slug)

  return (
    <article className="group rounded-[1.5rem] border border-[#DCE5E0] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFCFB_100%)] p-7 shadow-[0_10px_24px_rgba(16,38,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C7D4CD] hover:shadow-[0_20px_36px_rgba(16,38,28,0.08)]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#0E5A36]">
          {article.category}
        </span>
        <span className="font-sans text-[0.76rem] text-[#6A7B71]">
          {article.readTime}
        </span>
      </div>

      <h2 className="max-w-[18ch] font-display text-[1.85rem] leading-[1.12] tracking-[-0.02em] text-[#11261C] transition-colors duration-200 group-hover:text-[#0E5A36]">
        <Link
          href={articleHref}
          aria-label={`Open article: ${article.title}`}
          className="relative z-10 inline"
        >
          {article.title}
        </Link>
      </h2>

      <p className="mt-5 font-sans text-[0.97rem] leading-[1.8] text-[#4A5C52]">
        {article.excerpt}
      </p>

      <div className="mt-7 flex items-center justify-between gap-4">
        <span className="font-sans text-[0.78rem] uppercase tracking-[0.14em] text-[#809087]">
          {article.publishLabel}
        </span>
        <Link
          href={articleHref}
          aria-label={`Read article: ${article.title}`}
          className="relative z-10 inline-flex items-center font-sans text-sm font-medium text-[#0E5A36] transition-transform duration-200 group-hover:translate-x-1"
        >
          Read Article →
        </Link>
      </div>
    </article>
  )
}
