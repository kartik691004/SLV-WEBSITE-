import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  customerName: string;
  rating: number;
  message: string;
  isApproved: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
