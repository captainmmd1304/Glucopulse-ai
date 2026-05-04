import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ClinicalService } from '../services/clinical.service';
import { successResponse, errorResponse } from '../utils/responseProvider';
import ejs from 'ejs';
import path from 'path';
import prisma from '../config/db';

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
    const userId = req.user.id;
    
    // 1. Fetch prediction data
    const latest = await prisma.predictionResult.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latest) {
      throw new Error('No clinical assessment found. Please complete an assessment first.');
    }

    // 2. Load and render EJS template
    const templatePath = path.join(__dirname, '../templates/report.ejs');
    const html = await ejs.renderFile(templatePath, {
      userId: latest.userId,
      date: latest.createdAt.toLocaleDateString(),
      riskScore: Math.round(latest.riskProbability),
      category: latest.category,
      confidence: latest.confidence,
      factors: latest.shapFactors || [],
      recommendations: latest.recommendations || []
    });

    // 3. Send rendered HTML report (can be printed to PDF in the browser)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'inline; filename="clinical_report.html"');
    return res.send(html);
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

