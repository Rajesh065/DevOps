import { Request, Response } from 'express';
import { aiopsRootCauseAnalyzer } from '../engines/AIOpsRootCauseAnalyzer.js';

export const listAIOpsIncidents = (req: Request, res: Response) => {
  const incidents = aiopsRootCauseAnalyzer.getActiveIncidents();
  res.json({
    total: incidents.length,
    timestamp: new Date().toISOString(),
    incidents,
  });
};

export const getAIOpsIncidentById = (req: Request, res: Response) => {
  const { id } = req.params;
  const incident = aiopsRootCauseAnalyzer.getIncidentById(id);
  if (!incident) {
    return res.status(404).json({ error: 'NotFound', message: `Incident ${id} not found.` });
  }
  res.json(incident);
};

export const triggerIncidentAnalysis = async (req: Request, res: Response) => {
  const { service, cluster, symptoms } = req.body || {};
  if (!service || !cluster) {
    return res.status(400).json({ error: 'BadRequest', message: 'service and cluster are required' });
  }
  const result = await aiopsRootCauseAnalyzer.analyzeIncident({
    service,
    cluster,
    symptoms: Array.isArray(symptoms) ? symptoms : [],
  });
  res.json(result);
};

export const executeRemediation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await aiopsRootCauseAnalyzer.executeAutonomousRemediation(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: 'ExecutionFailed', message: err.message });
  }
};
