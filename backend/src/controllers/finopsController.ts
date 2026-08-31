import { Request, Response } from 'express';
import { finopsCostGovernanceEngine } from '../engines/FinOpsCostGovernanceEngine.js';

export const getCloudCostSummary = (req: Request, res: Response) => {
  const summary = finopsCostGovernanceEngine.getCostSummary();
  res.json(summary);
};

export const executeCostAction = async (req: Request, res: Response) => {
  const { action } = req.body || {};
  if (!action || !['RECLAIM_IDLE', 'ENFORCE_BUDGET_GUARDRAILS'].includes(action)) {
    return res.status(400).json({ error: 'BadRequest', message: 'Valid action (RECLAIM_IDLE or ENFORCE_BUDGET_GUARDRAILS) is required.' });
  }

  const result = await finopsCostGovernanceEngine.triggerCostOptimization(action);
  res.json(result);
};
