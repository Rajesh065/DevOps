# DevPulse - Enterprise Delivery Platform & IDP

DevPulse is a full-stack DevOps Internal Developer Platform and GitOps control plane that manages multi-cluster Kubernetes workloads, Terraform cloud state drift, CI/CD DAG pipelines, OPA Rego security guardrails, and real-time Prometheus telemetry.

---

## 🌟 Core Modules
- **CI/CD Pipeline Engine**: Directed Acyclic Graph (DAG) stage scheduler, manual approval gates, and live terminal log streaming.
- **Pull Request & GitOps Gatekeeper**: Automated PR lifecycle tracking Trivy security scans, Vitest coverage, OPA policy compliance, and commit history.
- **Kubernetes Multi-Cluster Explorer**: Cluster discovery across AWS EKS, GCP GKE, and Azure AKS, Pod lifecycle table, and container logs.
- **Infrastructure as Code (IaC)**: Terraform Cloud state tracking, configuration drift detection, and automated drift reconciliation.
- **Observability & SRE Incident Center**: Golden signals (CPU, Memory, RPS, P99 Latency), Prometheus alert rules, and incident timeline.
- **Policy as Code**: Open Policy Agent (OPA) Rego guardrails blocking privileged containers and enforcing resource limits.

---

## 🚀 Quick Start
```bash
# Install dependencies
npm run setup

# Run backend & frontend concurrently
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api

---

## 🛡️ License
Proprietary - DevPulse Platform Engineering. All rights reserved.
