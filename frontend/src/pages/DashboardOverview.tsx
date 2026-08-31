import React from 'react';
import {
  GitFork,
  GitPullRequest,
  Server,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  GitMerge,
  Cpu,
  HardDrive,
  Terminal
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { PipelineRun, PullRequest, K8sCluster, SystemMetricPoint } from '../types';

interface DashboardOverviewProps {
  pipelines: PipelineRun[];
  pullRequests: PullRequest[];
  clusters: K8sCluster[];
  liveMetric: SystemMetricPoint | null;
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  pipelines,
  pullRequests,
  clusters,
  liveMetric,
  onNavigate
}) => {
  const closedPrs = pullRequests.filter(p => p.status === 'closed' || p.status === 'merged');
  const latestRun = pipelines[0];

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Banner: Real Engineering Status */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
            <span className="font-mono text-xs text-[#3fb950] font-semibold">ALL PRODUCTION SYSTEMS OPERATIONAL</span>
            <span className="text-[#8b949e] text-xs font-mono">• v1.2.0-release</span>
          </div>
          <h2 className="text-lg font-bold text-[#e6edf3]">
            Infrastructure & Delivery Platform
          </h2>
          <p className="text-xs text-[#8b949e] mt-0.5 max-w-2xl">
            Managing 3 Kubernetes clusters, 48 Terraform state objects, automated PR security check gates, and live Prometheus telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('pipelines')}
            className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded text-xs flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Run Pipeline</span>
          </button>
          <button
            onClick={() => onNavigate('pull-requests')}
            className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-medium rounded text-xs border border-[#30363d] flex items-center gap-1 transition-colors"
          >
            <span>Review PRs</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* SRE Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="CI/CD Pass Rate"
          value="99.4%"
          subtitle="48 successful pipeline runs"
          icon={GitFork}
          trend={{ value: "2.1%", isPositive: true }}
        />
        <MetricCard
          title="Closed Pull Requests"
          value={`${closedPrs.length} Merged`}
          subtitle="100% Policy & Test Verified"
          icon={GitPullRequest}
          trend={{ value: "8 closed", isPositive: true }}
        />
        <MetricCard
          title="Active Clusters"
          value="3 Online"
          subtitle="AWS EKS, GCP GKE, Azure AKS"
          icon={Server}
        />
        <MetricCard
          title="P99 Response Latency"
          value={`${liveMetric ? liveMetric.p99LatencyMs : '42.1'}ms`}
          subtitle="Target SLO: < 150ms"
          icon={Activity}
          trend={{ value: "-4.2ms", isPositive: true }}
        />
      </div>

      {/* Two Column Grid: Pipeline Status + Pull Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Pipeline Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-[#3fb950]" />
                <span className="text-xs font-semibold text-[#e6edf3]">Active CI/CD Release Pipeline</span>
              </div>
              {latestRun && <StatusBadge status={latestRun.status} size="sm" />}
            </div>

            {latestRun && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-[#e6edf3] font-sans text-sm block">{latestRun.pipelineName}</span>
                    <span className="text-[#8b949e] text-[11px]">{latestRun.commitMessage}</span>
                  </div>
                  <span className="text-[#58a6ff]">#{latestRun.id}</span>
                </div>

                {/* Stage Progress Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {latestRun.stages.slice(0, 6).map((stg) => (
                    <div key={stg.id} className="p-2 rounded bg-[#0d1117] border border-[#30363d] text-left">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#8b949e] truncate max-w-[80px]">{stg.name}</span>
                        <StatusBadge status={stg.status} size="sm" showIcon={false} />
                      </div>
                      <span className="text-[10px] text-[#c9d1d9] font-mono">{stg.steps.length} steps</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#30363d] bg-[#0d1117]">
            <button
              onClick={() => onNavigate('pipelines')}
              className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#c9d1d9] rounded border border-[#30363d] transition-colors"
            >
              Open DAG Visualizer & Live Logs →
            </button>
          </div>
        </div>

        {/* Closed PRs Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-[#a371f7]" />
                <span className="text-xs font-semibold text-[#e6edf3]">Closed & Merged Pull Requests</span>
              </div>
              <span className="text-[11px] font-mono text-[#a371f7] bg-[#8957e5]/10 px-2 py-0.5 rounded border border-[#8957e5]/30">
                8 Merged
              </span>
            </div>

            <div className="divide-y divide-[#21262d]">
              {closedPrs.slice(0, 4).map((pr) => (
                <div
                  key={pr.id}
                  onClick={() => onNavigate('pull-requests')}
                  className="p-3 hover:bg-[#1c2128] cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <GitMerge className="w-4 h-4 text-[#a371f7] shrink-0" />
                    <div>
                      <p className="font-semibold text-[#e6edf3] line-clamp-1">{pr.title}</p>
                      <p className="text-[10px] text-[#8b949e] font-mono mt-0.5">
                        #{pr.id} by {pr.author.username} • {pr.checks.filter((c: any) => c.status === 'passed').length}/{pr.checks.length} checks passed
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={pr.status} size="sm" showIcon={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-[#30363d] bg-[#0d1117]">
            <button
              onClick={() => onNavigate('pull-requests')}
              className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#c9d1d9] rounded border border-[#30363d] transition-colors"
            >
              Explore Full PR Archive & Code Diffs →
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Node Load Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {clusters.map((cls) => (
          <div key={cls.id} className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#e6edf3]">{cls.name}</span>
                <p className="text-[10px] text-[#8b949e] font-mono">{cls.provider} • {cls.region}</p>
              </div>
              <StatusBadge status={cls.status} size="sm" showIcon={false} />
            </div>

            <div className="space-y-1.5 font-mono text-[11px] pt-1">
              <div>
                <div className="flex justify-between text-[#8b949e] text-[10px] mb-1">
                  <span>CPU Cores</span>
                  <span className="text-[#e6edf3]">{cls.usedCpuCores} / {cls.totalCpuCores}</span>
                </div>
                <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                  <div
                    className="bg-[#3fb950] h-full rounded-full"
                    style={{ width: `${(cls.usedCpuCores / cls.totalCpuCores) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#8b949e] text-[10px] mb-1">
                  <span>RAM Memory</span>
                  <span className="text-[#e6edf3]">{cls.usedMemoryGiB} / {cls.totalMemoryGiB} GiB</span>
                </div>
                <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                  <div
                    className="bg-[#58a6ff] h-full rounded-full"
                    style={{ width: `${(cls.usedMemoryGiB / cls.totalMemoryGiB) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
