import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    const adminEmail = 'admin@transsafe.com';
    const adminPassword = 'admin123';
    const adminName = 'Super Admin';

    // Check if the user already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      return NextResponse.json({ 
        status: 'info', 
        message: `Admin user with email ${adminEmail} already exists.` 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user
    const newUser = await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: 'admin',
    });

    return NextResponse.json({ 
      status: 'success', 
      message: 'Admin user created successfully!',
      user: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to seed database',
      error: error.message 
    }, { status: 500 });
  }
}
