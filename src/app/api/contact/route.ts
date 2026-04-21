import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';
import { sendContactMessageEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const newMessage = await ContactMessage.create(data);
    
    // Send email notification asynchronously
    try {
      await sendContactMessageEmail(data);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // We don't fail the request if email fails, as the data is saved in DB
    }
    
    return NextResponse.json({ 
      message: 'Message sent successfully', 
      id: newMessage._id 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      message: 'Failed to send message', 
      error: error.message 
    }, { status: 500 });
  }
}
