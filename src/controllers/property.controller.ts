import { Request, Response } from 'express';
import * as propertyService from '../services/property.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const createProperty = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const images = files && files['images'] ? files['images'].map((file: any) => file.path) : [];
  const videos = files && files['videos'] ? files['videos'].map((file: any) => file.path) : [];
  const data = await propertyService.createProperty(req.body, images, videos);
  res.status(201).json(new ApiResponse(201, data, 'Property created successfully'));
});

export const getProperties = catchAsync(async (req: Request, res: Response) => {
  const data = await propertyService.getProperties(req.query);
  res.status(200).json(new ApiResponse(200, data, 'Properties fetched successfully'));
});

export const getProperty = catchAsync(async (req: Request, res: Response) => {
  const data = await propertyService.getPropertyBySlugOrId(req.params.idOrSlug as string);
  res.status(200).json(new ApiResponse(200, data, 'Property fetched successfully'));
});

export const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const images = files && files['images'] ? files['images'].map((file: any) => file.path) : [];
  const videos = files && files['videos'] ? files['videos'].map((file: any) => file.path) : [];
  const data = await propertyService.updateProperty(req.params.id as string, req.body, images, videos);
  res.status(200).json(new ApiResponse(200, data, 'Property updated successfully'));
});

export const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const hardDelete = req.query.hardDelete === 'true';
  await propertyService.deleteProperty(req.params.id as string, hardDelete);
  res.status(200).json(new ApiResponse(200, null, 'Property deleted successfully'));
});
