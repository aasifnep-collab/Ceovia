'use client'

/**
 * GoogleTagManager
 *
 * Injects the GTM loader script when NEXT_PUBLIC_GTM_ID is set.
 * Renders nothing in environments without a container ID (dev, CI).
 *
 * The existing window.dataLayer / trackEvent pattern in analytics.ts
 * is already GTM-compatible — GA4 and any other GTM tags will consume
 * those events without code changes.
 *
 * Meta Pixel:
 *   Add the fbq pixel base code as a second GTM tag inside the GTM
 *   container UI. No code changes here are required.
 *   CSP already allows connect.facebook.net via the script-src directive
 *   in next.config.ts when you add the pixel tag in GTM.
 */

import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function GoogleTagManager() {
  if (!GTM_ID) return null

  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  )
}
