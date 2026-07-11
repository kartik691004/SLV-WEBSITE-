import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';

export const register = catchAsync(async (req: Request, res: Response) => {
  const data = await authService.registerAdmin(req.body);
  res.status(201).json(new ApiResponse(201, data, 'Admin registered successfully'));
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await authService.loginAdmin(email, password);
  res.status(200).json(new ApiResponse(200, data, 'Login successful'));
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});
