import { Request, Response } from 'express';
import * as scheduleService from '../services/schedule.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const createScheduleRequest = catchAsync(async (req: Request, res: Response) => {
  const data = await scheduleService.createScheduleRequest(req.body);
  res.status(201).json(new ApiResponse(201, data, 'Schedule request created successfully'));
});

export const getScheduleRequests = catchAsync(async (req: Request, res: Response) => {
  const data = await scheduleService.getScheduleRequests(req.query);
  res.status(200).json(new ApiResponse(200, data, 'Schedule requests fetched successfully'));
});

export const updateScheduleRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const data = await scheduleService.updateScheduleRequestStatus(req.params.id as string, req.body.status);
  res.status(200).json(new ApiResponse(200, data, 'Schedule request status updated successfully'));
});

export const deleteScheduleRequest = catchAsync(async (req: Request, res: Response) => {
  await scheduleService.deleteScheduleRequest(req.params.id as string);
  res.status(200).json(new ApiResponse(200, null, 'Schedule request deleted successfully'));
});
