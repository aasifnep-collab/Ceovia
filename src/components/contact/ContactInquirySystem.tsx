'use client'

import { useMemo, useState } from 'react'
import AudienceCards from './AudienceCards'
import DynamicStage from './DynamicStage'
import { inquiryTypes, type InquiryType } from './inquiryConfig'

type FormValues = Record<string, string>
type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactInquirySystem() {
  const [activeAudience, setActiveAudience] = useState<InquiryType['id'] | null>(null)
  const [formValues, setFormValues] = useState<FormValues>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const currentFields = useMemo(() => {
    return inquiryTypes.find((item) => item.id === activeAudience)?.fields ?? []
  }, [activeAudience])

  const handleAudienceChange = (id: InquiryType['id']) => {
    setActiveAudience(id)
    setSubmissionState('idle')
    setSubmissionMessage('')
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
    if (submissionState !== 'idle') {
      setSubmissionState('idle')
      setSubmissionMessage('')
    }

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
        submissionState={submissionState}
        submissionMessage={submissionMessage}
        onSubmissionStateChange={setSubmissionState}
        onSubmissionMessageChange={setSubmissionMessage}
      />
    </div>
  )
}
