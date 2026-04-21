'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Box, ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CBMCalculatorPage() {
  const [items, setItems] = useState([{ id: 1, length: '', width: '', height: '', quantity: '' }]);
  const [totalCBM, setTotalCBM] = useState(0);

  const addItem = () => {
    setItems([...items, { id: Date.now(), length: '', width: '', height: '', quantity: '' }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  useEffect(() => {
    const total = items.reduce((acc, item) => {
      const l = parseFloat(item.length) || 0;
      const w = parseFloat(item.width) || 0;
      const h = parseFloat(item.height) || 0;
      const q = parseFloat(item.quantity) || 0;
      return acc + (l * w * h * q) / 1000000; // Assuming cm to m3
    }, 0);
    setTotalCBM(total);
  }, [items]);

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
            alt="CBM Calculator"
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
            CBM <span className="text-red-600">CALCULATOR</span>
          </motion.h1>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl">
                <div className="flex items-center space-x-4 mb-8">
                  <Calculator className="h-8 w-8 text-red-600" />
                  <h2 className="text-2xl font-black text-blue-900 dark:text-white uppercase tracking-tight">Calculate Volume</h2>
                </div>

                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Length (cm)</label>
                        <input
                          type="number"
                          value={item.length}
                          onChange={(e) => updateItem(item.id, 'length', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Width (cm)</label>
                        <input
                          type="number"
                          value={item.width}
                          onChange={(e) => updateItem(item.id, 'width', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
                        <input
                          type="number"
                          value={item.height}
                          onChange={(e) => updateItem(item.id, 'height', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-bold text-xs uppercase p-3 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={addItem}
                    className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-blue-800 transition-colors"
                  >
                    Add More Items
                  </button>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Total Volume</p>
                    <p className="text-3xl font-black text-red-600">{totalCBM.toFixed(3)} <span className="text-sm">M³</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-red-600 text-white p-8 rounded-3xl">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">How it works?</h3>
                <p className="text-red-100 text-sm leading-relaxed mb-6">
                  CBM stands for Cubic Meter. It is the unit used to measure the volume of a shipment. To calculate CBM, multiply Length × Width × Height (in cm) and divide by 1,000,000.
                </p>
                <div className="flex items-center space-x-3 text-xs font-black uppercase bg-white/10 p-4 rounded-xl">
                  <Info className="h-5 w-5" />
                  <span>1 M³ = 1,000,000 CM³</span>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Need Help?</h3>
                  <p className="text-blue-200 text-sm leading-relaxed mb-6">
                    Not sure about your shipment dimensions? Contact our experts for assistance.
                  </p>
                  <Link href="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-slate-100 transition-colors inline-flex items-center">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <Box className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}