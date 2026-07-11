import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const getStats = catchAsync(async (req: Request, res: Response) => {
  const data = await dashboardService.getDashboardStats();
  res.status(200).json(new ApiResponse(200, data, 'Dashboard stats fetched successfully'));
});
