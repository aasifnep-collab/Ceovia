import studiesMetaJson from './studies-meta.json'
import interpretationsJson from './interpretations.json'

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
export const evidenceRecords = evidenceMeta.records
export const evidenceInterpretations = interpretationsJson as Interpretation[]

export const BODY_SYSTEM_OPTIONS: Array<{ id: BodySystemTag | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'dermatology', label: 'Dermatology' },
  { id: 'mucosal', label: 'Mucosal' },
  { id: 'oxidative', label: 'Oxidative' },
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
