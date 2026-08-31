import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Cpu,
  HardDrive,
  Wifi,
  ShieldAlert,
  Flame,
  Check,
  RotateCw
} from 'lucide-react';
import { SystemMetricPoint, SystemAlert } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { MetricCard } from '../components/MetricCard';
import { api } from '../services/api';

interface ObservabilityCenterProps {
  metrics: SystemMetricPoint[];
  alerts: SystemAlert[];
  liveMetric: SystemMetricPoint | null;
  onRefresh: () => void;
}

export const ObservabilityCenter: React.FC<ObservabilityCenterProps> = ({
  metrics,
  alerts,
  liveMetric,
  onRefresh
}) => {
  const handleAcknowledge = async (id: string) => {
    try {
      await api.acknowledgeAlert(id);
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await api.resolveAlert(id);
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  const currentMetric = liveMetric || metrics[metrics.length - 1] || {
    cpuPercent: 42.1,
    memoryPercent: 64.2,
    reqPerSec: 5210,
    p95LatencyMs: 28.4,
    p99LatencyMs: 44.1,
    errorRatePercent: 0.003
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
          <Activity className="w-4 h-4 text-[#3fb950]" />
          <span>Observability & Prometheus Telemetry</span>
          <span className="text-[#8b949e] font-normal font-mono text-xs">
            (Scrape Interval: 3s)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#8b949e] bg-[#161b22] px-2.5 py-1 rounded border border-[#30363d]">
            Prometheus 2.45 • Grafana 10.0
          </span>
          <button
            onClick={onRefresh}
            className="p-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] rounded border border-[#30363d] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real SRE Golden Signals Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="CPU Utilization"
          value={`${currentMetric.cpuPercent}%`}
          subtitle="avg(container_cpu_usage)"
          icon={Cpu}
          trend={{ value: "1.2%", isPositive: true }}
        />
        <MetricCard
          title="Memory (Resident Set)"
          value={`${currentMetric.memoryPercent}%`}
          subtitle="sum(container_memory_rss)"
          icon={HardDrive}
        />
        <MetricCard
          title="HTTP Request Rate"
          value={`${currentMetric.reqPerSec} req/s`}
          subtitle="rate(http_requests_total[1m])"
          icon={Wifi}
          trend={{ value: "+240 req/s", isPositive: true }}
        />
        <MetricCard
          title="Latency P99 / Error Rate"
          value={`${currentMetric.p99LatencyMs}ms`}
          subtitle={`Errors: ${currentMetric.errorRatePercent}% (SLO < 0.1%)`}
          icon={Activity}
          trend={{ value: "-2ms", isPositive: true }}
        />
      </div>

      {/* Active Alerts List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden shadow-sm">
        <div className="px-3.5 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#d29922]" />
            <span className="text-[#e6edf3]">Prometheus Alert Rules ({alerts.length})</span>
          </div>
          <span className="font-mono text-[11px]">PagerDuty Routing Active</span>
        </div>

        <div className="divide-y divide-[#21262d]">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#1c2128] transition-colors">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === 'critical' ? 'text-[#f85149]' : 'text-[#d29922]'}`} />
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-semibold text-[#e6edf3]">{alert.name}</span>
                    <span className="text-[10px] text-[#8b949e] px-1.5 py-0.2 rounded bg-[#21262d] border border-[#30363d]">
                      {alert.source}
                    </span>
                  </div>
                  <p className="text-[#8b949e] text-[11px] mt-0.5 leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] font-mono text-[#8b949e] mt-1">
                    Target: {alert.targetService} • Firing: {new Date(alert.firingSince).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <StatusBadge status={alert.status} size="sm" showIcon={false} />
                {alert.status === 'firing' && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px] font-mono border border-[#30363d] transition-colors"
                  >
                    Ack
                  </button>
                )}
                {alert.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="px-2 py-0.5 rounded bg-[#238636]/20 hover:bg-[#238636]/40 text-[#3fb950] text-[11px] font-mono font-semibold border border-[#238636]/40 transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
