'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Package, Truck, Users, ArrowUpRight, ArrowDownRight, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  activeShipments: number;
  revenueByMonth: { month: string; amount: number }[];
  shipmentTypeDistribution: { type: string; count: number }[];
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats');
      const stats = await response.json();
      
      // Since dashboard-stats provides some data, we'll augment it for analytics
      // In a real app, you'd have a dedicated analytics endpoint
      setData({
        totalRevenue: stats.totalRevenue || 0,
        totalOrders: stats.totalOrders || 0,
        totalCustomers: stats.totalCustomers || 0,
        activeShipments: stats.activeShipments || 0,
        revenueByMonth: [
          { month: 'Jan', amount: 4500 },
          { month: 'Feb', amount: 5200 },
          { month: 'Mar', amount: 4800 },
          { month: 'Apr', amount: stats.totalRevenue || 0 },
        ],
        shipmentTypeDistribution: [
          { type: 'Ocean', count: 65 },
          { type: 'Air', count: 35 },
        ]
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!data) return;
    setIsExporting(true);
    
    try {
      // Prepare data for Excel
      const overviewData = [
        { Metric: 'Total Revenue', Value: data.totalRevenue },
        { Metric: 'Total Orders', Value: data.totalOrders },
        { Metric: 'Total Customers', Value: data.totalCustomers },
        { Metric: 'Active Shipments', Value: data.activeShipments },
      ];

      const revenueData = data.revenueByMonth.map(item => ({
        Month: item.month,
        Revenue: item.amount
      }));

      const distributionData = data.shipmentTypeDistribution.map(item => ({
        Type: item.type,
        Percentage: `${item.count}%`
      }));

      // Create workbook and worksheets
      const wb = XLSX.utils.book_new();
      
      const wsOverview = XLSX.utils.json_to_sheet(overviewData);
      const wsRevenue = XLSX.utils.json_to_sheet(revenueData);
      const wsDistribution = XLSX.utils.json_to_sheet(distributionData);

      // Add worksheets to workbook
      XLSX.utils.book_append_sheet(wb, wsOverview, "Overview");
      XLSX.utils.book_append_sheet(wb, wsRevenue, "Revenue");
      XLSX.utils.book_append_sheet(wb, wsDistribution, "Shipment Types");

      // Generate file and trigger download
      XLSX.writeFile(wb, `B2B_Logistics_Analytics_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold">Analyzing data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Analytics & Reports
        </h2>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? 'Exporting...' : 'Export Report'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${data?.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+12.5%' },
          { label: 'Total Orders', value: data?.totalOrders, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+8.2%' },
          { label: 'Total Customers', value: data?.totalCustomers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5.4%' },
          { label: 'Active Shipments', value: data?.activeShipments, icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50', trend: '+2.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-black text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-bold mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            Revenue Overview
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-lg">Monthly</span>
          </h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {data?.revenueByMonth.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.amount / 6000) * 100}%` }}
                    className="w-full bg-blue-600 rounded-t-xl group-hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${item.amount.toLocaleString()}
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Distribution */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Shipment Type Distribution</h3>
          <div className="space-y-6">
            {data?.shipmentTypeDistribution.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-600 dark:text-slate-400">{item.type} Freight</span>
                  <span className="text-slate-900 dark:text-white">{item.count}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.count}%` }}
                    className={`h-full ${i === 0 ? 'bg-blue-600' : 'bg-purple-600'}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Ocean freight continues to be the primary mode of transport, accounting for 65% of all shipments this quarter.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

