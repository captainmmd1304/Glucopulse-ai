import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { successResponse, errorResponse } from '../utils/responseProvider';
import prisma from '../config/db';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);
    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error: any) {
    return errorResponse(res, 400, error.message || 'Registration failed');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return successResponse(res, 200, 'Login successful', result);
  } catch (error: any) {
    return errorResponse(res, 401, error.message || 'Login failed');
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, profile: true },
    });

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    return successResponse(res, 200, 'User retrieved successfully', {
      id: user.id,
      email: user.email,
      profile: user.profile,
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};
