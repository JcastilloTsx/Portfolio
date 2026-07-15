import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jeffreycastillo.dev', // TODO: Replace with actual domain
      lastModified: new Date('2026-07-07'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
