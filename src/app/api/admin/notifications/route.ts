import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Enquiry from '@/models/Enquiry';
import ContactMessage from '@/models/ContactMessage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Fetch latest 5 from each
    const [orders, enquiries, messages] = await Promise.all([
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    // Format them into a unified notification format
    const notifications = [
      ...orders.map((order: any) => ({
        id: order._id.toString(),
        title: 'New Order Received',
        desc: `Order #${order.trackingId} from ${order.customerName}`,
        time: getTimeAgo(order.createdAt),
        timestamp: order.createdAt,
        type: 'order',
        read: order.status !== 'Pending'
      })),
      ...enquiries.map((enquiry: any) => ({
        id: enquiry._id.toString(),
        title: 'New Enquiry',
        desc: `Inquiry about ${enquiry.service} from ${enquiry.name}`,
        time: getTimeAgo(enquiry.createdAt),
        timestamp: enquiry.createdAt,
        type: 'enquiry',
        read: enquiry.status !== 'Pending'
      })),
      ...messages.map((msg: any) => ({
        id: msg._id.toString(),
        title: 'New Message',
        desc: `Contact message from ${msg.name}`,
        time: getTimeAgo(msg.createdAt),
        timestamp: msg.createdAt,
        type: 'shipment', // Using 'shipment' icon for messages as per existing UI types
        read: msg.isRead
      }))
    ];

    // Sort all together by timestamp
    notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(notifications.slice(0, 10)); // Return top 10 overall
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ message: 'Error fetching notifications' }, { status: 500 });
  }
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' mins ago';
  return 'just now';
}
