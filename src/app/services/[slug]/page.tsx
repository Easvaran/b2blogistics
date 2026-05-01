import { Metadata } from 'next';
import ServiceDetailPageClient from '@/components/pages/ServiceDetailPageClient';

// Hardcoded for now, but in a real app you'd fetch from a DB
const servicesData: Record<string, any> = {
  'land-transport': {
    title: 'LAND TRANSPORT',
    description: 'Reliable and efficient land transport solutions across the state, ensuring your cargo reaches its destination safely and on time.',
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug];
  
  if (!service) {
    return {
      title: 'Service Not Found | B2B Logistics',
    };
  }

  return {
    title: `${service.title} | B2B Logistics Domestic Freight`,
    description: service.description,
    alternates: {
      canonical: `https://b2blogisticssolution.com/services/${params.slug}`,
    },
    openGraph: {
      title: `${service.title} | B2B Logistics`,
      description: service.description,
      url: `https://b2blogisticssolution.com/services/${params.slug}`,
      type: 'article',
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  return <ServiceDetailPageClient params={params} />;
}
