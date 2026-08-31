const BASE_URL = '/api';

export const api = {
  // Pipelines
  async getPipelines() {
    const res = await fetch(`${BASE_URL}/pipelines/runs`);
    return res.json();
  },
  async getPipelineDefinitions() {
    const res = await fetch(`${BASE_URL}/pipelines/definitions`);
    return res.json();
  },
  async triggerPipeline(pipelineId: string, branch = 'main', environment = 'production') {
    const res = await fetch(`${BASE_URL}/pipelines/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pipelineId, branch, environment })
    });
    return res.json();
  },
  async approveStage(runId: string, stageId: string, approver = 'sarah-devops') {
    const res = await fetch(`${BASE_URL}/pipelines/runs/${runId}/stages/${stageId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approver })
    });
    return res.json();
  },

  // Pull Requests
  async getPullRequests(status?: string) {
    const url = status ? `${BASE_URL}/pull-requests?status=${status}` : `${BASE_URL}/pull-requests`;
    const res = await fetch(url);
    return res.json();
  },
  async getClosedPullRequests() {
    const res = await fetch(`${BASE_URL}/pull-requests/closed`);
    return res.json();
  },
  async createPullRequest(data: any) {
    const res = await fetch(`${BASE_URL}/pull-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async mergePullRequest(id: number, merger = 'sarah-devops') {
    const res = await fetch(`${BASE_URL}/pull-requests/${id}/merge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merger })
    });
    return res.json();
  },

  // Kubernetes
  async getK8sClusters() {
    const res = await fetch(`${BASE_URL}/kubernetes/clusters`);
    return res.json();
  },
  async getK8sPods(namespace?: string) {
    const url = namespace ? `${BASE_URL}/kubernetes/pods?namespace=${namespace}` : `${BASE_URL}/kubernetes/pods`;
    const res = await fetch(url);
    return res.json();
  },
  async getK8sDeployments() {
    const res = await fetch(`${BASE_URL}/kubernetes/deployments`);
    return res.json();
  },
  async getPodLogs(podName: string) {
    const res = await fetch(`${BASE_URL}/kubernetes/pods/${podName}/logs`);
    return res.json();
  },
  async restartDeployment(name: string, namespace = 'devpulse-prod') {
    const res = await fetch(`${BASE_URL}/kubernetes/deployments/${name}/restart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ namespace })
    });
    return res.json();
  },

  // IaC Terraform
  async getIaCWorkspaces() {
    const res = await fetch(`${BASE_URL}/iac/workspaces`);
    return res.json();
  },
  async runDriftCheck(workspaceId: string) {
    const res = await fetch(`${BASE_URL}/iac/workspaces/${workspaceId}/drift-check`, {
      method: 'POST'
    });
    return res.json();
  },
  async reconcileDrift(workspaceId: string, resourceId: string) {
    const res = await fetch(`${BASE_URL}/iac/workspaces/${workspaceId}/resources/${resourceId}/reconcile`, {
      method: 'POST'
    });
    return res.json();
  },

  // Observability
  async getMetrics() {
    const res = await fetch(`${BASE_URL}/observability/metrics`);
    return res.json();
  },
  async getAlerts() {
    const res = await fetch(`${BASE_URL}/observability/alerts`);
    return res.json();
  },
  async acknowledgeAlert(id: string) {
    const res = await fetch(`${BASE_URL}/observability/alerts/${id}/acknowledge`, { method: 'POST' });
    return res.json();
  },
  async resolveAlert(id: string) {
    const res = await fetch(`${BASE_URL}/observability/alerts/${id}/resolve`, { method: 'POST' });
    return res.json();
  },
  async getIncidents() {
    const res = await fetch(`${BASE_URL}/observability/incidents`);
    return res.json();
  },

  // Security & Policies
  async getPolicies() {
    const res = await fetch(`${BASE_URL}/security/policies`);
    return res.json();
  },
  async getVulnerabilities() {
    const res = await fetch(`${BASE_URL}/security/vulnerabilities`);
    return res.json();
  },
  async getAuditLogs() {
    const res = await fetch(`${BASE_URL}/security/audit-logs`);
    return res.json();
  }
};
