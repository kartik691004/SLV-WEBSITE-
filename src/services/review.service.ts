import { Review } from '../models/Review';
import { ApiError } from '../utils/apiError';

export const createReview = async (data: any) => {
  const review = await Review.create(data);
  return review;
};

export const getReviews = async (query: any, isAdmin = false) => {
  const { page = 1, limit = 10, isApproved } = query;
  const filter: any = {};
  
  if (!isAdmin) {
    filter.isApproved = true; // Public users only see approved reviews
  } else if (isApproved !== undefined) {
    filter.isApproved = isApproved === 'true';
  }

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await Review.countDocuments(filter);

  return { reviews, total, page: Number(page), limit: Number(limit) };
};

export const updateReviewStatus = async (id: string, isApproved: boolean) => {
  const review = await Review.findByIdAndUpdate(id, { isApproved }, { new: true });
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  return review;
};

export const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
};
