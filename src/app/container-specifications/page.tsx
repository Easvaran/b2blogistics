'use client';

import { motion } from 'framer-motion';
import { Box, Anchor, Maximize2, Scale } from 'lucide-react';
import Image from 'next/image';

const containerSpecs = [
  {
    type: "20' Standard Container",
    internal: { length: '5.898 m', width: '2.352 m', height: '2.393 m' },
    door: { width: '2.343 m', height: '2.280 m' },
    weight: { max_gross: '30,480 kg', tare: '2,230 kg', payload: '28,250 kg' },
    capacity: '33.2 m³'
  },
  {
    type: "40' Standard Container",
    internal: { length: '12.032 m', width: '2.352 m', height: '2.393 m' },
    door: { width: '2.343 m', height: '2.280 m' },
    weight: { max_gross: '30,480 kg', tare: '3,700 kg', payload: '26,780 kg' },
    capacity: '67.7 m³'
  },
  {
    type: "40' High Cube Container",
    internal: { length: '12.032 m', width: '2.352 m', height: '2.698 m' },
    door: { width: '2.343 m', height: '2.585 m' },
    weight: { max_gross: '30,480 kg', tare: '3,970 kg', payload: '26,510 kg' },
    capacity: '76.4 m³'
  },
  {
    type: "20' Open Top Container",
    internal: { length: '5.894 m', width: '2.311 m', height: '2.359 m' },
    door: { width: '2.338 m', height: '2.244 m' },
    weight: { max_gross: '30,480 kg', tare: '2,400 kg', payload: '28,080 kg' },
    capacity: '32.1 m³'
  },
  {
    type: "40' Open Top Container",
    internal: { length: '12.028 m', width: '2.350 m', height: '2.345 m' },
    door: { width: '2.341 m', height: '2.274 m' },
    weight: { max_gross: '30,480 kg', tare: '3,850 kg', payload: '26,630 kg' },
    capacity: '66.5 m³'
  },
  {
    type: "20' Flat Rack Container",
    internal: { length: '5.940 m', width: '2.345 m', height: '2.346 m' },
    door: { width: 'N/A', height: 'N/A' },
    weight: { max_gross: '30,480 kg', tare: '2,730 kg', payload: '27,750 kg' },
    capacity: 'N/A'
  }
];

export default function ContainerSpecsPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1494412574743-0112f05c78ec?q=80&w=2070"
            alt="Container Specifications"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight"
          >
            CONTAINER <span className="text-red-600">SPECIFICATIONS</span>
          </motion.h1>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-black text-blue-900 dark:text-white mb-6 uppercase tracking-tight">Standard Equipment Dimensions</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We provide a variety of container types to suit all cargo requirements. Below are the standard specifications for our most common container sizes and types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {containerSpecs.map((container, index) => (
              <motion.div
                key={container.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-xl"
              >
                <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tight">{container.type}</h3>
                  <Box className="h-6 w-6 text-red-500" />
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Internal Length</p>
                      <p className="text-sm font-bold text-blue-900 dark:text-white">{container.internal.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Internal Width</p>
                      <p className="text-sm font-bold text-blue-900 dark:text-white">{container.internal.width}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Internal Height</p>
                      <p className="text-sm font-bold text-blue-900 dark:text-white">{container.internal.height}</p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Max Gross</p>
                      <p className="text-sm font-bold text-red-600">{container.weight.max_gross}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Tare Weight</p>
                      <p className="text-sm font-bold text-red-600">{container.weight.tare}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Payload</p>
                      <p className="text-sm font-bold text-red-600">{container.weight.payload}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <Maximize2 className="h-5 w-5 text-blue-900 dark:text-white" />
                      <span className="text-xs font-black text-slate-500 uppercase">Cubic Capacity</span>
                    </div>
                    <span className="text-lg font-black text-blue-900 dark:text-white">{container.capacity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}