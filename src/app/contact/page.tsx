'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Facebook, Twitter, Linkedin, Youtube, MessageCircle, Navigation } from 'lucide-react';
import Image from 'next/image';
import { contactFormSchema, type ContactFormData } from '@/types/forms';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading contact settings:', err));
  }, []);

  const contactInfo = settings?.contactInfo || {
    phone: '+91 97877 88888',
    phoneSecondary: '044 45535112',
    email: 'bharathi@b2blogistics.in',
    address: 'Chennai, India'
  };

  const workingHours = settings?.workingHours || {
    monFri: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed'
  };

  const socialLinks = settings?.socialLinks || {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    youtube: '#',
    whatsapp: '919787788888'
  };

  const extractMapUrl = (link: string) => {
    if (!link) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155959.47639838465!2d80.04395247905654!3d13.047791775145685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6a7e0c7a!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709654321098!5m2!1sen!2sin";
    
    // If it's a full iframe tag, extract the src
    if (link.includes('<iframe')) {
      const match = link.match(/src="([^"]+)"/);
      return match ? match[1] : link;
    }
    
    return link;
  };

  const ensureAbsoluteUrl = (url: string) => {
    if (!url || url === '#') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-[5%] w-60 h-60 bg-red-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              We&apos;re Here to Help
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
              Contact <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-white/70">Get in touch with our team for inquiries, quotes, or support.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  For more information or any other questions, please contact us using the form or reach out directly.
                </p>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Support Center 24/7</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">{contactInfo.phone}</p>
                      <p className="text-slate-500 dark:text-slate-400">{contactInfo.phoneSecondary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/30">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Us</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-600/30">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Our Office</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-bold">Working Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-blue-200">Monday - Friday</span>
                    <span className="font-bold">{workingHours.monFri}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-blue-200">Saturday</span>
                    <span className="font-bold">{workingHours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-blue-200">Sunday</span>
                    <span className="font-bold text-red-400">{workingHours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, href: ensureAbsoluteUrl(socialLinks.facebook) },
                    { Icon: Twitter, href: ensureAbsoluteUrl(socialLinks.twitter) },
                    { Icon: Linkedin, href: ensureAbsoluteUrl(socialLinks.linkedin) },
                    { Icon: Youtube, href: ensureAbsoluteUrl(socialLinks.youtube) }
                  ].map(({ Icon, href }, i) => (
                    <motion.a 
                      key={i} 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all hover:-translate-y-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Send us a Message</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input
                      {...register('name')}
                      placeholder="John Smith"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
                    <input
                      {...register('email')}
                      placeholder="john@example.com"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</label>
                    <input
                      {...register('phone')}
                      placeholder="+1 234 567 890"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.phone ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">City</label>
                    <input
                      {...register('city')}
                      placeholder="New York"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.city ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.city && <p className="text-red-500 text-xs font-bold">{errors.city.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.message ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs font-bold">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success Message Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                  >
                    <div className="text-center p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-slate-500 dark:text-slate-400">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 relative h-[400px]">
                <iframe 
                  src={extractMapUrl(contactInfo.googleMapsLink)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Navigation className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Head Office</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  B2BLOGISTICS<br />
                  {contactInfo.address}
                </p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:text-red-600 transition-colors"
                >
                  Get Directions <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
