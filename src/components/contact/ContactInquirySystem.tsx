'use client'

import { useMemo, useState } from 'react'
import AudienceCards from './AudienceCards'
import DynamicStage from './DynamicStage'
import { inquiryTypes, type InquiryType } from './inquiryConfig'

type FormValues = Record<string, string>

export default function ContactInquirySystem() {
  const [activeAudience, setActiveAudience] = useState<InquiryType['id'] | null>(null)
  const [formValues, setFormValues] = useState<FormValues>({})

  const currentFields = useMemo(() => {
    return inquiryTypes.find((item) => item.id === activeAudience)?.fields ?? []
  }, [activeAudience])

  const handleAudienceChange = (id: InquiryType['id']) => {
    setActiveAudience(id)
    setFormValues((previous) => {
      const nextValues: FormValues = {}
      const nextFields = inquiryTypes.find((item) => item.id === id)?.fields ?? []
      nextFields.forEach((field) => {
        nextValues[field.id] = previous[field.id] ?? ''
      })
      return nextValues
    })
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues((previous) => ({
      ...previous,
      [fieldId]: value,
    }))
  }

  return (
    <div className="mt-20 md:mt-24">
      <AudienceCards
        items={inquiryTypes}
        activeAudience={activeAudience}
        onSelect={handleAudienceChange}
      />

      <DynamicStage
        activeAudience={activeAudience}
        formValues={Object.fromEntries(currentFields.map((field) => [field.id, formValues[field.id] ?? '']))}
        onFieldChange={handleFieldChange}
      />
    </div>
  )
}
