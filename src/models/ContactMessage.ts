import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
