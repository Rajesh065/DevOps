import { mockK8sClusters, mockK8sPods, mockK8sDeployments, mockK8sServices } from '../mockData/kubernetesData.js';
import { K8sCluster, K8sPod, K8sDeployment, K8sService } from '../types/kubernetes.types.js';

export class KubernetesClusterManager {
  private clusters: K8sCluster[] = [...mockK8sClusters];
  private pods: K8sPod[] = [...mockK8sPods];
  private deployments: K8sDeployment[] = [...mockK8sDeployments];
  private services: K8sService[] = [...mockK8sServices];

  public getClusters(): K8sCluster[] {
    return this.clusters;
  }

  public getPods(namespace?: string): K8sPod[] {
    if (namespace && namespace !== 'all') {
      return this.pods.filter(p => p.namespace === namespace);
    }
    return this.pods;
  }

  public getDeployments(namespace?: string): K8sDeployment[] {
    if (namespace && namespace !== 'all') {
      return this.deployments.filter(d => d.namespace === namespace);
    }
    return this.deployments;
  }

  public getServices(namespace?: string): K8sService[] {
    if (namespace && namespace !== 'all') {
      return this.services.filter(s => s.namespace === namespace);
    }
    return this.services;
  }

  public restartDeployment(name: string, namespace: string): { success: boolean; message: string } {
    const dep = this.deployments.find(d => d.name === name && d.namespace === namespace);
    if (!dep) {
      throw new Error(`Deployment ${name} in namespace ${namespace} not found`);
    }

    dep.replicasUpdated = 0;
    dep.status = 'Progressing';

    setTimeout(() => {
      dep.replicasUpdated = dep.replicasDesired;
      dep.status = 'Healthy';
    }, 2000);

    return {
      success: true,
      message: `Restarted deployment ${name} (RollingUpdate initiated)`
    };
  }

  public getPodLogs(podName: string): string[] {
    return [
      `[${new Date().toISOString()}] [INFO] Container entrypoint initialized with PID 1`,
      `[${new Date().toISOString()}] [INFO] Connecting to internal cluster service discovery...`,
      `[${new Date().toISOString()}] [INFO] Redis cache connected at 10.244.1.18:6379`,
      `[${new Date().toISOString()}] [INFO] PostgreSQL connection pool active: 20 max connections`,
      `[${new Date().toISOString()}] [HTTP] GET /api/health HTTP/1.1 200 OK 2.4ms`,
      `[${new Date().toISOString()}] [HTTP] GET /api/telemetry/metrics HTTP/1.1 200 OK 1.8ms`,
      `[${new Date().toISOString()}] [INFO] Health check probed by kubelet: Status=OK`
    ];
  }
}
