import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { Sidebar } from './components/Sidebar.js';
import { DashboardOverview } from './pages/DashboardOverview.js';
import { PipelineViewer } from './pages/PipelineViewer.js';
import { PullRequestManager } from './pages/PullRequestManager.js';
import { KubernetesExplorer } from './pages/KubernetesExplorer.js';
import { IaCManager } from './pages/IaCManager.js';
import { ObservabilityCenter } from './pages/ObservabilityCenter.js';
import { SecurityPolicies } from './pages/SecurityPolicies.js';
import { api } from './services/api.js';
import { wsClient } from './services/websocket.js';
import {
  PipelineRun,
  PullRequest,
  K8sCluster,
  K8sPod,
  TerraformWorkspace,
  SystemMetricPoint,
  SystemAlert,
  OPAPolicy
} from './types/index.js';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [wsConnected, setWsConnected] = useState<boolean>(true);

  // Core Data States
  const [pipelines, setPipelines] = useState<PipelineRun[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [clusters, setClusters] = useState<K8sCluster[]>([]);
  const [pods, setPods] = useState<K8sPod[]>([]);
  const [workspaces, setWorkspaces] = useState<TerraformWorkspace[]>([]);
  const [metrics, setMetrics] = useState<SystemMetricPoint[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [policies, setPolicies] = useState<OPAPolicy[]>([]);
  const [liveMetric, setLiveMetric] = useState<SystemMetricPoint | null>(null);

  const fetchAllData = async () => {
    try {
      const [pipeRes, prRes, clsRes, podRes, iacRes, metRes, altRes, polRes] = await Promise.all([
        api.getPipelines(),
        api.getPullRequests(),
        api.getK8sClusters(),
        api.getK8sPods(),
        api.getIaCWorkspaces(),
        api.getMetrics(),
        api.getAlerts(),
        api.getPolicies()
      ]);

      if (pipeRes?.data) setPipelines(pipeRes.data);
      if (prRes?.data) setPullRequests(prRes.data);
      if (clsRes?.data) setClusters(clsRes.data);
      if (podRes?.data) setPods(podRes.data);
      if (iacRes?.data) setWorkspaces(iacRes.data);
      if (metRes?.data) setMetrics(metRes.data);
      if (altRes?.data) setAlerts(altRes.data);
      if (polRes?.data) setPolicies(polRes.data);
    } catch (err) {
      console.error('[DevPulse] Error loading initial state:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    wsClient.connect();

    const unsubMetrics = wsClient.subscribe('TELEMETRY_METRICS', (data: SystemMetricPoint) => {
      setLiveMetric(data);
      setMetrics((prev) => [...prev.slice(1), data]);
    });

    const unsubPipelines = wsClient.subscribe('PIPELINE_STATUS_UPDATE', (updatedRun: PipelineRun) => {
      setPipelines((prev) => {
        const index = prev.findIndex((p) => p.id === updatedRun.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = updatedRun;
          return next;
        }
        return [updatedRun, ...prev];
      });
    });

    const unsubPR = wsClient.subscribe('PR_MERGED', (mergedPr: PullRequest) => {
      setPullRequests((prev) => prev.map((p) => (p.id === mergedPr.id ? mergedPr : p)));
    });

    return () => {
      unsubMetrics();
      unsubPipelines();
      unsubPR();
    };
  }, []);

  const closedPrCount = pullRequests.filter((p) => p.status === 'closed' || p.status === 'merged').length;

  return (
    <div className="min-h-screen bg-[#0b101b] text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} wsConnected={wsConnected} closedPrCount={closedPrCount} />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} closedPrCount={closedPrCount} />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              pipelines={pipelines}
              pullRequests={pullRequests}
              clusters={clusters}
              liveMetric={liveMetric}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'pipelines' && (
            <PipelineViewer pipelines={pipelines} onRefresh={fetchAllData} />
          )}

          {activeTab === 'pull-requests' && (
            <PullRequestManager pullRequests={pullRequests} onRefresh={fetchAllData} />
          )}

          {activeTab === 'kubernetes' && (
            <KubernetesExplorer clusters={clusters} pods={pods} onRefresh={fetchAllData} />
          )}

          {activeTab === 'iac' && (
            <IaCManager workspaces={workspaces} onRefresh={fetchAllData} />
          )}

          {activeTab === 'observability' && (
            <ObservabilityCenter
              metrics={metrics}
              alerts={alerts}
              liveMetric={liveMetric}
              onRefresh={fetchAllData}
            />
          )}

          {activeTab === 'security' && (
            <SecurityPolicies policies={policies} />
          )}
        </main>
      </div>
    </div>
  );
};
