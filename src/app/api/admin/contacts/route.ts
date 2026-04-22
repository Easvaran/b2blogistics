import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching messages', error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { id, isRead } = await request.json();
    
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id, 
      { isRead }, 
      { new: true }
    );
    
    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating message', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await ContactMessage.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting message', error: error.message }, { status: 500 });
  }
}
