import { TerraformWorkspace } from '../types/iac.types.js';

export const mockTerraformWorkspaces: TerraformWorkspace[] = [
  {
    id: "ws-aws-production",
    name: "aws-infra-prod",
    environment: "prod",
    terraformVersion: "1.8.4",
    lastAppliedAt: "2026-08-30T17:30:00Z",
    appliedBy: "sarah-devops",
    resourcesCount: 48,
    totalMonthlyCostUsd: 4280.50,
    driftStatus: "in_sync",
    stateLock: false,
    resources: [
      {
        id: "aws_vpc.main",
        type: "aws_vpc",
        name: "devpulse-prod-vpc",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 0.0,
        tags: { Environment: "production", ManagedBy: "Terraform", Service: "Networking" },
        dependencies: []
      },
      {
        id: "aws_eks_cluster.primary",
        type: "aws_eks_cluster",
        name: "devpulse-prod-eks",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 73.00,
        tags: { Environment: "production", Tier: "K8s-ControlPlane" },
        dependencies: ["aws_vpc.main"]
      },
      {
        id: "aws_eks_node_group.workers",
        type: "aws_eks_node_group",
        name: "devpulse-prod-nodegroup-m6i",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 2150.00,
        tags: { Environment: "production", NodeType: "m6i.2xlarge" },
        dependencies: ["aws_eks_cluster.primary"]
      },
      {
        id: "aws_db_instance.postgres",
        type: "aws_db_instance",
        name: "devpulse-prod-aurora-pg",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 1420.50,
        tags: { Environment: "production", Engine: "Aurora-PostgreSQL-16.2" },
        dependencies: ["aws_vpc.main"]
      },
      {
        id: "aws_s3_bucket.artifacts",
        type: "aws_s3_bucket",
        name: "devpulse-prod-artifacts-vault",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 38.00,
        tags: { Environment: "production", Access: "Encrypted-KMS" },
        dependencies: []
      }
    ]
  },
  {
    id: "ws-aws-staging",
    name: "aws-infra-stage",
    environment: "staging",
    terraformVersion: "1.8.4",
    lastAppliedAt: "2026-08-29T12:00:00Z",
    appliedBy: "marcus-cloud",
    resourcesCount: 26,
    totalMonthlyCostUsd: 1150.00,
    driftStatus: "drift_detected",
    stateLock: false,
    resources: [
      {
        id: "aws_security_group.ingress_rules",
        type: "aws_security_group",
        name: "stage-alb-sg",
        provider: "aws",
        region: "us-east-1",
        status: "drifted",
        driftDetails: [
          {
            attribute: "ingress[cidr_blocks]",
            expectedValue: "[\"10.0.0.0/8\"]",
            actualValue: "[\"0.0.0.0/0\"]"
          }
        ],
        costMonthlyUsd: 0.0,
        tags: { Environment: "staging", ManagedBy: "Terraform" },
        dependencies: []
      },
      {
        id: "aws_eks_cluster.stage_cluster",
        type: "aws_eks_cluster",
        name: "devpulse-stage-eks",
        provider: "aws",
        region: "us-east-1",
        status: "synced",
        costMonthlyUsd: 73.00,
        tags: { Environment: "staging" },
        dependencies: []
      }
    ]
  }
];
