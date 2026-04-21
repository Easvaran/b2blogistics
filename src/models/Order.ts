import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  weight: number;
  shipmentType: 'Ocean' | 'Air';
  checkpoints: {
    status: string;
    location: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  trackingId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Transit', 'Delivered'], 
    default: 'Pending' 
  },
  weight: { type: Number, required: true },
  shipmentType: { 
    type: String, 
    enum: ['Ocean', 'Air'], 
    required: true 
  },
  checkpoints: [
    {
      status: { type: String, required: true },
      location: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
