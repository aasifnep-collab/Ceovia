'use client'

import { useMemo, useState } from 'react'
import { TIME_PERIOD_ORDER, type StudyDetail, type StudyMeta, type TimePeriodTag } from '@/data/evidence'
import StudyCard from './StudyCard'

type Props = {
  studies: StudyMeta[]
  details: Record<string, StudyDetail>
}

export default function TimelineView({ studies, details }: Props) {
  const grouped = useMemo(() => {
    return TIME_PERIOD_ORDER.map((period) => ({
      period,
      studies: studies.filter((study) => study.timePeriodTag === period),
    })).filter((group) => group.studies.length > 0)
  }, [studies])

  const [openPeriods, setOpenPeriods] = useState<Record<TimePeriodTag, boolean>>({
    '1980s': true,
    '1990s': true,
    '2000s': true,
    '2010s': true,
    '2020s': true,
  })

  if (grouped.length === 0) return null

  return (
    <div className="space-y-4">
      {grouped.map((group) => {
        const expanded = openPeriods[group.period]
        return (
          <section key={group.period} className="rounded-2xl border border-himalayan-green/12 bg-white px-5 py-5 md:px-6">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`timeline-${group.period}`}
              onClick={() =>
                setOpenPeriods((current) => ({ ...current, [group.period]: !current[group.period] }))
              }
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <div>
                <h3 className="font-display text-[1.35rem] leading-tight text-deep-green">{group.period}</h3>
                <p className="mt-1 font-sans text-sm text-text-muted">
                  {group.studies.length} curated studies
                </p>
              </div>
              <span className="font-sans text-sm text-himalayan-green">{expanded ? 'Hide' : 'Show'}</span>
            </button>

            {expanded ? (
              <div id={`timeline-${group.period}`} className="mt-5 space-y-4">
                {group.studies.map((study) => (
                  <StudyCard key={study.id} study={study} detail={details[study.id]} />
                ))}
              </div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
