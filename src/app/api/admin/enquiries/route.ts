import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching enquiries', error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { id, status } = await request.json();
    
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    return NextResponse.json(updatedEnquiry);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating enquiry', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await Enquiry.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting enquiry', error: error.message }, { status: 500 });
  }
}
