import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const newEnquiry = await Enquiry.create(data);
    
    // Send email notification asynchronously
    try {
      await sendEnquiryEmail(data);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // We don't fail the request if email fails, as the data is saved in DB
    }
    
    return NextResponse.json({ 
      message: 'Enquiry submitted successfully', 
      id: newEnquiry._id 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json({ 
      message: 'Failed to submit enquiry', 
      error: error.message 
    }, { status: 500 });
  }
}
