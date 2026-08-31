import { Router } from 'express';
import {
  getPolicies,
  getVulnerabilities,
  getAuditLogs,
  testPolicyEvaluation
} from '../controllers/securityController.js';

const router = Router();

router.get('/policies', getPolicies);
router.get('/vulnerabilities', getVulnerabilities);
router.get('/audit-logs', getAuditLogs);
router.post('/evaluate-rego', testPolicyEvaluation);

export default router;
