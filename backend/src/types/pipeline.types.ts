export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed' | 'cancelled' | 'pending_approval';

export type StageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped';

export interface PipelineStep {
  id: string;
  name: string;
  command: string;
  status: StageStatus;
  durationMs?: number;
  logs: string[];
  exitCode?: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: StageStatus;
  durationMs?: number;
  steps: PipelineStep[];
  dependsOn?: string[];
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
  status: PipelineStatus;
  trigger: 'push' | 'pull_request' | 'manual' | 'schedule';
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  stages: PipelineStage[];
  environment: 'development' | 'staging' | 'production';
  artifacts?: Array<{
    name: string;
    sizeBytes: number;
    url: string;
    type: string;
  }>;
}

export interface PipelineDefinition {
  id: string;
  name: string;
  description: string;
  repository: string;
  defaultBranch: string;
  stages: Array<{
    name: string;
    steps: Array<{ name: string; command: string }>;
    requiresApproval?: boolean;
  }>;
  scheduleCron?: string;
  createdAt: string;
  updatedAt: string;
}
