import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne({});
    
    // Create default settings if none exist
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching settings', error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const settings = await SiteSettings.findOneAndUpdate(
      {}, 
      { ...data, updatedAt: new Date() }, 
      { new: true, upsert: true }
    );
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating settings', error: error.message }, { status: 500 });
  }
}
