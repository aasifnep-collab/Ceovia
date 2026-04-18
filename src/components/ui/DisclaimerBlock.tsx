/**
 * DisclaimerBlock — mandatory regulatory disclaimer.
 *
 * Placed directly above <Footer /> on all product and marketing pages.
 * Text is passed as a prop so this component is reusable across pages
 * without needing different disclaimer variants to be hardcoded here.
 *
 * Server component.
 */

type Props = {
  text: string
}

export default function DisclaimerBlock({ text }: Props) {
  return (
    <div className="bg-[#F4F6F5] border-t border-[#C8D1CB]/40 py-8">
      <div className="section-wrapper">
        <p className="font-sans text-xs text-[#4A5C52] text-center leading-relaxed max-w-prose-narrow mx-auto">
          {text}
        </p>
      </div>
    </div>
  )
}
