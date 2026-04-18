'use client'

import type { InquiryType } from './inquiryConfig'
import { MailIcon, ResponseIcon, ShieldIcon } from './icons'

type Props = {
  inquiry: InquiryType
}

export default function SupportCards({ inquiry }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-[26px] border border-[#D6E1DA] bg-[linear-gradient(180deg,#F6FBF8_0%,#EEF6F1_100%)] p-7 text-[#11261C] shadow-[0_14px_34px_rgba(17,38,28,0.06)]">
        <div className="flex items-center gap-3 text-[#D4A857]">
          <ResponseIcon className="h-5 w-5" />
          <p className="font-sans text-xs font-medium uppercase tracking-[0.14em]">
            Expected Response
          </p>
        </div>
        <p className="mt-5 font-display text-[2rem] leading-none text-[#0E5A36]">
          {inquiry.responseTime}
        </p>
        <p className="mt-3 font-sans text-sm text-[#4A5C52] leading-relaxed">
          Reviewed by the CEOVIA team, never sent as an automated reply.
        </p>
      </div>

      <div className="rounded-[26px] border border-[#DCE3DE] bg-white p-7 shadow-[0_14px_30px_rgba(17,38,28,0.04)]">
        <h3 className="font-display text-[1.4rem] text-green-600">Direct Email</h3>
        <div className="mt-5 flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EFF5F1] text-[#0E5A36]">
            <MailIcon className="h-4 w-4" />
          </div>
          <div>
            <a
              href="mailto:info@ceovia.com"
              className="font-sans text-base font-medium text-[#1A1A1A] hover:text-[#0E5A36] hover:underline underline-offset-2"
            >
              info@ceovia.com
            </a>
            <p className="mt-1 font-sans text-sm text-[#6A776F]">
              For all CEOVIA enquiries
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[26px] border border-[#DCE3DE] bg-white p-7 shadow-[0_14px_30px_rgba(17,38,28,0.04)]">
        <h3 className="font-display text-[1.4rem] text-green-600">Trust Signals</h3>
        <ul className="mt-5 space-y-3">
          {[
            'Your enquiry is handled confidentially',
            'Routed to the relevant specialist',
            'You receive a considered, non-template response',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4F6F5] text-[#0E5A36]">
                <ShieldIcon className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-[#4A5C52] leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
