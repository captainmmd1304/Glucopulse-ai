import { Router } from 'express';
import { getOverview, getRiskFactors } from '../controllers/dashboard.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // All dashboard routes require JWT authentication

router.get('/overview', getOverview);
router.get('/risk-factors', getRiskFactors);

export default router;
