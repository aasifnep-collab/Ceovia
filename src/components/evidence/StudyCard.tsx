'use client'

import { useId, useState } from 'react'
import {
  BODY_SYSTEM_LABELS,
  CONFIDENCE_LABELS,
  EVIDENCE_TYPE_BADGE_STYLES,
  type StudyDetail,
  type StudyMeta,
} from '@/data/evidence'

type Props = {
  study: StudyMeta
  detail?: StudyDetail
  featured?: boolean
}

function dots(level: 1 | 2 | 3) {
  return [1, 2, 3].map((dot) => (
    <span
      key={dot}
      aria-hidden="true"
      className={[
        'h-2 w-2 rounded-full border border-himalayan-green/30',
        dot <= level ? 'bg-himalayan-green' : 'bg-transparent',
      ].join(' ')}
    />
  ))
}

export default function StudyCard({ study, detail, featured = false }: Props) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const hasComplianceNote =
    study.evidenceType === 'mechanistic' || study.evidenceType === 'ingredient-level'
  const snippet =
    detail?.abstractSnippet ??
    study.shortSummary ??
    'No abstract summary is currently available for this record.'
  const collapsedSnippet =
    snippet.length > 180 ? `${snippet.slice(0, 177).trimEnd()}...` : snippet

  return (
    <article
      className={[
        'rounded-2xl border border-himalayan-green/12 bg-white px-5 py-5 md:px-6 md:py-6',
        featured ? 'border-l-[3px] border-l-[#2A6E66]' : '',
      ].join(' ')}
    >
      <div className="flex flex-col gap-4.5">
        <div className="space-y-2.5">
          <h4 className="font-sans text-[1rem] font-medium leading-[1.45] text-text-dark">
            {study.title}
          </h4>
          <p className="font-sans text-sm leading-relaxed text-text-muted">
            {study.journal} · {study.year}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-himalayan-green/12 px-3 py-1.5">
            <div className="flex items-center gap-1">{dots(study.confidenceLevel)}</div>
            <span className="font-sans text-xs text-text-dark">
              {CONFIDENCE_LABELS[study.confidenceLevel]}
            </span>
          </div>

          <span
            className={[
              'inline-flex rounded-full border px-3 py-1.5 font-sans text-xs',
              EVIDENCE_TYPE_BADGE_STYLES[study.evidenceType],
            ].join(' ')}
          >
            {study.evidenceType}
          </span>

          {study.bodySystemTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-himalayan-green/12 px-3 py-1.5 font-sans text-xs text-text-muted"
            >
              {BODY_SYSTEM_LABELS[tag]}
            </span>
          ))}

          {detail?.clinicalUseInsight ? (
            <span className="inline-flex rounded-full border border-himalayan-green/12 px-3 py-1.5 font-sans text-xs text-deep-green">
              {detail.clinicalUseInsight}
            </span>
          ) : null}
        </div>

        <div className="space-y-3.5">
          <p className="font-sans text-sm leading-[1.8] text-text-dark">
            {detail?.abstractSnippet ? (expanded ? snippet : collapsedSnippet) : snippet}
          </p>

          {detail?.abstractSnippet ? (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((current) => !current)}
              className="font-sans text-sm font-medium text-himalayan-green"
            >
              {expanded ? 'Collapse abstract' : 'Expand abstract'}
            </button>
          ) : null}

          {detail?.abstractSnippet && expanded ? (
            <div id={panelId} className="rounded-xl border border-himalayan-green/10 bg-clinical-white px-4 py-4 md:px-5">
              <p className="font-sans text-sm leading-[1.8] text-text-dark">
                {detail.abstractSnippet}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-0.5">
          <a
            href={detail?.pubmedUrl ?? study.pubmedUrl ?? `https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-sans text-sm font-medium text-himalayan-green"
          >
            View on PubMed <span aria-hidden="true">↗</span>
          </a>
          {detail?.publisherUrl ? (
            <a
              href={detail.publisherUrl}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm text-text-muted"
            >
              Publisher link
            </a>
          ) : null}
        </div>

        {detail?.featuredNote && featured ? (
          <p className="font-sans text-sm italic leading-relaxed text-text-muted">{detail.featuredNote}</p>
        ) : null}

        {hasComplianceNote ? (
          <p className="border-t border-himalayan-green/10 pt-4 font-sans text-sm leading-[1.75] text-text-muted">
            {detail?.complianceNote ?? 'This record requires a compliance note before publication.'}
          </p>
        ) : null}
      </div>
    </article>
  )
}
