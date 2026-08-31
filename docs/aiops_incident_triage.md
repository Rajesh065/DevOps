# DevPulse AIOps Root Cause Analyzer & Automated Remediation

## Overview
DevPulse AIOps leverages multimodal telemetry correlation (metrics, OpenTelemetry traces, and structured error logs) to reduce Mean Time to Detect (MTTD) and Mean Time to Resolution (MTTR) from hours to seconds.

## Architecture
- **Z-Score Anomaly Correlator**: Detects statistical deviations in Prometheus time-series metrics.
- **Trace Dependency Graph Mapper**: Identifies upstream and downstream cascading failures across microservices.
- **Autonomous Remediation Loop**: Evaluates confidence thresholds against OPA security policies before applying automatic scaling, circuit breaking, or pod restarts.

## Endpoints
- `GET /api/aiops/incidents`: Retrieve active incidents with correlated anomaly payloads.
- `POST /api/aiops/analyze`: Trigger automated root-cause analysis on a reporting service.
- `POST /api/aiops/incidents/:id/remediate`: Execute verified autonomous remediation playbook.
