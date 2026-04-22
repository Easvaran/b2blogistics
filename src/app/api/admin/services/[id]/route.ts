import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    const service = await Service.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating service', error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const service = await Service.findByIdAndDelete(params.id);
    
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting service', error: error.message }, { status: 500 });
  }
}
