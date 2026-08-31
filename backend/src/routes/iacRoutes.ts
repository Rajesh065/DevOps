import { Router } from 'express';
import {
  getWorkspaces,
  getWorkspaceById,
  runDriftDetection,
  reconcileResourceDrift
} from '../controllers/iacController.js';

const router = Router();

router.get('/workspaces', getWorkspaces);
router.get('/workspaces/:id', getWorkspaceById);
router.post('/workspaces/:id/drift-check', runDriftDetection);
router.post('/workspaces/:id/resources/:resourceId/reconcile', reconcileResourceDrift);

export default router;
