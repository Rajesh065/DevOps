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
  ArrowUpRight,
  TrendingUp,
  Cpu,
  HardDrive
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { PipelineRun, PullRequest, K8sCluster, SystemMetricPoint } from '../types/index.js';

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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-[#131b2e] to-[#131b2e] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30">
                ENTERPRISE DEVOPS SUITE
              </span>
              <span className="text-slate-400 text-xs">• Zero-Trust GitOps</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              DevPulse Operations Command Center
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
              Managing 3 multi-cloud Kubernetes clusters, 48 Terraform state resources, real-time Prometheus telemetry, and automated GitOps merge gatekeepers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('pipelines')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trigger Pipeline</span>
            </button>
            <button
              onClick={() => onNavigate('pull-requests')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <span>View Closed PRs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* High Level Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="CI/CD Pipeline Success Rate"
          value="99.4%"
          subtitle="48 successful runs this week"
          icon={GitFork}
          trend={{ value: "+2.1%", isPositive: true }}
          variant="emerald"
        />
        <MetricCard
          title="Closed Pull Requests"
          value={`${closedPrs.length} Merged`}
          subtitle="100% Policy & Security Verified"
          icon={GitPullRequest}
          trend={{ value: "8 closed", isPositive: true }}
          variant="purple"
        />
        <MetricCard
          title="Cluster Health Score"
          value="100%"
          subtitle="3 Connected (AWS, GCP, Azure)"
          icon={Server}
          variant="blue"
        />
        <MetricCard
          title="P99 Response Latency"
          value={`${liveMetric ? liveMetric.p99LatencyMs : '42.1'}ms`}
          subtitle="Target SLO: < 150ms"
          icon={Activity}
          trend={{ value: "-4.2ms", isPositive: true }}
          variant="emerald"
        />
      </div>

      {/* Two Column Layout: Latest Pipeline Run + Closed Pull Requests Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Pipeline Execution */}
        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-100">Active CI/CD Pipeline</h3>
            </div>
            {latestRun && <StatusBadge status={latestRun.status} size="sm" />}
          </div>

          {latestRun && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-200">{latestRun.pipelineName}</p>
                  <p className="text-slate-400 font-mono text-[11px] mt-0.5">{latestRun.commitMessage}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-400 font-medium">#{latestRun.id}</span>
                  <p className="text-slate-400 text-[10px]">{new Date(latestRun.startedAt).toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Stage Progress Pills */}
              <div className="grid grid-cols-3 gap-2">
                {latestRun.stages.map((stg) => (
                  <div
                    key={stg.id}
                    className="p-2.5 rounded-lg bg-[#0f172a] border border-slate-800 text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[80px]">
                        {stg.name}
                      </span>
                      <StatusBadge status={stg.status} size="sm" />
                    </div>
                    <p className="text-[10px] font-mono text-slate-300">
                      {stg.steps.length} Steps
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('pipelines')}
                  className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors"
                >
                  Open Live DAG Visualizer & Logs →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Closed Pull Requests Feed */}
        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-sm text-slate-100">Closed & Merged Pull Requests</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Audit Verified
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {closedPrs.slice(0, 4).map((pr) => (
              <div
                key={pr.id}
                onClick={() => onNavigate('pull-requests')}
                className="p-3 rounded-lg bg-[#0f172a] border border-slate-800/80 hover:border-purple-500/40 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={pr.author.avatarUrl}
                    alt={pr.author.username}
                    className="w-7 h-7 rounded-full border border-slate-700 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-400">#{pr.id}</span>
                      <p className="text-xs font-medium text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-1">
                        {pr.title}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      by <span className="text-slate-300">{pr.author.username}</span> • {pr.checks.filter(c => c.status === 'passed').length}/{pr.checks.length} Checks Passed
                    </p>
                  </div>
                </div>

                <StatusBadge status={pr.status} size="sm" />
              </div>
            ))}

            <button
              onClick={() => onNavigate('pull-requests')}
              className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              Explore Full PR History & Code Diffs →
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Node & Telemetry Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((cls) => (
          <div key={cls.id} className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">{cls.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{cls.provider} • {cls.region}</p>
              </div>
              <StatusBadge status={cls.status} size="sm" />
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>CPU Cores</span>
                  <span>{cls.usedCpuCores} / {cls.totalCpuCores} Cores ({((cls.usedCpuCores / cls.totalCpuCores) * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(cls.usedCpuCores / cls.totalCpuCores) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>RAM Memory</span>
                  <span>{cls.usedMemoryGiB} / {cls.totalMemoryGiB} GiB ({((cls.usedMemoryGiB / cls.totalMemoryGiB) * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
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
