'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Package, Users, Layers, Loader2, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  type: 'order' | 'customer' | 'service';
  title: string;
  subtitle: string;
  link?: string;
  tab?: string;
}

interface AdminSearchProps {
  setActiveTab: (tab: string) => void;
}

export default function AdminSearch({ setActiveTab }: AdminSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      // Fetch Orders (which includes customers) and Services
      const [ordersRes, servicesRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/services')
      ]);

      const orders = await ordersRes.json();
      const services = await servicesRes.json();

      const filteredResults: SearchResult[] = [];

      // Filter Orders
      const matchingOrders = orders.filter((order: any) => 
        order.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3);

      matchingOrders.forEach((order: any) => {
        filteredResults.push({
          id: order._id,
          type: 'order',
          title: `Order #${order.trackingId}`,
          subtitle: `Customer: ${order.customerName}`,
          tab: 'Orders'
        });
      });

      // Filter Customers (from orders)
      const customerMap = new Map<string, any>();
      orders.forEach((order: any) => {
        if (!customerMap.has(order.customerEmail) && (
          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
        )) {
          customerMap.set(order.customerEmail, order);
        }
      });

      Array.from(customerMap.values()).slice(0, 3).forEach((customer: any) => {
        filteredResults.push({
          id: customer.customerEmail,
          type: 'customer',
          title: customer.customerName,
          subtitle: customer.customerEmail,
          tab: 'Customers'
        });
      });

      // Filter Services
      const matchingServices = services.filter((service: any) => 
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3);

      matchingServices.forEach((service: any) => {
        filteredResults.push({
          id: service._id || service.slug,
          type: 'service',
          title: service.title,
          subtitle: service.shortDescription || 'Logistics Service',
          tab: 'Services'
        });
      });

      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (result.tab) {
      setActiveTab(result.tab);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative max-w-md w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isOpen && query ? 'text-blue-600' : 'text-slate-400'}`} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search orders, customers, services..." 
          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          aria-label="Search"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors"
          >
            <X className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mb-2 text-blue-600" />
                <p className="text-xs font-medium">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full px-4 py-3 flex items-center gap-4 transition-colors text-left ${
                      index === activeIndex ? 'bg-slate-50 dark:bg-slate-700/50' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      result.type === 'order' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                      result.type === 'customer' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' :
                      'bg-green-50 text-green-600 dark:bg-green-900/20'
                    }`}>
                      {result.type === 'order' ? <Package className="w-4 h-4" /> :
                       result.type === 'customer' ? <Users className="w-4 h-4" /> :
                       <Layers className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{result.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate uppercase tracking-wider font-medium">{result.subtitle}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${index === activeIndex ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
                <div className="px-4 py-2 mt-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.1em]">
                    Press <span className="text-slate-600 dark:text-slate-300 font-bold">Enter</span> to select • <span className="text-slate-600 dark:text-slate-300 font-bold">Esc</span> to close
                  </p>
                </div>
              </div>
            ) : query ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">No results found</p>
                <p className="text-xs text-slate-500">We couldn't find anything matching "{query}"</p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
