'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Anchor, Truck, Shield, FileCheck, Globe, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const servicesData: Record<string, any> = {
  'land-transport': {
    title: 'LAND TRANSPORT',
    description: 'Reliable and efficient land transport solutions across the state, ensuring your cargo reaches its destination safely and on time.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2014',
    features: [
      'State-wide door-to-door delivery',
      'Full Truckload (FTL)',
      'Less than Truckload (LTL)',
      'Express road delivery',
      'Real-time tracking and monitoring',
      'Last-mile delivery expertise'
    ],
    details: 'Our land transport services are designed to meet your most demanding deadlines. With a state-wide network of partners and carriers, we ensure your cargo moves swiftly through the supply chain with maximum security and transparency.'
  }
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<any>(servicesData[params.slug]);
  const [visibility, setVisibility] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsRes = await fetch('/api/settings');
        const settingsData = await settingsRes.json();
        if (settingsData.visibility) {
          setVisibility(settingsData.visibility);
        }

        // If not a hardcoded service, fetch from DB
        if (!servicesData[params.slug]) {
          const serviceRes = await fetch(`/api/services`);
          const dynamicServices = await serviceRes.json();
          const dynamicService = dynamicServices.find((s: any) => s.slug === params.slug);
          if (dynamicService) {
            // Map dynamic service to match the detail page structure
            setService({
              ...dynamicService,
              icon: Truck, // Default icon
              features: dynamicService.features || [
                'Reliable Delivery',
                'Real-time Tracking',
                'Expert Handling',
                'State-wide Coverage'
              ],
              details: dynamicService.details || dynamicService.description
            });
          }
        }
      } catch (err) {
        console.error('Error fetching data in service detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!service || visibility?.services === false) {
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
              We provide end-to-end management of your cargo to ensure seamless state-wide connectivity.
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