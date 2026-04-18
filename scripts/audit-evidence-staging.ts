import { auditStagingRecords, formatAuditReport } from '../src/data/evidence/staging/audit.ts'

const report = auditStagingRecords()

console.log(formatAuditReport(report))
