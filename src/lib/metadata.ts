import type { Metadata } from 'next'

const SITE_NAME = 'CEOVIA'
const SITE_URL = 'https://ceovia.com'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  imagePath?: string
}

export function getCanonicalUrl(path: string): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  imagePath = '/opengraph-image',
}: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(path)
  const image = getCanonicalUrl(imagePath)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export { SITE_NAME, SITE_URL }
