import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // 1. Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json({ message: 'Invalid details' }, { status: 404 });
    }

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 3. Store in dedicated OTP collection (delete any old OTPs for this email first)
    await OTP.deleteMany({ email: normalizedEmail });
    await OTP.create({
      email: normalizedEmail,
      otp,
      expiresAt
    });

    // Send email
    await sendOTPEmail(normalizedEmail, otp);

    return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 });
  } catch (error: any) {
    console.error('Forgot password API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
