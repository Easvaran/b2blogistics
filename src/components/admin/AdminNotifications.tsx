'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Package, MessageSquare, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: 'order' | 'enquiry' | 'shipment';
  read: boolean;
  dismissed?: boolean;
}

interface AdminNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onViewAll: () => void;
}

export default function AdminNotifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onViewAll
}: AdminNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter out dismissed notifications for the dropdown
  const activeNotifications = notifications.filter(n => !n.dismissed);
  const unreadCount = activeNotifications.filter(n => !n.read).length;

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

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-4 h-4 text-blue-600" />;
      case 'enquiry': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'shipment': return <Truck className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' 
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
        }`}
        aria-label="Notifications"
      >
        <Bell className={`w-5 h-5 ${isOpen ? 'animate-none' : 'hover:animate-swing'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-800 text-[8px] font-black text-white items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 origin-top-right"
          >
            <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Notifications</h3>
              <div className="flex gap-3">
                {unreadCount > 0 && (
                  <button 
                    onClick={onMarkAllAsRead}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                  >
                    Read All
                  </button>
                )}
                {activeNotifications.length > 0 && (
                  <button 
                    onClick={onClearAll}
                    className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
              {activeNotifications.length > 0 ? (
                <div className="divide-y divide-slate-50 dark:divide-slate-700">
                  {activeNotifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      onClick={() => onMarkAsRead(notif.id)}
                      className={`p-5 flex gap-4 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 group ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                        notif.type === 'order' ? 'bg-blue-50 dark:bg-blue-900/20' :
                        notif.type === 'enquiry' ? 'bg-purple-50 dark:bg-purple-900/20' :
                        'bg-green-50 dark:bg-green-900/20'
                      }`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className={`text-xs font-black truncate uppercase tracking-tight ${notif.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                            {notif.title}
                          </p>
                          {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2 font-medium">
                          {notif.desc}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">All caught up!</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">No new notifications to show right now.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-50 dark:border-slate-700 text-center">
              <button 
                onClick={() => { setIsOpen(false); onViewAll(); }}
                className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
              >
                View All Activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
