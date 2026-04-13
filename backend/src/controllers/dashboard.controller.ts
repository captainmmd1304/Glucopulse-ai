import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { DashboardService } from '../services/dashboard.service';
import { successResponse, errorResponse } from '../utils/responseProvider';

export const getOverview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const data = await DashboardService.getOverviewMetrics(userId);
    return successResponse(res, 200, 'Overview retrieved successfully', data);
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};

export const getRiskFactors = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const data = await DashboardService.getRiskFactors(userId);
    return successResponse(res, 200, 'Risk factors retrieved successfully', data);
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};
