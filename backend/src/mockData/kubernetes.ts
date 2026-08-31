import { K8sCluster, K8sPod } from '../types';

export const mockClusters: K8sCluster[] = [
  {
    id: "cls-aws-prod",
    name: "aws-prod-us-east-1",
    provider: "AWS EKS",
    region: "us-east-1",
    version: "v1.29.4-eks",
    nodeCount: 12,
    status: "healthy",
    totalCpuCores: 96,
    usedCpuCores: 42,
    totalMemoryGiB: 384,
    usedMemoryGiB: 188,
    namespaces: ["default", "devpulse-prod", "monitoring", "security", "kube-system"]
  },
  {
    id: "cls-gcp-stage",
    name: "gcp-stage-us-central",
    provider: "GCP GKE",
    region: "us-central1-a",
    version: "v1.29.2-gke",
    nodeCount: 6,
    status: "healthy",
    totalCpuCores: 48,
    usedCpuCores: 18,
    totalMemoryGiB: 192,
    usedMemoryGiB: 74,
    namespaces: ["default", "devpulse-staging", "monitoring"]
  },
  {
    id: "cls-azure-dr",
    name: "azure-dr-westus2",
    provider: "Azure AKS",
    region: "westus2",
    version: "v1.29.3-aks",
    nodeCount: 4,
    status: "healthy",
    totalCpuCores: 32,
    usedCpuCores: 8,
    totalMemoryGiB: 128,
    usedMemoryGiB: 32,
    namespaces: ["default", "devpulse-dr"]
  }
];

export const mockPods: K8sPod[] = [
  {
    name: "devpulse-backend-api-7469fb9f9-x8k2l",
    namespace: "devpulse-prod",
    status: "running",
    restarts: 0,
    cpuUsageMilli: 180,
    memoryUsageMiB: 340,
    ip: "10.0.12.42",
    node: "ip-10-0-12-84.ec2.internal",
    age: "4d 18h",
    labels: { app: "devpulse-backend", tier: "api", env: "production" }
  },
  {
    name: "devpulse-backend-api-7469fb9f9-p9m4q",
    namespace: "devpulse-prod",
    status: "running",
    restarts: 0,
    cpuUsageMilli: 195,
    memoryUsageMiB: 355,
    ip: "10.0.12.43",
    node: "ip-10-0-12-85.ec2.internal",
    age: "4d 18h",
    labels: { app: "devpulse-backend", tier: "api", env: "production" }
  }
];
