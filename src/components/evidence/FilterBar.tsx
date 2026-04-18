import {
  BODY_SYSTEM_OPTIONS,
  EVIDENCE_TYPE_OPTIONS,
  type BodySystemTag,
  type EvidenceType,
} from '@/data/evidence'

type Props = {
  bodySystem: BodySystemTag | 'all'
  evidenceType: EvidenceType | 'all'
  onBodySystemChange: (value: BodySystemTag | 'all') => void
  onEvidenceTypeChange: (value: EvidenceType | 'all') => void
}

export default function FilterBar({
  bodySystem,
  evidenceType,
  onBodySystemChange,
  onEvidenceTypeChange,
}: Props) {
  return (
    <section aria-label="Evidence filters" className="space-y-4.5">
      <div className="flex flex-wrap gap-2.5">
        {BODY_SYSTEM_OPTIONS.map((option) => {
          const active = option.id === bodySystem
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onBodySystemChange(option.id)}
              className={[
                'rounded-full border px-4 py-2.5 font-sans text-sm transition-colors duration-200',
                active
                  ? 'border-himalayan-green/20 bg-himalayan-green/10 text-deep-green'
                  : 'border-himalayan-green/12 bg-white text-text-muted',
              ].join(' ')}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="max-w-[14rem]">
        <label htmlFor="evidence-type" className="sr-only">
          Evidence type
        </label>
        <select
          id="evidence-type"
          value={evidenceType}
          onChange={(event) => onEvidenceTypeChange(event.target.value as EvidenceType | 'all')}
          className="w-full rounded-full border border-himalayan-green/12 bg-white px-4 py-2.5 font-sans text-sm text-text-dark focus:border-himalayan-green focus:ring-0"
        >
          {EVIDENCE_TYPE_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
