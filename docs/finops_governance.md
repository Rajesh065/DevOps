# DevPulse FinOps Cloud Cost Governance & Unit Economics

## Overview
DevPulse FinOps platform delivers real-time cost visibility, multi-cloud cost allocation across AWS, GCP, and Azure, unattached resource reclamation, and automated anomaly guardrails.

## Features
1. **Multi-Cloud Spend Aggregation**: Centralized dashboard unifying billing across AWS EKS, GCP BigQuery, and Azure storage.
2. **Real-time Cost Anomaly Detection**: Instant identification of unindexed database queries or runaway NAT gateway egress charges.
3. **Rightsizing Recommendations**: Machine learning-backed suggestions for instance type migrations (e.g., x86 to Graviton ARM).
4. **Automated Guardrails**: Policy-driven reclamation of orphaned EBS volumes and idle load balancers.

## API Reference
- `GET /api/finops/summary`: Retrieve cloud budget utilization, provider breakdown, and rightsizing opportunities.
- `POST /api/finops/actions`: Trigger automated reclamation of idle cloud resources.
