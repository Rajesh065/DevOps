import { Router } from 'express';
import {
  getClusters,
  getPods,
  getDeployments,
  getServices,
  restartDeployment,
  getPodLogs
} from '../controllers/kubernetesController.js';

const router = Router();

router.get('/clusters', getClusters);
router.get('/pods', getPods);
router.get('/pods/:podName/logs', getPodLogs);
router.get('/deployments', getDeployments);
router.post('/deployments/:name/restart', restartDeployment);
router.get('/services', getServices);

export default router;
