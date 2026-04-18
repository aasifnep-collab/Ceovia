import type { NextConfig } from 'next'

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
}

export default nextConfig
