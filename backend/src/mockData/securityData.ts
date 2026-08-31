import { OPAPolicy, SecurityVulnerability, AuditLog } from '../types/security.types.js';

export const mockOPAPolicies: OPAPolicy[] = [
  {
    id: "pol-k8s-root",
    name: "Disallow Privileged & Root Containers",
    category: "Kubernetes-Guardrail",
    severity: "high",
    enforcement: "enforced",
    description: "Ensures containers do not run with privileged mode or root user permissions (UID 0).",
    violationsCount: 0,
    regoCode: `package kubernetes.security

default allow = false

allow {
    not has_privileged_container
    not has_root_user
}

has_privileged_container {
    input.spec.containers[_].securityContext.privileged == true
}

has_root_user {
    input.spec.containers[_].securityContext.runAsUser == 0
}`
  },
  {
    id: "pol-k8s-limits",
    name: "Enforce CPU & Memory Resource Limits",
    category: "Kubernetes-Guardrail",
    severity: "medium",
    enforcement: "enforced",
    description: "Requires all pods to explicitly specify cpu and memory resource requests and limits to prevent noisy neighbor outages.",
    violationsCount: 0,
    regoCode: `package kubernetes.resources

default allow = false

allow {
    count(missing_limits) == 0
}

missing_limits[c.name] {
    c := input.spec.containers[_]
    not c.resources.limits.cpu
    not c.resources.limits.memory
}`
  },
  {
    id: "pol-tf-s3-encrypt",
    name: "Enforce S3 Bucket Server-Side KMS Encryption",
    category: "Terraform-Security",
    severity: "high",
    enforcement: "enforced",
    description: "Verifies that all AWS S3 buckets enable SSE-KMS encryption with customer managed keys.",
    violationsCount: 0,
    regoCode: `package terraform.s3

default allow = false

allow {
    input.resource.aws_s3_bucket_server_side_encryption_configuration[_]
}`
  }
];

export const mockVulnerabilities: SecurityVulnerability[] = [
  {
    id: "VULN-882",
    cveId: "CVE-2026-3841",
    pkgName: "openssl",
    installedVersion: "3.0.13-r0",
    fixedVersion: "3.0.14-r0",
    severity: "MEDIUM",
    serviceTarget: "devpulse-backend:v1.2.0",
    detectedIn: "Container Image",
    description: "Buffer over-read in X.509 certificate processing during TLS handshake.",
    remediation: "Upgrade base Alpine image to >= 3.20.2 in Dockerfile."
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "aud-1092",
    timestamp: "2026-08-30T18:45:00Z",
    actor: "sarah-devops",
    action: "PULL_REQUEST_MERGED",
    resource: "PR #108 (feat: Enterprise Frontend UI Dashboard)",
    status: "SUCCESS",
    ipAddress: "192.168.1.104",
    details: { checksPassed: 4, reviewsApproved: 2, targetBranch: "main" }
  },
  {
    id: "aud-1091",
    timestamp: "2026-08-30T17:30:00Z",
    actor: "sarah-devops",
    action: "TERRAFORM_APPLIED",
    resource: "aws-infra-prod",
    status: "SUCCESS",
    ipAddress: "192.168.1.104",
    details: { changesApplied: 2, destroyed: 0 }
  },
  {
    id: "aud-1090",
    timestamp: "2026-08-30T15:20:00Z",
    actor: "marcus-cloud",
    action: "CLUSTER_SECRET_ROTATED",
    resource: "production-us-east-1-eks / devpulse-prod / db-credentials",
    status: "SUCCESS",
    ipAddress: "192.168.1.88",
    details: { vaultVersion: "v3" }
  }
];
