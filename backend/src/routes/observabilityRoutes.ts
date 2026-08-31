import { Router } from 'express';
import {
  getMetrics,
  getAlerts,
  acknowledgeAlert,
  resolveAlert,
  getIncidents,
  createIncident
} from '../controllers/observabilityController.js';

const router = Router();

router.get('/metrics', getMetrics);
router.get('/alerts', getAlerts);
router.post('/alerts/:id/acknowledge', acknowledgeAlert);
router.post('/alerts/:id/resolve', resolveAlert);
router.get('/incidents', getIncidents);
router.post('/incidents', createIncident);

export default router;
