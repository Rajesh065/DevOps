# DevPulse - Enterprise Architecture & System Overview

## 1. High-Level Architecture
DevPulse operates as an Internal Developer Platform (IDP) and GitOps control plane. It coordinates multi-cloud infrastructure, CI/CD DAG pipelines, Kubernetes workloads, policy enforcement, and live SRE telemetry.

```
+-------------------------------------------------------------------------+
|                         DevPulse Web Client                             |
|         (React 18 + Vite + TypeScript + Tailwind + WebSocket)          |
+------------------------------------+------------------------------------+
                                     |
                         HTTPS / WSS | (REST API & Real-time Metrics)
                                     v
+-------------------------------------------------------------------------+
|                     Core API Gateway (Express / Node.js)                |
|  - JWT Authentication & RBAC Engine                                     |
|  - WebSocket Telemetry Broadcaster                                      |
|  - Audit Log & Event Stream                                             |
+--------+----------------+----------------+----------------+-------------+
         |                |                |                |
         v                v                v                v
+----------------+ +--------------+ +--------------+ +--------------------+
| Pipeline Engine| |GitOps / PR   | | Kubernetes   | | IaC & Drift Engine |
| - DAG Scheduler| |  Gatekeeper  | | Cluster Mgr  | | - State Parser     |
| - Step Runners | | - Trivy Scan | | - AWS EKS    | | - Diff Visualizer  |
| - Live Logs    | | - OPA Rego   | | - GCP GKE    | | - Cost Optimizer   |
| - Artifacts    | | - Merged PRs | | - Azure AKS  | | - Auto-Reconcile   |
+----------------+ +--------------+ +--------------+ +--------------------+
```

## 2. CI/CD Pipeline Directed Acyclic Graph (DAG)
Pipelines are modeled as dependency graphs (`PipelineStage` -> `PipelineStep`). Each stage can execute concurrently or block on upstream dependencies and approval gates.

## 3. Pull Request & GitOps Gatekeeper Lifecycle
1. Pull request creation triggers automated check runs:
   - Secret scan via GitLeaks.
   - Container vulnerability scan via Trivy.
   - Policy-as-Code audit via OPA Rego.
   - Vitest & backend automated unit tests.
2. Once required checks pass and authorized peer reviews sign off, the PR is merged into `main`.
3. Merged PRs automatically trigger ArgoCD GitOps synchronizations to target clusters.

## 4. Multi-Cloud Kubernetes & IaC Drift Management
- Supports multi-cluster management spanning AWS EKS, GCP GKE, and Azure AKS.
- Real-time Pod lifecycle and container log inspection.
- Terraform state tracking detects live configuration drift against repository HCL baselines and facilitates one-click automated reconciliation.
