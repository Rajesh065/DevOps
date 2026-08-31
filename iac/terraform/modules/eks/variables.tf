variable "cluster_name" {
  type        = string
  description = "Name of the EKS Cluster"
  default     = "devpulse-eks"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "prod"
}

variable "kubernetes_version" {
  type        = string
  description = "Kubernetes control plane version"
  default     = "1.30"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where the cluster will be deployed"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs for EKS nodes"
}

variable "instance_types" {
  type        = list(string)
  description = "EC2 instance types for EKS worker nodes"
  default     = ["m6i.2xlarge", "m6i.xlarge"]
}

variable "desired_capacity" {
  type        = number
  description = "Desired number of worker nodes"
  default     = 6
}

variable "min_capacity" {
  type        = number
  description = "Minimum number of worker nodes"
  default     = 3
}

variable "max_capacity" {
  type        = number
  description = "Maximum number of worker nodes"
  default     = 18
}

variable "capacity_type" {
  type        = string
  description = "Capacity type for worker nodes (ON_DEMAND or SPOT)"
  default     = "ON_DEMAND"
}

variable "tags" {
  type        = map(string)
  description = "Resource tags"
  default = {
    ManagedBy = "Terraform"
    Project   = "DevPulse"
  }
}
