import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';

const defaultServices = [
  {
    title: 'Air Freight',
    slug: 'air-freight',
    description: 'B2BLOGISTICS provides fast and reliable air freight services for time-sensitive cargo worldwide.',
    shortDescription: 'Global air freight solutions for urgent cargo shipments.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1544015759-137fdf55601c?q=80&w=1470&auto=format&fit=crop',
    features: ['Express Delivery', 'Door-to-Door Service', 'Global Network', 'Customs Clearance'],
    benefits: ['Speed', 'Security', 'Global Reach', 'Reliability']
  },
  {
    title: 'Ocean Freight',
    slug: 'ocean-freight',
    description: 'Our ocean freight services offer cost-effective shipping solutions for large volumes of cargo across all major global ports.',
    shortDescription: 'Cost-effective sea transport for large volume shipments.',
    icon: 'Ship',
    image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1470&auto=format&fit=crop',
    features: ['FCL & LCL Shipments', 'Port-to-Port Service', 'Temperature Controlled', 'Dangerous Goods Handling'],
    benefits: ['Cost-Efficiency', 'Large Capacity', 'Environmentally Friendly', 'Reliable Schedules']
  },
  {
    title: 'Warehousing & Distribution',
    slug: 'warehousing',
    description: 'Modern warehousing facilities and efficient distribution networks to streamline your supply chain operations.',
    shortDescription: 'Secure storage and streamlined distribution for your inventory.',
    icon: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop',
    features: ['Inventory Management', 'Order Fulfillment', 'Cross-Docking', 'Pick & Pack Services'],
    benefits: ['Inventory Accuracy', 'Reduced Costs', 'Scalability', 'Efficient Operations']
  }
];

export async function GET() {
  try {
    await connectDB();

    // Check if services already exist
    const count = await Service.countDocuments();
    if (count > 0) {
      return NextResponse.json({ 
        status: 'info', 
        message: 'Services already exist in the database.' 
      });
    }

    // Seed services
    const createdServices = await Service.insertMany(defaultServices);

    return NextResponse.json({ 
      status: 'success', 
      message: 'Default services seeded successfully!',
      count: createdServices.length
    });

  } catch (error: any) {
    console.error('Service Seed error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to seed services',
      error: error.message 
    }, { status: 500 });
  }
}
