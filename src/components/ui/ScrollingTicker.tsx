'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Truck, Warehouse, FileCheck, Globe } from 'lucide-react';

const tickerItems = [
  { icon: Plane, label: 'Air Freight', value: 'Next Day Delivery Available' },
  { icon: Ship, label: 'Ocean Freight', value: '7–14 Days State-wide' },
  { icon: Truck, label: 'Inland Haulage', value: '2–5 Days' },
  { icon: Warehouse, label: 'Warehousing', value: 'Secure Storage' },
  { icon: FileCheck, label: 'Customs Clearance', value: 'Expert Brokerage' },
  { icon: Globe, label: 'State-wide Coverage', value: 'All Districts' },
];

export default function ScrollingTicker() {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#f5f2eb] dark:bg-slate-800/50 py-6 border-y border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          className="flex gap-16"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-4">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-slate-400" />
                <span className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-tight">
                  {item.label}
                </span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                {item.value}
              </span>
              <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full ml-8"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
