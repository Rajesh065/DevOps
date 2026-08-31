import { TerraformWorkspace } from '../types';

export const mockWorkspaces: TerraformWorkspace[] = [
  {
    id: "ws-aws-production",
    name: "aws-production-vpc-eks",
    environment: "production",
    terraformVersion: "1.8.4",
    lastAppliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    appliedBy: "sarah-devops",
    resourcesCount: 48,
    totalMonthlyCostUsd: 4280,
    driftStatus: "in_sync",
    resources: [
      {
        id: "aws_vpc.main",
        type: "aws_vpc",
        name: "devpulse_prod_vpc",
        provider: "hashicorp/aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 0
      }
    ]
  }
];
