import Link from 'next/link'

const columns = [
  {
    heading: 'The System',
    links: [
      { label: 'How It Works',    href: '/system' },
      { label: 'The 90-Day Plan', href: '/system#plan' },
      { label: 'Ingredients',     href: '/ingredients' },
      { label: 'Start Today',     href: '/start' },
    ],
  },
  {
    heading: 'Science',
    links: [
      { label: 'Evidence Framework', href: '/science' },
      { label: 'Research Library',   href: '/science#research' },
      { label: 'Bioactive Profile',  href: '/ingredients#bioactives' },
      { label: 'Clinical Context',   href: '/science#clinical' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story',       href: '/about' },
      { label: 'Journal',         href: '/journal' },
      { label: 'Practitioners',   href: '/practitioners' },
      { label: 'Contact',         href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Shipping & Returns', href: '/shipping' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-grey-50 border-t border-grey-100">

      {/* Main footer grid */}
      <div className="section-wrapper py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="CEOVIA — return to homepage"
              className="font-display text-2xl font-medium text-green-600 tracking-[0.06em]"
            >
              CEOVIA
            </Link>
            <p className="font-sans text-body-sm text-[#4A5C52] mt-4 leading-relaxed max-w-[18ch]">
              A clinically structured 90-day wellness system.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-label-md uppercase tracking-widest text-text-primary font-medium mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-sans text-body-sm text-[#4A5C52] hover:text-green-600 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-grey-100">
        <div className="section-wrapper py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-body-xs text-[#4A5C52] max-w-prose-wide leading-relaxed">
            CEOVIA products are not intended to diagnose, treat, cure, or prevent any disease.
            These statements have not been evaluated by the Food and Drug Administration.
            Always consult a qualified healthcare provider before starting any new supplement programme.
          </p>
          <p className="font-sans text-body-xs text-[#4A5C52] whitespace-nowrap">
            © {year} CEOVIA. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}
