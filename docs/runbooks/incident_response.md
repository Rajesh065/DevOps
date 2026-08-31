# SRE Incident Response Runbook

## Incident Triage Framework (SEV-1 to SEV-3)
1. **SEV-1 (Critical Outage)**:
   - Impact: > 5% user-facing error rate or complete cluster unreachability.
   - MTTD Target: < 2 minutes. MTTR Target: < 15 minutes.
   - Immediate Action: Trigger automatic canary rollback via ArgoCD.
2. **SEV-2 (Degraded Performance / Drift)**:
   - Impact: Latency p99 > 150ms or unauthorized security group drift.
   - Action: Execute one-click Terraform drift reconciliation via DevPulse IDP dashboard.
3. **SEV-3 (Minor Warning)**:
   - Impact: Pod resource memory threshold > 85%.
   - Action: HPA auto-scaler allocates extra pod replicas automatically.
