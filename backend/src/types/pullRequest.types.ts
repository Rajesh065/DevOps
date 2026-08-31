export type PRStatus = 'open' | 'closed' | 'merged';

export type CheckStatus = 'queued' | 'in_progress' | 'passed' | 'failed' | 'skipped';

export interface PRCheck {
  id: string;
  name: string;
  category: 'security' | 'unit_tests' | 'lint' | 'iac_validation' | 'opa_policy' | 'build';
  status: CheckStatus;
  details: string;
  durationMs: number;
  criticalIssuesCount?: number;
  warningIssuesCount?: number;
}

export interface PRReview {
  id: string;
  reviewer: string;
  avatarUrl: string;
  state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED';
  submittedAt: string;
  comment: string;
}

export interface PRCommit {
  hash: string;
  author: string;
  message: string;
  timestamp: string;
  filesChanged: number;
}

export interface PullRequest {
  id: number;
  title: string;
  description: string;
  author: {
    username: string;
    avatarUrl: string;
    role: string;
  };
  repository: string;
  sourceBranch: string;
  targetBranch: string;
  status: PRStatus;
  createdAt: string;
  closedAt?: string;
  mergedAt?: string;
  mergedBy?: string;
  linesAdded: number;
  linesDeleted: number;
  filesChanged: number;
  labels: string[];
  checks: PRCheck[];
  reviews: PRReview[];
  commits: PRCommit[];
  autoMergeEnabled: boolean;
  deployEnvironment?: string;
}
