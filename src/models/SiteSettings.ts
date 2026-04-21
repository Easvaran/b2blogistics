import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  contactInfo: {
    phone: string;
    phoneSecondary: string;
    email: string;
    address: string;
    googleMapsLink: string;
  };
  workingHours: {
    monFri: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
  locations: {
    name: string;
    address: string;
    phone: string;
    email: string;
    googleMapsLink: string;
  }[];
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema({
  contactInfo: {
    phone: { type: String, default: '+91 97877 88888' },
    phoneSecondary: { type: String, default: '044 45535112' },
    email: { type: String, default: 'bharathi@b2blogistics.in' },
    address: { type: String, default: 'Chennai, India' },
    googleMapsLink: { type: String, default: '' },
  },
  workingHours: {
    monFri: { type: String, default: '9:00 AM - 6:00 PM' },
    saturday: { type: String, default: '10:00 AM - 4:00 PM' },
    sunday: { type: String, default: 'Closed' },
  },
  socialLinks: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
    youtube: { type: String, default: '#' },
    whatsapp: { type: String, default: '919787788888' },
  },
  locations: {
    type: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String },
        email: { type: String },
        googleMapsLink: { type: String },
      }
    ],
    default: []
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
