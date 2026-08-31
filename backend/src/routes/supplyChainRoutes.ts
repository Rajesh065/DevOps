import { Router } from 'express';
import {
  listSupplyChainAttestations,
  getSupplyChainAttestationById,
  verifyImage,
} from '../controllers/supplyChainController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/attestations', listSupplyChainAttestations);
router.get('/attestations/:id', getSupplyChainAttestationById);
router.post('/verify', authorizeRole(['admin', 'devops', 'security']), verifyImage);

export default router;
