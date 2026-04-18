import {
  exampleStagingEntries,
  type ComplianceStatus,
  type CurationStatus,
  type PubmedExtractionRecord,
  type ReviewerChecklist,
} from './pubmed-extraction-template.ts'

type RecordRef = {
  id: string
  slug: string
}

export type RecordBlockerReport = RecordRef & {
  status: CurationStatus
  complianceStatus: ComplianceStatus
  missingChecklistItems: Array<keyof Omit<ReviewerChecklist, 'interpretationRiskFlag' | 'readyForNormalization'>>
  blockers: string[]
  interpretationRiskFlagged: boolean
}

export type EvidenceStagingAuditReport = {
  summary: {
    totalRecords: number
    byStatus: Record<CurationStatus, number>
    byComplianceStatus: Record<ComplianceStatus, number>
    underReviewCount: number
    approvedButNotNormalizationReadyCount: number
    readyForNormalizationCount: number
    interpretationRiskFlaggedCount: number
  }
  grouped: {
    underReview: RecordRef[]
    approvedButNotNormalizationReady: RecordRef[]
    readyForNormalization: RecordRef[]
    missingReviewerChecklistFields: RecordBlockerReport[]
    missingPmidOrDoiVerification: RecordRef[]
    missingComplianceSignoff: RecordRef[]
    interpretationRiskFlagged: RecordRef[]
  }
  blockersByRecord: RecordBlockerReport[]
}

const CHECKLIST_KEYS: Array<
  keyof Omit<ReviewerChecklist, 'interpretationRiskFlag' | 'readyForNormalization'>
> = [
  'citationVerification',
  'pmidOrDoiVerification',
  'titleJournalYearVerification',
  'studyTypeConfirmation',
  'populationAndSampleSizeReview',
  'claimStrengthReview',
  'wordingNeutralityReview',
  'evidenceTypeConfirmation',
  'confidenceLevelReview',
  'safetyAndLimitationCompleteness',
  'complianceSignoff',
]

function toRef(record: PubmedExtractionRecord): RecordRef {
  return {
    id: record.internalStudyId,
    slug: record.proposedSlug,
  }
}

function getMissingChecklistItems(record: PubmedExtractionRecord) {
  return CHECKLIST_KEYS.filter((key) => !record.reviewerChecklist[key].checked)
}

function getBlockers(record: PubmedExtractionRecord) {
  const blockers: string[] = []

  if (record.status !== 'approved') {
    blockers.push(`Status is ${record.status}`)
  }

  if (record.complianceStatus !== 'approved') {
    blockers.push(`Compliance status is ${record.complianceStatus}`)
  }

  if (!record.reviewerChecklist.pmidOrDoiVerification.checked) {
    blockers.push('PMID/DOI verification incomplete')
  }

  if (!record.reviewerChecklist.complianceSignoff.checked) {
    blockers.push('Compliance signoff incomplete')
  }

  const missingChecklistItems = getMissingChecklistItems(record)
  if (missingChecklistItems.length > 0) {
    blockers.push(`Missing checklist items: ${missingChecklistItems.join(', ')}`)
  }

  if (record.reviewerChecklist.interpretationRiskFlag.flagged) {
    blockers.push('Interpretation risk flagged for reviewer attention')
  }

  if (!record.reviewerChecklist.readyForNormalization) {
    blockers.push('Reviewer checklist is not marked ready for normalization')
  }

  if (!record.normalizationReady) {
    blockers.push('Record is not marked normalizationReady')
  }

  return blockers
}

export function auditStagingRecords(
  records: PubmedExtractionRecord[] = exampleStagingEntries,
): EvidenceStagingAuditReport {
  const byStatus: EvidenceStagingAuditReport['summary']['byStatus'] = {
    pending_extraction: 0,
    extracted: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
  }

  const byComplianceStatus: EvidenceStagingAuditReport['summary']['byComplianceStatus'] = {
    not_started: 0,
    needs_revision: 0,
    reviewed: 0,
    approved: 0,
  }

  const blockersByRecord: RecordBlockerReport[] = records.map((record) => {
    byStatus[record.status] += 1
    byComplianceStatus[record.complianceStatus] += 1

    return {
      ...toRef(record),
      status: record.status,
      complianceStatus: record.complianceStatus,
      missingChecklistItems: getMissingChecklistItems(record),
      blockers: getBlockers(record),
      interpretationRiskFlagged: record.reviewerChecklist.interpretationRiskFlag.flagged,
    }
  })

  const underReview = records.filter((record) => record.status === 'under_review').map(toRef)
  const approvedButNotNormalizationReady = records
    .filter(
      (record) =>
        record.status === 'approved' &&
        (!record.normalizationReady || !record.reviewerChecklist.readyForNormalization),
    )
    .map(toRef)
  const readyForNormalization = records
    .filter(
      (record) =>
        record.status === 'approved' &&
        record.complianceStatus === 'approved' &&
        record.reviewerChecklist.readyForNormalization &&
        record.normalizationReady,
    )
    .map(toRef)
  const missingReviewerChecklistFields = blockersByRecord.filter(
    (record) => record.missingChecklistItems.length > 0,
  )
  const missingPmidOrDoiVerification = records
    .filter((record) => !record.reviewerChecklist.pmidOrDoiVerification.checked)
    .map(toRef)
  const missingComplianceSignoff = records
    .filter((record) => !record.reviewerChecklist.complianceSignoff.checked)
    .map(toRef)
  const interpretationRiskFlagged = records
    .filter((record) => record.reviewerChecklist.interpretationRiskFlag.flagged)
    .map(toRef)

  return {
    summary: {
      totalRecords: records.length,
      byStatus,
      byComplianceStatus,
      underReviewCount: underReview.length,
      approvedButNotNormalizationReadyCount: approvedButNotNormalizationReady.length,
      readyForNormalizationCount: readyForNormalization.length,
      interpretationRiskFlaggedCount: interpretationRiskFlagged.length,
    },
    grouped: {
      underReview,
      approvedButNotNormalizationReady,
      readyForNormalization,
      missingReviewerChecklistFields,
      missingPmidOrDoiVerification,
      missingComplianceSignoff,
      interpretationRiskFlagged,
    },
    blockersByRecord,
  }
}

export function formatAuditReport(report: EvidenceStagingAuditReport) {
  return JSON.stringify(report, null, 2)
}
