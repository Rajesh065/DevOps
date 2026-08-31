import { Router } from 'express';
import { getCloudCostSummary, executeCostAction } from '../controllers/finopsController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/summary', getCloudCostSummary);
router.post('/actions', authorizeRole(['admin', 'devops']), executeCostAction);

export default router;
