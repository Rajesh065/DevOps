import { Request, Response } from 'express';
import { KubernetesClusterManager } from '../services/kubernetesClusterManager.js';

const k8sManager = new KubernetesClusterManager();

export const getClusters = (req: Request, res: Response) => {
  const clusters = k8sManager.getClusters();
  res.json({ success: true, count: clusters.length, data: clusters });
};

export const getPods = (req: Request, res: Response) => {
  const namespace = req.query.namespace as string;
  const pods = k8sManager.getPods(namespace);
  res.json({ success: true, count: pods.length, data: pods });
};

export const getDeployments = (req: Request, res: Response) => {
  const namespace = req.query.namespace as string;
  const deps = k8sManager.getDeployments(namespace);
  res.json({ success: true, count: deps.length, data: deps });
};

export const getServices = (req: Request, res: Response) => {
  const namespace = req.query.namespace as string;
  const svcs = k8sManager.getServices(namespace);
  res.json({ success: true, count: svcs.length, data: svcs });
};

export const restartDeployment = (req: Request, res: Response) => {
  const { name } = req.params;
  const { namespace } = req.body;
  try {
    const result = k8sManager.restartDeployment(name, namespace || 'devpulse-prod');
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getPodLogs = (req: Request, res: Response) => {
  const { podName } = req.params;
  const logs = k8sManager.getPodLogs(podName);
  res.json({ success: true, podName, logs });
};
