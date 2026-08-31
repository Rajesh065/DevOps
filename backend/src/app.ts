import express from 'express';
import cors from 'cors';
import { mockPipelines } from './mockData/pipelines';
import { mockPullRequests } from './mockData/pullRequests';
import { mockClusters, mockPods } from './mockData/kubernetes';
import { mockWorkspaces } from './mockData/iacWorkspaces';
import { wsBroadcaster } from './services/websocketBroadcaster';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/pipelines/runs', (req, res) => res.json({ success: true, data: mockPipelines }));
app.post('/api/pipelines/trigger', (req, res) => res.json({ success: true, data: mockPipelines[0] }));
app.post('/api/pipelines/runs/:runId/stages/:stageId/approve', (req, res) => res.json({ success: true }));

app.get('/api/pull-requests', (req, res) => res.json({ success: true, data: mockPullRequests }));
app.get('/api/pull-requests/closed', (req, res) => res.json({ success: true, data: mockPullRequests }));
app.post('/api/pull-requests/:id/merge', (req, res) => res.json({ success: true, data: mockPullRequests[0] }));

app.get('/api/kubernetes/clusters', (req, res) => res.json({ success: true, data: mockClusters }));
app.get('/api/kubernetes/pods', (req, res) => res.json({ success: true, data: mockPods }));
app.get('/api/kubernetes/pods/:podName/logs', (req, res) => res.json({ success: true, data: { logs: ["[INFO] Pod healthy"] } }));

app.get('/api/iac/workspaces', (req, res) => res.json({ success: true, data: mockWorkspaces }));
app.post('/api/iac/workspaces/:id/drift-check', (req, res) => res.json({ success: true, data: mockWorkspaces[0] }));
app.post('/api/iac/workspaces/:wsId/resources/:resId/reconcile', (req, res) => res.json({ success: true, data: mockWorkspaces[0] }));

app.get('/api/observability/metrics', (req, res) => res.json({
  success: true,
  data: [{ timestamp: new Date().toISOString(), cpuPercent: 42, memoryPercent: 64, reqPerSec: 5200, p99LatencyMs: 44, errorRatePercent: 0.003 }]
}));
app.get('/api/observability/alerts', (req, res) => res.json({ success: true, data: [] }));
app.post('/api/observability/alerts/:id/acknowledge', (req, res) => res.json({ success: true }));
app.post('/api/observability/alerts/:id/resolve', (req, res) => res.json({ success: true }));

app.get('/api/security/policies', (req, res) => res.json({
  success: true,
  data: [{ id: "pol-1", name: "Disallow Root Execution", category: "Kubernetes Security", severity: "CRITICAL", enforcement: "enforced", description: "Block root containers", regoCode: "package k8s\n default allow = false" }]
}));
