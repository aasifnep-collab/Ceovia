'use client'

import type { FormEvent } from 'react'
import type { InquiryType } from './inquiryConfig'
import { getInquiryType } from './inquiryConfig'
import FormPanel from './FormPanel'
import { ArrowUpIcon, ClinicIcon, ConsumerIcon, DistributorIcon } from './icons'
import SupportCards from './SupportCards'

type FormValues = Record<string, string>

type Props = {
  activeAudience: InquiryType['id'] | null
  formValues: FormValues
  onFieldChange: (fieldId: string, value: string) => void
}

function getStageIcon(id: InquiryType['id']) {
  switch (id) {
    case 'consumer':
      return ConsumerIcon
    case 'clinic':
      return ClinicIcon
    case 'distributor':
      return DistributorIcon
  }
}

export default function DynamicStage({ activeAudience, formValues, onFieldChange }: Props) {
  if (!activeAudience) {
    return (
      <div className="mt-10 flex min-h-[360px] items-center justify-center rounded-[30px] border border-dashed border-[#DDE4DF] bg-[#FBFCFB]/80 px-6 py-12 transition-all duration-300">
        <div className="text-center opacity-90">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#A8B5AE] shadow-[0_8px_22px_rgba(17,38,28,0.04)]">
            <ArrowUpIcon className="h-6 w-6" />
          </div>
          <p className="mt-6 font-sans text-[15px] text-[#6A776F]">
            Select who you are above to get started
          </p>
        </div>
      </div>
    )
  }

  const inquiry = getInquiryType(activeAudience)
  const StageIcon = getStageIcon(activeAudience)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requiredFields = inquiry.fields.filter((field) => field.required)
    const hasMissingField = requiredFields.some((field) => !formValues[field.id]?.trim())
    if (hasMissingField) return

    const subject = `${inquiry.emailSubjectPrefix}: ${formValues.subject ?? ''}`.trim()
    const details = inquiry.fields
      .filter((field) => field.id !== 'subject' && field.id !== 'message')
      .map((field) => `${field.label}: ${formValues[field.id] || '—'}`)
      .join('\n')

    const body = `${details}\n\nMessage:\n${formValues.message ?? ''}`
    window.location.href = `mailto:info@ceovia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="mt-10 grid gap-8 transition-all duration-300 ease-out lg:grid-cols-[minmax(0,7fr)_minmax(300px,3fr)] lg:gap-10">
      <div className="transition-all duration-300 ease-out">
        <div className="mb-6 flex items-start gap-4 rounded-[24px] border border-[#DCE3DE] bg-[#FBFCFB] p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0E5A36] text-white">
            <StageIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[1.0625rem] font-medium leading-tight text-[#1A1A1A]">
              {inquiry.title}
            </p>
            <p className="mt-2 font-sans text-sm text-[#6A776F] leading-relaxed">
              {inquiry.shortDescription}
            </p>
          </div>
        </div>

        <FormPanel
          inquiry={inquiry}
          values={formValues}
          onFieldChange={onFieldChange}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="transition-all duration-300 ease-out">
        <SupportCards inquiry={inquiry} />
      </div>
    </div>
  )
}
