import { Router } from 'express';
import pipelineRoutes from './pipelineRoutes.js';
import pullRequestRoutes from './pullRequestRoutes.js';
import kubernetesRoutes from './kubernetesRoutes.js';
import iacRoutes from './iacRoutes.js';
import observabilityRoutes from './observabilityRoutes.js';
import securityRoutes from './securityRoutes.js';
import authRoutes from './authRoutes.js';
import gitopsRoutes from './gitopsRoutes.js';

const apiRouter = Router();

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.2.0',
    services: {
      pipelineEngine: 'active',
      gitopsGatekeeper: 'active',
      k8sClusterManager: 'active',
      iacDriftEngine: 'active',
      telemetryBroadcaster: 'active',
      gitopsReconciliation: 'active'
    }
  });
});

apiRouter.use('/pipelines', pipelineRoutes);
apiRouter.use('/pull-requests', pullRequestRoutes);
apiRouter.use('/kubernetes', kubernetesRoutes);
apiRouter.use('/iac', iacRoutes);
apiRouter.use('/observability', observabilityRoutes);
apiRouter.use('/security', securityRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/gitops', gitopsRoutes);

export default apiRouter;
