import { Router } from 'express';
import {
  getPullRequests,
  getClosedPullRequests,
  getPullRequestById,
  createPullRequest,
  mergePullRequest,
  closePullRequest
} from '../controllers/pullRequestController.js';

const router = Router();

router.get('/', getPullRequests);
router.get('/closed', getClosedPullRequests);
router.get('/:id', getPullRequestById);
router.post('/', createPullRequest);
router.post('/:id/merge', mergePullRequest);
router.post('/:id/close', closePullRequest);

export default router;
