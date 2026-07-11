import { ScheduleRequest } from '../models/ScheduleRequest';
import { ApiError } from '../utils/apiError';

export const createScheduleRequest = async (data: any) => {
  const request = await ScheduleRequest.create(data);
  return request;
};

export const getScheduleRequests = async (query: any) => {
  const { page = 1, limit = 10, status } = query;
  const filter: any = {};
  if (status) filter.status = status;

  const requests = await ScheduleRequest.find(filter)
    .populate('propertyId', 'title location status images')
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await ScheduleRequest.countDocuments(filter);

  return { requests, total, page: Number(page), limit: Number(limit) };
};

export const updateScheduleRequestStatus = async (id: string, status: string) => {
  const request = await ScheduleRequest.findByIdAndUpdate(id, { status }, { new: true });
  if (!request) {
    throw new ApiError(404, 'Schedule request not found');
  }
  return request;
};

export const deleteScheduleRequest = async (id: string) => {
  const request = await ScheduleRequest.findByIdAndDelete(id);
  if (!request) {
    throw new ApiError(404, 'Schedule request not found');
  }
};
