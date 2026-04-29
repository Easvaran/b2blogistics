import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Enquiry from '@/models/Enquiry';
import ContactMessage from '@/models/ContactMessage';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();

    // Calculate total revenue in INR (₹)
    const revenueData = await Order.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: { _id: null, total: { $sum: "$weight" } } } 
    ]);
    // Example rate: 150 INR per kg
    const revenue = revenueData[0]?.total ? (revenueData[0].total * 150).toLocaleString('en-IN') : '0';

    // Fetch counts for statistics
    const totalOrders = await Order.countDocuments();
    const inTransitOrders = await Order.countDocuments({ status: 'In Transit' });
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const totalCustomersData = await Order.distinct('customerEmail');
    const totalCustomers = totalCustomersData.length;

    // Fetch recent activity (mix of orders and enquiries)
    const recentOrders = await Order.find({})
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('trackingId status updatedAt');

    const recentEnquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name service createdAt');

    const recentActivity = [
      ...recentOrders.map(order => ({
        id: order._id,
        type: 'order',
        title: `Order #${order.trackingId}`,
        description: `Status updated to ${order.status}`,
        time: order.updatedAt
      })),
      ...recentEnquiries.map(enq => ({
        id: enq._id,
        type: 'enquiry',
        title: `New Enquiry from ${enq.name}`,
        description: `Requested ${enq.service}`,
        time: enq.createdAt
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

    // Fetch recent shipments (orders)
    const recentShipments = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      stats: {
        totalOrders: totalOrders.toLocaleString('en-IN'),
        inTransit: inTransitOrders.toLocaleString('en-IN'),
        revenue: `₹${revenue}`,
        pending: pendingOrders.toLocaleString('en-IN'),
        totalCustomers: totalCustomers.toLocaleString('en-IN')
      },
      recentActivity,
      recentShipments
    });

  } catch (error: any) {
    console.error('Dashboard Stats Error:', error);
    return NextResponse.json({ message: 'Error fetching dashboard data', error: error.message }, { status: 500 });
  }
}
