import { Request, Response } from 'express';
import { ObservabilityEngine } from '../services/observabilityEngine.js';

const obsEngine = new ObservabilityEngine();

export const getMetrics = (req: Request, res: Response) => {
  const metrics = obsEngine.getLiveMetrics();
  res.json({ success: true, count: metrics.length, data: metrics });
};

export const getAlerts = (req: Request, res: Response) => {
  const alerts = obsEngine.getAlerts();
  res.json({ success: true, count: alerts.length, data: alerts });
};

export const acknowledgeAlert = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const alert = obsEngine.acknowledgeAlert(id);
    res.json({ success: true, message: 'Alert acknowledged', data: alert });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const resolveAlert = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const alert = obsEngine.resolveAlert(id);
    res.json({ success: true, message: 'Alert resolved', data: alert });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getIncidents = (req: Request, res: Response) => {
  const incidents = obsEngine.getIncidents();
  res.json({ success: true, count: incidents.length, data: incidents });
};

export const createIncident = (req: Request, res: Response) => {
  const incident = obsEngine.createIncident(req.body);
  res.status(201).json({ success: true, message: 'Incident logged', data: incident });
};
