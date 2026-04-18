import type { NextConfig } from 'next'

const SECURITY_HEADERS = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https://cdn.shopify.com https://www.google-analytics.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // GTM container + GA4 script tags; Meta Pixel is loaded via GTM tag manager UI
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // GA4 measurement + GTM preview; Shopify checkout; Meta Pixel events (when enabled via GTM)
      "connect-src 'self' https://*.myshopify.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.facebook.com",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    // Shopify CDN — needed once product photography is served from Shopify Media.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
    // NOTE: dangerouslyAllowSVG intentionally removed.
    // The SVG placeholder in public/images/ is served as a static asset,
    // not through the Next.js Image optimizer pipeline, via the `unoptimized`
    // prop on each <Image> component that references it.
    // When the real .png product photo lands: remove `unoptimized` from
    // Hero.tsx and ProductHero.tsx.
  },

  async redirects() {
    return [
      // /start → product page — permanent (301 equivalent at edge)
      {
        source: '/start',
        destination: '/products/ceovia-90-day',
        permanent: true,
      },
      // /blog → /journal — permanent (URL rename, content is at /journal)
      {
        source: '/blog',
        destination: '/journal',
        permanent: true,
      },
      // /consumers → product page — temporary until dedicated page is built
      {
        source: '/consumers',
        destination: '/products/ceovia-90-day',
        permanent: false,
      },
      // /clinics → /practitioners — temporary until dedicated B2B page is built
      {
        source: '/clinics',
        destination: '/practitioners',
        permanent: false,
      },
      // /distributors → /contact — temporary until dedicated B2B page is built
      {
        source: '/distributors',
        destination: '/contact',
        permanent: false,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
    ]
  },
}

export default nextConfig
