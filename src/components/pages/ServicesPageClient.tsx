'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Anchor, Truck, Shield, FileCheck, Globe, ArrowRight, CheckCircle2, Warehouse, BadgeCheck, Clock, MapPin, Loader2, Package, Boxes, Truck as TruckIcon, HelpCircle, Target, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getIcon } from '@/lib/icons';

const defaultServices = [
  {
    title: 'LAND TRANSPORT',
    slug: 'land-transport',
    description: 'Reliable and efficient land transport solutions across the state, ensuring your cargo reaches its destination safely and on time.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2014',
    features: ['FTL & LTL Services', 'State-wide Network', 'Real-time Tracking']
  }
];

export default function ServicesPageClient() {
  const [mounted, setMounted] = useState(false);
  const [visibility, setVisibility] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      try {
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData && settingsData.visibility) {
            setVisibility(settingsData.visibility);
          }
        }

        const servicesRes = await fetch('/api/services');
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          if (Array.isArray(servicesData)) {
            setDynamicServices(servicesData);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  const displayServices = (dynamicServices.length > 0 ? dynamicServices : defaultServices).filter((s: any) => s.isVisible !== false);

  if (visibility?.services === false) {
    return notFound();
  }

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="relative h-[400px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
            alt="B2B Logistics Comprehensive Freight and Shipping Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full mb-6">
              State Class Logistics
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
              OUR <span className="text-red-600">SERVICES</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              Tailored logistics solutions designed to optimize your supply chain and drive business growth across the state.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">WHAT WE DO</h2>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              COMPREHENSIVE <span className="text-blue-900 dark:text-blue-500">SOLUTIONS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const Icon = typeof service.icon === 'string' ? getIcon(service.icon) : (service.icon || Truck);
              return (
                <motion.div
                  key={service.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <div className="relative h-full bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={service.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                          {service.description}
                        </p>
                        
                        <div className="space-y-3 mb-8">
                          {(service.features || []).slice(0, 3).map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center text-red-600 font-black text-xs uppercase tracking-widest gap-2 group/btn">
                          Explore Service <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">OUR ADVANTAGE</h2>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">
                WHY CHOOSE <span className="text-blue-900 dark:text-blue-500">B2BLOGISTICS?</span>
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'State-wide Network', desc: 'Connectivity to all districts state-wide.', icon: Globe },
                  { title: 'Safe & Secure', desc: 'Advanced tracking and high-standard cargo safety.', icon: Shield },
                  { title: 'Expert Team', desc: 'Decades of experience in state freight.', icon: BadgeCheck },
                  { title: 'On-Time Delivery', desc: 'Precision scheduling and reliable transit times.', icon: Clock }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
                  >
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2070"
                  alt="B2B Logistics Efficient Supply Chain Operations"
                  width={600}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-blue-900 rounded-[4rem] p-12 md:p-20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10">
                READY TO MOVE YOUR <span className="text-red-500">CARGO?</span>
              </h2>
              <p className="text-xl text-blue-100 mb-10 font-medium">
                Get a customized logistics solution that fits your business needs. Our experts are ready to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-900 px-10 py-5 rounded-full font-black text-lg hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl"
                >
                  GET A QUOTE
                </Link>
                <Link
                  href="/enquiry"
                  className="bg-blue-800 text-white border border-blue-700 px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  ENQUIRE NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
