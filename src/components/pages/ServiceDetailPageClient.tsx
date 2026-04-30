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

export default function ServiceDetailPageClient({ params }: { params: { slug: string } }) {
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

        if (!servicesData[params.slug]) {
          const serviceRes = await fetch(`/api/services`);
          const dynamicServices = await serviceRes.json();
          const dynamicService = dynamicServices.find((s: any) => s.slug === params.slug);
          if (dynamicService) {
            setService({
              ...dynamicService,
              icon: Truck,
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

  const Icon = service.icon || Truck;

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="relative h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={`${service.title} - B2B Logistics Domestic Shipping`}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-600 rounded-2xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="h-px w-20 bg-white/30"></div>
              <span className="text-white font-black tracking-[0.3em] text-xs uppercase">Service Detail</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black text-blue-900 dark:text-white mb-6 uppercase tracking-tight border-l-4 border-red-600 pl-4">
                  SERVICE OVERVIEW
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                  {service.details}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.features.map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:bg-white dark:hover:bg-slate-700 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-green-500 group-hover:text-white" />
                      </div>
                      <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight relative z-10">All Services</h3>
                <div className="space-y-2 relative z-10">
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
