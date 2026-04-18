import Hero            from '@/components/sections/Hero'
import SystemBlueprint from '@/components/sections/SystemBlueprint'
import TrustStrip      from '@/components/sections/TrustStrip'
import Ingredients     from '@/components/sections/Ingredients'
import Evidence        from '@/components/sections/Evidence'
import System          from '@/components/sections/System'
import PricingAnchor   from '@/components/sections/PricingAnchor'
import JournalPreview  from '@/components/sections/JournalPreview'
import CtaBanner       from '@/components/sections/CtaBanner'

/**
 * Homepage — section order:
 *
 * 1. Hero
 * 2. SystemBlueprint  → 7-pillar bioactive blueprint
 * 3. TrustStrip       → single credential line
 * 4. Ingredients      → formula detail
 * 5. Evidence         → research framework
 * 6. System           → 90-day protocol phases
 * 7. PricingAnchor
 * 8. JournalPreview
 * 9. CtaBanner
 *
 * Navbar and Footer are rendered in layout.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SystemBlueprint />
      <TrustStrip />
      <Ingredients />
      <Evidence />
      <System />
      <PricingAnchor />
      <JournalPreview />
      <CtaBanner />
    </>
  )
}
