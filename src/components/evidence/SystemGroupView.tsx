import {
  BODY_SYSTEM_LABELS,
  type BodySystemTag,
  type Interpretation,
  type StudyDetail,
  type StudyMeta,
} from '@/data/evidence'
import ClinicalInterpretationSummary from './ClinicalInterpretationSummary'
import StudyCard from './StudyCard'

type Props = {
  groupedStudies: Array<{
    domainId: BodySystemTag
    interpretation: Interpretation
    studies: StudyMeta[]
  }>
  details: Record<string, StudyDetail>
}

export default function SystemGroupView({ groupedStudies, details }: Props) {
  return (
    <div className="space-y-8">
      {groupedStudies.map((group) => (
        <section key={group.domainId} className="space-y-5">
          <div>
            <h3 className="font-display text-[1.55rem] leading-tight text-deep-green">
              {BODY_SYSTEM_LABELS[group.domainId]}
            </h3>
            <p className="mt-1 font-sans text-sm text-text-muted">
              {group.studies.length} curated studies
            </p>
          </div>

          <ClinicalInterpretationSummary interpretation={group.interpretation} />

          {group.studies.length === 0 ? (
            <p className="font-sans text-sm text-text-muted">
              No curated studies are currently available for this domain.
            </p>
          ) : (
            <div className="space-y-4">
              {group.studies.map((study) => (
                <StudyCard key={study.id} study={study} detail={details[study.id]} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
