package devpulse.supplychain.admission

# Gatekeeper Policy: Deny unverified or unsigned container images in production Kubernetes clusters
default allow_deployment = false

allow_deployment {
    input.image_signature_verified == true
    input.slsa_level == "SLSA_LEVEL_3"
    input.sbom_vulnerabilities.critical == 0
}
