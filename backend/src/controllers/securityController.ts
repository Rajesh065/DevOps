import { Request, Response } from 'express';
import { PolicyScannerEngine } from '../services/policyScannerEngine.js';

const policyEngine = new PolicyScannerEngine();

export const getPolicies = (req: Request, res: Response) => {
  const policies = policyEngine.getPolicies();
  res.json({ success: true, count: policies.length, data: policies });
};

export const getVulnerabilities = (req: Request, res: Response) => {
  const vulns = policyEngine.getVulnerabilities();
  res.json({ success: true, count: vulns.length, data: vulns });
};

export const getAuditLogs = (req: Request, res: Response) => {
  const logs = policyEngine.getAuditLogs();
  res.json({ success: true, count: logs.length, data: logs });
};

export const testPolicyEvaluation = (req: Request, res: Response) => {
  const { regoCode, inputJson } = req.body;
  const result = policyEngine.testRegoPolicy(regoCode, inputJson);
  res.json({ success: true, data: result });
};
