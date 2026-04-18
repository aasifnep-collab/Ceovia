import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/journal',
        '/privacy',
        '/terms',
        '/cookies',
        '/api/',
        '/_next/',
      ],
    },
    sitemap: 'https://ceovia.com/sitemap.xml',
  }
}
