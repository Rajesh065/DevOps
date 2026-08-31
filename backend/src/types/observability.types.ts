export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface SystemMetricPoint {
  timestamp: string;
  cpuPercent: number;
  memoryPercent: number;
  networkInMbps: number;
  networkOutMbps: number;
  reqPerSec: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  errorRatePercent: number;
}

export interface SystemAlert {
  id: string;
  name: string;
  severity: AlertSeverity;
  source: 'Prometheus' | 'CloudWatch' | 'Datadog' | 'Kubernetes-Event';
  message: string;
  targetService: string;
  cluster: string;
  firingSince: string;
  status: 'firing' | 'acknowledged' | 'resolved';
  silenced: boolean;
}

export interface IncidentRecord {
  id: string;
  title: string;
  severity: 'SEV-1' | 'SEV-2' | 'SEV-3';
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  impactedServices: string[];
  commander: string;
  startedAt: string;
  resolvedAt?: string;
  summary: string;
  rootCause?: string;
  actionItems: string[];
}
