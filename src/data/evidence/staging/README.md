# CEOVIA Evidence Staging Workflow

This staging layer is for internal evidence curation only.

It is designed to help a human reviewer convert PubMed-backed source records into the live CEOVIA evidence system without drifting from the production schema.

## Status flow

- `pending_extraction`
- `extracted`
- `under_review`
- `approved`
- `rejected`

## How to use the staging worksheet

1. Start with a PubMed-backed source record.
2. Copy source facts into the staging template first:
   - title
   - journal
   - year
   - PMID / DOI
   - population
   - sample size
   - intervention or exposure
   - comparator
   - duration
   - endpoints
   - key observations
   - safety observations
   - limitations
3. Keep `keyObservations` factual and source-grounded.
4. Do not convert source observations into product claims.
5. Move records to `under_review` before they are mapped into live evidence files.

## Writing discipline

- Use neutral scientific wording.
- Separate source facts from CEOVIA interpretation.
- Avoid disease-treatment, cure, prevention, or reversal language.
- If certainty is limited, state the limitation rather than filling gaps.
- `relevanceToCeovia` in the live detail layer should remain internal, cautious, and non-promotional.

## Reviewer gate

Before a record moves to `approved`, a reviewer should check:

- citation accuracy
- PMID / DOI accuracy
- title / journal / year accuracy
- study type classification
- population and sample-size capture
- claim strength
- wording neutrality
- evidence type
- confidence level
- safety and limitation completeness
- compliance suitability

Approval should be blocked if:

- source identifiers do not match
- study type is uncertain
- wording overstates causality or product relevance
- limitations are missing
- compliance notes are not sufficient for the evidence type

If source details remain uncertain:

- keep the record in `under_review` or return it to `extracted`
- document the uncertainty in `reviewerNotes`
- do not normalize it into the live evidence files

If a record is not suitable for use:

- set status to `rejected`
- capture the reason in `reviewerNotes`

## Converting approved staging records into live files

Approved entries should map into:

- `studies-meta.json`
  - lightweight listing data only
- `studies-detail.json`
  - richer record detail used by the drawer
- `interpretations.json`
  - domain-level interpretation text and stable `studyIds`

Use the helper scaffold in `normalize.ts` to reduce schema drift.

Normalization should happen only when:

- `status` is `approved`
- `complianceStatus` is `approved`
- `reviewerChecklist.readyForNormalization` is `true`
- `normalizationReady` is `true`

## Audit utility

The staging audit utility checks:

- total records
- records by status
- records by compliance status
- records in `under_review`
- records missing checklist completion
- records missing PMID / DOI verification
- records missing compliance signoff
- records with interpretation-risk flags
- records approved but not normalization-ready
- records fully ready for normalization

To run it locally:

```bash
node --experimental-strip-types scripts/audit-evidence-staging.ts
```

Interpretation:

- blocked records appear in `blockersByRecord`
- records that are clean for normalization appear in `grouped.readyForNormalization`
- records still needing reviewer action appear in the grouped blocker lists

## Review boundary

The staging layer is internal only.

Do not import staging files into live UI components unless there is an explicit future workflow for reviewer tooling.
