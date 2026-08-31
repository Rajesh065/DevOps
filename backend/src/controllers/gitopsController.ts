import { Request, Response } from 'express';
import { gitopsReconciliationEngine } from '../engines/GitOpsReconciliationEngine.js';

export const getGitOpsApplications = (req: Request, res: Response) => {
  const apps = gitopsReconciliationEngine.listApplications();
  res.json({
    total: apps.length,
    timestamp: new Date().toISOString(),
    applications: apps,
  });
};

export const getGitOpsApplicationById = (req: Request, res: Response) => {
  const { id } = req.params;
  const app = gitopsReconciliationEngine.getApplication(id);
  if (!app) {
    return res.status(404).json({ error: 'NotFound', message: `Application ${id} not found.` });
  }
  res.json(app);
};

export const syncGitOpsApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { prune } = req.body || {};
  const result = await gitopsReconciliationEngine.triggerSync(id, Boolean(prune));
  if (!result.success) {
    return res.status(400).json(result);
  }
  res.json(result);
};

export const rollbackGitOpsApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { targetRevision } = req.body || {};
  if (!targetRevision) {
    return res.status(400).json({ error: 'BadRequest', message: 'targetRevision is required.' });
  }
  const result = await gitopsReconciliationEngine.rollbackApplication(id, targetRevision);
  if (!result.success) {
    return res.status(400).json(result);
  }
  res.json(result);
};
