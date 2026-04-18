'use client'

import { useId, useState } from 'react'
import {
  BODY_SYSTEM_LABELS,
  type StudyDetail,
  type StudyMeta,
} from '@/data/evidence'

type Props = {
  study: StudyMeta
  detail?: StudyDetail
  featured?: boolean
}

function getEvidenceTypeLabel(evidenceType: StudyMeta['evidenceType']) {
  switch (evidenceType) {
    case 'human-study':
      return 'Human Study'
    case 'mechanistic':
      return 'Mechanistic'
    case 'review':
      return 'Review'
    case 'ingredient-level':
      return 'Ingredient-Level'
    default:
      return evidenceType
  }
}

function getConfidenceLabel(level: StudyMeta['confidenceLevel']) {
  switch (level) {
    case 3:
      return 'High Confidence'
    case 2:
      return 'Moderate Confidence'
    case 1:
      return 'Low Confidence'
    default:
      return 'Unspecified Confidence'
  }
}

export default function StudyCard({ study, detail, featured = false }: Props) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const hasComplianceNote =
    study.evidenceType === 'mechanistic' || study.evidenceType === 'ingredient-level'
  const [primaryDomain, ...secondaryDomains] = study.bodySystemTags
  const evidenceTypeLabel = getEvidenceTypeLabel(study.evidenceType)
  const confidenceLabel = getConfidenceLabel(study.confidenceLevel)
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

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-text-muted">
              Primary domain
            </span>
            <span className="inline-flex rounded-full border border-himalayan-green/16 bg-himalayan-green/8 px-3 py-1.5 font-sans text-xs text-deep-green">
              {BODY_SYSTEM_LABELS[primaryDomain]}
            </span>
          </div>

          {secondaryDomains.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-text-muted">
                Also relevant to
              </span>
              {secondaryDomains.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-himalayan-green/12 px-3 py-1.5 font-sans text-xs text-text-muted"
                >
                  {BODY_SYSTEM_LABELS[tag]}
                </span>
              ))}
            </div>
          ) : null}

          <p className="font-sans text-sm leading-relaxed text-text-muted">
            {evidenceTypeLabel} • {confidenceLabel}
          </p>
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

        {detail?.clinicalUseInsight ? (
          <section className="space-y-2 rounded-xl border border-himalayan-green/10 bg-clinical-white px-4 py-4 md:px-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-text-muted">
              Clinical Interpretation
            </p>
            <p className="font-sans text-sm leading-[1.8] text-text-dark">
              {detail.clinicalUseInsight}
            </p>
          </section>
        ) : null}

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
