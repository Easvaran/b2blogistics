import { Metadata } from 'next';
import AboutPageClient from '@/components/pages/AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | B2B Logistics | 25+ Years of Logistics Excellence',
  description: 'Learn about B2B Logistics, a leader in domestic freight forwarding and supply chain solutions since 1998. Our mission, vision, and expert team.',
  alternates: {
    canonical: 'https://b2blogistics.in/about',
  },
  openGraph: {
    title: 'About B2B Logistics | Logistics Experts Since 1998',
    description: 'Discover our journey, milestones, and the team behind our state-wide logistics success.',
    url: 'https://b2blogistics.in/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
