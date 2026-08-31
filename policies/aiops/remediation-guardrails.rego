package devpulse.aiops.guardrails

# Security guardrails for autonomous SRE & AIOps remediations
default allow_auto_remediation = false

# Allow automated remediation if confidence exceeds 90% and impact radius is non-critical
allow_auto_remediation {
    input.confidence_score >= 0.90
    not is_restricted_production_namespace
    not requires_manual_signoff
}

is_restricted_production_namespace {
    input.namespace == "kube-system"
}

is_restricted_production_namespace {
    input.namespace == "vault-secrets"
}

requires_manual_signoff {
    input.action == "DELETE_DATABASE_VOLUME"
}

requires_manual_signoff {
    input.action == "FORCE_FLUSH_TRANSACTION_LOGS"
}
