import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().replace(/\D/g, ''); 

    // 1. Find the user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const storedOTP = user.resetOTP ? String(user.resetOTP).replace(/\D/g, '') : null;
    const isOTPValid = storedOTP === cleanOtp;
    const isNotExpired = user.resetOTPExpires && new Date(user.resetOTPExpires).getTime() > Date.now();

    if (!isOTPValid) {
      return NextResponse.json({ message: 'The OTP code is incorrect' }, { status: 400 });
    }

    if (!isNotExpired) {
      return NextResponse.json({ message: 'This OTP has expired' }, { status: 400 });
    }

    // 3. Generate a secure random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 4. Save token to user and clear OTP record
    user.resetToken = resetToken;
    await user.save({ validateBeforeSave: false });
    await OTP.deleteMany({ email: normalizedEmail });

    return NextResponse.json({ 
      message: 'OTP verified successfully',
      resetToken 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
