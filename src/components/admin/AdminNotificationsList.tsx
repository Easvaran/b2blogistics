'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Package, 
  MessageSquare, 
  Truck 
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: 'order' | 'enquiry' | 'shipment';
  read: boolean;
  dismissed?: boolean;
}

interface AdminNotificationsListProps {
  notifications: Notification[];
  onDelete: (id: number) => void;
  onMarkAsRead: (id: number) => void;
}

export default function AdminNotificationsList({ 
  notifications, 
  onDelete, 
  onMarkAsRead 
}: AdminNotificationsListProps) {
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5 text-blue-600" />;
      case 'enquiry': return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'shipment': return <Truck className="w-5 h-5 text-green-600" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Bell className="w-6 h-6 text-blue-600" />
          System Notifications
        </h2>
        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-sm font-bold text-slate-500">
          Total: <span className="text-blue-600">{notifications.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 flex gap-6 items-center group transition-all hover:bg-slate-50 dark:hover:bg-slate-700/30 ${!notif.read ? 'bg-blue-50/20 dark:bg-blue-900/5' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  notif.type === 'order' ? 'bg-blue-50 dark:bg-blue-900/20' :
                  notif.type === 'enquiry' ? 'bg-purple-50 dark:bg-purple-900/20' :
                  'bg-green-50 dark:bg-green-900/20'
                }`}>
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-black uppercase tracking-tight ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">{notif.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    {notif.time}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notif.read && (
                    <button 
                      onClick={() => onMarkAsRead(notif.id)}
                      className="p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                      title="Mark as Read"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(notif.id)}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    title="Delete Notification"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">No Notifications</h3>
            <p className="text-slate-500 font-medium">Your notification center is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
