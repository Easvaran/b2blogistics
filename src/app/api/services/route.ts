import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    // Only return services where isVisible is true or not defined (defaults to true)
    const services = await Service.find({ isVisible: { $ne: false } }).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching services', error: error.message }, { status: 500 });
  }
}
