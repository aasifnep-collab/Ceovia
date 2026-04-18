import EntryHero from '@/components/ui/EntryHero'
import { clinicalInsightHero } from '@/data/clinicalInsight'

export default function ClinicalInsightHero() {
  return (
    <EntryHero
      id="clinical-insight-heading"
      variant="brand"
      align="left"
      eyebrow={clinicalInsightHero.tag}
      heading={clinicalInsightHero.title}
      description={clinicalInsightHero.subheading}
      actions={[
        {
          href: '#overview',
          label: clinicalInsightHero.cta,
          variant: 'secondary',
        },
      ]}
    />
  )
}
