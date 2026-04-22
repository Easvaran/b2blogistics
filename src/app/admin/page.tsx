'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  User as UserIcon, // Renamed to avoid conflict with User component
  Layers,
  ClipboardList,
  Mail, // Added for Contact Messages
  Loader2
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import AdminSettings from './settings/page'; // Import the new Settings component
import AdminOrders from './orders/page';
import AdminShipments from './shipments/page';
import AdminCustomers from './customers/page';
import AdminAnalytics from './analytics/page';
import AdminEnquiries from './enquiries/page';
import AdminServices from './services/page';
import AdminContacts from './contacts/page'; // Added for Contact Messages

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
    }`}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'group-hover:text-blue-600'}`} />
    {!collapsed && <span className="font-bold whitespace-nowrap">{label}</span>}
    {active && !collapsed && (
      <motion.div 
        layoutId="active-pill"
        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white"
      />
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </button>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

  useEffect(() => {
    if (activeTab === 'Dashboard') {
      fetchDashboardData();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    setIsLoadingDashboard(true);
    try {
      const response = await fetch('/api/admin/dashboard-stats');
      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax';
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: ClipboardList, label: 'Orders' },
    { icon: Truck, label: 'Shipments' },
    { icon: Layers, label: 'Services' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: ClipboardList, label: 'Activity' },
    { icon: MessageSquare, label: 'Enquiries' },
    { icon: Mail, label: 'Messages' },
    { icon: Settings, label: 'Settings' },
  ];

  const stats = [
    { label: 'Total Orders', value: dashboardData?.stats?.totalOrders || '0', trend: '+0%', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: ClipboardList },
    { label: 'In Transit', value: dashboardData?.stats?.inTransit || '0', trend: '+0%', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', icon: Truck },
    { label: 'Revenue', value: dashboardData?.stats?.revenue || '$0', trend: '+0%', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', icon: BarChart3 },
    { label: 'Pending', value: dashboardData?.stats?.pending || '0', trend: '-0%', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', icon: Clock },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? '80px' : '280px' }}
        className="bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col z-30"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden">
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">LOGISTICS</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"
          >
            {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
              collapsed={isSidebarCollapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold group overflow-hidden"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders, customers..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Admin User</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {activeTab} Overview
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {activeTab === 'Dashboard' 
                    ? 'Welcome back! Here is what is happening with your logistics today.' 
                    : `Manage your ${activeTab.toLowerCase()} and view detailed reports.`}
                </p>
              </div>
              {activeTab === 'Dashboard' && (
                <div className="flex gap-3">
                  <button 
                    onClick={fetchDashboardData}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Refresh Stats
                  </button>
                </div>
              )}
            </div>

            {/* Stats Grid - Always visible in Dashboard tab */}
            {activeTab === 'Dashboard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                        stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-8">
              {activeTab === 'Dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Minimal Dashboard Welcome or empty state for now as requested */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[2rem] shadow-xl shadow-blue-600/10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-4xl font-black mb-4">Good Morning, Admin!</h2>
                      <p className="text-blue-100 text-lg max-w-md mb-8">
                        Everything is running smoothly. You have {dashboardData?.stats?.pending || '0'} pending orders that need your attention.
                      </p>
                      <button 
                        onClick={() => setActiveTab('Orders')}
                        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all active:scale-95"
                      >
                        Review Pending Orders
                      </button>
                    </div>
                    {/* Decorative Background Icon */}
                    <Truck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 -rotate-12" />
                  </div>
                </div>
              )}
              {activeTab === 'Orders' && <AdminOrders />}
              {activeTab === 'Shipments' && <AdminShipments />}
              {activeTab === 'Services' && <AdminServices />}
              {activeTab === 'Customers' && <AdminCustomers />}
              {activeTab === 'Analytics' && <AdminAnalytics />}
              {activeTab === 'Activity' && (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                  <div className="space-y-6">
                    {isLoadingDashboard ? (
                      [1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex gap-4 animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex-shrink-0" />
                          <div className="space-y-2 flex-1 pt-2">
                            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-3/4" />
                            <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded w-1/2" />
                          </div>
                        </div>
                      ))
                    ) : dashboardData?.recentActivity?.length > 0 ? (
                      dashboardData.recentActivity.map((activity: any, i: number) => (
                        <div key={activity.id} className="flex gap-4 group items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-all">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold z-10 relative transition-transform group-hover:scale-110 ${
                              activity.type === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {activity.type === 'order' ? <Package className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                            </div>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">{activity.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-1">{activity.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-20 text-slate-400 text-xs font-bold uppercase tracking-widest">No activity found in the logs</p>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'Enquiries' && <AdminEnquiries />}
              {activeTab === 'Messages' && <AdminContacts />}
              {activeTab === 'Settings' && <AdminSettings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
