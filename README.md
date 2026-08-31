# DevPulse - Enterprise DevOps & Infrastructure Orchestrator

DevPulse is a comprehensive, production-grade DevOps Internal Developer Platform (IDP) and Infrastructure Management System. It unites Continuous Integration & Continuous Delivery (CI/CD) pipelines, Kubernetes Cluster Management, Infrastructure as Code (Terraform & Helm), GitOps Pull Request Gatekeepers, Policy as Code (OPA Rego), and Observability & Telemetry monitoring into a unified control plane.

---

## 🌟 Key Features

1. **CI/CD Pipeline Engine**:
   - Directed Acyclic Graph (DAG) visualizer for multi-stage pipelines (Build, Test, Security Scan, IaC Plan, Deploy, Smoke Test).
   - Real-time job status streaming and live log aggregation.
   - Manual approval gates, automated rollbacks, and artifact registries.

2. **GitOps & Pull Request Gatekeeper**:
   - Comprehensive PR analyzer tracking static analysis, security vulnerabilities, OPA compliance, unit test coverage, and IaC drift.
   - Automated merge protection rules and closed PR audit trail with full git commit history.

3. **Kubernetes Cluster Explorer**:
   - Multi-cluster management (EKS, GKE, AKS, On-Prem).
   - Real-time pod lifecycle, deployments, statefulsets, daemonsets, HPA, ingress rules, and config maps.
   - Integrated terminal simulator and live pod log stream.

4. **Infrastructure as Code (IaC) & Terraform Manager**:
   - Visual topology map of cloud infrastructure across AWS, Azure, and GCP.
   - Terraform state explorer, drift detection simulator, and cost optimization advisor.
   - Plan vs. Apply diff visualizer.

5. **Observability & SRE Operations**:
   - Real-time Prometheus metrics (CPU, Memory, Network I/O, Error Rates, Latency p95/p99).
   - Alert Manager with severity triage (Critical, Warning, Info) and automated PagerDuty/Slack routing.
   - Incident postmortem logs, SLA/SLO tracking, and MTTR/MTTD analytics.

6. **Policy as Code & DevSecOps**:
   - Open Policy Agent (OPA) Rego policy validation engine.
   - Container image vulnerability scanning (Trivy) and IaC security audits (Checkov).

---

## 📂 Project Architecture

```
deveops/
├── frontend/                     # React 18 + Vite + TypeScript + Tailwind CSS UI
│   ├── src/
│   │   ├── components/           # Reusable UI components & layouts
│   │   ├── pages/                # Pipelines, PRs, K8s, IaC, Observability, Security
│   │   ├── services/             # API and WebSocket clients
│   │   └── types/                # Strict TypeScript interfaces
├── backend/                      # Node.js + Express + TypeScript Core API Gateway
│   ├── src/
│   │   ├── controllers/          # Business logic handlers
│   │   ├── services/             # Pipeline runner, IaC drift, K8s & GitOps engines
│   │   ├── routes/               # Modular REST endpoints
│   │   ├── middleware/           # Auth, RBAC, Rate limiting, Error handler
│   │   └── mockData/             # Enterprise telemetry, clusters, and PR datasets
├── iac/                          # Multi-Cloud Infrastructure as Code
│   ├── terraform/                # AWS, GCP, Azure, and reusable Terraform modules
│   └── ansible/                  # Server configuration, K8s bootstrap, and hardening
├── k8s/                          # Kubernetes Manifests & Helm Charts
│   ├── helm/devpulse/            # Production Helm chart with values and templates
│   └── manifests/                # Kustomize base & overlay manifests
├── pipelines/                    # Multi-Platform CI/CD Pipelines
│   ├── github-actions/           # Enterprise GitHub Actions workflows
│   ├── gitlab-ci/                # GitLab CI/CD pipeline definitions
│   ├── argocd/                   # ArgoCD GitOps Application & App-of-Apps
│   ├── jenkins/                  # Declarative Jenkinsfiles
│   └── tekton/                   # Cloud-native Tekton Tasks and Pipelines
├── policies/                     # Policy as Code
│   ├── opa/                      # OPA Rego security, networking & compliance rules
│   ├── trivy/                    # Container scanning policies
│   └── checkov/                  # Static IaC security rules
├── scripts/                      # SRE, Chaos Engineering & Automation Tooling
│   ├── chaos/                    # Chaos monkey & latency injection tools
│   ├── automation/               # Cluster backup, secret rotation & DB failover
│   └── sre/                      # Health checks, latency analyzers & log scrubbers
└── docs/                         # Architecture specifications, runbooks, and API guides
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or yarn

### Quick Start

1. **Install Root Dependencies**:
   ```bash
   npm run setup
   ```

2. **Start Backend & Frontend Concurrently**:
   ```bash
   npm run dev
   ```

3. **Access the Web Platform**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.
   - Backend API runs at [http://localhost:4000/api](http://localhost:4000/api)
   - Real-time WebSocket connects on `ws://localhost:4000`

---

## 📜 Closed Pull Requests Audit Trail

This repository is maintained following strict GitOps conventions. Major features were delivered across dedicated pull requests with automated security checks, unit test gates, and signed-off reviews:

- `PR #101`: Core API Gateway, JWT Authentication & RBAC Engine (Merged)
- `PR #102`: Pipeline DAG Orchestration & Real-time Log Streaming (Merged)
- `PR #103`: Multi-Cloud Terraform Modules & State Drift Engine (Merged)
- `PR #104`: Kubernetes Cluster Explorer & Helm Chart Engine (Merged)
- `PR #105`: GitOps PR Gatekeeper, Security Scanners & OPA Policies (Merged)
- `PR #106`: Observability Telemetry Hub, Alert Manager & Incident Center (Merged)
- `PR #107`: SRE Automation Suite & Chaos Engineering Tooling (Merged)
- `PR #108`: Enterprise Frontend UI Dashboard & Monaco Integration (Merged)

---

## 🛡️ License
Licensed under the Apache 2.0 License.
