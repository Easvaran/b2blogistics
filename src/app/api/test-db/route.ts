import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'success', 
      message: 'MongoDB connected successfully to B2BLOGISTICS database' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to connect to MongoDB',
      error: error.message 
    }, { status: 500 });
  }
}
