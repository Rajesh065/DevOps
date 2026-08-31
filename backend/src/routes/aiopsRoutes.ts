import { Router } from 'express';
import {
  listAIOpsIncidents,
  getAIOpsIncidentById,
  triggerIncidentAnalysis,
  executeRemediation,
} from '../controllers/aiopsController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/incidents', listAIOpsIncidents);
router.get('/incidents/:id', getAIOpsIncidentById);
router.post('/analyze', authorizeRole(['admin', 'devops', 'sre']), triggerIncidentAnalysis);
router.post('/incidents/:id/remediate', authorizeRole(['admin', 'sre']), executeRemediation);

export default router;
