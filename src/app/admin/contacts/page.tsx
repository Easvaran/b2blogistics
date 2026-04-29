'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Search, Filter, Trash2, CheckCircle, Phone, Calendar, User, Eye, EyeOff, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@/components/ui/Toast';
import ConfirmationModal from '@/components/admin/ConfirmationModal';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      if (response.ok) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m));
        showToast(`Message marked as ${!currentStatus ? 'read' : 'unread'}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  const deleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      const response = await fetch(`/api/admin/contacts?id=${messageToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages(prev => prev.filter(m => m._id !== messageToDelete));
        if (selectedId === messageToDelete) setSelectedId(null);
        showToast('Message deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      showToast('Failed to delete message', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setMessageToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setMessageToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Mail className="w-6 h-6 text-blue-600" />
          Contact Messages
        </h2>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="text-sm font-bold text-slate-500">Unread:</span>
          <span className="text-sm font-black text-blue-600">{messages.filter(m => !m.isRead).length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Messages List */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
              ))
            ) : filteredMessages.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-sm font-bold uppercase tracking-widest">No messages found</p>
            ) : (
              filteredMessages.map((m) => (
                <div
                  key={m._id}
                  onClick={() => setSelectedId(m._id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedId === m._id 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : `bg-white dark:bg-slate-800 ${!m.isRead ? 'border-blue-200 dark:border-blue-900/50 shadow-md' : 'border-slate-100 dark:border-slate-700 opacity-70 hover:opacity-100'}`
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-sm truncate pr-2">{m.name}</h4>
                    <span className={`text-[10px] font-bold ${selectedId === m._id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-xs font-bold mb-2 truncate ${selectedId === m._id ? 'text-blue-50' : 'text-slate-500'}`}>{m.subject}</p>
                  {!m.isRead && selectedId !== m._id && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
          {selectedId ? (
            (() => {
              const msg = messages.find(m => m._id === selectedId);
              if (!msg) return null;
              return (
                <div className="flex-1 flex flex-col h-full">
                  <div className="p-8 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                        <User className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-1">{msg.name}</h3>
                        <p className="text-sm font-bold text-slate-400">{msg.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleReadStatus(msg._id, msg.isRead)}
                        className={`p-3 rounded-xl transition-all ${msg.isRead ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}
                        title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {msg.isRead ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={() => confirmDelete(msg._id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                        title="Delete message"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-600" /> {msg.phone}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Received On</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" /> {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{msg.subject}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</p>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
              <MessageSquare className="w-20 h-20 mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-sm opacity-40">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={deleteMessage}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />
    </motion.div>
  );
}
