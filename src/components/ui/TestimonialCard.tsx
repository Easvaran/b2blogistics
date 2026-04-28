'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

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
      className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-8 text-blue-600/10 dark:text-blue-400/10">
        <Quote className="w-16 h-16" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-6 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed relative z-10 font-medium italic flex-grow">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-slate-50 dark:border-slate-700/50">
        {image ? (
          <div className="relative w-12 h-12">
            <Image 
              src={image} 
              alt={name} 
              fill
              className="rounded-xl object-cover ring-2 ring-blue-50 dark:ring-blue-900" 
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/30">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">{name}</p>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{role}</span>
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{company}</span>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}
