'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export default function TestimonialCard({ name, company, role, content, rating, image }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-blue-100 dark:text-blue-900/50">
        <Quote className="w-12 h-12" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed relative z-10">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {image ? (
          <img src={image} alt={name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900" />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{company}</p>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}
