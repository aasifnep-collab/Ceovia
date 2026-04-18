/**
 * SectionHeader — shared heading pattern for every below-fold section.
 *
 * Server component. Animation is handled by the parent section's
 * motion.div wrapper — this component contains no motion logic.
 *
 * Heading hierarchy: always renders an <h2> so each section participates
 * correctly in the document outline (h1 lives in Hero only).
 */

type Props = {
  /** Small uppercase label above the heading — rendered in gold */
  eyebrow?: string
  /** The section h2 */
  heading: string
  /** Optional paragraph below the heading */
  subheading?: string
  /** id for aria-labelledby on the parent <section> */
  id?: string
  /** Text alignment — defaults to center */
  align?: 'left' | 'center'
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  id,
  align = 'center',
}: Props) {
  const alignClasses =
    align === 'left'
      ? 'text-left'
      : 'text-center mx-auto'

  return (
    <div className={`max-w-prose-narrow ${alignClasses}`}>
      {eyebrow && (
        <p
          aria-hidden="true"
          className="font-sans text-label-md uppercase tracking-widest text-gold-400 select-none mb-4"
        >
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className="font-display text-display-lg text-green-600 leading-snug"
      >
        {heading}
      </h2>

      {subheading && (
        <p className="font-sans text-body-lg text-[#4A5C52] mt-5 leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  )
}
