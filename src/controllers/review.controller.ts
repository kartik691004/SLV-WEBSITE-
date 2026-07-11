import { Request, Response } from 'express';
import * as reviewService from '../services/review.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const data = await reviewService.createReview(req.body);
  res.status(201).json(new ApiResponse(201, data, 'Review created successfully. It will be public once approved.'));
});

export const getPublicReviews = catchAsync(async (req: Request, res: Response) => {
  const data = await reviewService.getReviews(req.query, false);
  res.status(200).json(new ApiResponse(200, data, 'Reviews fetched successfully'));
});

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const data = await reviewService.getReviews(req.query, true);
  res.status(200).json(new ApiResponse(200, data, 'All reviews fetched successfully'));
});

export const updateReviewStatus = catchAsync(async (req: Request, res: Response) => {
  const data = await reviewService.updateReviewStatus(req.params.id as string, req.body.isApproved);
  res.status(200).json(new ApiResponse(200, data, 'Review status updated successfully'));
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await reviewService.deleteReview(req.params.id as string);
  res.status(200).json(new ApiResponse(200, null, 'Review deleted successfully'));
});
