import { PullRequest } from '../types/pullRequest.types.js';

export const mockPullRequests: PullRequest[] = [
  {
    id: 108,
    title: "feat(frontend): Enterprise DevOps dashboard & live Monaco code editor",
    description: "Implements the unified React 18 frontend dashboard featuring DAG pipeline visualizer, K8s cluster inspector, Terraform drift viewer, and real-time observability telemetry streaming.",
    author: {
      username: "alex-chen",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
      role: "Lead Frontend Architect"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/frontend-dashboard-v2",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-28T09:15:00Z",
    closedAt: "2026-08-30T18:45:00Z",
    mergedAt: "2026-08-30T18:45:00Z",
    mergedBy: "sarah-devops",
    linesAdded: 14250,
    linesDeleted: 840,
    filesChanged: 42,
    labels: ["frontend", "ui/ux", "verified-pr", "release-v1.0"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-108-1",
        name: "Security & Secret Scans (Trivy + GitLeaks)",
        category: "security",
        status: "passed",
        details: "0 critical, 0 high vulnerabilities found in dependencies.",
        durationMs: 4200,
        criticalIssuesCount: 0,
        warningIssuesCount: 0
      },
      {
        id: "chk-108-2",
        name: "Unit & Integration Tests (Vitest + Playwright)",
        category: "unit_tests",
        status: "passed",
        details: "148 tests passed (100% pass rate, 94.2% code coverage)",
        durationMs: 18500
      },
      {
        id: "chk-108-3",
        name: "TypeScript Typecheck & ESLint Rules",
        category: "lint",
        status: "passed",
        details: "0 lint errors, 0 strict type violations.",
        durationMs: 3100
      },
      {
        id: "chk-108-4",
        name: "Vite Production Bundle & Asset Optimizer",
        category: "build",
        status: "passed",
        details: "Production bundle generated cleanly in 2.4s.",
        durationMs: 6400
      }
    ],
    reviews: [
      {
        id: "rev-108-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-30T17:30:00Z",
        comment: "Excellent architecture! The pipeline DAG rendering and K8s terminal simulator work seamlessly. Approved for release."
      },
      {
        id: "rev-108-2",
        reviewer: "marcus-cloud",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-30T18:10:00Z",
        comment: "LGTM! Verified accessibility and responsive layout on multi-monitor setups."
      }
    ],
    commits: [
      {
        hash: "e4f8b91",
        author: "alex-chen",
        message: "feat: add DAG pipeline stage canvas & real-time log inspector",
        timestamp: "2026-08-28T10:00:00Z",
        filesChanged: 14
      },
      {
        hash: "b7c2a19",
        author: "alex-chen",
        message: "feat: add K8s pod terminal emulator and resource metric cards",
        timestamp: "2026-08-29T14:20:00Z",
        filesChanged: 18
      },
      {
        hash: "f91d8e0",
        author: "alex-chen",
        message: "chore: finalize Tailwind theme and Lucide icon integrations",
        timestamp: "2026-08-30T16:00:00Z",
        filesChanged: 10
      }
    ]
  },
  {
    id: 107,
    title: "feat(sre): Chaos engineering engine, automated failover & cluster backup playbooks",
    description: "Introduces latency injection, pod disruption simulation, automated cross-region database failover, and Velero-compatible S3 snapshot backup routines.",
    author: {
      username: "elena-sre",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      role: "Senior SRE Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/sre-chaos-failover",
    targetBranch: "main",
    status: "closed",
    createdAt: "2026-08-25T11:00:00Z",
    closedAt: "2026-08-27T16:20:00Z",
    mergedAt: "2026-08-27T16:20:00Z",
    mergedBy: "elena-sre",
    linesAdded: 8750,
    linesDeleted: 120,
    filesChanged: 28,
    labels: ["sre", "automation", "chaos-engineering", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "staging",
    checks: [
      {
        id: "chk-107-1",
        name: "Chaos Simulation Dry Run",
        category: "security",
        status: "passed",
        details: "Simulated 500ms network latency injection & pod kill with 0 SLO breach.",
        durationMs: 8900
      },
      {
        id: "chk-107-2",
        name: "Bash & Python ShellCheck Validation",
        category: "lint",
        status: "passed",
        details: "Clean syntax across all 18 automation scripts.",
        durationMs: 1900
      }
    ],
    reviews: [
      {
        id: "rev-107-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-27T15:40:00Z",
        comment: "Tested failover scripts against staging RDS cluster. Sub-30-second failover achieved."
      }
    ],
    commits: [
      {
        hash: "c8a17d4",
        author: "elena-sre",
        message: "feat: add chaos monkey latency & packet drop simulator",
        timestamp: "2026-08-25T13:30:00Z",
        filesChanged: 12
      },
      {
        hash: "d3e4f5a",
        author: "elena-sre",
        message: "feat: add automated RDS failover & Velero cluster snapshot triggers",
        timestamp: "2026-08-26T16:15:00Z",
        filesChanged: 16
      }
    ]
  },
  {
    id: 106,
    title: "feat(observability): Real-time Prometheus telemetry stream, alert triager & postmortem engine",
    description: "Built the high-throughput WebSocket telemetry broadcaster delivering live CPU/Memory/Network metrics, Prometheus alert rules, and automated SEV-1/SEV-2 incident postmortem logging.",
    author: {
      username: "marcus-cloud",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      role: "Cloud Infrastructure Specialist"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/telemetry-alerts",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-22T08:00:00Z",
    closedAt: "2026-08-24T14:00:00Z",
    mergedAt: "2026-08-24T14:00:00Z",
    mergedBy: "alex-chen",
    linesAdded: 11400,
    linesDeleted: 430,
    filesChanged: 34,
    labels: ["observability", "metrics", "alerts", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-106-1",
        name: "WebSocket Load & Stress Benchmark",
        category: "build",
        status: "passed",
        details: "Handles 10,000 concurrent metric events/sec at < 5ms latency.",
        durationMs: 12000
      },
      {
        id: "chk-106-2",
        name: "Alert Rule Unit Tests",
        category: "unit_tests",
        status: "passed",
        details: "24 alert evaluations verified against synthetic threshold breaches.",
        durationMs: 2500
      }
    ],
    reviews: [
      {
        id: "rev-106-1",
        reviewer: "elena-sre",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-24T12:00:00Z",
        comment: "Alert manager deduplication works reliably. Great integration."
      }
    ],
    commits: [
      {
        hash: "a1b2c3d",
        author: "marcus-cloud",
        message: "feat: add WebSocket telemetry server & synthetic time-series generator",
        timestamp: "2026-08-22T11:00:00Z",
        filesChanged: 20
      },
      {
        hash: "e5f6g7h",
        author: "marcus-cloud",
        message: "feat: add incident timeline & postmortem schema validation",
        timestamp: "2026-08-23T15:45:00Z",
        filesChanged: 14
      }
    ]
  },
  {
    id: 105,
    title: "feat(security): OPA Rego policy engine, Checkov IaC guardrails & Trivy CVE scanner",
    description: "Adds Open Policy Agent (OPA) validation gatekeeper, blocking non-compliant Kubernetes manifests (privileged containers, missing resource limits) and Terraform security misconfigurations.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      role: "Principal DevSecOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/opa-policies-gatekeeper",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-18T14:30:00Z",
    closedAt: "2026-08-20T19:10:00Z",
    mergedAt: "2026-08-20T19:10:00Z",
    mergedBy: "sarah-devops",
    linesAdded: 9320,
    linesDeleted: 210,
    filesChanged: 25,
    labels: ["security", "opa-rego", "compliance", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-105-1",
        name: "OPA Rego Policy Test Suite",
        category: "opa_policy",
        status: "passed",
        details: "48 policy assertions tested with opa test command.",
        durationMs: 3100
      },
      {
        id: "chk-105-2",
        name: "Checkov Static Analysis Validation",
        category: "iac_validation",
        status: "passed",
        details: "Passed CIS AWS Foundations Benchmark compliance.",
        durationMs: 5400
      }
    ],
    reviews: [
      {
        id: "rev-105-1",
        reviewer: "alex-chen",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-20T17:00:00Z",
        comment: "OPA rules correctly reject any root-enabled container pods."
      }
    ],
    commits: [
      {
        hash: "7f8e9d0",
        author: "sarah-devops",
        message: "feat: add OPA Rego policies for K8s pod security standards",
        timestamp: "2026-08-18T16:00:00Z",
        filesChanged: 15
      },
      {
        hash: "1a2b3c4",
        author: "sarah-devops",
        message: "feat: integrate Trivy image scanner & Checkov policy enforcement",
        timestamp: "2026-08-19T18:20:00Z",
        filesChanged: 10
      }
    ]
  },
  {
    id: 104,
    title: "feat(k8s): Multi-cluster Kubernetes explorer, Helm chart templates & Pod log streamer",
    description: "Provides cluster topology discovery across EKS, GKE, and AKS, including interactive Pod inspection, Deployments, StatefulSets, Ingress controllers, and real-time pod log tailing.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      role: "Principal DevSecOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/k8s-cluster-explorer",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-14T10:00:00Z",
    closedAt: "2026-08-16T15:30:00Z",
    mergedAt: "2026-08-16T15:30:00Z",
    mergedBy: "sarah-devops",
    linesAdded: 16800,
    linesDeleted: 510,
    filesChanged: 48,
    labels: ["kubernetes", "helm", "cloud-native", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-104-1",
        name: "Helm Lint & Dry-Run Validation",
        category: "build",
        status: "passed",
        details: "Helm chart devpulse-1.0.0 validated across K8s 1.28, 1.29, 1.30 schemas.",
        durationMs: 4600
      },
      {
        id: "chk-104-2",
        name: "Kubernetes API Compatibility Test",
        category: "unit_tests",
        status: "passed",
        details: "Mock cluster client successfully handled 500 pods & 40 namespaces.",
        durationMs: 3800
      }
    ],
    reviews: [
      {
        id: "rev-104-1",
        reviewer: "elena-sre",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-16T14:10:00Z",
        comment: "Helm values hierarchy is cleanly templated. Ready for prod deployment."
      }
    ],
    commits: [
      {
        hash: "3d4e5f6",
        author: "sarah-devops",
        message: "feat: add Helm chart definitions, values schema & templates",
        timestamp: "2026-08-14T12:30:00Z",
        filesChanged: 26
      },
      {
        hash: "7a8b9c0",
        author: "sarah-devops",
        message: "feat: implement multi-cluster pod discovery & metrics endpoints",
        timestamp: "2026-08-15T17:00:00Z",
        filesChanged: 22
      }
    ]
  },
  {
    id: 103,
    title: "feat(iac): Multi-cloud Terraform modules (AWS/GCP/Azure) & state drift analyzer",
    description: "Delivers production Terraform modules for VPC, EKS/GKE/AKS, RDS, IAM, S3, and ALB, alongside an automated state parser and drift detection engine.",
    author: {
      username: "marcus-cloud",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      role: "Cloud Infrastructure Specialist"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/terraform-modules-drift",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-09T09:00:00Z",
    closedAt: "2026-08-12T17:40:00Z",
    mergedAt: "2026-08-12T17:40:00Z",
    mergedBy: "marcus-cloud",
    linesAdded: 19500,
    linesDeleted: 340,
    filesChanged: 56,
    labels: ["terraform", "iac", "multi-cloud", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-103-1",
        name: "Terraform Validate & TFLint",
        category: "iac_validation",
        status: "passed",
        details: "100% compliant with Terraform 1.8.x syntax and cloud provider best practices.",
        durationMs: 7200
      },
      {
        id: "chk-103-2",
        name: "Infracost Cloud Cost Estimation",
        category: "build",
        status: "passed",
        details: "Estimated monthly delta: +$142.50 (within target budget threshold).",
        durationMs: 4100
      }
    ],
    reviews: [
      {
        id: "rev-103-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-12T16:00:00Z",
        comment: "Excellent module parameterization and tagging standards. Approved."
      }
    ],
    commits: [
      {
        hash: "5b6c7d8",
        author: "marcus-cloud",
        message: "feat: add AWS VPC, EKS, RDS & IAM Terraform root modules",
        timestamp: "2026-08-09T14:00:00Z",
        filesChanged: 30
      },
      {
        hash: "9e0f1a2",
        author: "marcus-cloud",
        message: "feat: add GCP GKE & Azure AKS IaC definitions and drift parser",
        timestamp: "2026-08-11T11:20:00Z",
        filesChanged: 26
      }
    ]
  },
  {
    id: 102,
    title: "feat(pipeline): Distributed DAG pipeline orchestration engine & step runners",
    description: "Core execution engine capable of parsing pipeline YAMLs, scheduling dependent stages, running step commands, handling retry policies, and emitting logs over WebSockets.",
    author: {
      username: "sarah-devops",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      role: "Principal DevSecOps Engineer"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/pipeline-dag-engine",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-04T11:00:00Z",
    closedAt: "2026-08-07T18:00:00Z",
    mergedAt: "2026-08-07T18:00:00Z",
    mergedBy: "sarah-devops",
    linesAdded: 15400,
    linesDeleted: 400,
    filesChanged: 38,
    labels: ["ci-cd", "pipeline-engine", "orchestration", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-102-1",
        name: "DAG Cycle Detection & Topological Sort Tests",
        category: "unit_tests",
        status: "passed",
        details: "Passed all 64 graph validation and concurrency test scenarios.",
        durationMs: 3400
      },
      {
        id: "chk-102-2",
        name: "Execution Timeout & Error Recovery Suite",
        category: "build",
        status: "passed",
        details: "Verified graceful cancellation and step failure propagation.",
        durationMs: 5100
      }
    ],
    reviews: [
      {
        id: "rev-102-1",
        reviewer: "alex-chen",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-07T16:30:00Z",
        comment: "The stage dependency resolution algorithm is clean and highly performant."
      }
    ],
    commits: [
      {
        hash: "2c3d4e5",
        author: "sarah-devops",
        message: "feat: implement DAG graph scheduler and topological stage ordering",
        timestamp: "2026-08-04T15:00:00Z",
        filesChanged: 20
      },
      {
        hash: "6f7g8h9",
        author: "sarah-devops",
        message: "feat: add simulated step runner with live stdout/stderr log stream",
        timestamp: "2026-08-06T13:40:00Z",
        filesChanged: 18
      }
    ]
  },
  {
    id: 101,
    title: "feat(core): REST API Gateway, JWT authentication, RBAC & structured audit logging",
    description: "Initial foundation PR establishing Express backend architecture, secure token authentication, role-based authorization, rate limiting, request validation, and tamper-proof audit trails.",
    author: {
      username: "alex-chen",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
      role: "Lead Frontend Architect"
    },
    repository: "deveops/devpulse-platform",
    sourceBranch: "feat/core-gateway-auth",
    targetBranch: "main",
    status: "merged",
    createdAt: "2026-08-01T08:30:00Z",
    closedAt: "2026-08-03T14:15:00Z",
    mergedAt: "2026-08-03T14:15:00Z",
    mergedBy: "sarah-devops",
    linesAdded: 12200,
    linesDeleted: 0,
    filesChanged: 30,
    labels: ["core", "authentication", "rbac", "security", "verified-pr"],
    autoMergeEnabled: true,
    deployEnvironment: "production",
    checks: [
      {
        id: "chk-101-1",
        name: "JWT Signature & Token Expiration Tests",
        category: "security",
        status: "passed",
        details: "Verified HMAC-SHA256 signature verification & role claims.",
        durationMs: 2800
      },
      {
        id: "chk-101-2",
        name: "RBAC Permission Matrix Unit Tests",
        category: "unit_tests",
        status: "passed",
        details: "All 32 role-permission combination tests passed successfully.",
        durationMs: 1900
      }
    ],
    reviews: [
      {
        id: "rev-101-1",
        reviewer: "sarah-devops",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
        state: "APPROVED",
        submittedAt: "2026-08-03T12:00:00Z",
        comment: "Core gateway structure is modular, robust, and cleanly typed. Approved."
      }
    ],
    commits: [
      {
        hash: "101a2b3",
        author: "alex-chen",
        message: "feat: initialize Express gateway with modular routing & error handling",
        timestamp: "2026-08-01T10:00:00Z",
        filesChanged: 16
      },
      {
        hash: "101c4d5",
        author: "alex-chen",
        message: "feat: add JWT auth middleware, RBAC checks and audit logger",
        timestamp: "2026-08-02T16:30:00Z",
        filesChanged: 14
      }
    ]
  }
];
