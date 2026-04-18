import type {
  BodySystemTag,
  ConfidenceLevel,
  EvidenceType,
  StudyDetail,
  StudyMeta,
} from '../index.ts'

export type CurationStatus =
  | 'pending_extraction'
  | 'extracted'
  | 'under_review'
  | 'approved'
  | 'rejected'

export type ComplianceStatus =
  | 'not_started'
  | 'needs_revision'
  | 'reviewed'
  | 'approved'

export type ReviewerChecklistItem = {
  checked: boolean
  notes?: string
}

export type ReviewerChecklist = {
  citationVerification: ReviewerChecklistItem
  pmidOrDoiVerification: ReviewerChecklistItem
  titleJournalYearVerification: ReviewerChecklistItem
  studyTypeConfirmation: ReviewerChecklistItem
  populationAndSampleSizeReview: ReviewerChecklistItem
  claimStrengthReview: ReviewerChecklistItem
  wordingNeutralityReview: ReviewerChecklistItem
  evidenceTypeConfirmation: ReviewerChecklistItem
  confidenceLevelReview: ReviewerChecklistItem
  safetyAndLimitationCompleteness: ReviewerChecklistItem
  complianceSignoff: ReviewerChecklistItem
  interpretationRiskFlag: {
    flagged: boolean
    notes?: string
  }
  readyForNormalization: boolean
}

export function createEmptyReviewerChecklist(): ReviewerChecklist {
  return {
    citationVerification: { checked: false },
    pmidOrDoiVerification: { checked: false },
    titleJournalYearVerification: { checked: false },
    studyTypeConfirmation: { checked: false },
    populationAndSampleSizeReview: { checked: false },
    claimStrengthReview: { checked: false },
    wordingNeutralityReview: { checked: false },
    evidenceTypeConfirmation: { checked: false },
    confidenceLevelReview: { checked: false },
    safetyAndLimitationCompleteness: { checked: false },
    complianceSignoff: { checked: false },
    interpretationRiskFlag: { flagged: false },
    readyForNormalization: false,
  }
}

export type PubmedExtractionRecord = {
  internalStudyId: string
  proposedSlug: string
  pubmedUrl: string
  PMID: string
  DOI?: string
  articleTitle: string
  journal: string
  year: number
  studyType: string
  population: string
  sampleSize: number | null
  interventionOrExposure: string
  comparator?: string
  duration?: string
  primaryEndpoints: string[]
  keyObservations: string[]
  safetyObservations?: string[]
  limitations: string[]
  bodySystemTags: BodySystemTag[]
  ingredientFocus: string
  evidenceType: EvidenceType
  confidenceLevel: ConfidenceLevel
  notesForCurator: string
  status: CurationStatus
  reviewerChecklist: ReviewerChecklist
  reviewerNotes?: string
  reviewedBy?: string
  reviewedAt?: string
  complianceStatus: ComplianceStatus
  normalizationReady: boolean
}

export type ApprovedEvidenceDraft = {
  meta: StudyMeta
  detail: StudyDetail
}

export const pubmedExtractionTemplate: PubmedExtractionRecord = {
  internalStudyId: 'DERM-000',
  proposedSlug: 'replace-with-kebab-case-study-slug',
  pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/00000000/',
  PMID: '00000000',
  DOI: '',
  articleTitle: 'Replace with exact article title',
  journal: 'Replace with exact journal title',
  year: 2026,
  studyType: 'Replace with source-grounded study type',
  population: 'Replace with exact population or model',
  sampleSize: null,
  interventionOrExposure: 'Replace with exact ingredient, exposure, or formulation studied',
  comparator: 'Replace with exact comparator if present',
  duration: 'Replace with exact treatment or observation period if present',
  primaryEndpoints: [
    'Replace with source-grounded primary endpoint 1',
    'Replace with source-grounded primary endpoint 2',
  ],
  keyObservations: [
    'Replace with a neutral observation grounded in the source record',
    'Replace with a second neutral observation if needed',
  ],
  safetyObservations: [
    'Replace with source-grounded safety observation if present',
  ],
  limitations: [
    'Replace with source-grounded limitation 1',
    'Replace with source-grounded limitation 2',
  ],
  bodySystemTags: ['dermatology'],
  ingredientFocus: 'Replace with exact ingredient focus',
  evidenceType: 'human-study',
  confidenceLevel: 3,
  notesForCurator:
    'Use this worksheet to capture source facts first. Add interpretation later during review.',
  status: 'pending_extraction',
  reviewerChecklist: createEmptyReviewerChecklist(),
  reviewerNotes: '',
  reviewedBy: '',
  reviewedAt: '',
  complianceStatus: 'not_started',
  normalizationReady: false,
}

