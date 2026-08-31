export type PodStatus = 'Running' | 'Pending' | 'Failed' | 'Succeeded' | 'CrashLoopBackOff';

export interface K8sPod {
  name: string;
  namespace: string;
  status: PodStatus;
  restarts: number;
  cpuUsageMilli: number;
  memoryUsageMiB: number;
  cpuLimitMilli: number;
  memoryLimitMiB: number;
  ip: string;
  node: string;
  age: string;
  labels: Record<string, string>;
  containers: Array<{
    name: string;
    image: string;
    ready: boolean;
    restartCount: number;
  }>;
}

export interface K8sDeployment {
  name: string;
  namespace: string;
  replicasDesired: number;
  replicasReady: number;
  replicasUpdated: number;
  strategy: 'RollingUpdate' | 'Recreate';
  image: string;
  age: string;
  status: 'Healthy' | 'Progressing' | 'Degraded';
}

export interface K8sService {
  name: string;
  namespace: string;
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer' | 'ExternalName';
  clusterIP: string;
  externalIP?: string;
  ports: Array<{ port: number; targetPort: number | string; protocol: string }>;
}

export interface K8sCluster {
  id: string;
  name: string;
  provider: 'AWS-EKS' | 'GCP-GKE' | 'Azure-AKS' | 'On-Prem-K8s';
  region: string;
  version: string;
  nodeCount: number;
  status: 'Connected' | 'Degraded' | 'Offline';
  totalCpuCores: number;
  usedCpuCores: number;
  totalMemoryGiB: number;
  usedMemoryGiB: number;
  namespaces: string[];
}
