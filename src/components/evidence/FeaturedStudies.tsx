import type { StudyDetail, StudyMeta } from '@/data/evidence'
import StudyCard from './StudyCard'

type Props = {
  studies: StudyMeta[]
  details: Record<string, StudyDetail>
}

export default function FeaturedStudies({ studies, details }: Props) {
  return (
    <section aria-labelledby="featured-studies-heading">
      <div className="flex items-center justify-between gap-3">
        <h3
          id="featured-studies-heading"
          className="font-display text-[1.42rem] leading-[1.08] text-deep-green"
        >
          Featured Studies
        </h3>
      </div>

      {studies.length === 0 ? (
        <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">
          No featured studies are currently available for this view.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 md:gap-5">
          {studies.map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              detail={details[study.id]}
              featured
            />
          ))}
        </div>
      )}
    </section>
  )
}
