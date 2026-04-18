import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ceovia.com'

  const routes = [
    '/',
    '/products/ceovia-90-day',
    '/system',
    '/ingredients',
    '/science',
    '/about',
    '/contact',
    '/practitioners',
  ]

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))
}
