import type { Metadata } from 'next'
import ClinicalInsightHero from '@/components/clinical-insight/ClinicalInsightHero'
import ClinicalInsightSubNav from '@/components/clinical-insight/ClinicalInsightSubNav'
import ClinicalPhilosophy from '@/components/clinical-insight/ClinicalPhilosophy'
import MechanismOfAction from '@/components/clinical-insight/MechanismOfAction'
import BioactiveIntelligence from '@/components/clinical-insight/BioactiveIntelligence'
import NinetyDaySystem from '@/components/clinical-insight/NinetyDaySystem'
import ClinicalFramework from '@/components/clinical-insight/ClinicalFramework'
import ResearchGateway from '@/components/clinical-insight/ResearchGateway'
import PartnerProgramme from '@/components/clinical-insight/PartnerProgramme'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Clinical Insight — CEOVIA',
  description:
    "The science behind CEOVIA's whole-body support model, bioactive matrix, and practitioner-facing clinical rationale.",
  path: '/clinical-insight',
})

export default function ClinicalInsightPage() {
  return (
    <>
      <ClinicalInsightHero />
      <ClinicalInsightSubNav />
      <ClinicalPhilosophy />
      <MechanismOfAction />
      <BioactiveIntelligence />
      <NinetyDaySystem />
      <ClinicalFramework />
      <ResearchGateway />
      <PartnerProgramme />
    </>
  )
}
