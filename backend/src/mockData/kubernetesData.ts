import { K8sCluster, K8sPod, K8sDeployment, K8sService } from '../types/kubernetes.types.js';

export const mockK8sClusters: K8sCluster[] = [
  {
    id: "cls-aws-prod",
    name: "production-us-east-1-eks",
    provider: "AWS-EKS",
    region: "us-east-1",
    version: "v1.30.2",
    nodeCount: 18,
    status: "Connected",
    totalCpuCores: 144,
    usedCpuCores: 82.4,
    totalMemoryGiB: 576,
    usedMemoryGiB: 342.8,
    namespaces: ["default", "kube-system", "devpulse-prod", "monitoring", "ingress-nginx", "security"]
  },
  {
    id: "cls-gcp-stage",
    name: "staging-europe-west1-gke",
    provider: "GCP-GKE",
    region: "europe-west1",
    version: "v1.30.1",
    nodeCount: 8,
    status: "Connected",
    totalCpuCores: 64,
    usedCpuCores: 28.1,
    totalMemoryGiB: 256,
    usedMemoryGiB: 98.4,
    namespaces: ["default", "kube-system", "devpulse-stage", "monitoring"]
  },
  {
    id: "cls-azure-dr",
    name: "dr-westus2-aks",
    provider: "Azure-AKS",
    region: "westus2",
    version: "v1.29.6",
    nodeCount: 6,
    status: "Connected",
    totalCpuCores: 48,
    usedCpuCores: 12.0,
    totalMemoryGiB: 192,
    usedMemoryGiB: 44.5,
    namespaces: ["default", "devpulse-dr", "kube-system"]
  }
];

export const mockK8sPods: K8sPod[] = [
  {
    name: "devpulse-backend-78b499f57d-xk91m",
    namespace: "devpulse-prod",
    status: "Running",
    restarts: 0,
    cpuUsageMilli: 180,
    memoryUsageMiB: 340,
    cpuLimitMilli: 1000,
    memoryLimitMiB: 1024,
    ip: "10.244.3.42",
    node: "ip-10-0-12-84.ec2.internal",
    age: "4d 12h",
    labels: { app: "devpulse-backend", env: "production", version: "v1.2.0" },
    containers: [
      { name: "core-api", image: "registry.devpulse.internal/backend:v1.2.0", ready: true, restartCount: 0 }
    ]
  },
  {
    name: "devpulse-backend-78b499f57d-q92pz",
    namespace: "devpulse-prod",
    status: "Running",
    restarts: 0,
    cpuUsageMilli: 165,
    memoryUsageMiB: 328,
    cpuLimitMilli: 1000,
    memoryLimitMiB: 1024,
    ip: "10.244.5.11",
    node: "ip-10-0-14-19.ec2.internal",
    age: "4d 12h",
    labels: { app: "devpulse-backend", env: "production", version: "v1.2.0" },
    containers: [
      { name: "core-api", image: "registry.devpulse.internal/backend:v1.2.0", ready: true, restartCount: 0 }
    ]
  },
  {
    name: "devpulse-frontend-5df678c94-8n1kx",
    namespace: "devpulse-prod",
    status: "Running",
    restarts: 0,
    cpuUsageMilli: 45,
    memoryUsageMiB: 92,
    cpuLimitMilli: 500,
    memoryLimitMiB: 512,
    ip: "10.244.2.18",
    node: "ip-10-0-11-204.ec2.internal",
    age: "4d 12h",
    labels: { app: "devpulse-frontend", env: "production" },
    containers: [
      { name: "web-ui", image: "registry.devpulse.internal/frontend:v1.2.0", ready: true, restartCount: 0 }
    ]
  },
  {
    name: "prometheus-server-64fbc4db6f-w79kl",
    namespace: "monitoring",
    status: "Running",
    restarts: 0,
    cpuUsageMilli: 420,
    memoryUsageMiB: 1850,
    cpuLimitMilli: 2000,
    memoryLimitMiB: 4096,
    ip: "10.244.1.99",
    node: "ip-10-0-10-52.ec2.internal",
    age: "28d 4h",
    labels: { app: "prometheus", component: "server" },
    containers: [
      { name: "prometheus", image: "prom/prometheus:v2.45.0", ready: true, restartCount: 0 }
    ]
  },
  {
    name: "opa-gatekeeper-controller-manager-56c4d7bb8d-m9r12",
    namespace: "security",
    status: "Running",
    restarts: 0,
    cpuUsageMilli: 85,
    memoryUsageMiB: 210,
    cpuLimitMilli: 500,
    memoryLimitMiB: 512,
    ip: "10.244.4.77",
    node: "ip-10-0-13-101.ec2.internal",
    age: "14d 6h",
    labels: { "control-plane": "controller-manager", "gatekeeper.sh/operation": "webhook" },
    containers: [
      { name: "manager", image: "openpolicyagent/gatekeeper:v3.15.0", ready: true, restartCount: 0 }
    ]
  }
];

export const mockK8sDeployments: K8sDeployment[] = [
  {
    name: "devpulse-backend",
    namespace: "devpulse-prod",
    replicasDesired: 3,
    replicasReady: 3,
    replicasUpdated: 3,
    strategy: "RollingUpdate",
    image: "registry.devpulse.internal/backend:v1.2.0",
    age: "4d 12h",
    status: "Healthy"
  },
  {
    name: "devpulse-frontend",
    namespace: "devpulse-prod",
    replicasDesired: 2,
    replicasReady: 2,
    replicasUpdated: 2,
    strategy: "RollingUpdate",
    image: "registry.devpulse.internal/frontend:v1.2.0",
    age: "4d 12h",
    status: "Healthy"
  },
  {
    name: "opa-gatekeeper-controller-manager",
    namespace: "security",
    replicasDesired: 2,
    replicasReady: 2,
    replicasUpdated: 2,
    strategy: "RollingUpdate",
    image: "openpolicyagent/gatekeeper:v3.15.0",
    age: "14d 6h",
    status: "Healthy"
  }
];

export const mockK8sServices: K8sService[] = [
  {
    name: "devpulse-backend-svc",
    namespace: "devpulse-prod",
    type: "ClusterIP",
    clusterIP: "172.20.140.88",
    ports: [{ port: 4000, targetPort: 4000, protocol: "TCP" }]
  },
  {
    name: "devpulse-frontend-svc",
    namespace: "devpulse-prod",
    type: "LoadBalancer",
    clusterIP: "172.20.210.14",
    externalIP: "a98421098.us-east-1.elb.amazonaws.com",
    ports: [{ port: 80, targetPort: 80, protocol: "TCP" }, { port: 443, targetPort: 443, protocol: "TCP" }]
  }
];
