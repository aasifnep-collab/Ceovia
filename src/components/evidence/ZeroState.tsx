type Props = {
  suggestedReset: string | null
  onReset: () => void
}

export default function ZeroState({ suggestedReset, onReset }: Props) {
  return (
    <div className="rounded-2xl border border-himalayan-green/12 bg-clinical-white px-5 py-6 md:px-6 md:py-7">
      <h3 className="font-display text-[1.45rem] leading-[1.08] text-deep-green">
        No studies match this filter combination
      </h3>
      <p className="mt-3 max-w-[42ch] font-sans text-sm leading-relaxed text-text-muted">
        {suggestedReset
          ? `Try removing the ${suggestedReset} filter first.`
          : 'Try resetting the active filters to return to the full evidence view.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 font-sans text-sm font-medium text-himalayan-green"
      >
        Reset all filters
      </button>
    </div>
  )
}
