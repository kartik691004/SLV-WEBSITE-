import mongoose, { Document, Schema } from 'mongoose';

export interface IScheduleRequest extends Document {
  customerName: string;
  phoneNumber: string;
  propertyId: mongoose.Types.ObjectId;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: string; // Pending, Contacted, Completed
}

const scheduleRequestSchema = new Schema<IScheduleRequest>(
  {
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['Pending', 'Contacted', 'Completed'], default: 'Pending' },
  },
  { timestamps: true }
);

export const ScheduleRequest = mongoose.model<IScheduleRequest>('ScheduleRequest', scheduleRequestSchema);
