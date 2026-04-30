import { Metadata } from 'next';
import ServicesPageClient from '@/components/pages/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Logistics Services | Domestic Freight & Supply Chain Solutions',
  description: 'Explore our range of logistics services including land transport, warehousing, and express delivery. Tailored supply chain solutions across India.',
  alternates: {
    canonical: 'https://b2blogistics.in/services',
  },
  openGraph: {
    title: 'Comprehensive Logistics & Freight Services | B2B Logistics',
    description: 'From land transport to warehousing, discover how B2B Logistics can optimize your supply chain.',
    url: 'https://b2blogistics.in/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
