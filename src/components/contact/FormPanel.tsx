'use client'

import type { ChangeEvent, FormEvent } from 'react'
import type { InquiryField, InquiryType } from './inquiryConfig'
import { SendIcon } from './icons'

type FormValues = Record<string, string>

type Props = {
  inquiry: InquiryType
  values: FormValues
  onFieldChange: (fieldId: string, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function Field({
  field,
  value,
  onChange,
}: {
  field: InquiryField
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}) {
  const commonClasses =
    'w-full rounded-2xl border border-[#D7DFDA] bg-white px-5 text-[15px] text-[#1A1A1A] placeholder:text-[#9AA79F] transition-all duration-200 focus:border-[#0E5A36]/55 focus:shadow-[0_0_0_4px_rgba(14,90,54,0.08)] focus-visible:outline-none'

  if (field.type === 'textarea') {
    return (
      <textarea
        id={field.id}
        name={field.id}
        required={field.required}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        rows={6}
        className={`${commonClasses} min-h-[220px] py-4`}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <select
        id={field.id}
        name={field.id}
        required={field.required}
        value={value}
        onChange={onChange}
        className={`${commonClasses} h-14`}
      >
        <option value="">{field.placeholder}</option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      id={field.id}
      name={field.id}
      type={field.type}
      required={field.required}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      className={`${commonClasses} h-14`}
    />
  )
}

export default function FormPanel({ inquiry, values, onFieldChange, onSubmit }: Props) {
  return (
    <div className="rounded-[28px] border border-[#DCE3DE] bg-white p-7 shadow-[0_14px_34px_rgba(17,38,28,0.045)] md:p-9">
      <div className="mb-9 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EFF5F1] text-[#0E5A36]">
          <SendIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans text-[1.125rem] font-medium text-[#1A1A1A]">
            {inquiry.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-[#6A776F] leading-relaxed">
            {inquiry.shortDescription}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {inquiry.fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="mb-2.5 block font-sans text-xs font-medium uppercase tracking-[0.12em] text-[#4A5C52]">
              {field.label}
            </label>
            <Field
              field={field}
              value={values[field.id] ?? ''}
              onChange={(event) => onFieldChange(field.id, event.target.value)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#0E5A36] px-8 py-4.5 font-sans text-base font-medium text-white transition-all duration-200 hover:bg-[#0A4428] hover:shadow-[0_12px_24px_rgba(14,90,54,0.12)]"
        >
          Send Enquiry
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
