import { PipelineRun, PipelineDefinition } from '../types/pipeline.types.js';

export const mockPipelineDefinitions: PipelineDefinition[] = [
  {
    id: "pipe-core-release",
    name: "DevPulse Core Release Pipeline",
    description: "Production end-to-end build, security scan, IaC validation, Kubernetes Canary deployment, and synthetic smoke testing.",
    repository: "deveops/devpulse-platform",
    defaultBranch: "main",
    stages: [
      {
        name: "Code Lint & Static Analysis",
        steps: [
          { name: "Install Dependencies", command: "npm ci --prefer-offline" },
          { name: "ESLint & Strict Typecheck", command: "npm run lint && npm run typecheck" },
          { name: "Secret Scan", command: "gitleaks detect --verbose" }
        ]
      },
      {
        name: "Security & Vulnerability Scan",
        steps: [
          { name: "Trivy Container Scan", command: "trivy image --severity HIGH,CRITICAL devpulse/backend:latest" },
          { name: "OPA Rego Policy Enforcement", command: "opa eval --data policies/opa/ --input k8s/manifests/production/" },
          { name: "Checkov IaC Audit", command: "checkov -d iac/terraform/aws" }
        ]
      },
      {
        name: "Unit & Integration Tests",
        steps: [
          { name: "Backend Unit Tests", command: "npm --prefix backend test" },
          { name: "Frontend Vitest Suite", command: "npm --prefix frontend test:ci" },
          { name: "Code Coverage Check", command: "c8 check-coverage --lines 90" }
        ]
      },
      {
        name: "Build & Containerize",
        steps: [
          { name: "Docker Multi-stage Build", command: "docker buildx build --platform linux/amd64,linux/arm64 -t devpulse:v1.2.0 ." },
          { name: "Cosign Container Sign", command: "cosign sign --key k8s/cosign.key devpulse:v1.2.0" }
        ]
      },
      {
        name: "Deploy to Staging",
        steps: [
          { name: "Helm Upgrade Staging", command: "helm upgrade --install devpulse-stage k8s/helm/devpulse -f k8s/helm/devpulse/values-stage.yaml" },
          { name: "Wait for Pod Readiness", command: "kubectl rollout status deployment/devpulse-stage-backend -n staging --timeout=120s" }
        ]
      },
      {
        name: "Production Approval & Canary",
        requiresApproval: true,
        steps: [
          { name: "ArgoCD Canary Sync", command: "argocd app sync devpulse-prod --strategy canary --weight 20" },
          { name: "Automated Metric Gate", command: "python scripts/sre/latency_analyzer.py --threshold-p99-ms 150" },
          { name: "Full Rollout Promotion", command: "argocd app sync devpulse-prod --strategy canary --weight 100" }
        ]
      }
    ],
    scheduleCron: "0 2 * * *",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-30T19:00:00Z"
  }
];

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "run-9842",
    pipelineId: "pipe-core-release",
    pipelineName: "DevPulse Core Release Pipeline",
    repository: "deveops/devpulse-platform",
    branch: "main",
    commitHash: "e4f8b91",
    commitMessage: "feat(release): Deploy DevPulse v1.2.0 with closed PR review gates",
    author: "alex-chen",
    status: "success",
    trigger: "push",
    startedAt: "2026-08-30T19:15:00Z",
    completedAt: "2026-08-30T19:23:45Z",
    durationSeconds: 525,
    environment: "production",
    stages: [
      {
        id: "stg-1",
        name: "Code Lint & Static Analysis",
        status: "success",
        durationMs: 45000,
        steps: [
          {
            id: "stp-1-1",
            name: "Install Dependencies",
            command: "npm ci --prefer-offline",
            status: "success",
            durationMs: 12000,
            logs: [
              "[INFO] Resolving dependency graph...",
              "[INFO] Fetched 1,420 packages from registry in 4.2s",
              "[SUCCESS] node_modules verified (integrity SHA-512 check passed)"
            ],
            exitCode: 0
          },
          {
            id: "stp-1-2",
            name: "ESLint & Strict Typecheck",
            command: "npm run lint && npm run typecheck",
            status: "success",
            durationMs: 18000,
            logs: [
              "[INFO] Executing ESLint across 142 source files...",
              "[INFO] Executing TypeScript compiler in strict mode (noImplicitAny: true)...",
              "[SUCCESS] Zero lint warnings or type violations detected."
            ],
            exitCode: 0
          },
          {
            id: "stp-1-3",
            name: "Secret Scan",
            command: "gitleaks detect --verbose",
            status: "success",
            durationMs: 15000,
            logs: [
              "[INFO] Scanning git history & current working directory for API keys / private certificates...",
              "[SUCCESS] 0 leaked credentials found across 382 commits."
            ],
            exitCode: 0
          }
        ]
      },
      {
        id: "stg-2",
        name: "Security & Vulnerability Scan",
        status: "success",
        durationMs: 82000,
        steps: [
          {
            id: "stp-2-1",
            name: "Trivy Container Scan",
            command: "trivy image --severity HIGH,CRITICAL devpulse/backend:latest",
            status: "success",
            durationMs: 38000,
            logs: [
              "[INFO] Downloading vulnerability database (v2.18)...",
              "[INFO] Scanning image layers for OS packages and language libraries...",
              "[SUCCESS] Scanned 482 components: 0 CRITICAL, 0 HIGH vulnerabilities."
            ],
            exitCode: 0
          },
          {
            id: "stp-2-2",
            name: "OPA Rego Policy Enforcement",
            command: "opa eval --data policies/opa/ --input k8s/manifests/production/",
            status: "success",
            durationMs: 22000,
            logs: [
              "[INFO] Evaluating 24 Kubernetes guardrail rules against production manifests...",
              "[PASS] Rule: k8s.disallow_privileged_containers",
              "[PASS] Rule: k8s.require_resource_limits",
              "[PASS] Rule: k8s.enforce_read_only_root_filesystem",
              "[SUCCESS] 100% Policy Compliance."
            ],
            exitCode: 0
          },
          {
            id: "stp-2-3",
            name: "Checkov IaC Audit",
            command: "checkov -d iac/terraform/aws",
            status: "success",
            durationMs: 22000,
            logs: [
              "[INFO] Running Checkov static code analysis across AWS Terraform modules...",
              "[SUCCESS] Passed 86 checks, 0 failed checks."
            ],
            exitCode: 0
          }
        ]
      },
      {
        id: "stg-3",
        name: "Unit & Integration Tests",
        status: "success",
        durationMs: 110000,
        steps: [
          {
            id: "stp-3-1",
            name: "Backend Unit Tests",
            command: "npm --prefix backend test",
            status: "success",
            durationMs: 48000,
            logs: [
              "[TEST] PipelineEngine.test.ts: 18 passed",
              "[TEST] KubernetesManager.test.ts: 24 passed",
              "[TEST] IaCDriftEngine.test.ts: 16 passed",
              "[SUCCESS] 58 backend tests passed in 4.8s."
            ],
            exitCode: 0
          },
          {
            id: "stp-3-2",
            name: "Frontend Vitest Suite",
            command: "npm --prefix frontend test:ci",
            status: "success",
            durationMs: 34000,
            logs: [
              "[TEST] PipelineGraph.test.tsx: 12 passed",
              "[TEST] PullRequestViewer.test.tsx: 16 passed",
              "[TEST] K8sPodTerminal.test.tsx: 14 passed",
              "[SUCCESS] 42 UI components validated."
            ],
            exitCode: 0
          },
          {
            id: "stp-3-3",
            name: "Code Coverage Check",
            command: "c8 check-coverage --lines 90",
            status: "success",
            durationMs: 28000,
            logs: [
              "Lines      : 94.8% ( 4210/4440 )",
              "Statements : 93.6% ( 4890/5224 )",
              "Functions  : 96.1% ( 890/926 )",
              "Branches   : 91.2% ( 1120/1228 )",
              "[SUCCESS] Code coverage threshold satisfied (>90%)."
            ],
            exitCode: 0
          }
        ]
      },
      {
        id: "stg-4",
        name: "Build & Containerize",
        status: "success",
        durationMs: 95000,
        steps: [
          {
            id: "stp-4-1",
            name: "Docker Multi-stage Build",
            command: "docker buildx build --platform linux/amd64,linux/arm64 -t devpulse:v1.2.0 .",
            status: "success",
            durationMs: 70000,
            logs: [
              "[DOCKER] Step 1/14 : FROM node:20-alpine AS builder",
              "[DOCKER] Step 6/14 : RUN npm run build",
              "[DOCKER] Step 12/14 : COPY --from=builder /app/dist ./dist",
              "[SUCCESS] Exported multi-arch manifest: sha256:8f4c2810a0"
            ],
            exitCode: 0
          },
          {
            id: "stp-4-2",
            name: "Cosign Container Sign",
            command: "cosign sign --key k8s/cosign.key devpulse:v1.2.0",
            status: "success",
            durationMs: 25000,
            logs: [
              "[INFO] Signing container artifact with hardware security key...",
              "[SUCCESS] Cryptographic signature pushed to OCI registry."
            ],
            exitCode: 0
          }
        ]
      },
      {
        id: "stg-5",
        name: "Deploy to Staging",
        status: "success",
        durationMs: 65000,
        steps: [
          {
            id: "stp-5-1",
            name: "Helm Upgrade Staging",
            command: "helm upgrade --install devpulse-stage k8s/helm/devpulse -f k8s/helm/devpulse/values-stage.yaml",
            status: "success",
            durationMs: 35000,
            logs: [
              "Release \"devpulse-stage\" has been upgraded. Happy Helming!",
              "STATUS: deployed",
              "REVISION: 42"
            ],
            exitCode: 0
          },
          {
            id: "stp-5-2",
            name: "Wait for Pod Readiness",
            command: "kubectl rollout status deployment/devpulse-stage-backend -n staging --timeout=120s",
            status: "success",
            durationMs: 30000,
            logs: [
              "Waiting for deployment \"devpulse-stage-backend\" rollout to finish: 0 of 3 updated replicas are available...",
              "Waiting for deployment \"devpulse-stage-backend\" rollout to finish: 3 of 3 updated replicas are available...",
              "deployment \"devpulse-stage-backend\" successfully rolled out."
            ],
            exitCode: 0
          }
        ]
      },
      {
        id: "stg-6",
        name: "Production Approval & Canary",
        status: "success",
        durationMs: 128000,
        approvedBy: "sarah-devops",
        steps: [
          {
            id: "stp-6-1",
            name: "ArgoCD Canary Sync",
            command: "argocd app sync devpulse-prod --strategy canary --weight 20",
            status: "success",
            durationMs: 38000,
            logs: [
              "[ARGOCD] Synchronizing desired state to cluster 'prod-us-east-1'...",
              "[ARGOCD] Shifted 20% ingress traffic to Canary release v1.2.0."
            ],
            exitCode: 0
          },
          {
            id: "stp-6-2",
            name: "Automated Metric Gate",
            command: "python scripts/sre/latency_analyzer.py --threshold-p99-ms 150",
            status: "success",
            durationMs: 60000,
            logs: [
              "[SRE] Analyzing 5-minute Prometheus window for error spikes and latency degradation...",
              "[SRE] Error Rate: 0.002% (Threshold: < 0.1%)",
              "[SRE] P99 Latency: 42.1ms (Threshold: < 150ms)",
              "[SUCCESS] Canary health score: 99.8%. Promoting to 100%."
            ],
            exitCode: 0
          },
          {
            id: "stp-6-3",
            name: "Full Rollout Promotion",
            command: "argocd app sync devpulse-prod --strategy canary --weight 100",
            status: "success",
            durationMs: 30000,
            logs: [
              "[ARGOCD] Promoting canary deployment to 100% traffic.",
              "[SUCCESS] DevPulse v1.2.0 is live in production."
            ],
            exitCode: 0
          }
        ]
      }
    ],
    artifacts: [
      {
        name: "devpulse-v1.2.0-linux-amd64.tar.gz",
        sizeBytes: 48920100,
        url: "https://artifacts.devpulse.internal/releases/v1.2.0/devpulse-amd64.tar.gz",
        type: "Container Image Artifact"
      },
      {
        name: "trivy-security-report.json",
        sizeBytes: 184500,
        url: "https://artifacts.devpulse.internal/security/scan-9842.json",
        type: "Security Audit"
      }
    ]
  }
];