export const exampleStagingEntries: PubmedExtractionRecord[] = [
  {
    internalStudyId: 'DERM-001',
    proposedSlug: 'hippophae-rhamnoides-emulsion-barrier-function-healthy-human-subjects',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/25362595/',
    PMID: '25362595',
    DOI: '',
    articleTitle:
      'Hippophae rhamnoides oil-in-water (O/W) emulsion improves barrier function in healthy human subjects.',
    journal: 'Pakistan Journal of Pharmaceutical Sciences',
    year: 2014,
    studyType: 'Human topical application study',
    population: 'Healthy adult male volunteers',
    sampleSize: 13,
    interventionOrExposure: 'Topical oil-in-water emulsion containing Hippophae rhamnoides extract',
    comparator: 'Base formulation without the extract',
    duration: '84 days',
    primaryEndpoints: [
      'Skin hydration',
      'Transepidermal water loss',
    ],
    keyObservations: [
      'Skin hydration and transepidermal water loss were measured repeatedly over the 84-day application period.',
      'The active emulsion was evaluated against a base formulation within the study design in healthy volunteers.',
    ],
    safetyObservations: [
      'This study does not establish CEOVIA-specific safety or efficacy conclusions.',
      'The evidence is limited to a topical emulsion context in healthy adult male volunteers.',
    ],
    limitations: [
      'Small sample size.',
      'Healthy-volunteer population rather than a barrier-compromised clinical cohort.',
      'Topical formulation differs from CEOVIA route and composition.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Sea buckthorn oil emulsion',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Use only for ingredient-level barrier and hydration discussion in a topical healthy-skin context. If normalized later, any relevanceToCeovia field should state that the record may help contextualize barrier-related topical observations, but does not establish CEOVIA-specific efficacy.',
    status: 'approved',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'Title, journal, year, and PMID-backed citation details were checked against the PubMed record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID verified against PubMed. No DOI was captured in the current staging source.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as a human topical application study in healthy volunteers.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Healthy adult male volunteers and sample size of 13 were captured from the source.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'Wording was kept observational and does not extend to finished-product claims.',
      },
      wordingNeutralityReview: {
        checked: true,
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 3 retained because the source is human clinical evidence, with sample-size caveats stated in limitations.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
        notes: 'Route, formulation, and healthy-volunteer constraints are explicit.',
      },
      complianceSignoff: {
        checked: true,
        notes: 'Approved for cautious normalization as low-risk human topical evidence.',
      },
      interpretationRiskFlag: {
        flagged: false,
      },
      readyForNormalization: true,
    },
    reviewerNotes:
      'Approved as one of the lowest-risk human dermatology records in staging. Suitable for normalization with clear topical-context limits.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'approved',
    normalizationReady: true,
  },
  {
    internalStudyId: 'DERM-002',
    proposedSlug: 'sea-buckthorn-skin-mucosal-health-review-anti-inflammatory-perspective',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/41306783/',
    PMID: '41306783',
    DOI: '10.3389/fphar.2025.1643146',
    articleTitle:
      'The role of sea buckthorn in skin and mucosal health: a review from an anti-inflammatory perspective.',
    journal: 'Frontiers in Pharmacology',
    year: 2025,
    studyType: 'Review article',
    population: 'Review-level evidence across skin and mucosal contexts',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn bioactives discussed across published literature',
    comparator: '',
    duration: '',
    primaryEndpoints: [
      'Barrier-related discussion themes',
      'Inflammation-related pathways',
      'Oxidative processes',
    ],
    keyObservations: [
      'The article synthesizes skin and mucosal literature rather than reporting a single intervention study.',
      'Barrier integrity, oxidative context, and inflammation-related mechanisms are discussed at review level.',
    ],
    safetyObservations: [
      'This source should remain contextual and not be presented as finished-product validation.',
    ],
    limitations: [
      'Review-level evidence rather than a controlled trial.',
      'Not specific to CEOVIA.',
      'Includes ingredient-level and mechanistic discussion that requires careful interpretation.',
    ],
    bodySystemTags: ['dermatology', 'mucosal'],
    ingredientFocus: 'Sea buckthorn bioactives',
    evidenceType: 'review',
    confidenceLevel: 2,
    notesForCurator:
      'Useful as context for interpretation blocks and ingredient-level discussion. Avoid converting mechanistic language into product claims.',
    status: 'under_review',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes:
      'Needs reviewer confirmation that all downstream use remains contextual rather than efficacy-facing.',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'needs_revision',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-003',
    proposedSlug: 'seabuckthorn-pulp-oil-ultraviolet-induced-damage-human-fibroblasts',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/38796693/',
    PMID: '38796693',
    DOI: '10.1093/bbb/zbae071',
    articleTitle:
      'Seabuckthorn (Hippophae rhamnoides, L.) pulp oil prevents ultraviolet-induced damage in human fibroblasts.',
    journal: 'Bioscience, Biotechnology, and Biochemistry',
    year: 2024,
    studyType: 'In vitro fibroblast study',
    population: 'Human dermal fibroblasts in vitro',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn pulp oil pretreatment under ultraviolet exposure conditions',
    comparator: 'Ultraviolet-exposed fibroblasts without the oil condition',
    duration: 'Source-specific treatment timing requires curator confirmation',
    primaryEndpoints: [
      'Ultraviolet-induced cellular stress markers',
      'Collagen-associated measures',
    ],
    keyObservations: [
      'The study examines fibroblast responses under ultraviolet exposure conditions.',
      'The source reports pathway-level observations in a laboratory model.',
    ],
    safetyObservations: [
      'This source is mechanistic and should not be translated into clinical safety or efficacy conclusions.',
    ],
    limitations: [
      'In vitro model only.',
      'No human clinical population.',
      'No CEOVIA-specific formulation was evaluated.',
    ],
    bodySystemTags: ['dermatology', 'oxidative'],
    ingredientFocus: 'Sea buckthorn pulp oil',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Suitable for biological-context discussion only. Keep all downstream wording non-clinical and non-product-specific.',
    status: 'approved',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'PubMed title, journal, year, and DOI checked against the source record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID and DOI both present and consistent.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as mechanistic in vitro evidence rather than a human study.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Population captured as human dermal fibroblasts in vitro; no sample size stated.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'Downstream usage must remain mechanism-level only.',
      },
      wordingNeutralityReview: {
        checked: true,
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 1 retained because the source is mechanistic rather than clinical.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
      },
      complianceSignoff: {
        checked: true,
        notes: 'Approved for ingredient-level contextual use only.',
      },
      interpretationRiskFlag: {
        flagged: true,
        notes: 'High risk if converted into anti-photoaging or clinical product language.',
      },
      readyForNormalization: true,
    },
    reviewerNotes:
      'Approved for normalization with explicit mechanistic framing and strong compliance caveat.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'approved',
    normalizationReady: true,
  },
  {
    internalStudyId: 'DERM-004',
    proposedSlug: 'total-flavonoids-sea-buckthorn-mc903-atopic-dermatitis-like-lesions',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/35306042/',
    PMID: '35306042',
    DOI: '10.1016/j.jep.2022.115195',
    articleTitle:
      'Total flavonoids of sea buckthorn (Hippophae rhamnoides L.) improve MC903-induced atopic dermatitis-like lesions.',
    journal: 'Journal of Ethnopharmacology',
    year: 2022,
    studyType: 'Mouse model and keratinocyte study',
    population: 'MC903-induced atopic dermatitis-like mouse model and IFN-γ/TNF-α-treated HaCaT cells',
    sampleSize: null,
    interventionOrExposure: 'Topical total flavonoids of sea buckthorn',
    comparator: 'Model or stimulated control conditions without the flavonoid treatment',
    duration: 'Eight days of topical application in the mouse model; in vitro stimulation timing requires source confirmation during review',
    primaryEndpoints: [
      'Dermatitis severity and histology',
      'Barrier-related protein expression',
      'Inflammation-related cytokine readouts',
    ],
    keyObservations: [
      'The source reports changes in lesion severity, mast-cell infiltration, filaggrin expression, and selected cytokine markers in an MC903-induced mouse model.',
      'Additional HaCaT-cell experiments examine cytokine-associated and signaling-pathway readouts under IFN-γ/TNF-α stimulation conditions.',
    ],
    safetyObservations: [
      'This preclinical source does not establish human tolerability or performance in CEOVIA users.',
      'The topical flavonoid preparation, murine disease-model context, and cell-model conditions differ from CEOVIA use conditions.',
    ],
    limitations: [
      'Preclinical evidence only.',
      'Includes both animal and in vitro components rather than a human study.',
      'Model-specific findings should not be translated into product efficacy language or finished-product expectations.',
    ],
    bodySystemTags: ['dermatology', 'immune'],
    ingredientFocus: 'Sea buckthorn total flavonoids',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Keep downstream wording restricted to model-level observations around barrier-related and inflammation-associated pathways. If normalized later, any relevanceToCeovia field should stay ingredient-level, mechanism-linked, and explicitly non-efficacy-facing.',
    status: 'under_review',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'PubMed title, journal, year, and DOI were checked against the indexed record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID and DOI are present and consistent with the source.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as combined animal-model and keratinocyte mechanistic evidence, not a human study.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Population/model description captured; no stable sample-size extraction was available from the staging source.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'Language was tightened to model-level observations only.',
      },
      wordingNeutralityReview: {
        checked: true,
        notes: 'Outcome wording softened to avoid implying therapeutic certainty.',
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 1 retained because the evidence is preclinical.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
        notes: 'Route, model, and finished-product limitations are explicitly stated.',
      },
      complianceSignoff: {
        checked: true,
        notes: 'Suitable only for cautious mechanism-level internal review.',
      },
      interpretationRiskFlag: {
        flagged: true,
        notes: 'High risk if converted into anti-inflammatory, dermatitis, or product-efficacy claims.',
      },
      readyForNormalization: false,
    },
    reviewerNotes:
      'Moved to under_review after checklist completion. The record is usable for mechanism-level discussion, but it should not be normalized until disease-model language is reviewed in context.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'reviewed',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-005',
    proposedSlug: 'sea-buckthorn-oil-dncb-atopic-dermatitis-model-mice-th1-th2-balance',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32843010/',
    PMID: '32843010',
    DOI: '10.1186/s12906-020-03031-3',
    articleTitle:
      'Ameliorative effects of sea buckthorn oil on DNCB induced atopic dermatitis model mice via regulation the balance of Th1/Th2.',
    journal: 'BMC Complementary Medicine and Therapies',
    year: 2020,
    studyType: 'Mouse atopic-dermatitis model study',
    population: 'DNCB-induced atopic dermatitis model in BALB/c mice',
    sampleSize: null,
    interventionOrExposure: 'Oral sea buckthorn oil administration by gavage',
    comparator: 'Untreated atopic-dermatitis model controls and normal controls',
    duration: '15 days after model induction',
    primaryEndpoints: [
      'Dermatitis score and ear thickness',
      'Inflammation-related cytokines',
      'Barrier-associated readouts and immune-cell migration measures',
    ],
    keyObservations: [
      'The source reports changes in dermatitis scoring, ear thickness, mast-cell infiltration, and selected cytokine measures in the animal model.',
      'Immune-cell migration and maturation markers were also assessed within the study design.',
    ],
    safetyObservations: [
      'Animal-model findings should not be treated as direct evidence for human use conditions.',
      'Oral oil administration in mice differs from CEOVIA formulation and dose context.',
    ],
    limitations: [
      'Animal model only.',
      'Study context is disease-model-specific and not product-specific.',
      'Further human verification would be needed before any clinical interpretation.',
    ],
    bodySystemTags: ['dermatology', 'immune'],
    ingredientFocus: 'Sea buckthorn oil',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Use only as preclinical immune and skin-context evidence. Avoid translating animal-model effects into CEOVIA claims.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-006',
    proposedSlug: 'extract-fractions-elagagnus-rhamnoides-implications-human-barrier-cells',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32397559/',
    PMID: '32397559',
    DOI: '10.3390/molecules25092238',
    articleTitle:
      'Phenolic and Non-Polar Fractions of the Extracts from Fruits, Leaves, and Twigs of Elaeagnus rhamnoides (L.) A. Nelson-The Implications for Human Barrier Cells.',
    journal: 'Molecules',
    year: 2020,
    studyType: 'In vitro epithelial and fibroblast study',
    population: 'Caco-2 epithelial cells and HFF-1 human fibroblasts in vitro',
    sampleSize: null,
    interventionOrExposure: 'Phenolic and non-polar fractions from sea buckthorn fruit, leaf, and twig extracts',
    comparator: 'Untreated cell conditions',
    duration: 'Source-specific exposure timing requires confirmation during review',
    primaryEndpoints: [
      'Cell secretory activity',
      'Cell-surface molecule expression',
      'Migration during scratch-wound conditions in vitro',
    ],
    keyObservations: [
      'The study evaluates barrier-cell responses across epithelial and fibroblast models rather than a clinical population.',
      'The source reports mixed cell-model findings, including changes in expression and migration-related assays.',
    ],
    safetyObservations: [
      'In vitro barrier-cell findings do not establish human tolerability or CEOVIA-specific outcomes.',
      'Extract fractions and cell models differ materially from finished-product use conditions.',
    ],
    limitations: [
      'Cell-based evidence only.',
      'Mixed findings across models require careful, non-promotional framing.',
      'No direct clinical population or CEOVIA formulation was studied.',
    ],
    bodySystemTags: ['dermatology', 'mucosal'],
    ingredientFocus: 'Sea buckthorn extract fractions from fruits, leaves, and twigs',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Useful for barrier-cell context, but wording should acknowledge the mixed in vitro profile and route differences.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-007',
    proposedSlug: 'vegetable-butters-oils-skin-wound-healing-dermatology-review',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/31657094/',
    PMID: '31657094',
    DOI: '10.1002/ptr.6524',
    articleTitle:
      'Vegetable butters and oils in skin wound healing: Scientific evidence for new opportunities in dermatology.',
    journal: 'Phytotherapy Research',
    year: 2020,
    studyType: 'Narrative review',
    population: 'Review-level dermatology and wound-healing literature across multiple vegetable oils',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn oil discussed within a broader review of vegetable butters and oils',
    comparator: '',
    duration: '',
    primaryEndpoints: [
      'Skin wound-healing literature themes',
      'Lipid-barrier and tissue-repair discussion',
    ],
    keyObservations: [
      'Sea buckthorn is one of several oils considered in the review rather than the sole intervention focus.',
      'The paper discusses wound-healing, lipid-barrier, and inflammation-related themes at review level across heterogeneous oil sources and study types.',
    ],
    safetyObservations: [
      'This source is contextual and should not be used as direct proof for CEOVIA-specific performance.',
      'Review-level synthesis does not resolve formulation, dose, route, or population differences for sea buckthorn specifically.',
    ],
    limitations: [
      'Broad review rather than a sea-buckthorn-specific clinical study.',
      'Includes heterogeneous evidence types and intervention contexts.',
      'Not specific to CEOVIA or a single standardized preparation.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Sea buckthorn oil in broader dermatology oil literature',
    evidenceType: 'review',
    confidenceLevel: 2,
    notesForCurator:
      'Best used as high-level dermatology context only. Reviewer should ensure sea buckthorn-specific statements remain narrow. If normalized later, any relevanceToCeovia field should frame this as contextual literature rather than product-supporting evidence.',
    status: 'under_review',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'Citation metadata was checked against the PubMed summary record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID and DOI are present and consistent.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as a review article rather than a primary human trial.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Review-level evidence has no single study population or sample size to extract.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'Retained as contextual literature only; no causal or product-level language should follow from this record.',
      },
      wordingNeutralityReview: {
        checked: true,
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 2 retained because this is evidence synthesis rather than direct human trial evidence for sea buckthorn alone.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
        notes: 'Heterogeneity and non-specificity are now explicit.',
      },
      complianceSignoff: {
        checked: true,
        notes: 'Appropriate for contextual dermatology background only.',
      },
      interpretationRiskFlag: {
        flagged: true,
        notes: 'Risk of overextending broad review themes into CEOVIA-specific claims.',
      },
      readyForNormalization: false,
    },
    reviewerNotes:
      'Moved to under_review with checklist completed. This record remains contextual and should not be normalized until any downstream interpretation is narrowed to background use only.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'reviewed',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-008',
    proposedSlug: 'oral-vitamins-supplements-management-atopic-dermatitis-systematic-review',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/30892697/',
    PMID: '30892697',
    DOI: '10.1111/ijd.14404',
    articleTitle:
      'The role of oral vitamins and supplements in the management of atopic dermatitis: a systematic review.',
    journal: 'International Journal of Dermatology',
    year: 2019,
    studyType: 'Systematic review',
    population: 'Clinical-trial and supplement literature related to atopic dermatitis',
    sampleSize: null,
    interventionOrExposure: 'Oral vitamins and supplements, including preliminary sea buckthorn oil literature',
    comparator: '',
    duration: '',
    primaryEndpoints: [
      'Atopic-dermatitis supplement evidence review',
      'Study-quality and sample-size appraisal',
    ],
    keyObservations: [
      'Sea buckthorn oil appears within a broader supplement evidence review rather than as the sole subject of analysis.',
      'The review notes that many included studies are limited by small sample sizes.',
    ],
    safetyObservations: [
      'This review does not establish CEOVIA-specific efficacy or route comparability.',
      'Any sea-buckthorn-related interpretation should remain tied to the cited supplement literature only.',
    ],
    limitations: [
      'Broader supplement review rather than a sea-buckthorn-specific trial report.',
      'Underlying studies vary in design and sample size.',
      'Disease-context framing requires extra caution in downstream editorial use.',
    ],
    bodySystemTags: ['dermatology', 'immune'],
    ingredientFocus: 'Sea buckthorn oil within broader oral supplement literature',
    evidenceType: 'review',
    confidenceLevel: 2,
    notesForCurator:
      'Use only as cautious context for oral supplement literature. Review disease-treatment phrasing carefully before any normalization.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-009',
    proposedSlug: 'fatty-acid-fraction-sea-buckthorn-seed-oil-normal-skin-cells',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/34712136/',
    PMID: '34712136',
    DOI: '10.3389/fphar.2021.737571',
    articleTitle:
      'A Fatty Acid Fraction Purified From Sea Buckthorn Seed Oil Has Regenerative Properties on Normal Skin Cells.',
    journal: 'Frontiers in Pharmacology',
    year: 2021,
    studyType: 'In vitro skin-cell study',
    population: 'Normal skin-cell models in vitro',
    sampleSize: null,
    interventionOrExposure: 'Purified fatty acid fraction from sea buckthorn seed oil',
    comparator: 'Source-specific control conditions require confirmation during review',
    duration: 'Source-specific exposure timing requires confirmation during review',
    primaryEndpoints: [
      'Skin-cell response measures',
      'Fatty-acid-fraction effects in laboratory skin models',
    ],
    keyObservations: [
      'The study examines a purified seed-oil fatty acid fraction in normal skin-cell models rather than a human population.',
      'The title signals regenerative framing, but downstream CEOVIA use should stay limited to source-grounded cell-level observations.',
    ],
    safetyObservations: [
      'Laboratory skin-cell findings do not establish clinical safety or finished-product outcomes.',
      'Purified fatty acid fraction may not reflect CEOVIA composition or use context.',
    ],
    limitations: [
      'In vitro evidence only.',
      'Detailed endpoints should be confirmed during reviewer extraction from the full source.',
      'No direct human-use or CEOVIA-specific conclusions can be drawn.',
    ],
    bodySystemTags: ['dermatology', 'oxidative'],
    ingredientFocus: 'Purified fatty acid fraction from sea buckthorn seed oil',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Conservative staging entry based on source title and metadata. Reviewer should confirm abstract-specific endpoints before normalization.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-010',
    proposedSlug: 'sea-buckthorn-seed-oil-skin-hydration-aquaporin-hyaluronan-expression',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32638495/',
    PMID: '32638495',
    DOI: '10.1111/jocd.13482',
    articleTitle:
      'Unsaturated fatty acid-enriched extract from Hippophae rhamnoides seed reduces skin dryness through up-regulating aquaporins 3 and hyaluronan synthetases 2 expressions.',
    journal: 'Journal of Cosmetic Dermatology',
    year: 2021,
    studyType: 'Keratinocyte and reconstructed epidermis study',
    population: 'Normal human epidermal keratinocytes and reconstructed epidermis skin model',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn seed oil or an unsaturated fatty acid-enriched seed extract',
    comparator: 'Negative control conditions without the seed-oil treatment',
    duration: 'Laboratory treatment timing requires source-specific confirmation during review',
    primaryEndpoints: [
      'AQP3 expression',
      'HAS2 expression',
      'Skin-hydration-related model readouts',
    ],
    keyObservations: [
      'The source reports changes in aquaporin- and hyaluronan-synthesis-related expression in laboratory skin models.',
      'No clinical population was studied, and the findings remain model-specific.',
    ],
    safetyObservations: [
      'Absence of cytotoxicity in the laboratory model should not be translated into broad human safety claims.',
      'Model system and seed-oil preparation may differ from CEOVIA use conditions.',
    ],
    limitations: [
      'No human clinical population.',
      'Expression-level findings in keratinocyte and reconstructed epidermis models are not direct product-efficacy evidence.',
      'Exposure format and composition need confirmation during detailed review.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Sea buckthorn seed oil unsaturated fatty acid fraction',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Abstract uses stronger hydration language than should appear in CEOVIA copy. Keep normalized wording observational and model-specific.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-011',
    proposedSlug: 'sea-buckthorn-seed-pulp-oils-fatty-acid-composition-skin-glycerophospholipids',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/11002130/',
    PMID: '11002130',
    DOI: '10.1016/S0955-2863(00)00088-7',
    articleTitle:
      'Effect of dietary supplementation with sea buckthorn (Hippophaë rhamnoides) seed and pulp oils on the fatty acid composition of skin glycerophospholipids of patients with atopic dermatitis.',
    journal: 'The Journal of Nutritional Biochemistry',
    year: 2000,
    studyType: 'Human dietary supplementation study',
    population: 'Patients with atopic dermatitis',
    sampleSize: null,
    interventionOrExposure: 'Dietary supplementation with sea buckthorn seed and pulp oils',
    comparator: 'Source-specific comparator details require confirmation during review',
    duration: 'Source-specific supplementation period requires confirmation during review',
    primaryEndpoints: [
      'Fatty acid composition of skin glycerophospholipids',
      'Supplementation-associated compositional changes',
    ],
    keyObservations: [
      'The source title indicates assessment of skin glycerophospholipid fatty-acid composition after dietary supplementation.',
      'This appears to be a human study, but detailed cohort size and comparator structure should be confirmed from the full source before normalization.',
    ],
    safetyObservations: [
      'Disease-population context and oral supplementation route differ from broader CEOVIA evidence communication needs.',
      'This study should not be framed as CEOVIA-specific efficacy evidence.',
    ],
    limitations: [
      'Detailed sample size and protocol specifics need source confirmation.',
      'Older human study with narrow compositional endpoints.',
      'Disease-population findings require cautious handling in non-treatment editorial contexts.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Sea buckthorn seed and pulp oils',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Human study retained for balance, but reviewer should verify cohort details and keep downstream use limited to compositional observations rather than efficacy language.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-012',
    proposedSlug: 'sea-buckthorn-seed-oil-uv-induced-lipid-metabolism-human-skin-cells',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/30142919/',
    PMID: '30142919',
    DOI: '10.3390/antiox7090110',
    articleTitle:
      'The Effect of Sea Buckthorn (Hippophae rhamnoides L.) Seed Oil on UV-Induced Changes in Lipid Metabolism of Human Skin Cells.',
    journal: 'Antioxidants',
    year: 2018,
    studyType: 'In vitro human skin-cell study',
    population: 'Human skin-cell models under ultraviolet exposure conditions',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn seed oil in ultraviolet-exposed human skin-cell models',
    comparator: 'Ultraviolet-exposed comparison conditions without seed-oil treatment',
    duration: 'Source-specific timing requires confirmation during review',
    primaryEndpoints: [
      'UV-associated lipid-metabolism changes',
      'Skin-cell oxidative and lipid-pathway context',
    ],
    keyObservations: [
      'The study examines ultraviolet-associated lipid-metabolism changes in human skin-cell models.',
      'The evidence remains mechanistic and should be used only for pathway-level context unless fuller source review supports narrower language.',
    ],
    safetyObservations: [
      'Cell-model findings do not establish human-use safety or clinical benefit.',
      'Ultraviolet challenge conditions and seed-oil exposure format differ from CEOVIA use conditions.',
    ],
    limitations: [
      'Mechanistic in vitro evidence only.',
      'Detailed endpoints should be verified against the full abstract and article during review.',
      'No finished-product or human clinical outcomes were assessed.',
    ],
    bodySystemTags: ['dermatology', 'oxidative'],
    ingredientFocus: 'Sea buckthorn seed oil',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Conservative staging entry based on indexed metadata and title. Reviewer should confirm lipid-pathway details before normalization.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-013',
    proposedSlug: 'dietary-supplementation-sea-buckthorn-seed-pulp-oils-atopic-dermatitis',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/15539258/',
    PMID: '15539258',
    DOI: '10.1016/S0955-2863(99)00049-2',
    articleTitle:
      'Effects of dietary supplementation with sea buckthorn (Hippophae rhamnoides) seed and pulp oils on atopic dermatitis.',
    journal: 'The Journal of Nutritional Biochemistry',
    year: 1999,
    studyType: 'Placebo-controlled double-blind human clinical trial',
    population: 'Adults with atopic dermatitis',
    sampleSize: 49,
    interventionOrExposure: 'Daily supplementation with sea buckthorn seed oil or pulp oil',
    comparator: 'Paraffin oil placebo',
    duration: '4 months',
    primaryEndpoints: [
      'Dermatitis-related symptom change during follow-up',
      'Changes in plasma fatty acid composition',
      'Selected serum lipid and immunoglobulin markers',
    ],
    keyObservations: [
      'The placebo-controlled, double-blind trial assessed symptom change and plasma fatty acid composition after four months of supplementation.',
      'The abstract reports significant improvement in the pulp-oil group and non-significant improvement in the seed-oil group relative to baseline, while placebo-group improvement was also reported within the study.',
    ],
    safetyObservations: [
      'The abstract reports no change in total or specific immunoglobulin E levels during the study period.',
      'This oral supplementation study should not be treated as evidence for CEOVIA-specific efficacy or equivalent exposure.',
    ],
    limitations: [
      'Older clinical study with modest sample size.',
      'Disease-population context requires careful handling in non-treatment editorial use.',
      'Observed changes differ between seed-oil and pulp-oil arms, and placebo improvement was also reported.',
    ],
    bodySystemTags: ['dermatology', 'immune'],
    ingredientFocus: 'Sea buckthorn seed and pulp oils',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Human trial with useful clinical balance, but downstream summaries should reflect the mixed arm-specific outcomes and avoid product-level extrapolation. If normalized later, any relevanceToCeovia field should state that the study may contextualize ingredient-level oral lipid exposure, but does not establish CEOVIA-specific efficacy.',
    status: 'under_review',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'Title, journal, year, and citation details were checked against the PubMed record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID and DOI both match the source record.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as a placebo-controlled, double-blind human clinical trial.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Atopic-dermatitis population and sample size of 49 captured from the abstract.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'Record kept observational and explicitly notes mixed arm-level findings and placebo improvement.',
      },
      wordingNeutralityReview: {
        checked: true,
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 3 retained because human clinical data are present, while quality caveats remain in limitations.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
        notes: 'Disease context, sample-size limits, and mixed study findings are now explicit.',
      },
      complianceSignoff: {
        checked: true,
        notes: 'Suitable for cautious under-review use without product-efficacy interpretation.',
      },
      interpretationRiskFlag: {
        flagged: true,
        notes: 'Risk of overstating a human dermatitis trial as CEOVIA proof despite mixed arm results and placebo improvement.',
      },
      readyForNormalization: false,
    },
    reviewerNotes:
      'Moved to under_review after full checklist completion. Strongest sea-buckthorn human dermatology record in staging so far, but mixed arm-specific outcomes and disease-context language should be reviewed before approval.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'reviewed',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-014',
    proposedSlug: 'sea-buckthorn-cream-second-degree-burns-randomized-triple-blind-trial',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/33792111/',
    PMID: '33792111',
    DOI: '10.1111/wrr.12916',
    articleTitle:
      'To compare the effect of sea buckthorn and silver sulfadiazine dressing on period of wound healing in patients with second-degree burns: A randomized triple-blind clinical trial.',
    journal:
      'Wound Repair and Regeneration',
    year: 2021,
    studyType: 'Randomized triple-blind clinical trial',
    population: 'Patients with second-degree burns',
    sampleSize: 55,
    interventionOrExposure: 'Sea buckthorn cream dressing',
    comparator: '1% silver sulfadiazine dressing',
    duration: 'Until complete wound healing',
    primaryEndpoints: [
      'Period to complete wound healing',
      'Bates-Jensen wound assessment measures',
    ],
    keyObservations: [
      'The trial compared sea buckthorn cream dressing with silver sulfadiazine in patients with second-degree burns.',
      'The abstract reports a shorter healing period in the sea-buckthorn-treated group under the study conditions.',
    ],
    safetyObservations: [
      'This trial evaluates a burn-care dressing context and should not be generalized to routine cosmetic or supplement use.',
      'Comparator-controlled wound-care findings should remain separate from broader CEOVIA dermatology messaging.',
    ],
    limitations: [
      'Burn-wound population is narrower than general skin-barrier or hydration contexts.',
      'Topical cream dressing differs materially from CEOVIA formulation and intended use.',
      'The abstract emphasizes efficacy language that should be softened in downstream curation.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Sea buckthorn topical cream',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Relevant as human topical skin evidence, but only within a wound-care context. Reviewer should keep any normalized language narrow and non-promotional.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'DERM-015',
    proposedSlug: 'oral-palmitoleic-acid-supplementation-skin-barrier-improvement-12-week-study',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/37292315/',
    PMID: '37292315',
    DOI: '10.1016/j.heliyon.2023.e16711',
    articleTitle:
      'Efficacy and safety of oral palmitoleic acid supplementation for skin barrier improvement: A 12-week, randomized, double-blinded, placebo-controlled study.',
    journal: 'Heliyon',
    year: 2023,
    studyType: 'Randomized double-blind placebo-controlled human study',
    population: 'Healthy adult women',
    sampleSize: 90,
    interventionOrExposure: 'Oral palmitoleic acid supplementation at 500 mg/day',
    comparator: 'Corn-oil placebo without palmitoleic acid',
    duration: '12 weeks',
    primaryEndpoints: [
      'Skin hydration',
      'Transepidermal water loss',
      'Skin elasticity and wrinkle-related measures',
    ],
    keyObservations: [
      'The trial measured skin-barrier and wrinkle-related endpoints at six-week intervals over twelve weeks.',
      'The abstract reports improvement in skin hydration and transepidermal water loss in the intervention group compared with placebo, while several wrinkle-related measures did not significantly differ from control.',
    ],
    safetyObservations: [
      'The abstract states that no supplement-related adverse reactions were observed during the study period.',
      'This record is included as a closely related omega-7 human bioactive study rather than a sea-buckthorn-specific intervention.',
    ],
    limitations: [
      'Not a sea-buckthorn-specific study.',
      'Study population was limited to healthy adult women.',
      'Some secondary skin-aging endpoints did not significantly improve versus placebo.',
    ],
    bodySystemTags: ['dermatology'],
    ingredientFocus: 'Palmitoleic acid (omega-7)',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Use as related-bioactive human context only. Keep the distinction from sea buckthorn interventions explicit in any future normalization. If a relevanceToCeovia field is later added in the live layer, it should frame this as omega-7 barrier-context evidence rather than sea-buckthorn product proof.',
    status: 'approved',
    reviewerChecklist: {
      citationVerification: {
        checked: true,
        notes: 'Title, journal, year, and DOI-backed citation details were checked against the PubMed record.',
      },
      pmidOrDoiVerification: {
        checked: true,
        notes: 'PMID and DOI both verified.',
      },
      titleJournalYearVerification: {
        checked: true,
      },
      studyTypeConfirmation: {
        checked: true,
        notes: 'Confirmed as a randomized, double-blind, placebo-controlled human study.',
      },
      populationAndSampleSizeReview: {
        checked: true,
        notes: 'Healthy adult women and sample size of 90 were captured from the abstract.',
      },
      claimStrengthReview: {
        checked: true,
        notes: 'The record preserves the mixed endpoint structure and avoids broad skin-aging or efficacy conclusions.',
      },
      wordingNeutralityReview: {
        checked: true,
      },
      evidenceTypeConfirmation: {
        checked: true,
      },
      confidenceLevelReview: {
        checked: true,
        notes: 'Level 3 retained because this is human randomized evidence, with scope limitations stated clearly.',
      },
      safetyAndLimitationCompleteness: {
        checked: true,
        notes: 'Population limits, non-sea-buckthorn scope, and mixed endpoint outcomes are explicit.',
      },
      complianceSignoff: {
        checked: true,
        notes: 'Approved for normalization as bounded related-bioactive human evidence.',
      },
      interpretationRiskFlag: {
        flagged: false,
      },
      readyForNormalization: true,
    },
    reviewerNotes:
      'Approved as a low-risk human barrier-function record with strong endpoint clarity. Must remain explicitly categorized as related omega-7 evidence rather than sea-buckthorn intervention evidence.',
    reviewedBy: 'CEOVIA Clinical Research Team',
    reviewedAt: '2026-04-17',
    complianceStatus: 'approved',
    normalizationReady: true,
  },
  {
    internalStudyId: 'IMM-001',
    proposedSlug: 'sea-buckthorn-flavonoids-lps-macrophage-mapk-nfkb-pathways',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/28256654/',
    PMID: '28256654',
    DOI: '10.1039/c6fo01873d',
    articleTitle:
      'Flavonoids from sea buckthorn inhibit the lipopolysaccharide-induced inflammatory response in RAW264.7 macrophages through the MAPK and NF-κB pathways',
    journal: 'Food & Function',
    year: 2017,
    studyType: 'Mechanistic cell study',
    population: 'LPS-stimulated RAW264.7 macrophage cells',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn flavonoid fraction',
    comparator: 'LPS-stimulated macrophages without sea buckthorn flavonoid treatment',
    duration: '',
    primaryEndpoints: [
      'Inflammatory signaling pathway activity',
      'Macrophage inflammatory-response markers',
    ],
    keyObservations: [
      'The study evaluated sea buckthorn flavonoids in an LPS-stimulated macrophage model focused on MAPK and NF-kB pathway activity.',
      'Reported observations were limited to cell-based inflammatory-response measures under in vitro conditions.',
    ],
    safetyObservations: [
      'This is an in vitro macrophage study and does not establish human immune effects.',
      'Cell-model findings should not be treated as evidence of CEOVIA-specific clinical activity.',
    ],
    limitations: [
      'Cell-based model without human participants.',
      'Inflammatory pathway findings were observed under controlled laboratory conditions only.',
      'Translation from macrophage signaling to whole-body immune outcomes remains uncertain.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Sea buckthorn flavonoids',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Useful for background on cytokine-related signaling and macrophage activity. Any downstream use should remain mechanism-level and avoid claims about immune enhancement or clinical efficacy.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'IMM-002',
    proposedSlug: 'sea-buckthorn-oil-cytokine-driven-anti-inflammatory-psoriasis-like-model',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/31680964/',
    PMID: '31680964',
    DOI: '10.3389/fphar.2019.01186',
    articleTitle:
      'Cytokines Driven Anti-Inflammatory and Anti-Psoriasis Like Efficacies of Nutraceutical Sea Buckthorn (Hippophae rhamnoides) Oil',
    journal: 'Frontiers in Pharmacology',
    year: 2019,
    studyType: 'Mechanistic preclinical inflammation study',
    population: 'Preclinical inflammation models and cytokine-focused assays',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn oil',
    comparator: 'Model controls without sea buckthorn oil treatment',
    duration: '',
    primaryEndpoints: [
      'Cytokine-related inflammatory markers',
      'Inflammation-associated signaling readouts',
    ],
    keyObservations: [
      'The study examined sea buckthorn oil in preclinical inflammation models with a focus on cytokine-associated outcomes.',
      'Reported findings were framed around inflammatory-pathway activity rather than human clinical endpoints.',
    ],
    safetyObservations: [
      'The available source context is preclinical and does not establish human immune safety or efficacy.',
      'Disease-model language in the title should not be carried into product-facing interpretation.',
    ],
    limitations: [
      'Preclinical design with no direct human clinical validation.',
      'Disease-model framing raises interpretation risk if reused outside a tightly bounded research context.',
      'Immune observations may not generalize beyond the specific experimental system.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Sea buckthorn oil',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'High interpretation-risk record because the title uses efficacy language and disease framing. If reviewed later, keep summaries narrowly focused on cytokine-related preclinical observations only.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'IMM-003',
    proposedSlug: 'sea-buckthorn-bioactive-compounds-health-benefits-functional-food-review',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/33783272/',
    PMID: '33783272',
    DOI: '10.1080/10408398.2021.1905605',
    articleTitle:
      'Bioactive compounds, health benefits and functional food products of sea buckthorn: a review',
    journal: 'Critical Reviews in Food Science and Nutrition',
    year: 2022,
    studyType: 'Narrative review',
    population: 'Review-level evidence across nutritional and bioactive literature',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn bioactive compounds and food-product literature',
    comparator: '',
    duration: '',
    primaryEndpoints: [
      'Reported anti-inflammatory mechanisms in the literature',
      'Cataloguing of sea buckthorn nutrients and bioactive compounds',
    ],
    keyObservations: [
      'The review compiles published literature on sea buckthorn nutrients, bioactive compounds, and reported anti-inflammatory and antioxidant mechanisms.',
      'Its conclusions are literature-level and combine data from multiple model types rather than a single immune-study design.',
    ],
    safetyObservations: [
      'This review does not provide direct human immune safety data for CEOVIA or any matched finished product.',
      'Broad review findings should be used cautiously because underlying evidence sources are heterogeneous.',
    ],
    limitations: [
      'Narrative review structure may combine in vitro, animal, and human findings in one discussion.',
      'Not limited to immune outcomes alone.',
      'Requires careful downstream separation of source fact from interpretation.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Sea buckthorn bioactive compounds',
    evidenceType: 'review',
    confidenceLevel: 2,
    notesForCurator:
      'Useful as a broad immune-context background source, but too wide in scope for strong claim support. Any future editorial use should stay high-level and avoid implying clinical immune effects.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'IMM-004',
    proposedSlug: 'cianidanol-sea-buckthorn-jak2-stat3-anti-inflammatory-raw2647-cells',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/39832078/',
    PMID: '39832078',
    DOI: '10.1007/s11130-024-01290-8',
    articleTitle:
      'Cianidanol from Sea Buckthorn Exert Anti-Inflammatory Effects by the Inhibiting JAK2/STAT3 Signaling Pathway via an Integrative Pharmacology Strategy',
    journal: 'Plant Foods for Human Nutrition',
    year: 2025,
    studyType: 'Mechanistic cell study',
    population: 'RAW264.7 macrophage cells with integrative pharmacology analysis',
    sampleSize: null,
    interventionOrExposure: 'Cianidanol identified from sea buckthorn',
    comparator: 'Inflammatory cell model without cianidanol treatment',
    duration: '',
    primaryEndpoints: [
      'JAK2/STAT3 signaling activity',
      'Inflammatory mediator secretion in macrophage cells',
    ],
    keyObservations: [
      'The study combined analytical and computational screening with RAW264.7 cell experiments to examine an identified sea-buckthorn-derived compound.',
      'Reported observations centered on signaling-pathway and cytokine-related markers in a macrophage model.',
    ],
    safetyObservations: [
      'The source is mechanistic and does not establish human immune outcomes.',
      'Compound-level observations should not be generalized to whole-extract or finished-product performance without additional evidence.',
    ],
    limitations: [
      'Cell-model and integrative-pharmacology design only.',
      'Compound-specific findings may not translate to complex formulations.',
      'No human dosing, tolerability, or clinical endpoint data were reported in this staging entry.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Cianidanol from sea buckthorn',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Potentially useful for mechanism mapping around cytokine pathways, but high risk for over-translation. Keep any later interpretation at the compound-and-pathway level only.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'IMM-005',
    proposedSlug: 'sea-buckthorn-berries-flavonols-crp-healthy-adults-randomized-study',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/19288149/',
    PMID: '19288149',
    DOI: '10.1007/s00394-009-0011-4',
    articleTitle:
      'Effect of a low dose of sea buckthorn berries on circulating concentrations of cholesterol, triacylglycerols, and flavonols in healthy adults',
    journal: 'European Journal of Nutrition',
    year: 2009,
    studyType: 'Randomized double-blind human study',
    population: 'Healthy adults',
    sampleSize: 229,
    interventionOrExposure: 'Daily consumption of 28 g of sea buckthorn berries',
    comparator: 'Placebo',
    duration: '3 months',
    primaryEndpoints: [
      'Circulating flavonol concentrations',
      'Circulating lipid markers',
      'Changes in C-reactive protein in relation to flavonol changes',
    ],
    keyObservations: [
      'The randomized double-blind study measured flavonol concentrations, lipid markers, and the relation of those changes to C-reactive protein in healthy adults over three months.',
      'Sea buckthorn berry intake increased circulating quercetin and isorhamnetin concentrations, while no correlation was observed between flavonol changes and CRP changes in the abstract.',
    ],
    safetyObservations: [
      'This human nutritional study was conducted in healthy adults and does not establish CEOVIA-specific immune effects.',
      'The abstracted observations are limited to measured blood markers under the study diet and intake conditions.',
    ],
    limitations: [
      'Healthy, normolipidemic adult population rather than an inflammatory-risk cohort.',
      'The abstract reports no correlation between flavonol changes and CRP changes.',
      'Measured outcomes were biomarker-focused and do not establish clinical immune benefits.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Sea buckthorn berries',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Useful as low-risk human immune-context evidence because CRP is explicitly addressed and the abstract includes null correlation language. Future summaries should preserve that restraint rather than implying anti-inflammatory efficacy.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'IMM-006',
    proposedSlug: 'seabuckthorn-oil-trans-palmitoleic-acid-metabolically-healthy-adults-crossover-study',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32140719/',
    PMID: '32140719',
    DOI: '10.1093/jn/nxaa060',
    articleTitle:
      'Supplementation with Seabuckthorn Oil Augmented in 16:1n-7t Increases Serum Trans-Palmitoleic Acid in Metabolically Healthy Adults: A Randomized Crossover Dose-Escalation Study',
    journal: 'The Journal of Nutrition',
    year: 2020,
    studyType: 'Randomized double-blind crossover dose-escalation study',
    population: 'Metabolically healthy adults',
    sampleSize: 13,
    interventionOrExposure:
      'Seabuckthorn oil and seabuckthorn oil augmented in trans-palmitoleic acid (16:1n-7t)',
    comparator: 'Crossover comparison between augmented and unmodified seabuckthorn oil dose periods',
    duration: 'Three 3-week escalation doses with 4-week washout between supplements',
    primaryEndpoints: [
      'Serum phospholipid cis- and trans-palmitoleic acid concentrations',
      'Secondary clinical measures including glucose homeostasis and serum lipids',
    ],
    keyObservations: [
      'The randomized crossover study assessed whether seabuckthorn-oil supplementation changed circulating cis- and trans-palmitoleic acid concentrations in metabolically healthy adults.',
      'The abstract reports increases in corresponding phospholipid fatty acids with supplementation, while no significant effects were identified on glucose, insulin, lipids, or other clinical measures in this dosing study.',
    ],
    safetyObservations: [
      'No carryover or adverse effects were observed according to the abstract.',
      'This dosing study evaluated circulating fatty-acid exposure and was not powered to establish broader inflammatory or immune outcomes.',
    ],
    limitations: [
      'Small sample size.',
      'Metabolically healthy adults rather than an immune-relevant clinical cohort.',
      'Inflammation-related interpretation is indirect because inflammatory biomarkers were not the primary measured endpoints.',
    ],
    bodySystemTags: ['immune'],
    ingredientFocus: 'Seabuckthorn oil augmented in trans-palmitoleic acid',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'This is best treated as human exposure-context evidence relevant to omega-7 availability, not direct proof of immune modulation. Any later immune-layer use should stay narrow and acknowledge that inflammatory biomarkers were not the primary outcome.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'MET-001',
    proposedSlug: 'sea-buckthorn-berries-cholesterol-triacylglycerols-flavonols-healthy-adults',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/19288149/',
    PMID: '19288149',
    DOI: '10.1007/s00394-009-0011-4',
    articleTitle:
      'Effect of a low dose of sea buckthorn berries on circulating concentrations of cholesterol, triacylglycerols, and flavonols in healthy adults',
    journal: 'European Journal of Nutrition',
    year: 2009,
    studyType: 'Randomized controlled human study',
    population: 'Healthy adults',
    sampleSize: null,
    interventionOrExposure: 'Low-dose sea buckthorn berry supplementation',
    comparator: 'Control condition described in the randomized study design',
    duration: '',
    primaryEndpoints: [
      'Circulating cholesterol concentrations',
      'Triacylglycerol concentrations',
      'Plasma flavonol concentrations',
    ],
    keyObservations: [
      'The randomized human study assessed circulating lipid-related markers and flavonol concentrations after low-dose sea buckthorn berry intake.',
      'Source emphasis was on measured changes in circulating markers rather than disease-outcome endpoints.',
    ],
    safetyObservations: [
      'This record reflects a human nutritional study context rather than CEOVIA-specific safety or efficacy.',
      'Dose form, intake level, and berry composition should be checked carefully during any downstream normalization.',
    ],
    limitations: [
      'Sample size was not confirmed in the current staging note and requires curator verification.',
      'Healthy-adult context may not generalize to populations with metabolic impairment.',
      'Abstract-level extraction should be cross-checked before approval.',
    ],
    bodySystemTags: ['metabolic'],
    ingredientFocus: 'Sea buckthorn berries',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Promising human metabolic-context record, but staging details remain intentionally conservative until sample size and comparator wording are verified directly from the source.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'MET-002',
    proposedSlug: 'sea-buckthorn-plasma-glucose-impaired-glucose-regulation-crossover-study',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/33917994/',
    PMID: '33917994',
    DOI: '10.3390/foods10040804',
    articleTitle:
      'Effect of Sea Buckthorn on Plasma Glucose in Individuals with Impaired Glucose Regulation: A Two-Stage Randomized Crossover Intervention Study',
    journal: 'Foods',
    year: 2021,
    studyType: 'Randomized crossover human intervention study',
    population: 'Adults with impaired glucose regulation',
    sampleSize: 38,
    interventionOrExposure: 'Sea buckthorn fruit puree, 90 mL/day',
    comparator: 'Placebo in a two-way crossover design',
    duration: 'Two 5-week intervention periods with a 4-week washout',
    primaryEndpoints: [
      'Plasma glucose outcomes',
      'Glycemic-response measures in individuals with impaired glucose regulation',
    ],
    keyObservations: [
      'The randomized, double-blinded crossover study examined sea buckthorn fruit puree intake in adults with impaired glucose regulation.',
      'Observed outcomes were limited to glycemic measures captured during the intervention and washout design.',
    ],
    safetyObservations: [
      'This human study reflects a food-puree intervention and should not be equated with CEOVIA formulation or dosing.',
      'Metabolic observations in an impaired-glucose-regulation cohort should not be generalized beyond the studied population.',
    ],
    limitations: [
      'Population is condition-specific rather than broadly healthy adults.',
      'Food-puree exposure differs from CEOVIA composition and intended use.',
      'Downstream summaries should avoid implying broader glucose-control efficacy beyond the study design.',
    ],
    bodySystemTags: ['metabolic'],
    ingredientFocus: 'Sea buckthorn fruit puree',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'One of the stronger metabolic human candidates in staging, but disease-context sensitivity remains important. Keep future summaries observational and limited to the studied glucose-regulation context.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'MET-003',
    proposedSlug: 'sea-buckthorn-juice-risk-factors-coronary-heart-disease-humans',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/12088800/',
    PMID: '12088800',
    DOI: '10.1016/S0955-2863(02)00179-1',
    articleTitle:
      'Effects of an antioxidant-rich juice (sea buckthorn) on risk factors for coronary heart disease in humans',
    journal: 'The Journal of Nutritional Biochemistry',
    year: 2002,
    studyType: 'Human dietary intervention study',
    population: 'Healthy male volunteers',
    sampleSize: 20,
    interventionOrExposure: 'Sea buckthorn juice supplementation',
    comparator: 'Placebo',
    duration: '8 weeks',
    primaryEndpoints: [
      'Plasma lipid measures',
      'LDL oxidation susceptibility',
      'Platelet aggregation and soluble adhesion marker measures',
    ],
    keyObservations: [
      'The human intervention study evaluated sea buckthorn juice in relation to plasma lipids, LDL oxidation, platelet aggregation, and soluble adhesion-protein concentration.',
      'The abstract reports no significant changes in several measured lipid and adhesion outcomes, with a moderate decrease in susceptibility of LDL to oxidation.',
    ],
    safetyObservations: [
      'This record reflects an antioxidant-rich juice intervention in healthy male volunteers.',
      'It should not be interpreted as evidence for CEOVIA-specific cardiometabolic efficacy or clinical risk reduction.',
    ],
    limitations: [
      'Small sample size.',
      'Healthy-volunteer context rather than a metabolically impaired cohort.',
      'Observed changes in HDL-C and triacylglycerols were reported as non-significant in the abstract.',
    ],
    bodySystemTags: ['metabolic'],
    ingredientFocus: 'Sea buckthorn juice',
    evidenceType: 'human-study',
    confidenceLevel: 3,
    notesForCurator:
      'Useful as a conservative human metabolic-context record because the abstract includes both measured endpoints and non-significant findings. Future summaries should preserve that balance rather than flattening the results.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'MET-004',
    proposedSlug: 'sea-buckthorn-metabolic-syndrome-systematic-review-meta-analysis-rcts',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/36043374/',
    PMID: '36043374',
    DOI: '10.1002/ptr.7596',
    articleTitle:
      'Effects of sea buckthorn (Hippophae rhamnoides L.) on factors related to metabolic syndrome: A systematic review and meta-analysis of randomized controlled trial',
    journal: 'Phytotherapy Research',
    year: 2022,
    studyType: 'Systematic review and meta-analysis',
    population: 'Review-level synthesis of randomized controlled trials',
    sampleSize: 15,
    interventionOrExposure: 'Sea buckthorn supplementation across randomized controlled trials',
    comparator: 'Comparator conditions used in included randomized trials',
    duration: '',
    primaryEndpoints: [
      'Triglycerides, total cholesterol, LDL-C, and HDL-C',
      'Blood glucose, blood pressure, and BMI in relation to metabolic-syndrome factors',
    ],
    keyObservations: [
      'The meta-analysis synthesized 15 randomized controlled trials examining sea buckthorn supplementation and metabolic-syndrome-related factors.',
      'The abstract reports pooled lipid changes, while also noting no overall effect on blood glucose, blood pressure, and BMI and high heterogeneity across studies.',
    ],
    safetyObservations: [
      'As a pooled review, this record does not provide a single standardized exposure or direct CEOVIA-matched safety context.',
      'Heterogeneity across included trials should remain explicit in any downstream use.',
    ],
    limitations: [
      'High heterogeneity was reported.',
      'The review pools multiple study designs, populations, and intervention formats.',
      'Lipid-related findings should not be generalized to all metabolic endpoints.',
    ],
    bodySystemTags: ['metabolic'],
    ingredientFocus: 'Sea buckthorn supplementation across randomized trials',
    evidenceType: 'review',
    confidenceLevel: 2,
    notesForCurator:
      'Potential anchor review for metabolic literature, but reviewers should preserve the abstract’s null findings for glucose, blood pressure, and BMI rather than emphasizing lipid results alone.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
  {
    internalStudyId: 'MET-005',
    proposedSlug: 'sea-buckthorn-juice-fermentation-high-fat-diet-metabolic-syndrome-gut-microbiota',
    pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/36461283/',
    PMID: '36461283',
    DOI: '10.1016/j.foodres.2022.111948',
    articleTitle:
      'Enhancement in the metabolic profile of sea buckthorn juice via fermentation for its better efficacy on attenuating diet-induced metabolic syndrome by targeting gut microbiota',
    journal: 'Food Research International',
    year: 2022,
    studyType: 'Mechanistic animal study',
    population: 'High-fat-diet C57BL/6 mouse model',
    sampleSize: null,
    interventionOrExposure: 'Sea buckthorn juice pulp and fermented sea buckthorn juice',
    comparator: 'High-fat-diet controls and non-fermented juice comparison',
    duration: '',
    primaryEndpoints: [
      'Hyperlipidemia and insulin-resistance measures in a high-fat-diet model',
      'Gut microbiota composition, short-chain fatty acids, and metabolomic changes',
    ],
    keyObservations: [
      'The study compared non-fermented and fermented sea buckthorn juice in a high-fat-diet mouse model of metabolic-syndrome-like changes.',
      'The abstract reports that the fermented preparation was associated with differences in hyperlipidemia, insulin resistance, oxidative stress, microbiota composition, and short-chain fatty acids under the study conditions.',
    ],
    safetyObservations: [
      'This is an animal-model study and does not establish human metabolic outcomes.',
      'Fermented juice findings should not be generalized to non-fermented ingredients or CEOVIA formulation without separate evidence.',
    ],
    limitations: [
      'Mouse model rather than human clinical evidence.',
      'Fermentation materially changes the intervention composition.',
      'Gut microbiota observations may not translate directly to human metabolic response.',
    ],
    bodySystemTags: ['metabolic'],
    ingredientFocus: 'Fermented sea buckthorn juice',
    evidenceType: 'mechanistic',
    confidenceLevel: 1,
    notesForCurator:
      'Useful for gut-microbiota and metabolic-pathway context, but high translation risk. Keep later summaries tightly bounded to the animal-model and fermented-juice setting.',
    status: 'extracted',
    reviewerChecklist: createEmptyReviewerChecklist(),
    reviewerNotes: '',
    reviewedBy: '',
    reviewedAt: '',
    complianceStatus: 'not_started',
    normalizationReady: false,
  },
]
