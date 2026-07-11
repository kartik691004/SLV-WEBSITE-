import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  category: string; // Rent, Lease, Sale, Buy
  location: string;
  address: string;
  bhk: string;
  area: string;
  amenities: string[];
  images: string[];
  videos: string[];
  status: string; // Available, Booked Today, Sold
  isFeatured: boolean;
  slug: string;
  isDeleted: boolean;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Rent', 'Lease', 'Sale', 'Buy'] },
    location: { type: String, required: true, index: true },
    address: { type: String, required: true },
    bhk: { type: String, required: true },
    area: { type: String, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    videos: [{ type: String }],
    status: { type: String, enum: ['Available', 'Booked Today', 'Sold'], default: 'Available' },
    isFeatured: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true, index: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Creating a compound index for search optimization if needed
propertySchema.index({ title: 'text', description: 'text', location: 'text' });

export const Property = mongoose.model<IProperty>('Property', propertySchema);
