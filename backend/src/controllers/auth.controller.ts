import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/responseProvider';

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
