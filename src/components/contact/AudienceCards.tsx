'use client'

import type { InquiryType } from './inquiryConfig'
import { ClinicIcon, ConsumerIcon, DistributorIcon } from './icons'

type Props = {
  items: InquiryType[]
  activeAudience: InquiryType['id'] | null
  onSelect: (id: InquiryType['id']) => void
}

function getIcon(id: InquiryType['id']) {
  switch (id) {
    case 'consumer':
      return ConsumerIcon
    case 'clinic':
      return ClinicIcon
    case 'distributor':
      return DistributorIcon
  }
}

export default function AudienceCards({ items, activeAudience, onSelect }: Props) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map((item) => {
        const Icon = getIcon(item.id)
        const isActive = activeAudience === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-pressed={isActive}
            className={[
              'group rounded-[24px] border bg-white p-7 text-left transition-all duration-300 ease-out',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A36] focus-visible:outline-offset-2',
              isActive
                ? 'border-[#0A4428]/55 bg-[#F7FBF8] shadow-[inset_0_0_0_1px_rgba(14,90,54,0.12),0_14px_30px_rgba(17,38,28,0.06),0_0_0_6px_rgba(14,90,54,0.04)]'
                : 'border-[#D4DDD7] hover:border-[#0E5A36]/45 hover:bg-[#FBFDFC] hover:shadow-[0_10px_24px_rgba(17,38,28,0.04)]',
            ].join(' ')}
          >
            <div className="flex items-start gap-4">
              <div
                className={[
                  'mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
                  isActive ? 'bg-[#0E5A36] text-white shadow-[0_8px_18px_rgba(14,90,54,0.18)]' : 'bg-[#EFF5F1] text-[#0E5A36] group-hover:bg-[#E7F1EC]',
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="font-sans text-[1.0625rem] font-medium leading-tight text-[#1A1A1A]">
                  {item.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-[#6A776F] leading-relaxed">
                  {item.shortDescription}
                </p>
                <p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[#0E5A36]">
                  Reply {item.responseTime}
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
