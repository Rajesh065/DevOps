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
  AlertCircle,
  MoreVertical,
  Activity
} from 'lucide-react';
import { K8sCluster, K8sPod } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { TerminalViewer } from '../components/TerminalViewer';
import { api } from '../services/api';

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
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];

  const filteredPods = pods.filter(p => {
    const matchesNamespace = selectedNamespace === 'all' || p.namespace === selectedNamespace;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNamespace && matchesSearch;
  });

  const handleFetchPodLogs = async (podName: string) => {
    setSelectedPodName(podName);
    try {
      const res = await api.getPodLogs(podName);
      setPodLogs(res.logs || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header & Cluster Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
          <Server className="w-4 h-4 text-[#58a6ff]" />
          <span>Kubernetes Cluster Explorer</span>
          <span className="text-[#8b949e] font-normal font-mono text-xs">
            ({clusters.length} active contexts)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Cluster Context Tabs */}
          <div className="flex items-center bg-[#161b22] border border-[#30363d] p-0.5 rounded-md text-xs font-mono">
            {clusters.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClusterId(cls.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedCluster?.id === cls.id
                    ? 'bg-[#21262d] text-[#58a6ff] font-semibold border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                {cls.name.split('-')[0].toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={onRefresh}
            className="p-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] rounded border border-[#30363d] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cluster Overview Bar */}
      {selectedCluster && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#8b949e] text-[11px] block">Cluster Context</span>
            <span className="text-[#e6edf3] font-bold">{selectedCluster.name}</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">K8s Version</span>
            <span className="text-[#3fb950] font-bold">{selectedCluster.version}</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">Worker Nodes</span>
            <span className="text-[#e6edf3] font-bold">{selectedCluster.nodeCount} Ready</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">Capacity</span>
            <span className="text-[#58a6ff] font-bold">{selectedCluster.usedCpuCores} / {selectedCluster.totalCpuCores} Cores</span>
          </div>
        </div>
      )}

      {/* Pods Table & Filter Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden shadow-sm">
        {/* Table Filter Controls */}
        <div className="p-3 bg-[#161b22] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8b949e] font-semibold text-[11px]">Namespace:</span>
            <div className="flex items-center gap-1">
              {['all', 'devpulse-prod', 'monitoring', 'security'].map((ns) => (
                <button
                  key={ns}
                  onClick={() => setSelectedNamespace(ns)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    selectedNamespace === ns
                      ? 'bg-[#30363d] text-[#e6edf3] font-semibold'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  {ns}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded text-xs text-[#8b949e]">
            <Search className="w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Filter pods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] w-36 text-xs font-mono"
            />
          </div>
        </div>

        {/* Real K8s Pods Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d1117] text-[#8b949e] font-mono text-[11px] uppercase border-b border-[#30363d]">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Pod Name</th>
                <th className="px-4 py-2.5 font-semibold">Namespace</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Restarts</th>
                <th className="px-4 py-2.5 font-semibold">CPU</th>
                <th className="px-4 py-2.5 font-semibold">Memory</th>
                <th className="px-4 py-2.5 font-semibold">Node IP</th>
                <th className="px-4 py-2.5 font-semibold text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d] font-mono text-[11px]">
              {filteredPods.map((pod) => {
                const isSelected = selectedPodName === pod.name;

                return (
                  <tr
                    key={pod.name}
                    onClick={() => handleFetchPodLogs(pod.name)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#21262d] text-[#e6edf3]'
                        : 'hover:bg-[#1c2128] text-[#c9d1d9]'
                    }`}
                  >
                    <td className="px-4 py-2.5 font-semibold text-[#58a6ff] hover:underline">
                      {pod.name}
                    </td>
                    <td className="px-4 py-2.5 text-[#8b949e]">{pod.namespace}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={pod.status} size="sm" showIcon={false} />
                    </td>
                    <td className="px-4 py-2.5 text-[#8b949e]">{pod.restarts}</td>
                    <td className="px-4 py-2.5">{pod.cpuUsageMilli}m</td>
                    <td className="px-4 py-2.5">{pod.memoryUsageMiB}MiB</td>
                    <td className="px-4 py-2.5 text-[#8b949e]">{pod.ip}</td>
                    <td className="px-4 py-2.5 text-right text-[#8b949e]">{pod.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pod Log Terminal Inspector */}
      <div>
        <TerminalViewer
          title={`kubectl logs ${selectedPodName || 'devpulse-backend'} -n devpulse-prod -f`}
          logs={podLogs.length > 0 ? podLogs : [
            `[${new Date().toISOString()}] [INFO] Attached to pod stdout/stderr stream`,
            `[${new Date().toISOString()}] [INFO] Starting Node.js HTTP server on port 4000`,
            `[${new Date().toISOString()}] [HTTP] GET /api/health HTTP/1.1 200 OK 1.2ms`,
            `[${new Date().toISOString()}] [INFO] Cluster worker lease active: ip-10-0-12-84`
          ]}
          height="h-72"
        />
      </div>
    </div>
  );
};
