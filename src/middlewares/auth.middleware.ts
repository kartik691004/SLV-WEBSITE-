import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/apiError';

export interface AuthRequest extends Request {
  admin?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Not authorized to access this route'));
    }

    const decoded = verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, token failed'));
  }
};
