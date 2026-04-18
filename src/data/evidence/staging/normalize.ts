import type { StudyDetail, StudyMeta } from '../index.ts'
import type { PubmedExtractionRecord } from './pubmed-extraction-template.ts'

function toTimePeriodTag(year: number): StudyMeta['timePeriodTag'] {
  if (year >= 2020) return '2020s'
  if (year >= 2010) return '2010s'
  if (year >= 2000) return '2000s'
  if (year >= 1990) return '1990s'
  return '1980s'
}

export function buildStudyMetaFromStaging(
  record: PubmedExtractionRecord,
  options?: {
    featured?: boolean
    shortSummary?: string
  },
): StudyMeta {
  if (!record.normalizationReady || !record.reviewerChecklist.readyForNormalization) {
    throw new Error(`Record ${record.internalStudyId} is not approved for normalization.`)
  }

  return {
    id: record.internalStudyId,
    slug: record.proposedSlug,
    pmid: record.PMID,
    title: record.articleTitle,
    journal: record.journal,
    year: record.year,
    evidenceType: record.evidenceType,
    confidenceLevel: record.confidenceLevel,
    bodySystemTags: record.bodySystemTags,
    featured: options?.featured ?? false,
    timePeriodTag: toTimePeriodTag(record.year),
    ingredientFocus: record.ingredientFocus,
    shortSummary: options?.shortSummary,
    pubmedUrl: record.pubmedUrl,
    doi: record.DOI || undefined,
  }
}

export function buildStudyDetailFromStaging(
  record: PubmedExtractionRecord,
  options: {
    summary: string
    abstractSnippet: string
    evidenceLevel: string
    relevanceToCeovia: string
    citation: string
    complianceNote?: string
    clinicalUseInsight?: string
    featuredNote?: string
  },
): StudyDetail {
  if (!record.normalizationReady || !record.reviewerChecklist.readyForNormalization) {
    throw new Error(`Record ${record.internalStudyId} is not approved for normalization.`)
  }

  return {
    id: record.internalStudyId,
    summary: options.summary,
    abstractSnippet: options.abstractSnippet,
    population: record.population,
    sampleSize: record.sampleSize,
    ingredientFocus: record.ingredientFocus,
    systemTags: record.bodySystemTags,
    evidenceLevel: options.evidenceLevel,
    humanStudy: record.evidenceType === 'human-study',
    keyFindings: record.keyObservations,
    relevanceToCeovia: options.relevanceToCeovia,
    pubmedUrl: record.pubmedUrl,
    doi: record.DOI || undefined,
    citation: options.citation,
    safetyNotes: record.safetyObservations?.join(' '),
    limitations: record.limitations,
    complianceNote: options.complianceNote,
    clinicalUseInsight: options.clinicalUseInsight,
    publisherUrl: record.pubmedUrl,
    featuredNote: options.featuredNote,
  }
}

export function collectStudyIdsByDomain(records: PubmedExtractionRecord[], domainId: string) {
  return records
    .filter((record) => record.bodySystemTags.includes(domainId as PubmedExtractionRecord['bodySystemTags'][number]))
    .map((record) => record.internalStudyId)
}
