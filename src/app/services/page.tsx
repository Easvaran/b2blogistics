'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Anchor, Truck, Shield, FileCheck, Globe, ArrowRight, CheckCircle2, Warehouse, BadgeCheck, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'AIR FREIGHT',
    slug: 'air-freight',
    description: 'Fast, reliable, and secure air cargo solutions for your time-sensitive shipments across the state.',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070',
    color: 'blue'
  },
  {
    title: 'OCEAN FREIGHT',
    slug: 'ocean-freight',
    description: 'Cost-effective and scalable sea freight solutions for all types of cargo, from full containers to small shipments.',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1494412574743-0112f05c78ec?q=80&w=2070',
    color: 'red'
  },
  {
    title: 'SEA/AIR SERVICE',
    slug: 'sea-air-service',
    description: 'The perfect balance of speed and economy, combining sea freight cost with air freight speed.',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    color: 'blue'
  },
  {
    title: 'PROJECT HANDLING',
    slug: 'project-handling',
    description: 'Specialized logistics for oversized, heavy, and complex cargo requiring meticulous planning.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2014',
    color: 'red'
  },
  {
    title: 'CUSTOM FORMALITIES',
    slug: 'custom-formalities',
    description: 'Expert customs brokerage services to ensure your shipments comply with all state trade regulations.',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070',
    color: 'blue'
  },
  {
    title: 'WAREHOUSING',
    slug: 'warehousing',
    description: 'Secure storage and distribution solutions with real-time inventory management.',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    color: 'red'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
            alt="Logistics Services"
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
              Comprehensive freight forwarding and supply chain solutions tailored to your business needs. 
              We move your cargo across districts with precision and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">WHAT WE DO</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              EXPERT LOGISTICS <span className="text-blue-900 dark:text-blue-500">SOLUTIONS</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{service.title}</h4>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-black text-blue-900 dark:text-blue-400 uppercase tracking-widest group-hover:gap-4 transition-all"
                  >
                    Explore Service <ArrowRight className="w-4 h-4 text-red-600" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Quick Stats */}
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
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors">
                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-900 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-wide">{item.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
                  alt="Logistics Operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
              </div>
              {/* Floating Info Card */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Verified Excellence</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  "Delivering your business goals across every district, every day."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-900 rounded-[40px] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10">
              READY TO MOVE YOUR <span className="text-red-500">CARGO?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto relative z-10">
              Get a custom quote for your shipping needs today. Our team is ready to optimize your logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-red-900/20"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-100 text-blue-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
