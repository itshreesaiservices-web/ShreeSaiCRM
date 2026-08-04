import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shreesaiservices.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/mutual-funds',
    '/income-tax',
    '/financial-planning',
    '/insurance',
    '/contact',
    '/book-consultation',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
