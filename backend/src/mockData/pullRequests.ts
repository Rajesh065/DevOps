import { PullRequest } from '../types';

export const mockPullRequests: PullRequest[] = [
  {
    id: 101,
    title: "feat(core): REST API Gateway, JWT authentication, RBAC & structured audit logging",
    description: "Initial foundation PR establishing Express backend architecture, secure token authentication, role-based authorization, rate limiting, request validation, and tamper-proof audit trails.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      role: "Staff DevOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/core-gateway-auth",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 5.8).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 5.8).toISOString(),
    mergedBy: "alex-sre-lead",
    linesAdded: 2612,
    linesDeleted: 14,
    filesChanged: 37,
    labels: ["backend", "security", "core", "audit"],
    checks: [
      { id: "chk-1", name: "ESLint & TypeScript Typecheck", category: "lint", status: "passed", details: "0 errors, 0 warnings", durationMs: 4200 },
      { id: "chk-2", name: "Trivy Dependency CVE Scanner", category: "security", status: "passed", details: "0 critical vulnerabilities", durationMs: 8100 },
      { id: "chk-3", name: "Vitest Backend Unit Tests", category: "test", status: "passed", details: "13/13 test suites passed", durationMs: 12400 },
      { id: "chk-4", name: "OPA Rego Authorization Policy Gate", category: "policy", status: "passed", details: "Complies with zero-trust RBAC", durationMs: 2900 }
    ],
    reviews: [
      {
        id: "rev-101-1",
        reviewer: "alex-sre-lead",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 5.85).toISOString(),
        comment: "Authentication middleware and rate limiters look solid. Great job implementing the distributed token bucket algorithm."
      }
    ],
    commits: [
      { hash: "1f5a42b", author: "sarah-devops", message: "feat(core): REST API Gateway, JWT authentication, RBAC & structured audit logging", timestamp: new Date(Date.now() - 86400000 * 6).toISOString(), filesChanged: 37 }
    ]
  },
  {
    id: 102,
    title: "feat(pipeline): Distributed DAG pipeline orchestration engine & step runners",
    description: "Core execution engine capable of parsing pipeline YAMLs, scheduling dependent stages, running step commands, handling retry policies, and emitting logs over WebSockets.",
    author: {
      username: "marcus-cloud",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces",
      role: "Senior Cloud Architect"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/pipeline-dag-engine",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 4.9).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 4.9).toISOString(),
    mergedBy: "sarah-devops",
    linesAdded: 4819,
    linesDeleted: 8,
    filesChanged: 4,
    labels: ["pipeline", "dag", "orchestration", "websockets"],
    checks: [
      { id: "chk-2-1", name: "DAG Cyclic Dependency Validator", category: "test", status: "passed", details: "All graph cycles successfully detected and handled", durationMs: 3100 },
      { id: "chk-2-2", name: "WebSocket Log Stream Load Test", category: "perf", status: "passed", details: "10,000 events/sec sustained without drop", durationMs: 14200 }
    ],
    reviews: [
      {
        id: "rev-102-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 4.92).toISOString(),
        comment: "Topological sorting algorithm is clean and handles parallel branch execution seamlessly. Merging to main."
      }
    ],
    commits: [
      { hash: "794e810", author: "marcus-cloud", message: "feat(pipeline): Distributed DAG pipeline orchestration engine & step runners", timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), filesChanged: 4 }
    ]
  },
  {
    id: 103,
    title: "feat(iac): Multi-cloud Terraform modules (AWS/GCP/Azure) & state drift analyzer",
    description: "Delivers production Terraform modules for VPC, EKS/GKE/AKS, RDS, IAM, S3, and ALB, alongside an automated state parser and drift detection engine.",
    author: {
      username: "elena-sec",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
      role: "Security & Compliance Lead"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/terraform-modules-drift",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 4.2).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 4.1).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 4.1).toISOString(),
    mergedBy: "marcus-cloud",
    linesAdded: 31800,
    linesDeleted: 0,
    filesChanged: 10,
    labels: ["iac", "terraform", "multi-cloud", "aws", "gcp", "azure"],
    checks: [
      { id: "chk-3-1", name: "Terraform fmt & validate", category: "lint", status: "passed", details: "Clean HCL syntax across AWS/GCP/Azure", durationMs: 5100 }
    ],
    reviews: [
      {
        id: "rev-103-1",
        reviewer: "marcus-cloud",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 4.12).toISOString(),
        comment: "Excellent multi-cloud HCL modules. The automated drift reconciler functions cleanly in staging tests."
      }
    ],
    commits: [
      { hash: "59aa9ba", author: "elena-sec", message: "feat(iac): Multi-cloud Terraform modules (AWS/GCP/Azure) & state drift analyzer", timestamp: new Date(Date.now() - 86400000 * 4.2).toISOString(), filesChanged: 10 }
    ]
  },
  {
    id: 104,
    title: "feat(k8s): Multi-cluster Kubernetes explorer, Helm chart templates & Pod log streamer",
    description: "Provides cluster topology discovery across EKS, GKE, and AKS, including interactive Pod inspection, Deployments, StatefulSets, Ingress controllers, and real-time pod log tailing.",
    author: {
      username: "alex-sre-lead",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
      role: "Lead SRE"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/k8s-cluster-explorer",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 3.5).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 3.4).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 3.4).toISOString(),
    mergedBy: "sarah-devops",
    linesAdded: 18900,
    linesDeleted: 0,
    filesChanged: 7,
    labels: ["kubernetes", "helm", "k8s", "logging"],
    checks: [
      { id: "chk-4-1", name: "Helm Lint & Dry-Run Template", category: "lint", status: "passed", details: "Helm v3 chart templates rendered with 0 errors", durationMs: 4900 }
    ],
    reviews: [
      {
        id: "rev-104-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 3.42).toISOString(),
        comment: "K8s reconciler controller handles cluster context switching gracefully. Approved."
      }
    ],
    commits: [
      { hash: "302c0ad", author: "alex-sre-lead", message: "feat(k8s): Multi-cluster Kubernetes explorer, Helm chart templates & Pod log streamer", timestamp: new Date(Date.now() - 86400000 * 3.5).toISOString(), filesChanged: 7 }
    ]
  },
  {
    id: 105,
    title: "feat(security): OPA Rego policy engine, Checkov IaC guardrails & Trivy CVE scanner",
    description: "Adds Open Policy Agent (OPA) validation gatekeeper, blocking non-compliant Kubernetes manifests (privileged containers, missing resource limits) and Terraform security misconfigurations.",
    author: {
      username: "elena-sec",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
      role: "Security & Compliance Lead"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/opa-policies-gatekeeper",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 2.8).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 2.7).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 2.7).toISOString(),
    mergedBy: "alex-sre-lead",
    linesAdded: 15400,
    linesDeleted: 0,
    filesChanged: 5,
    labels: ["security", "opa", "rego", "compliance", "cis-benchmarks"],
    checks: [
      { id: "chk-5-1", name: "OPA Rego Unit Tests", category: "test", status: "passed", details: "All 28 policy constraints pass Rego tests", durationMs: 3800 }
    ],
    reviews: [
      {
        id: "rev-105-1",
        reviewer: "alex-sre-lead",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 2.72).toISOString(),
        comment: "Great DevSecOps guardrails. Rego policy test suite covers all CIS Kubernetes benchmark controls."
      }
    ],
    commits: [
      { hash: "61abddb", author: "elena-sec", message: "feat(security): OPA Rego policy engine, Checkov IaC guardrails & Trivy CVE scanner", timestamp: new Date(Date.now() - 86400000 * 2.8).toISOString(), filesChanged: 5 }
    ]
  },
  {
    id: 106,
    title: "feat(observability): Real-time Prometheus telemetry stream, alert triager & postmortem engine",
    description: "Built the high-throughput WebSocket telemetry broadcaster delivering live CPU/Memory/Network metrics, Prometheus alert rules, and automated SEV-1/SEV-2 incident postmortem logging.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      role: "Staff DevOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/telemetry-alerts",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 2.1).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 2.0).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 2.0).toISOString(),
    mergedBy: "marcus-cloud",
    linesAdded: 16200,
    linesDeleted: 0,
    filesChanged: 6,
    labels: ["observability", "prometheus", "grafana", "telemetry", "sre"],
    checks: [
      { id: "chk-6-1", name: "PromQL Alert Rule Validation", category: "lint", status: "passed", details: "All alert expressions syntax checked", durationMs: 2400 }
    ],
    reviews: [
      {
        id: "rev-106-1",
        reviewer: "marcus-cloud",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 2.02).toISOString(),
        comment: "High resolution telemetry feed connects smoothly with Prometheus scrapers."
      }
    ],
    commits: [
      { hash: "b7dd2be", author: "sarah-devops", message: "feat(observability): Real-time Prometheus telemetry stream, alert triager & postmortem engine", timestamp: new Date(Date.now() - 86400000 * 2.1).toISOString(), filesChanged: 6 }
    ]
  },
  {
    id: 107,
    title: "feat(sre): Chaos engineering engine, automated failover & cluster backup playbooks",
    description: "Introduces latency injection, pod disruption simulation, automated cross-region database failover, and Velero-compatible S3 snapshot backup routines.",
    author: {
      username: "alex-sre-lead",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
      role: "Lead SRE"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/sre-chaos-failover",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 1.4).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 1.3).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 1.3).toISOString(),
    mergedBy: "elena-sec",
    linesAdded: 21300,
    linesDeleted: 0,
    filesChanged: 8,
    labels: ["sre", "chaos-engineering", "failover", "disaster-recovery"],
    checks: [
      { id: "chk-7-1", name: "Chaos Injection Dry Run Test", category: "test", status: "passed", details: "Simulated 500ms latency without cluster drop", durationMs: 6200 }
    ],
    reviews: [
      {
        id: "rev-107-1",
        reviewer: "elena-sec",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 1.32).toISOString(),
        comment: "Disaster recovery playbooks and automated failover handlers tested and verified."
      }
    ],
    commits: [
      { hash: "90a4e97", author: "alex-sre-lead", message: "feat(sre): Chaos engineering engine, automated failover & cluster backup playbooks", timestamp: new Date(Date.now() - 86400000 * 1.4).toISOString(), filesChanged: 8 }
    ]
  },
  {
    id: 108,
    title: "feat(frontend): Enterprise DevOps dashboard, DAG visualizer & UI modules",
    description: "Implements the unified React 18 frontend dashboard featuring DAG pipeline visualizer, K8s cluster inspector, Terraform drift viewer, and real-time observability telemetry streaming.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      role: "Staff DevOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/frontend-dashboard-v2",
    targetBranch: "main",
    status: "closed",
    createdAt: new Date(Date.now() - 86400000 * 0.7).toISOString(),
    closedAt: new Date(Date.now() - 86400000 * 0.6).toISOString(),
    mergedAt: new Date(Date.now() - 86400000 * 0.6).toISOString(),
    mergedBy: "alex-sre-lead",
    linesAdded: 48474,
    linesDeleted: 0,
    filesChanged: 37,
    labels: ["frontend", "react", "dashboard", "vite", "tailwind"],
    checks: [
      { id: "chk-8-1", name: "Vite Production Build & Tree-shaking", category: "build", status: "passed", details: "Built bundle in 5.67s with 0 warnings", durationMs: 5670 }
    ],
    reviews: [
      {
        id: "rev-108-1",
        reviewer: "alex-sre-lead",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
        state: "APPROVED",
        submittedAt: new Date(Date.now() - 86400000 * 0.62).toISOString(),
        comment: "Clean developer-centric dark mode UI. All responsive breakpoints and WebSocket listeners verified."
      }
    ],
    commits: [
      { hash: "25434c3", author: "sarah-devops", message: "feat(frontend): Enterprise DevOps dashboard, DAG visualizer & UI modules", timestamp: new Date(Date.now() - 86400000 * 0.7).toISOString(), filesChanged: 37 }
    ]
  }
];
