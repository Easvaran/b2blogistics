'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Anchor, Truck, Shield, FileCheck, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const servicesData: Record<string, any> = {
  'air-freight': {
    title: 'AIR FREIGHT',
    description: 'Fast, reliable, and secure air cargo solutions for your time-sensitive shipments across the globe.',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070',
    features: [
      'Global door-to-door delivery',
      'Airport-to-airport services',
      'Consolidation and direct shipments',
      'Hazardous goods handling',
      'Real-time tracking and monitoring',
      'Charter services for oversized cargo'
    ],
    details: 'Our air freight services are designed to meet your most demanding deadlines. With a global network of partners and carriers, we ensure your cargo moves swiftly through the supply chain with maximum security and transparency.'
  },
  'ocean-freight': {
    title: 'OCEAN FREIGHT',
    description: 'Cost-effective and scalable sea freight solutions for all types of cargo, from full containers to small shipments.',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1494412574743-0112f05c78ec?q=80&w=2070',
    features: [
      'Full Container Load (FCL)',
      'Less than Container Load (LCL)',
      'Breakbulk and oversized cargo',
      'Refrigerated container services',
      'Port-to-port and door-to-door',
      'Customized shipping schedules'
    ],
    details: 'B2BLOGISTICS provides comprehensive ocean freight services that balance cost and speed. Whether you are shipping large industrial machinery or retail goods, our team handles all the complexities of maritime logistics.'
  },
  'sea-air-service': {
    title: 'SEA/AIR SERVICE',
    description: 'The perfect balance of speed and economy, combining the cost-effectiveness of sea freight with the speed of air freight.',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    features: [
      'Significant cost savings vs air freight',
      'Faster transit times vs ocean freight',
      'Single documentation process',
      'Seamless transshipment handling',
      'Ideal for fashion and electronics',
      'Reduced carbon footprint'
    ],
    details: 'Our Sea/Air solution is an innovative multimodal transport strategy that allows you to optimize your budget while maintaining a competitive transit time for your global shipments.'
  },
  'project-handling': {
    title: 'PROJECT HANDLING',
    description: 'Specialized logistics for oversized, heavy, and complex cargo that requires meticulous planning and expert execution.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2014',
    features: [
      'Heavy lift and oversized cargo',
      'Site surveys and feasibility studies',
      'Route planning and permit management',
      'On-site supervision',
      'Multimodal transport solutions',
      'Specialized equipment handling'
    ],
    details: 'From power plant components to industrial factory moves, B2BLOGISTICS excels in managing complex project logistics. We provide end-to-end coordination to ensure your critical assets arrive safely and on schedule.'
  },
  'custom-formalities': {
    title: 'CUSTOM FORMALITIES',
    description: 'Expert customs brokerage services to ensure your shipments comply with all international trade regulations and move without delay.',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070',
    features: [
      'Import and export documentation',
      'Tariff classification and valuation',
      'Duty and tax calculation',
      'Regulatory compliance consulting',
      'Electronic data interchange (EDI)',
      'Bonded warehouse arrangements'
    ],
    details: 'Navigating customs regulations can be a major headache. Our certified customs experts stay updated on the latest laws and procedures to ensure your goods clear customs smoothly in any country.'
  },
  'cargo-insurance': {
    title: 'CARGO INSURANCE',
    description: 'Comprehensive insurance coverage to protect your valuable shipments against physical loss or damage during transit.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea7028c?q=80&w=2070',
    features: [
      'All-risk coverage options',
      'Door-to-door protection',
      'Fast claim processing',
      'Competitive premium rates',
      'International standard policies',
      'Peace of mind for high-value goods'
    ],
    details: 'Transit risks are a reality in global trade. We offer tailored insurance solutions that provide full financial protection for your cargo, whether it moves by air, sea, or land.'
  },
  'inland-transports': {
    title: 'INLAND TRANSPORTS',
    description: 'Reliable road and rail transportation services to connect your cargo from ports and airports to its final destination.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075',
    features: [
      'Full Truckload (FTL)',
      'Less than Truckload (LTL)',
      'Container drayage services',
      'Express road delivery',
      'Rail freight solutions',
      'Last-mile delivery expertise'
    ],
    details: 'Our inland transport network provides the critical link in your supply chain. We manage a fleet of modern vehicles and work with trusted rail operators to provide seamless door-to-door connectivity.'
  }
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6">
              <Icon className="h-4 w-4" />
              <span>OUR SERVICES</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-slate-200 font-medium leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Text */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black text-blue-900 dark:text-white mb-6 uppercase tracking-tight border-l-4 border-red-600 pl-4">
                  SERVICE OVERVIEW
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  {service.details}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {service.features.map((feature: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-red-600/30 transition-colors"
                  >
                    <CheckCircle2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-800 dark:text-slate-200 font-bold text-sm tracking-wide uppercase">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-blue-900 text-white p-10 rounded-3xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 uppercase">NEED A QUOTE?</h3>
                  <p className="text-blue-200 mb-8 font-medium">
                    Contact our logistics experts for a customized quote tailored to your specific requirements.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-red-600 text-white px-8 py-4 rounded-full font-black text-sm hover:bg-red-700 transition-all inline-flex items-center group w-full justify-center"
                  >
                    GET STARTED <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <Globe className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5" />
              </motion.div>

              {/* Other Services */}
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl">
                <h3 className="text-xl font-black text-blue-900 dark:text-white mb-6 uppercase border-b-2 border-red-600 pb-2 inline-block">
                  OTHER SERVICES
                </h3>
                <div className="space-y-2">
                  {Object.keys(servicesData).filter(s => s !== params.slug).map(slug => (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 font-bold text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all uppercase"
                    >
                      {servicesData[slug].title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
              RELIABLE {service.title} SOLUTIONS
            </h2>
            <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto font-medium">
              We provide end-to-end management of your cargo to ensure seamless global connectivity.
            </p>
            <Link
              href="/contact"
              className="bg-white text-red-600 px-10 py-5 rounded-full font-black text-lg hover:bg-slate-100 transition-all transform hover:scale-110 inline-flex items-center shadow-2xl"
            >
              BOOK NOW <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}