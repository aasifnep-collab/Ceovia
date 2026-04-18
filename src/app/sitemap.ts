import { MetadataRoute } from 'next'
import { journalArticles } from '@/lib/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ceovia.com'

  const routes = [
    '/',
    '/products/ceovia-90-day',
    '/system',
    '/ingredients',
    '/science',
    '/clinical-insight',
    '/journal',
    '/about',
    '/contact',
    '/shipping',
  ]

  const journalRoutes = journalArticles.map((article) => `/journal/${article.slug}`)

  return [...routes, ...journalRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : route.startsWith('/products') ? 0.9 : 0.8,
  }))
}
