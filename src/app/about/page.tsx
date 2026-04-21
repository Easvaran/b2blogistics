'use client';

import { motion } from 'framer-motion';
import { Quote, CheckCircle2, Plane, Ship, Anchor, Truck, Target, Eye, Users, MapPin, Calendar, Award, Globe, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
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
    { year: '1998', title: 'Company Founded', desc: 'Established in Chennai with a vision for global logistics' },
    { year: '2005', title: 'International Expansion', desc: 'Opened offices in Dubai, Singapore, and Hong Kong' },
    { year: '2012', title: 'ISO Certification', desc: 'Achieved ISO 9001:2008 certification for quality management' },
    { year: '2018', title: 'Digital Transformation', desc: 'Launched real-time tracking and online booking platform' },
    { year: '2024', title: 'Industry Leader', desc: 'Recognized as top 10 freight forwarders in Asia Pacific' },
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'Chief Executive Officer', exp: '25+ Years', image: '' },
    { name: 'Priya Sharma', role: 'Director of Operations', exp: '18+ Years', image: '' },
    { name: 'Anand Patel', role: 'Head of Global Logistics', exp: '20+ Years', image: '' },
    { name: 'Meera Krishnan', role: 'Chief Financial Officer', exp: '15+ Years', image: '' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section - Modern Design */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
            alt="About Us Hero"
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
              { value: '150+', label: 'Countries Served' },
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

      {/* Quote Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="relative p-8 md:p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
          >
            <Quote className="absolute top-4 right-4 h-16 w-16 text-blue-100 dark:text-slate-700" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic leading-relaxed font-medium mb-6">
                &ldquo;We remain true to our mission and are committed to improve continuously to meet the changing needs of the customers. Our endeavor is always to provide the best of customer service in the industry.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
                <p className="text-slate-500 dark:text-slate-400 font-bold">— Company Mission Statement</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                  alt="Logistics Operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700 max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">ISO Certified</p>
                    <p className="text-xs text-slate-500">Since 2012</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Recognized for excellence in quality management systems</p>
              </motion.div>
            </motion.div>

            <motion.div {...fadeIn} className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                  WHO WE <span className="text-red-600">ARE</span>
                </h2>
                <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  <p>
                    <span className="font-bold text-blue-900 dark:text-white">B2BLOGISTICS</span>, head-quartered at Chennai, India, is a dynamic and zestful logistic solutions Company... having a wide range of services viz.., Air Freight, Ocean Freight, Customs Brokerage, Project Forwarding (Break bulk/Chartering), Warehousing and Distribution.
                  </p>
                  <p>
                    The Directors of B2BLOGISTICS have decades of experience in International and domestic freight forwarding and logistics. It is one prudent source for providing cost effective integrated logistics with efficient customer service catering to customer's specific needs with excellent connectivity to global network.
                  </p>
                  <p>
                    Effective work process demands concentrated efforts, intimate knowledge and competent coordination at which B2BLOGISTICS excels and that eventuates in offering one stop logistic solutions to the customers with a new ray of vision.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-900 dark:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors group"
              >
                Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-red-600 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Our Journey</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Milestones</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-red-600 rounded-full hidden md:block"></div>

            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-bold mb-3">{item.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-red-600 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>

                {/* Spacer */}
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-red-400 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">What We Offer</span>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">OUR SERVICES</h2>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Our services are made to offer you quick, effective, and affordable logistical solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AIR FREIGHT', icon: Plane },
              { title: 'OCEAN FREIGHT', icon: Ship },
              { title: 'SEA/AIR SERVICES', icon: Anchor },
              { title: 'PROJECT HANDLING', icon: Truck }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-red-500/30 flex items-center justify-center mb-6 group-hover:from-blue-500 group-hover:to-red-500 transition-all duration-300">
                  <service.icon className="h-8 w-8 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold tracking-wider">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-red-600 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Our Leadership</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Meet The Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-5xl font-bold shadow-xl shadow-blue-600/30 group-hover:scale-105 transition-transform">
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                    {member.exp}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promises */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/10 to-red-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-red-400 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Our Commitment</span>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">OUR PROMISES</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {promises.map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-medium text-slate-200 leading-relaxed">{promise}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
