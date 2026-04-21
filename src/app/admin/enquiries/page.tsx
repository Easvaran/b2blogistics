'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Filter, Trash2, CheckCircle, Mail, Phone, Calendar, Clock, User, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  status: 'Pending' | 'Resolved' | 'Contacted';
  createdAt: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/enquiries');
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus as any } : e));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const response = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEnquiries(prev => prev.filter(e => e._id !== id));
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => 
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Contacted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          Enquiry Management
        </h2>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-sm font-bold text-slate-500">Total:</span>
          <span className="text-sm font-black text-blue-600">{enquiries.length}</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search enquiries by name, email, or service..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium tracking-wide">Loading enquiries...</p>
            </div>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-slate-500 font-medium">No enquiries found matching your search.</p>
          </div>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry._id}
              layout
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div 
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => setExpandedId(expandedId === enquiry._id ? null : enquiry._id)}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 dark:text-white leading-none">{enquiry.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {enquiry.email}
                      </p>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {enquiry.service}
                      </p>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                  {expandedId === enquiry._id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === enquiry._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-50 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/10"
                  >
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-600" /> <strong>Email:</strong> {enquiry.email}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-600" /> <strong>Phone:</strong> {enquiry.phone}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Subject & Service</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Subject:</strong> {enquiry.subject}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Requested Service:</strong> {enquiry.service}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Message Content</h4>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                          "{enquiry.message}"
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateStatus(enquiry._id, 'Contacted')}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                          >
                            Mark as Contacted
                          </button>
                          <button 
                            onClick={() => updateStatus(enquiry._id, 'Resolved')}
                            className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                          >
                            Mark as Resolved
                          </button>
                        </div>
                        <button 
                          onClick={() => deleteEnquiry(enquiry._id)}
                          className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
