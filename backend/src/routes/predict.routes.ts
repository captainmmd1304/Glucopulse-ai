import { Router } from 'express';
import { getPrediction } from '../controllers/predict.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Route to get a new diabetes risk prediction
// We protect this route so only authenticated users can use the service
router.post('/', protect, getPrediction);

export default router;
