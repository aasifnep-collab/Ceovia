import studiesMetaJson from './studies-meta.json'
import interpretationsJson from './interpretations.json'
import { exampleStagingEntries } from './staging/pubmed-extraction-template.ts'

export type EvidenceType =
  | 'human-study'
  | 'review'
  | 'mechanistic'
  | 'ingredient-level'

export type ConfidenceLevel = 1 | 2 | 3

export type BodySystemTag =
  | 'dermatology'
  | 'mucosal'
  | 'oxidative'
  | 'immune'
  | 'metabolic'

export type TimePeriodTag = '1980s' | '1990s' | '2000s' | '2010s' | '2020s'

export type StudyMeta = {
  id: string
  slug: string
  pmid: string
  title: string
  journal: string
  year: number
  evidenceType: EvidenceType
  confidenceLevel: ConfidenceLevel
  bodySystemTags: BodySystemTag[]
  featured: boolean
  timePeriodTag: TimePeriodTag
  ingredientFocus?: string
  shortSummary?: string
  pubmedUrl?: string
  doi?: string
}

export type StudyDetail = {
  id: string
  summary?: string
  abstractSnippet: string
  population?: string
  sampleSize?: number | null
  ingredientFocus?: string
  systemTags?: BodySystemTag[]
  evidenceLevel?: string
  humanStudy?: boolean
  keyFindings?: string[]
  relevanceToCeovia?: string
  pubmedUrl?: string
  doi?: string
  citation?: string
  safetyNotes?: string
  limitations?: string[]
  complianceNote?: string
  clinicalUseInsight?: string
  publisherUrl?: string
  featuredNote?: string
}

export type EvidenceMetaEnvelope = {
  _meta: {
    version: string
    lastReviewed: string
    curatedBy: string
    changelog: Array<{
      version: string
      date: string
      added: number
      removed: number
      correctedBy: string
      approvedBy: string
    }>
  }
  records: StudyMeta[]
}

export type EvidenceDetailEnvelope = {
  _meta: EvidenceMetaEnvelope['_meta']
  records: StudyDetail[]
}

export type Interpretation = {
  domainId: BodySystemTag | 'all'
  studyIds?: string[]
  line1: string
  line2: string
  line3: string
  line4: string
  clinicianContext: string
}

export type DrawerMode = 'all' | 'timeline' | 'systems' | 'filtered'

export const evidenceMeta = studiesMetaJson as EvidenceMetaEnvelope
const existingRecordIds = new Set(evidenceMeta.records.map((record) => record.id))

function toTimePeriodTag(year: number): TimePeriodTag {
  if (year >= 2020) return '2020s'
  if (year >= 2010) return '2010s'
  if (year >= 2000) return '2000s'
  if (year >= 1990) return '1990s'
  return '1980s'
}

const supplementalDomainRecords: StudyMeta[] = exampleStagingEntries
  .filter(
    (record) =>
      !existingRecordIds.has(record.internalStudyId) &&
      record.bodySystemTags.some((tag) => tag === 'immune' || tag === 'metabolic'),
  )
  .map((record) => ({
    id: record.internalStudyId,
    slug: record.proposedSlug,
    pmid: record.PMID,
    title: record.articleTitle,
    journal: record.journal,
    year: record.year,
    evidenceType: record.evidenceType,
    confidenceLevel: record.confidenceLevel,
    bodySystemTags: record.bodySystemTags,
    featured: false,
    timePeriodTag: toTimePeriodTag(record.year),
    ingredientFocus: record.ingredientFocus,
    shortSummary: record.keyObservations[0],
    pubmedUrl: record.pubmedUrl,
    doi: record.DOI || undefined,
  }))

export const evidenceRecords = [...evidenceMeta.records, ...supplementalDomainRecords]
export const evidenceInterpretations = interpretationsJson as Interpretation[]

export const BODY_SYSTEM_OPTIONS: Array<{ id: BodySystemTag | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'dermatology', label: 'Dermatology' },
  { id: 'mucosal', label: 'Mucosal' },
  { id: 'oxidative', label: 'Oxidative' },
  { id: 'immune', label: 'Immune' },
  { id: 'metabolic', label: 'Metabolic' },
]

export const CORE_DOMAIN_OPTIONS: Array<{ id: Extract<BodySystemTag, 'dermatology' | 'immune' | 'metabolic'>; label: string }> = [
  { id: 'dermatology', label: 'Skin' },
  { id: 'immune', label: 'Immune' },
  { id: 'metabolic', label: 'Metabolic' },
]

export const EVIDENCE_TYPE_OPTIONS: Array<{ id: 'all' | EvidenceType; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'human-study', label: 'Human Study' },
  { id: 'review', label: 'Review' },
  { id: 'mechanistic', label: 'Mechanistic' },
  { id: 'ingredient-level', label: 'Ingredient-level' },
]

export const BODY_SYSTEM_LABELS: Record<BodySystemTag, string> = {
  dermatology: 'Dermatology Research',
  mucosal: 'Mucosal & Epithelial Health',
  oxidative: 'Oxidative Stress & Recovery',
  immune: 'Immune & Adaptive Resilience',
  metabolic: 'Metabolic & Whole-Body Vitality',
}

export const MODE_TITLES: Record<DrawerMode, string> = {
  all: 'All Research',
  timeline: 'Research Timeline',
  systems: 'Body Systems',
  filtered: 'Research Domain',
}

export const EVIDENCE_TYPE_BADGE_STYLES: Record<EvidenceType, string> = {
  'human-study': 'border-[rgba(42,110,102,0.18)] bg-[rgba(42,110,102,0.08)] text-[#2A6E66]',
  review: 'border-[rgba(61,94,142,0.18)] bg-[rgba(61,94,142,0.08)] text-[#3D5E8E]',
  mechanistic: 'border-[rgba(125,127,121,0.18)] bg-[rgba(125,127,121,0.08)] text-[#666A62]',
  'ingredient-level': 'border-[rgba(96,127,102,0.18)] bg-[rgba(96,127,102,0.08)] text-[#5F7663]',
}

export const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  3: 'Human Data Available',
  2: 'Evidence Synthesis',
  1: 'Biological Basis',
}

export const TIME_PERIOD_ORDER: TimePeriodTag[] = ['1980s', '1990s', '2000s', '2010s', '2020s']

export function getInterpretation(domainId: BodySystemTag | 'all') {
  return evidenceInterpretations.find((entry) => entry.domainId === domainId) ?? evidenceInterpretations[0]
}
