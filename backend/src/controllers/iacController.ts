import { Request, Response } from 'express';
import { IaCDriftEngine } from '../services/iacDriftEngine.js';

const iacEngine = new IaCDriftEngine();

export const getWorkspaces = (req: Request, res: Response) => {
  const workspaces = iacEngine.getWorkspaces();
  res.json({ success: true, count: workspaces.length, data: workspaces });
};

export const getWorkspaceById = (req: Request, res: Response) => {
  const { id } = req.params;
  const ws = iacEngine.getWorkspaceById(id);
  if (!ws) {
    return res.status(404).json({ success: false, error: 'Terraform workspace not found' });
  }
  res.json({ success: true, data: ws });
};

export const runDriftDetection = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = iacEngine.runDriftDetection(id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const reconcileResourceDrift = (req: Request, res: Response) => {
  const { id, resourceId } = req.params;
  try {
    const reconciled = iacEngine.reconcileDrift(id, resourceId);
    res.json({ success: true, message: `Resource ${resourceId} reconciled`, data: reconciled });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
