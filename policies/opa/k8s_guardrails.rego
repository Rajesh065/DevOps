package kubernetes.security

# Disallow privileged containers
default allow = false

allow {
    not has_privileged_container
    not has_root_user
    has_required_labels
}

has_privileged_container {
    container := input.spec.containers[_]
    container.securityContext.privileged == true
}

has_root_user {
    container := input.spec.containers[_]
    container.securityContext.runAsUser == 0
}

has_required_labels {
    input.metadata.labels["app.kubernetes.io/name"]
}
