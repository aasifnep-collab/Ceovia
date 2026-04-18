/**
 * TrustStrip — single centered credential line between SystemBlueprint and Ingredients.
 * No icons, no CTA, no heading.
 */

export default function TrustStrip() {
  return (
    <div
      style={{
        padding:        '20px 0',
        textAlign:      'center',
        fontSize:       '11px',
        letterSpacing:  '0.08em',
        color:          '#888888',
        textTransform:  'uppercase',
      }}
    >
      Supercritical CO₂ Extracted · Halal Certified · Third-Party Tested · No Fillers. No Binders.
    </div>
  )
}
