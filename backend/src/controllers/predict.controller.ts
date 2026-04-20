import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { successResponse, errorResponse } from '../utils/responseProvider';
import { predictRisk } from '../services/predict.service';

export const getPrediction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const inputData = req.body;
    const result = await predictRisk(userId, inputData);
    return successResponse(res, 200, 'Prediction generated successfully', result);
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Failed to generate prediction');
  }
};
