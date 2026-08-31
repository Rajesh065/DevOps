import React, { useState } from 'react';
import {
  Server,
  Box,
  RotateCw,
  Terminal as TerminalIcon,
  Layers,
  Cpu,
  HardDrive,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { K8sCluster, K8sPod } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { TerminalViewer } from '../components/TerminalViewer.js';
import { api } from '../services/api.js';

interface KubernetesExplorerProps {
  clusters: K8sCluster[];
  pods: K8sPod[];
  onRefresh: () => void;
}

export const KubernetesExplorer: React.FC<KubernetesExplorerProps> = ({ clusters, pods, onRefresh }) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(clusters[0]?.id || 'cls-aws-prod');
  const [selectedNamespace, setSelectedNamespace] = useState<string>('all');
  const [selectedPodName, setSelectedPodName] = useState<string>(pods[0]?.name || '');
  const [podLogs, setPodLogs] = useState<string[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const selectedCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];

  const filteredPods = pods.filter(p => {
    if (selectedNamespace === 'all') return true;
    return p.namespace === selectedNamespace;
  });

  const handleFetchPodLogs = async (podName: string) => {
    setSelectedPodName(podName);
    setLoadingLogs(true);
    try {
      const res = await api.getPodLogs(podName);
      setPodLogs(res.logs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleRestart = async (deploymentName: string) => {
    try {
      await api.restartDeployment(deploymentName, 'devpulse-prod');
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">Kubernetes Multi-Cluster Explorer</h2>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono border border-sky-500/30">
              3 Active Clusters
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time topology, Pod lifecycles, and interactive container terminal log aggregation across AWS EKS, GCP GKE, and Azure AKS.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="px-3 py-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-xs flex items-center gap-2 transition-colors self-start"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Sync Clusters</span>
        </button>
      </div>

      {/* Cluster Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((cls) => {
          const isSelected = selectedCluster?.id === cls.id;

          return (
            <div
              key={cls.id}
              onClick={() => setSelectedClusterId(cls.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#18233c] border-sky-500/80 shadow-lg shadow-sky-500/10'
                  : 'bg-[#131b2e] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 font-bold">{cls.provider}</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-0.5">{cls.name}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Region: {cls.region} • {cls.version}
                  </p>
                </div>
                <StatusBadge status={cls.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300">
                <div>
                  <span className="text-slate-400 text-[10px] block">Nodes</span>
                  <span>{cls.nodeCount} Worker Nodes</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Namespaces</span>
                  <span>{cls.namespaces.length} Namespaces</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Namespace Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-2">Namespace:</span>
        {['all', 'devpulse-prod', 'monitoring', 'security', 'kube-system'].map((ns) => (
          <button
            key={ns}
            onClick={() => setSelectedNamespace(ns)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              selectedNamespace === ns
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-[#131b2e] text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {ns}
          </button>
        ))}
      </div>

      {/* Pod Inventory & Pod Terminal Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pod Inventory Table */}
        <div className="lg:col-span-6 bg-[#131b2e] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Box className="w-4 h-4 text-sky-400" />
              <span>Pods ({filteredPods.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Click a pod to inspect logs</span>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredPods.map((pod) => {
              const isSelected = selectedPodName === pod.name;

              return (
                <div
                  key={pod.name}
                  onClick={() => handleFetchPodLogs(pod.name)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#18233c] border-sky-500/60 shadow-sm'
                      : 'bg-[#0f172a] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 font-mono line-clamp-1">
                        {pod.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Namespace: <span className="text-sky-300">{pod.namespace}</span> • IP: {pod.ip}
                      </p>
                    </div>
                    <StatusBadge status={pod.status} size="sm" />
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                    <span>CPU: {pod.cpuUsageMilli}m / {pod.cpuLimitMilli}m</span>
                    <span>RAM: {pod.memoryUsageMiB}MiB</span>
                    <span>Restarts: {pod.restarts}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pod Terminal Inspector */}
        <div className="lg:col-span-6">
          <TerminalViewer
            title={`Container Logs: ${selectedPodName || 'Select a pod'}`}
            logs={podLogs.length > 0 ? podLogs : [
              `[${new Date().toISOString()}] [INFO] Pod log streamer connected to kube-apiserver`,
              `[${new Date().toISOString()}] [INFO] Container devpulse-backend (ID: cri-o://8f4c2810) ready`,
              `[${new Date().toISOString()}] [HTTP] GET /api/health HTTP/1.1 200 OK`,
              `[${new Date().toISOString()}] [INFO] Stream is live and listening for events...`
            ]}
            height="h-[420px]"
          />
        </div>
      </div>
    </div>
  );
};
