'use client';

import { motion } from 'framer-motion';
import { FileText, Globe, Info } from 'lucide-react';
import Image from 'next/image';

const incoTerms = [
  { code: 'EXW', name: 'Ex Works', description: 'The seller makes the goods available at their premises. The buyer bears all costs and risks from there.' },
  { code: 'FCA', name: 'Free Carrier', description: 'The seller delivers the goods to a carrier or another person nominated by the buyer at the seller\'s premises or another named place.' },
  { code: 'CPT', name: 'Carriage Paid To', description: 'The seller delivers the goods to the carrier and pays for carriage to the named destination.' },
  { code: 'CIP', name: 'Carriage and Insurance Paid To', description: 'The seller delivers the goods to the carrier, pays for carriage and insurance to the named destination.' },
  { code: 'DAP', name: 'Delivered at Place', description: 'The seller delivers when the goods are placed at the disposal of the buyer on the arriving means of transport ready for unloading at the named destination.' },
  { code: 'DPU', name: 'Delivered at Place Unloaded', description: 'The seller delivers when the goods are unloaded from the arriving means of transport and placed at the disposal of the buyer at a named destination.' },
  { code: 'DDP', name: 'Delivered Duty Paid', description: 'The seller delivers the goods when the goods are placed at the disposal of the buyer, cleared for import, and ready for unloading at the named destination.' },
  { code: 'FAS', name: 'Free Alongside Ship', description: 'The seller delivers when the goods are placed alongside the vessel at the named port of shipment.' },
  { code: 'FOB', name: 'Free on Board', description: 'The seller delivers the goods on board the vessel nominated by the buyer at the named port of shipment.' },
  { code: 'CFR', name: 'Cost and Freight', description: 'The seller delivers the goods on board the vessel and pays the costs and freight necessary to bring the goods to the named port of destination.' },
  { code: 'CIF', name: 'Cost, Insurance and Freight', description: 'The seller delivers the goods on board the vessel, pays for freight and insurance to the named port of destination.' },
];

export default function IncoTermsPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=2070"
            alt="INCO Terms"
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
            INCO <span className="text-red-600">TERMS</span>
          </motion.h1>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-black text-blue-900 dark:text-white mb-6 uppercase tracking-tight">Understanding International Commercial Terms</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Incoterms are a set of rules published by the International Chamber of Commerce (ICC) that define the responsibilities of sellers and buyers for the delivery of goods under sales contracts. They are widely used in international commercial transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incoTerms.map((term, index) => (
              <motion.div
                key={term.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-red-600/50 transition-all group"
              >
                <div className="bg-red-600 text-white w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">
                  {term.code}
                </div>
                <h3 className="text-xl font-black text-blue-900 dark:text-white mb-4 uppercase">{term.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{term.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}