import { SystemAlert, IncidentRecord, SystemMetricPoint } from '../types/observability.types.js';

export const generateMockMetrics = (count: number = 30): SystemMetricPoint[] => {
  const points: SystemMetricPoint[] = [];
  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now - i * 5000).toISOString();
    points.push({
      timestamp: time,
      cpuPercent: +(35 + Math.sin(i / 3) * 12 + Math.random() * 5).toFixed(1),
      memoryPercent: +(62 + Math.cos(i / 4) * 6 + Math.random() * 3).toFixed(1),
      networkInMbps: +(120 + Math.random() * 45).toFixed(1),
      networkOutMbps: +(340 + Math.random() * 80).toFixed(1),
      reqPerSec: Math.floor(4800 + Math.random() * 650),
      p95LatencyMs: +(24 + Math.random() * 8).toFixed(1),
      p99LatencyMs: +(48 + Math.random() * 14).toFixed(1),
      errorRatePercent: +(0.002 + Math.random() * 0.006).toFixed(4)
    });
  }
  return points;
};

export const mockAlerts: SystemAlert[] = [
  {
    id: "alt-901",
    name: "HighMemoryUsageNearLimit",
    severity: "warning",
    source: "Prometheus",
    message: "Container devpulse-backend in pod devpulse-backend-78b499f57d-xk91m is consuming > 85% of memory limit.",
    targetService: "devpulse-backend",
    cluster: "production-us-east-1-eks",
    firingSince: "2026-08-31T09:40:00Z",
    status: "firing",
    silenced: false
  },
  {
    id: "alt-902",
    name: "TerraformStateDriftDetected",
    severity: "critical",
    source: "CloudWatch",
    message: "Security Group stage-alb-sg CIDR block drifted from baseline (0.0.0.0/0 detected).",
    targetService: "aws-infra-stage",
    cluster: "aws-infra-stage",
    firingSince: "2026-08-31T10:15:00Z",
    status: "acknowledged",
    silenced: false
  }
];

export const mockIncidents: IncidentRecord[] = [
  {
    id: "INC-4812",
    title: "Canary Ingress Latency Spike on US-East Node Group",
    severity: "SEV-2",
    status: "Resolved",
    impactedServices: ["devpulse-backend", "api-gateway"],
    commander: "elena-sre",
    startedAt: "2026-08-28T14:10:00Z",
    resolvedAt: "2026-08-28T14:38:00Z",
    summary: "During Canary release v1.1.9, an unindexed DB query caused query queue saturation and p99 latency spike to 420ms.",
    rootCause: "Missing composite index on pipeline_runs(pipeline_id, status, created_at).",
    actionItems: [
      "Added composite migration index in PR #108",
      "Configured automatic Prometheus SLO latency alert threshold at 150ms",
      "Enhanced pre-deployment query execution plan check in CI"
    ]
  }
];
