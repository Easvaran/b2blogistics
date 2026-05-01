import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://b2blogisticssolution.com';

  // Static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/enquiry',
    '/cbm-calculator',
    '/container-specifications',
    '/inco-terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic service routes (hardcoded for now based on previous search results)
  const services = [
    'land-transport',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...services];
}
