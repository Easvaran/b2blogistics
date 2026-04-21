'use client';

import React, { useState, useEffect } from 'react';
import { Settings, User, Key, Building2, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Youtube, MessageCircle, Save, Loader2, Plus, Trash2, ExternalLink, X, ShieldCheck, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  name: string;
  address: string;
  phone: string;
  email: string;
  googleMapsLink: string;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editingLocationIndex, setEditingLocationIndex] = useState<number | null>(null);
  const [newLocation, setNewLocation] = useState<Location>({
    name: '',
    address: '',
    phone: '',
    email: '',
    googleMapsLink: ''
  });

  // User Management State
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [siteSettings, setSiteSettings] = useState({
    contactInfo: {
      phone: '',
      phoneSecondary: '',
      email: '',
      address: '',
      googleMapsLink: '',
    },
    workingHours: {
      monFri: '',
      saturday: '',
      sunday: '',
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      whatsapp: '',
    },
    locations: [] as Location[]
  });

  useEffect(() => {
    fetchSettings();
    fetchUsers();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings/site-config');
      const data = await response.json();
      if (response.ok) {
        setSiteSettings(prev => ({
          ...prev,
          ...data,
          locations: data.locations || []
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings/site-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings),
      });
      if (response.ok) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveUser = async () => {
    setIsSaving(true);
    try {
      const url = editingUser ? `/api/admin/users/${editingUser._id}` : '/api/admin/users';
      const method = editingUser ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert(editingUser ? 'User updated successfully!' : 'User added successfully!');
        fetchUsers();
        setIsUserModalOpen(false);
        setEditingUser(null);
        setUserData({ name: '', email: '', password: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to save user');
      }
    } catch (error) {
      console.error('Save user error:', error);
      alert('An error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this admin account?')) {
      try {
        const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
          alert('User deleted successfully!');
          fetchUsers();
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleAddLocation = () => {
    if (editingLocationIndex !== null) {
      const updatedLocations = [...siteSettings.locations];
      updatedLocations[editingLocationIndex] = newLocation;
      setSiteSettings({ ...siteSettings, locations: updatedLocations });
    } else {
      setSiteSettings({ ...siteSettings, locations: [...siteSettings.locations, newLocation] });
    }
    setIsLocationModalOpen(false);
    setEditingLocationIndex(null);
    setNewLocation({ name: '', address: '', phone: '', email: '', googleMapsLink: '' });
  };

  const handleEditLocation = (index: number) => {
    setEditingLocationIndex(index);
    setNewLocation(siteSettings.locations[index]);
    setIsLocationModalOpen(true);
  };

  const handleDeleteLocation = (index: number) => {
    if (confirm('Are you sure you want to delete this location?')) {
      const updatedLocations = siteSettings.locations.filter((_, i) => i !== index);
      setSiteSettings({ ...siteSettings, locations: updatedLocations });
    }
  };

  const updateNestedState = (section: string, field: string, value: string) => {
    setSiteSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Settings...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-600" />
          Site Configuration
        </h2>
        <button
          onClick={handleUpdateSettings}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
              <Phone className="w-5 h-5" />
            </div>
            Contact Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Primary Phone</label>
              <input
                type="text"
                value={siteSettings.contactInfo.phone}
                onChange={(e) => updateNestedState('contactInfo', 'phone', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Secondary Phone</label>
              <input
                type="text"
                value={siteSettings.contactInfo.phoneSecondary}
                onChange={(e) => updateNestedState('contactInfo', 'phoneSecondary', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email Address</label>
              <input
                type="email"
                value={siteSettings.contactInfo.email}
                onChange={(e) => updateNestedState('contactInfo', 'email', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Office Address</label>
              <textarea
                value={siteSettings.contactInfo.address}
                onChange={(e) => updateNestedState('contactInfo', 'address', e.target.value)}
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
              <Clock className="w-5 h-5" />
            </div>
            Working Hours
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Monday - Friday</label>
              <input
                type="text"
                value={siteSettings.workingHours.monFri}
                onChange={(e) => updateNestedState('workingHours', 'monFri', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Saturday</label>
              <input
                type="text"
                value={siteSettings.workingHours.saturday}
                onChange={(e) => updateNestedState('workingHours', 'saturday', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Sunday</label>
              <input
                type="text"
                value={siteSettings.workingHours.sunday}
                onChange={(e) => updateNestedState('workingHours', 'sunday', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-600/20"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6 lg:col-span-2">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-600">
              <Facebook className="w-5 h-5" />
            </div>
            Social Media & Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                <Facebook className="w-3 h-3" /> Facebook URL
              </label>
              <input
                type="text"
                value={siteSettings.socialLinks.facebook}
                onChange={(e) => updateNestedState('socialLinks', 'facebook', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                <Twitter className="w-3 h-3" /> Twitter URL
              </label>
              <input
                type="text"
                value={siteSettings.socialLinks.twitter}
                onChange={(e) => updateNestedState('socialLinks', 'twitter', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                <Linkedin className="w-3 h-3" /> LinkedIn URL
              </label>
              <input
                type="text"
                value={siteSettings.socialLinks.linkedin}
                onChange={(e) => updateNestedState('socialLinks', 'linkedin', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                <Youtube className="w-3 h-3" /> YouTube URL
              </label>
              <input
                type="text"
                value={siteSettings.socialLinks.youtube}
                onChange={(e) => updateNestedState('socialLinks', 'youtube', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                <MessageCircle className="w-3 h-3" /> WhatsApp Number
              </label>
              <input
                type="text"
                value={siteSettings.socialLinks.whatsapp}
                onChange={(e) => updateNestedState('socialLinks', 'whatsapp', e.target.value)}
                placeholder="e.g. 919787788888"
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
            </div>
          </div>
        </div>

        {/* Branch Locations */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600">
                <MapPin className="w-5 h-5" />
              </div>
              Branch Locations
            </h3>
            <button
              onClick={() => {
                setEditingLocationIndex(null);
                setNewLocation({ name: '', address: '', phone: '', email: '', googleMapsLink: '' });
                setIsLocationModalOpen(true);
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest text-[10px] transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Location
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteSettings.locations?.map((location, index) => (
              <div key={index} className="group relative bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-600 hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{location.name}</h4>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditLocation(index)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(index)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {location.address}</p>
                  {location.phone && <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> {location.phone}</p>}
                  {location.email && <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> {location.email}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Accounts */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              Admin Accounts
            </h3>
            <button
              onClick={() => {
                setEditingUser(null);
                setUserData({ name: '', email: '', password: '' });
                setIsUserModalOpen(true);
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest text-[10px] transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Add New Admin
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div key={user._id} className="group relative bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-600 hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{user.name}</h4>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setUserData({ name: user.name, email: user.email, password: '' });
                        setIsUserModalOpen(true);
                      }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-2 text-blue-600"><Mail className="w-3 h-3" /> {user.email}</p>
                  <p className="flex items-center gap-2 uppercase tracking-widest text-[8px] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {isUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUserModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {editingUser ? 'Edit Admin' : 'Add New Admin'}
                </h3>
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="admin@b2blogistics.in"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                    {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <button
                  onClick={handleSaveUser}
                  disabled={isSaving || !userData.name || !userData.email || (!editingUser && !userData.password)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingUser ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {editingLocationIndex !== null ? 'Edit Location' : 'Add New Location'}
                </h3>
                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Location Name</label>
                  <input
                    type="text"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    placeholder="e.g. Mumbai Branch"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Address</label>
                  <textarea
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Phone</label>
                    <input
                      type="text"
                      value={newLocation.phone}
                      onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email</label>
                    <input
                      type="email"
                      value={newLocation.email}
                      onChange={(e) => setNewLocation({ ...newLocation, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Google Maps Link</label>
                  <input
                    type="text"
                    value={newLocation.googleMapsLink}
                    onChange={(e) => setNewLocation({ ...newLocation, googleMapsLink: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <button
                  onClick={handleAddLocation}
                  disabled={!newLocation.name || !newLocation.address}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-4"
                >
                  {editingLocationIndex !== null ? 'Update Location' : 'Add Location'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
