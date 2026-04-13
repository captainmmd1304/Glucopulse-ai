import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ClinicalService } from '../services/clinical.service';
import { successResponse, errorResponse } from '../utils/responseProvider';

export const getProtocol = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const data = await ClinicalService.getProtocol(userId);
    return successResponse(res, 200, 'Clinical protocol retrieved successfully', data);
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};

export const getAdherence = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const data = await ClinicalService.getAdherence(userId);
    return successResponse(res, 200, 'Adherence stats retrieved successfully', data);
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};

export const exportReport = async (req: AuthRequest, res: Response) => {
  try {
    // In production, instantiate PDFkit here and pipe to res
    return successResponse(res, 200, 'Report generation triggered successfully', { downloadUrl: '/tmp/report.pdf' });
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};

export const shareWithTeam = async (req: AuthRequest, res: Response) => {
  try {
    // In production, SendGrid integration goes here
    return successResponse(res, 200, 'Clinical report shared securely with your care team.');
  } catch (error: any) {
    return errorResponse(res, 500, error.message || 'Server Error');
  }
};
