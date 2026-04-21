import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching services', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Check if slug already exists
    const existingService = await Service.findOne({ slug: data.slug });
    if (existingService) {
      return NextResponse.json({ message: 'Service with this slug already exists' }, { status: 400 });
    }

    const newService = await Service.create(data);
    return NextResponse.json(newService, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error creating service', error: error.message }, { status: 500 });
  }
}
