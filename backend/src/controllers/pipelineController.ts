import { Request, Response } from 'express';
import { PipelineEngine } from '../services/pipelineEngine.js';

const pipelineEngine = new PipelineEngine();

export const getPipelineRuns = (req: Request, res: Response) => {
  const runs = pipelineEngine.getAllRuns();
  res.json({ success: true, count: runs.length, data: runs });
};

export const getPipelineRunById = (req: Request, res: Response) => {
  const { id } = req.params;
  const run = pipelineEngine.getRunById(id);
  if (!run) {
    return res.status(404).json({ success: false, error: 'Pipeline run not found' });
  }
  res.json({ success: true, data: run });
};

export const getPipelineDefinitions = (req: Request, res: Response) => {
  const defs = pipelineEngine.getDefinitions();
  res.json({ success: true, data: defs });
};

export const triggerPipelineRun = (req: Request, res: Response) => {
  const { pipelineId, branch, environment } = req.body;
  try {
    const newRun = pipelineEngine.triggerPipeline(pipelineId || 'pipe-core-release', branch || 'main', environment || 'production');
    res.status(201).json({ success: true, message: 'Pipeline run queued', data: newRun });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const approvePipelineStage = (req: Request, res: Response) => {
  const { runId, stageId } = req.params;
  const { approver } = req.body;
  try {
    const updatedRun = pipelineEngine.approveStage(runId, stageId, approver || 'sarah-devops');
    res.json({ success: true, message: 'Stage approved', data: updatedRun });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
