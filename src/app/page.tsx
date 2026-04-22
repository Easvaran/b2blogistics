'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Plane, Ship, FileCheck, Warehouse, ArrowRight, Clock, Shield, Globe, Award, ChevronRight, Star, Users, Package, Route, Headphones, Zap, Target, TrendingUp, Check, Loader2 } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollingTicker from '@/components/ui/ScrollingTicker';

const services = [
  { title: 'Air Freight', description: 'Fast and reliable air cargo services state-wide', icon: Plane, href: '/services/air-freight' },
  { title: 'Ocean Freight', description: 'Cost-effective sea freight solutions', icon: Ship, href: '/services/ocean-freight' },
  { title: 'Customs Clearance', description: 'Expert customs broker services', icon: FileCheck, href: '/services/customs-clearance' },
  { title: 'Warehousing', description: 'Secure storage and distribution', icon: Warehouse, href: '/services/warehousing' },
];

const testimonials = [
  { name: 'John Smith', company: 'TechCorp Inc.', role: 'Supply Chain Director', content: 'B2BLOGISTICS has been instrumental in streamlining our state-wide logistics. Their attention to detail and commitment to deadlines is exceptional.', rating: 5, image: '' },
  { name: 'Sarah Johnson', company: 'State Retail Ltd.', role: 'Operations Manager', content: 'The team at B2BLOGISTICS goes above and beyond. Their customs clearance expertise saved us both time and money. Highly recommended!', rating: 5, image: '' },
  { name: 'Michael Chen', company: 'Asia Trading Co.', role: 'CEO', content: 'We have been partnering with B2BLOGISTICS for 5 years now. Their reliability and professionalism in handling our freight is unmatched.', rating: 5, image: '' },
];

const stats = [
  { value: 150, suffix: '+', label: 'Areas Covered', icon: Globe },
  { value: 50, suffix: 'K+', label: 'Shipments Delivered', icon: Package },
  { value: 2500, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 25, suffix: '+', label: 'Years Experience', icon: Award },
];

