'use client';

import Link from 'next/link';
import { Globe, Twitter, Youtube, Facebook, ArrowUp, Mail, Phone, MapPin, Clock, ChevronRight, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading footer settings:', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = settings?.contactInfo || {
    phone: '+91 97877 88888',
    phoneSecondary: '044 45535112',
    email: 'bharathi@b2blogistics.in',
    address: 'Chennai, India'
  };

  const socialLinks = settings?.socialLinks || {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    youtube: '#',
    whatsapp: '919787788888'
  };

  const workingHours = settings?.workingHours || {
    monFri: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed'
  };

  const ensureAbsoluteUrl = (url: string) => {
    if (!url || url === '#') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const socialIcons = [
    { Icon: Facebook, href: ensureAbsoluteUrl(socialLinks.facebook) },
    { Icon: Twitter, href: ensureAbsoluteUrl(socialLinks.twitter) },
    { Icon: Linkedin, href: ensureAbsoluteUrl(socialLinks.linkedin) },
    { Icon: Youtube, href: ensureAbsoluteUrl(socialLinks.youtube) },
    { Icon: MessageCircle, href: `https://wa.me/${socialLinks.whatsapp}` }
  ];

  return (
    <footer className="w-full">
      {/* Main Footer - Dark Gradient */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-tighter text-white leading-none">
                    B2B<span className="text-red-500">LOGISTICS</span>
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-blue-300 leading-none mt-1">
                    STATE FORWARDING
                  </span>
                </div>
              </Link>
              <p className="text-blue-200 text-sm leading-relaxed">
                Your trusted partner for state-wide logistics and freight forwarding solutions since 1998.
              </p>
              <div className="flex items-center gap-3">
                {socialIcons.map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { href: '/about', label: 'About Us' },
                  { href: '/inco-terms', label: 'INCO Terms' },
                  { href: '/cbm-calculator', label: 'CBM Calculator' },
                  { href: '/container-specifications', label: 'Container Specs' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
                      <ChevronRight className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"></div>
                Services
              </h3>
              <ul className="space-y-3">
                {[
                  { href: '/services/air-freight', label: 'Air Freight' },
                  { href: '/services/ocean-freight', label: 'Ocean Freight' },
                  { href: '/services/sea-air-service', label: 'Sea/Air Service' },
                  { href: '/services/project-handling', label: 'Project Handling' },
                  { href: '/services/custom-formalities', label: 'Custom Formalities' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
                      <ChevronRight className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracking */}
            <div className="space-y-6">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                Track Order
              </h3>
              <ul className="space-y-3">
                {[
                  { href: 'https://www.track-trace.com/bol', label: 'Bill of Lading' },
                  { href: 'https://www.track-trace.com/container', label: 'Container' },
                  { href: 'https://www.track-trace.com/aircargo', label: 'Air Cargo' },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
                      <ChevronRight className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{contactInfo.phone}</p>
                    <p className="text-blue-300 text-xs">{contactInfo.phoneSecondary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-200 hover:text-white transition-colors text-sm">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-red-400" />
                  </div>
                  <p className="text-blue-200 text-sm">{contactInfo.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Mon-Fri: {workingHours.monFri}</p>
                    <p className="text-blue-300 text-xs">Sat: {workingHours.saturday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-blue-300 text-xs font-medium tracking-wide text-center">
                © {new Date().getFullYear()} B2BLOGISTICS State Forwarding. All Rights Reserved.
                <span className="mx-2">|</span>
                Designed by Manic Media
              </div>
              
              <motion.button 
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/30 transition-all"
              >
                Back to Top
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
