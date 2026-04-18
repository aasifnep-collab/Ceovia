'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

const PRODUCT_PATH = '/products/ceovia-90-day'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackEvent('page_view', { path: pathname })
  }, [pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href]')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href')
      if (!href) return

      if (href === PRODUCT_PATH || href === '/start') {
        trackEvent('product_cta_click', {
          path: pathname,
          href,
          label: link.textContent?.trim() ?? '',
        })
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  return null
}
