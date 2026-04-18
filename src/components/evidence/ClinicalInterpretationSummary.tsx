import type { Interpretation } from '@/data/evidence'

type Props = {
  interpretation: Interpretation
}

export default function ClinicalInterpretationSummary({ interpretation }: Props) {
  return (
    <section
      aria-label="Clinical interpretation summary"
      className="rounded-2xl border border-himalayan-green/12 bg-clinical-white px-5 py-5 md:px-6 md:py-6"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-himalayan-green">
        Clinical Interpretation Summary
      </p>
      <div className="mt-4 space-y-3.5">
        <p className="font-sans text-sm leading-relaxed text-text-dark">{interpretation.line1}</p>
        <p className="font-sans text-sm leading-relaxed text-text-dark">{interpretation.line2}</p>
        <p className="font-sans text-sm leading-relaxed text-text-muted">{interpretation.line3}</p>
        <p className="font-sans text-sm leading-relaxed text-text-muted">{interpretation.line4}</p>
      </div>
      <div className="mt-5 border-t border-himalayan-green/10 pt-4">
        <p className="font-sans text-sm italic leading-[1.75] text-deep-green">
          {interpretation.clinicianContext}
        </p>
      </div>
    </section>
  )
}
