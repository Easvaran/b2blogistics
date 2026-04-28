'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Shield, Globe, Headphones, Mail, Phone, ArrowRight, Send, FileText, Truck, Plane, Ship, Anchor } from 'lucide-react';
import Image from 'next/image';
import { enquiryFormSchema, type EnquiryFormData } from '@/types/forms';

export default function EnquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  const [dynamicServices, setDynamicServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading enquiry settings:', err));

    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Only show LAND TRANSPORT
          setDynamicServices(data.filter(s => s.slug === 'land-transport' && s.isVisible !== false));
        }
      })
      .catch(err => console.error('Error loading dynamic services:', err));
  }, []);

  const contactInfo = settings?.contactInfo || {
    phone: '+91 97877 88888',
    email: 'bharathi@b2blogistics.in'
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquiryFormSchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiry', {
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
        alert(errorData.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: 'land-transport', label: 'Land Transport', icon: Truck },
    ...dynamicServices
      .filter(s => s.slug !== 'land-transport') // Avoid duplication
      .map(s => ({
        value: s.slug,
        label: s.title,
        icon: Truck 
      }))
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069"
            alt="Enquiry Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[5%] w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-[10%] w-60 h-60 bg-red-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <FileText className="w-4 h-4 inline mr-2" />
              Request a Quote
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4">
              ENQUIRY
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-red-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 text-white">
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">
                  Let&apos;s <span className="text-red-400">Talk</span>
                </h2>
                <p className="text-blue-200 leading-relaxed mb-8">
                  Our sales and customer service teams are standing by to assist you with your inquiries. Inquiries are usually processed the same day on all business days.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Same-day Response</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Secure & Confidential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Headphones className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Expert Support</span>
                  </div>
                </div>
              </div>

              {/* Services Preview */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Our Services</h3>
                <div className="space-y-3">
                  {services.slice(0, 4).map((service) => (
                    <div key={service.value} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <service.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{service.label}</span>
                    </div>
                  ))}
                </div>
                <a href="/services" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mt-6 hover:text-red-600 transition-colors">
                  View All Services <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Contact */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="font-medium">{contactInfo.phone}</span>
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium">{contactInfo.email}</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Inquiry Form</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Name *</label>
                    <input
                      {...register('name')}
                      placeholder="John Smith"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject *</label>
                    <input
                      {...register('subject')}
                      placeholder="Quote Request"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.subject ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs font-bold">{errors.subject.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email *</label>
                    <input
                      {...register('email')}
                      placeholder="john@company.com"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone *</label>
                    <input
                      {...register('phone')}
                      placeholder="+1 234 567 890"
                      className={`w-full bg-slate-50 dark:bg-slate-700 border-2 ${errors.phone ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-medium`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Service *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {services.map((service) => (
                      <label
                        key={service.value}
                        className="cursor-pointer"
                      >
                        <input
                          {...register('service')}
                          type="radio"
                          value={service.value}
                          className="peer sr-only"
                        />
                        <div className="peer-checked:bg-blue-600 peer-checked:text-white bg-slate-50 dark:bg-slate-700 border-2 border-transparent peer-checked:border-blue-600 rounded-xl p-4 text-center transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          <service.icon className="w-6 h-6 mx-auto mb-2 text-slate-400 peer-checked:text-white" />
                          <p className="text-xs font-bold">{service.label}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.service && <p className="text-red-500 text-xs font-bold mt-2">{errors.service.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message *</label>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us about your shipping needs..."
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
                      Submit Inquiry <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success Message Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                  >
                    <div className="text-center p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Inquiry Submitted!</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">We&apos;ll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:text-red-600 transition-colors"
                      >
                        Submit Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
