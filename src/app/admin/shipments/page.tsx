'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Truck, MapPin, Clock, Plus, CheckCircle2, Circle, ChevronRight, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@/components/ui/Toast';

interface Checkpoint {
  status: string;
  location: string;
  timestamp: string;
}

interface Order {
  _id: string;
  trackingId: string;
  customerName: string;
  status: string;
  origin: string;
  destination: string;
  shipmentType: string;
  checkpoints: Checkpoint[];
}

export default function AdminShipments() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [newCheckpoint, setNewCheckpoint] = useState({
    status: '',
    location: ''
  });

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        showToast(`Shipment status updated to ${newStatus}`);
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('An error occurred.', 'error');
    }
  };

  const handleAddCheckpoint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setIsUpdating(true);
    try {
      const updatedCheckpoints = [
        ...selectedOrder.checkpoints,
        {
          ...newCheckpoint,
          timestamp: new Date().toISOString()
        }
      ];

      const response = await fetch(`/api/admin/orders/${selectedOrder._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkpoints: updatedCheckpoints }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setSelectedOrder(updatedOrder);
        setNewCheckpoint({ status: '', location: '' });
        fetchOrders();
        showToast('Checkpoint added successfully!');
      } else {
        showToast('Failed to add checkpoint', 'error');
      }
    } catch (error) {
      console.error('Error adding checkpoint:', error);
      showToast('An error occurred.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Truck className="w-6 h-6 text-blue-600" />
          Shipment Tracking
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search shipments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm shadow-sm"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm h-[calc(100vh-250px)] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-500 text-sm font-medium">Loading...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Truck className="w-12 h-12 mb-4 opacity-10 mx-auto" />
                <p className="text-sm">No shipments found</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {filteredOrders.map((order) => (
                  <button
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full p-4 text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-700/30 ${
                      selectedOrder?._id === order._id ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-600' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-black text-blue-600 text-sm">#{order.trackingId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{order.customerName}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{order.origin}</span>
                      <ChevronRight className="w-3 h-3" />
                      <span>{order.destination}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tracking Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-250px)]"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        Tracking Details
                        <span className="text-blue-600">#{selectedOrder.trackingId}</span>
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{selectedOrder.customerName} | {selectedOrder.shipmentType} Freight</p>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        value={selectedOrder.status}
                        onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Timeline */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Shipment Timeline
                    </h4>
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-700">
                      {selectedOrder.checkpoints.slice().reverse().map((checkpoint, idx) => (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-[27px] top-1 w-[14px] h-[14px] rounded-full border-2 bg-white dark:bg-slate-800 z-10 ${
                            idx === 0 ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'
                          }`} />
                          <div>
                            <p className={`font-black text-sm ${idx === 0 ? 'text-blue-600' : 'text-slate-900 dark:text-white'}`}>
                              {checkpoint.status}
                            </p>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {checkpoint.location}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                              {new Date(checkpoint.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Checkpoint Form */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Update
                    </h4>
                    <form onSubmit={handleAddCheckpoint} className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Status / Update</label>
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. Arrived at Sort Facility"
                          value={newCheckpoint.status}
                          onChange={(e) => setNewCheckpoint({...newCheckpoint, status: e.target.value})}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Location</label>
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. Dubai, UAE"
                          value={newCheckpoint.location}
                          onChange={(e) => setNewCheckpoint({...newCheckpoint, location: e.target.value})}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm shadow-sm"
                        />
                      </div>
                      <button 
                        disabled={isUpdating}
                        type="submit"
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 text-sm"
                      >
                        {isUpdating ? 'Updating...' : 'Post Update'}
                      </button>
                    </form>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">Pro Tip</h5>
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                        Updating the timeline will automatically notify the customer if email notifications are enabled.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
                  <Truck className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Shipment Selected</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium leading-relaxed">
                  Select a shipment from the left list to view its tracking history and post real-time updates.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

