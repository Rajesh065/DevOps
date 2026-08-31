output "cluster_id" {
  value       = aws_eks_cluster.this.id
  description = "The ID of the EKS Cluster"
}

output "cluster_endpoint" {
  value       = aws_eks_cluster.this.endpoint
  description = "Endpoint for EKS control plane API"
}

output "cluster_certificate_authority_data" {
  value       = aws_eks_cluster.this.certificate_authority[0].data
  description = "Base64 encoded certificate data required to communicate with cluster"
}

output "cluster_security_group_id" {
  value       = aws_security_group.cluster.id
  description = "Security group ID attached to the EKS control plane"
}

output "node_group_arn" {
  value       = aws_eks_node_group.this.arn
  description = "Amazon Resource Name of the worker node group"
}
