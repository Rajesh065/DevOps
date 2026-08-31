import { Router } from 'express';
import { getEbpfFlows, applyEbpfDropRule } from '../controllers/networkSecurityController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/flows', getEbpfFlows);
router.post('/drop-rule', authorizeRole(['admin', 'security']), applyEbpfDropRule);

export default router;
