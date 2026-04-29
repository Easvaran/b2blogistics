'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Plus, Search, Filter, Edit2, Trash2, ExternalLink, Globe, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { showToast } from '@/components/ui/Toast';

interface Service {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  isVisible: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Service>({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    icon: 'Package',
    image: '',
    features: [''],
    benefits: [''],
    isVisible: true
  });

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({ ...service });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        shortDescription: '',
        icon: 'Package',
        image: '',
        features: [''],
        benefits: [''],
        isVisible: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Auto-generate slug from title if it's a new service
      if (name === 'title' && !editingService) {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return newData;
    });
  };

  const handleArrayChange = (index: number, value: string, field: 'features' | 'benefits') => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'features' | 'benefits') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index: number, field: 'features' | 'benefits') => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingService 
        ? `/api/admin/services/${editingService._id}` 
        : '/api/admin/services';
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        fetchServices();
        handleCloseModal();
      } else {
        const error = await response.json();
        showToast(error.message || 'Error saving service', 'error');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    
    try {
      const response = await fetch(`/api/admin/services/${serviceToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast('Service deleted successfully!');
        setServices(prev => prev.filter(s => s._id !== serviceToDelete));
      } else {
        showToast('Failed to delete service', 'error');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      showToast('An error occurred during deletion.', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setServiceToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setServiceToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Layers className="w-6 h-6 text-blue-600" />
            Service Management
          </h2>
          <p className="text-slate-500 text-sm font-medium">Manage your logistics service offerings and public pages.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Services...</p>
            </div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="max-w-xs mx-auto">
              <Layers className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-bold mb-2">No services found</p>
              <p className="text-slate-400 text-xs mb-6">Try adjusting your search or add a new service to get started.</p>
              <button 
                onClick={() => handleOpenModal()}
                className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
              >
                Add Your First Service
              </button>
            </div>
          </div>
        ) : (
          filteredServices.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden group transition-all hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="h-44 bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
                {service.image ? (
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border ${service.isVisible !== false ? 'bg-green-500/90 text-white border-green-400/20' : 'bg-red-500/90 text-white border-red-400/20'}`}>
                    {service.isVisible !== false ? 'Visible' : 'Hidden'}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{service.slug}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed">{service.shortDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-100 dark:border-slate-700">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-700/50 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleOpenModal(service)}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-xl transition-all" 
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => confirmDelete(service._id!)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-xl transition-all" 
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Link 
                    href={`/services/${service.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    View Public <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Service Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {editingService ? 'Edit Service' : 'Create New Service'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Fill in the details to update your service offerings.</p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Air Freight"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Slug</label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="e.g. air-freight"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    required
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Brief overview for cards"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed service explanation"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Icon Name (Lucide)</label>
                    <input
                      type="text"
                      name="icon"
                      required
                      value={formData.icon}
                      onChange={handleInputChange}
                      placeholder="e.g. Package, Ship, Plane"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Features</label>
                    <button type="button" onClick={() => addArrayItem('features')} className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-700">+ Add Feature</button>
                  </div>
                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-sm text-slate-900 dark:text-white"
                        />
                        <button type="button" onClick={() => removeArrayItem(index, 'features')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Benefits</label>
                    <button type="button" onClick={() => addArrayItem('benefits')} className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-700">+ Add Benefit</button>
                  </div>
                  <div className="space-y-3">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-sm text-slate-900 dark:text-white"
                        />
                        <button type="button" onClick={() => removeArrayItem(index, 'benefits')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex-1">
                    <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Public Visibility</label>
                    <p className="text-[10px] text-slate-500 font-medium">When disabled, this service will not be visible on the public website.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isVisible: !prev.isVisible }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isVisible ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isVisible ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="pt-8 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-800 pb-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSaving ? 'Saving...' : (editingService ? 'Update Service' : 'Create Service')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setServiceToDelete(null);
        }}
        title="Delete Service"
        message="Are you sure you want to delete this service? This will remove it from the public website as well."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </motion.div>
  );
}