const trustedBy = ['DHL', 'FedEx', 'Maersk', 'DB Schenker', 'Kuehne+Nagel', 'Expeditors'];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [visibility, setVisibility] = useState({
    hero: true,
    services: true,
    stats: true,
    testimonials: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) {
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        if (data && data.visibility) {
          setVisibility(prev => ({ ...prev, ...data.visibility }));
        }
      } catch (err) {
        console.error('Error fetching visibility settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, amount: 0.2 });
  const trustedRef = useRef(null);
  const trustedInView = useInView(trustedRef, { once: true });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section - Modern Glassmorphism Design */}
      {visibility?.hero !== false && (
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-3xl"
            ></motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          </div>
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 300]) }}
          className="absolute top-32 right-[10%] w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl backdrop-blur-md border border-white/10 hidden lg:block z-10"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 400]) }}
          className="absolute bottom-40 right-[40%] w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full backdrop-blur-md border border-white/10 hidden lg:block z-10"
          animate={{ 
            y: [0, 40, 0], 
            x: [0, 20, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
          className="absolute top-1/4 left-[5%] w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl backdrop-blur-md border border-white/10 hidden lg:block z-10"
          animate={{ 
            y: [0, -30, 0], 
            rotate: [0, -20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Content */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 font-medium">Trusted by 2500+ State-wide Companies</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              >
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-white block"
                >
                  State-wide 
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent inline-block"
                >
                  Logistics
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-white"
                >
                  Made Simple
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/70 max-w-lg leading-relaxed"
              >
                End-to-end freight forwarding solutions with real-time tracking, customs clearance, and warehousing. Your cargo, our priority.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 hover:-translate-y-1 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  href="/services"
                  className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
                >
                  Explore Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-6 pt-4"
              >
                {[
                  { icon: Shield, label: 'ISO Certified', color: 'text-green-400' },
                  { icon: Clock, label: '24/7 Support', color: 'text-blue-400' },
                  { icon: TrendingUp, label: 'Fast Delivery', color: 'text-amber-400' }
                ].map((badge, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-2 cursor-default"
                  >
                    <badge.icon className={`w-5 h-5 ${badge.color}`} />
                    <span className="text-white/60 text-sm">{badge.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="hidden lg:block relative perspective-1000"
            >
              <motion.div 
                whileHover={{ rotateY: -5, rotateX: 5 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Main Image Card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-green-500 text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-green-500/50 z-30"
                  >
                    LIVE TRACKING
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: Plane, label: 'Air Freight', value: 'Next Day', delay: 0.8 },
                      { icon: Ship, label: 'Ocean Freight', value: '14-21 Days', delay: 1.0 },
                      { icon: Route, label: 'Inland Haulage', value: '2-5 Days', delay: 1.2 },
                      { icon: Warehouse, label: 'Warehousing', value: 'Secure', delay: 1.4 },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay, duration: 0.8 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(255,255,255,0.2)' 
                        }}
                        className="bg-white/5 rounded-[2rem] p-6 border border-white/5 transition-all duration-300 cursor-default group"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:text-red-500 transition-colors" />
                        </motion.div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                        <p className="text-white font-black text-xl">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -z-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ height: [4, 12, 4], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 bg-white/50 rounded-full" 
            />
          </motion.div>
        </motion.div>
      </section>
      )}

      {/* Trusted By Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden" ref={trustedRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={trustedInView ? { opacity: 1, y: 0 } : {}}
            className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12"
          >
            Trusted by Industry Leaders
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {trustedBy.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, filter: 'grayscale(100%)', y: 20 }}
                animate={trustedInView ? { opacity: 1, filter: 'grayscale(0%)', y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.1, filter: 'grayscale(0%) contrast(120%)' }}
                className="text-2xl md:text-3xl font-black text-slate-300 dark:text-slate-700 hover:text-blue-900 dark:hover:text-white transition-all cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Bento Grid */}
      {visibility?.stats !== false && (
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-red-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Our Performance</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Numbers That Matter</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">We consistently deliver exceptional results, building trust through reliability and excellence in every shipment.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 group overflow-hidden ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className={`${index === 0 ? 'h-16 w-16' : 'h-10 w-10'} text-blue-600 mb-6 group-hover:text-red-600 transition-colors`} />
                  </motion.div>
                  <div className={`${index === 0 ? 'text-6xl md:text-8xl' : 'text-5xl md:text-6xl'} font-black text-slate-900 dark:text-white mb-2 tracking-tighter`}>
                    {statsInView && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                  </div>
                  <p className="text-slate-500 font-black text-xs uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Services Section - Bento Style */}
      {visibility?.services !== false && (
      <section className="py-24 bg-white dark:bg-slate-900" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={servicesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="text-red-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">What We Do</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Our Services</h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl text-blue-900 dark:text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Why Choose Us - Modern Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden" ref={whyRef}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={whyInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-red-400 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Why Choose B2BLOGISTICS?</h2>
            <p className="text-blue-200 max-w-2xl mx-auto font-medium">We combine state-level expertise with local knowledge to deliver unmatched logistics solutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance for all your state-wide logistics needs', color: 'blue' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Your cargo is fully insured and protected throughout its journey', color: 'green' },
              { icon: Globe, title: 'State-wide Network', desc: 'Strategic presence in all districts with local expert knowledge', color: 'purple' },
              { icon: Award, title: 'ISO Certified', desc: 'Maintaining state-level quality standards in all our operations', color: 'amber' },
              { icon: Zap, title: 'Fast Delivery', desc: 'Optimized routes and processes for expedited shipments', color: 'red' },
              { icon: Headphones, title: 'Expert Advice', desc: 'Dedicated consultants with deep industry knowledge', color: 'cyan' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, rotateX: 30 }}
                animate={whyInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)'
                }}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition-all duration-500 cursor-default overflow-hidden relative"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  item.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  item.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  item.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  item.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                  item.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-blue-200 leading-relaxed font-medium">{item.desc}</p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="relative bg-gradient-to-br from-blue-900 to-slate-900 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-blue-900/20"
          >
            {/* Animated Background Elements */}
            <motion.div 
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: 360 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{ 
                x: [0, -100, 0],
                y: [0, 50, 0],
                rotate: -360 
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
            ></motion.div>
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
              >
                Ready to Ship?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-blue-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium"
              >
                Get a personalized quote for your logistics needs. Our experts are ready to help you optimize your supply chain.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link
                  href="/enquiry"
                  className="group bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all duration-300 inline-flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/40 active:scale-95"
                >
                  Get Quote Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1 active:scale-95"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {visibility?.testimonials !== false && (
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Scrolling Ticker Section */}
      <ScrollingTicker />
    </>
  );
}
