import { Request, Response } from 'express';
import * as contactService from '../services/contact.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const createMessage = catchAsync(async (req: Request, res: Response) => {
  const data = await contactService.createMessage(req.body);
  res.status(201).json(new ApiResponse(201, data, 'Message sent successfully. We will get back to you shortly.'));
});

export const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const data = await contactService.getMessages(req.query);
  res.status(200).json(new ApiResponse(200, data, 'Messages fetched successfully'));
});

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const data = await contactService.markAsRead(req.params.id as string);
  res.status(200).json(new ApiResponse(200, data, 'Message marked as read'));
});

export const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  await contactService.deleteMessage(req.params.id as string);
  res.status(200).json(new ApiResponse(200, null, 'Message deleted successfully'));
});
