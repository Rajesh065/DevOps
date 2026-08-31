variable "environment" {
  type        = string
  description = "Target deployment environment (dev, staging, prod)"
  default     = "prod"
}

variable "cluster_name" {
  type        = string
  description = "EKS Cluster Name for subnet tagging"
  default     = "devpulse-eks"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of AWS Availability Zones"
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "CIDR blocks for private subnets"
  default     = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]
}

variable "enable_nat_gateway" {
  type        = bool
  description = "Whether to provision a NAT gateway for private egress"
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "Resource tags"
  default = {
    ManagedBy = "Terraform"
    Project   = "DevPulse"
  }
}
