import { Router } from 'express';
import { getProtocol, getAdherence, exportReport, shareWithTeam } from '../controllers/clinical.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Secure these endpoints

router.get('/protocol', getProtocol);
router.get('/adherence', getAdherence);
router.post('/report/export', exportReport);
router.post('/report/share', shareWithTeam);

export default router;
