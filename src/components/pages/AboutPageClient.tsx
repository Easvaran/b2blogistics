'use client';

import { motion } from 'framer-motion';
import { Quote, CheckCircle2, Plane, Ship, Anchor, Truck, Target, Eye, Users, MapPin, Calendar, Award, Globe, ArrowRight, Linkedin, Twitter, Warehouse, Package, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPageClient() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const promises = [
    "Providing high quality transportation services to all of our clients",
    "Invest in our employees to provide better service and company growth",
    "Care for the environment according to latest industry standards",
    "Safety as top priority in assuring safe work procedures",
    "Investing in technology to provide fast, accurate and cost-effective services",
    "Living up to highest industry standards"
  ];

  const milestones = [
    { year: '1998', title: 'Company Founded', desc: 'Established in Chennai with a vision for state-wide logistics' },
    { year: '2005', title: 'State-wide Expansion', desc: 'Opened offices in major districts across the state' },
    { year: '2012', title: 'ISO Certification', desc: 'Achieved ISO 9001:2008 certification for quality management' },
    { year: '2018', title: 'Digital Transformation', desc: 'Launched real-time tracking and online booking platform' },
    { year: '2024', title: 'Industry Leader', desc: 'Recognized as top 10 freight forwarders in the region' },
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'Chief Executive Officer', exp: '25+ Years', image: '' },
    { name: 'Priya Sharma', role: 'Director of Operations', exp: '18+ Years', image: '' },
    { name: 'Anand Patel', role: 'Head of State Logistics', exp: '20+ Years', image: '' },
    { name: 'Meera Krishnan', role: 'Chief Financial Officer', exp: '15+ Years', image: '' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section - Modern Design */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
            alt="B2B Logistics Freight Forwarding Team and Operations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-[15%] w-48 h-48 bg-red-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Globe className="w-4 h-4 inline mr-2" />
              Established 1998 | Chennai, India
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
              ABOUT <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">B2BLOGISTICS</span>
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '38+', label: 'Districts Served' },
              { value: '2500+', label: 'Happy Clients' },
              { value: '50K+', label: 'Shipments Delivered' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-blue-200 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">OUR STORY</h2>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                WHO WE <span className="text-red-600">ARE</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                B2BLOGISTICS was founded in 1998 with a simple mission: to provide reliable, efficient, and transparent logistics solutions across the state. Over the past 25 years, we have grown from a small local operator to a state-wide leader in freight forwarding.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Target className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Our Mission</h3>
                  <p className="text-sm text-slate-500 font-medium">To simplify state-wide commerce through innovative and reliable logistics solutions.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Eye className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Our Vision</h3>
                  <p className="text-sm text-slate-500 font-medium">To be the first choice for businesses seeking seamless supply chain connectivity.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                  alt="B2B Logistics Operations and Warehousing"
                  width={600}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">OUR JOURNEY</h2>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="text-3xl font-black text-blue-600 mb-4 group-hover:scale-110 transition-transform inline-block">{m.year}</div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight text-sm">{m.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid (Brief) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-blue-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-4">OUR SERVICES</h2>
                <p className="text-blue-100 text-lg mb-8 font-medium">
                  We offer a comprehensive range of logistics services tailored to meet the unique needs of businesses across the state.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Truck, text: 'Land Transport' },
                    { icon: Plane, text: 'Air Freight' },
                    { icon: Ship, text: 'Ocean Freight' },
                    { icon: Warehouse, text: 'Warehousing' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <s.icon className="w-6 h-6 text-red-400" />
                      <span className="font-black text-sm uppercase tracking-widest">{s.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 mt-10 bg-white text-blue-900 px-8 py-4 rounded-full font-black text-sm hover:bg-red-600 hover:text-white transition-all group"
                >
                  VIEW ALL SERVICES <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="h-48 rounded-3xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075" alt="Service 1" width={400} height={400} className="object-cover h-full" />
                  </div>
                  <div className="h-64 rounded-3xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2070" alt="Service 2" width={400} height={400} className="object-cover h-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-64 rounded-3xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070" alt="Service 3" width={400} height={400} className="object-cover h-full" />
                  </div>
                  <div className="h-48 rounded-3xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070" alt="Service 4" width={400} height={400} className="object-cover h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-4">OUR LEADERSHIP</h2>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Meet The Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative h-96 rounded-[2.5rem] overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <Users className="w-20 h-20 text-slate-300 dark:text-slate-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</h3>
                  <p className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2">{member.role}</p>
                  <p className="text-slate-400 text-xs font-medium">{member.exp} Experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises / Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-black text-red-500 uppercase tracking-[0.3em] mb-4">OUR COMMITMENT</h2>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-4">OUR PROMISES</h2>
              <p className="text-slate-400 text-lg mb-10 font-medium">
                We believe in building long-term relationships based on trust, quality, and mutual growth.
              </p>
              <div className="space-y-4">
                {promises.map((promise, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-red-500 group-hover:text-white" />
                    </div>
                    <span className="font-bold text-sm text-slate-200">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                    <Award className="w-12 h-12 text-blue-400 mb-6" />
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Quality</h3>
                    <p className="text-slate-400 text-xs font-medium">Certified quality management systems.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                    <Shield className="w-12 h-12 text-green-400 mb-6" />
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Safety</h3>
                    <p className="text-slate-400 text-xs font-medium">Highest safety standards for your cargo.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                    <Globe className="w-12 h-12 text-red-400 mb-6" />
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Network</h3>
                    <p className="text-slate-400 text-xs font-medium">Extensive reach across all districts.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                    <Package className="w-12 h-12 text-amber-400 mb-6" />
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Expertise</h3>
                    <p className="text-slate-400 text-xs font-medium">Over 25 years of industry experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
