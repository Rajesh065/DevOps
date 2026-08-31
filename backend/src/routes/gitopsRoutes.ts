import { Router } from 'express';
import {
  getGitOpsApplications,
  getGitOpsApplicationById,
  syncGitOpsApplication,
  rollbackGitOpsApplication,
} from '../controllers/gitopsController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/applications', getGitOpsApplications);
router.get('/applications/:id', getGitOpsApplicationById);
router.post('/applications/:id/sync', authorizeRole(['admin', 'devops']), syncGitOpsApplication);
router.post('/applications/:id/rollback', authorizeRole(['admin', 'devops']), rollbackGitOpsApplication);

export default router;
