export type CloudProvider = 'aws' | 'azure' | 'gcp';

export interface TerraformResource {
  id: string;
  type: string;
  name: string;
  provider: CloudProvider;
  region: string;
  status: 'synced' | 'drifted' | 'pending_creation' | 'pending_destroy';
  driftDetails?: {
    attribute: string;
    expectedValue: string;
    actualValue: string;
  }[];
  costMonthlyUsd: number;
  tags: Record<string, string>;
  dependencies: string[];
}

export interface TerraformWorkspace {
  id: string;
  name: string;
  environment: 'dev' | 'staging' | 'prod';
  terraformVersion: string;
  lastAppliedAt: string;
  appliedBy: string;
  resourcesCount: number;
  totalMonthlyCostUsd: number;
  driftStatus: 'in_sync' | 'drift_detected';
  stateLock: boolean;
  resources: TerraformResource[];
}
