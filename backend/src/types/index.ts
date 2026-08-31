export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  durationMs?: number;
  steps: Array<{
    id: string;
    name: string;
    command: string;
    status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
    durationMs?: number;
    logs: string[];
  }>;
  requiresApproval?: boolean;
  approvedBy?: string;
}

export interface PipelineRun {
  id: string;
  pipelineId: string;
  pipelineName: string;
  repository: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  author: string;
  status: 'idle' | 'running' | 'success' | 'failed' | 'cancelled' | 'pending_approval';
  trigger: 'push' | 'pull_request' | 'manual' | 'schedule';
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  stages: PipelineStage[];
  environment: 'development' | 'staging' | 'production';
}

export interface PullRequest {
  id: number;
  title: string;
  description: string;
  author: { username: string; avatarUrl: string; role: string };
  repository: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'closed' | 'merged';
  createdAt: string;
  closedAt?: string;
  mergedAt?: string;
  mergedBy?: string;
  linesAdded: number;
  linesDeleted: number;
  filesChanged: number;
  labels: string[];
  checks: Array<{
    id: string;
    name: string;
    category: string;
    status: 'queued' | 'in_progress' | 'passed' | 'failed' | 'skipped';
    details: string;
    durationMs: number;
  }>;
  reviews: Array<{
    id: string;
    reviewer: string;
    avatarUrl: string;
    state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED';
    submittedAt: string;
    comment: string;
  }>;
  commits: Array<{
    hash: string;
    author: string;
    message: string;
    timestamp: string;
    filesChanged: number;
  }>;
}

export interface K8sCluster {
  id: string;
  name: string;
  provider: string;
  region: string;
  version: string;
  nodeCount: number;
  status: string;
  totalCpuCores: number;
  usedCpuCores: number;
  totalMemoryGiB: number;
  usedMemoryGiB: number;
  namespaces: string[];
}

export interface K8sPod {
  name: string;
  namespace: string;
  status: string;
  restarts: number;
  cpuUsageMilli: number;
  memoryUsageMiB: number;
  ip: string;
  node: string;
  age: string;
  labels: Record<string, string>;
}

export interface TerraformWorkspace {
  id: string;
  name: string;
  environment: string;
  terraformVersion: string;
  lastAppliedAt: string;
  appliedBy: string;
  resourcesCount: number;
  totalMonthlyCostUsd: number;
  driftStatus: 'in_sync' | 'drift_detected';
  resources: Array<{
    id: string;
    type: string;
    name: string;
    provider: string;
    region: string;
    status: 'synced' | 'drifted' | 'pending_creation';
    costMonthlyUsd: number;
    driftDetails?: Array<{ attribute: string; expectedValue: string; actualValue: string }>;
  }>;
}
