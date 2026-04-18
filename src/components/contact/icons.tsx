type IconProps = {
  className?: string
}

export function ConsumerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  )
}

export function ClinicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 21V8" strokeLinecap="round" />
      <path d="M8.5 11.5H5.9A2.9 2.9 0 0 1 3 8.6V6.5A3.5 3.5 0 0 1 6.5 3h1A3.5 3.5 0 0 1 11 6.5V8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 11.5h2.6A2.9 2.9 0 0 0 21 8.6V6.5A3.5 3.5 0 0 0 17.5 3h-1A3.5 3.5 0 0 0 13 6.5V8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17h6" strokeLinecap="round" />
    </svg>
  )
}

export function DistributorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4" strokeLinecap="round" />
      <path d="M12 3.8c2.1 2.3 3.4 5.1 3.4 8.2S14.1 17.9 12 20.2C9.9 17.9 8.6 15.1 8.6 12S9.9 6.1 12 3.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 17V7" strokeLinecap="round" />
      <path d="m7.5 11.5 4.5-4.5 4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M21 3 10 14" strokeLinecap="round" />
      <path d="m21 3-7 18-4-7-7-4 18-7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 3.5 5.5 6v5.4c0 4.1 2.6 7.8 6.5 9.1 3.9-1.3 6.5-5 6.5-9.1V6L12 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9.5 12.2 1.7 1.7 3.4-3.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ResponseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  )
}
