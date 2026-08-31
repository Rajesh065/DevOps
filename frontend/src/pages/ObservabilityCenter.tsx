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
  Check
} from 'lucide-react';
import { SystemMetricPoint, SystemAlert } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { api } from '../services/api.js';

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
  const [activeAlerts, setActiveAlerts] = useState<SystemAlert[]>(alerts);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">Observability & SRE Incident Center</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              Live Telemetry Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Prometheus scraping, distributed latency tracing, error budgets, and PagerDuty alert routing.
          </p>
        </div>
      </div>

      {/* Live Golden Signals Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Cluster CPU Load</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">{currentMetric.cpuPercent}%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${currentMetric.cpuPercent}%` }} />
          </div>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Memory Utilization</span>
            <HardDrive className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">{currentMetric.memoryPercent}%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: `${currentMetric.memoryPercent}%` }} />
          </div>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Request Rate (RPS)</span>
            <Wifi className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">{currentMetric.reqPerSec}</p>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">Total Requests / Sec</p>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">P99 Latency & Error Rate</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-1">{currentMetric.p99LatencyMs}ms</p>
          <p className="text-[10px] text-emerald-400 mt-2 font-mono">Errors: {currentMetric.errorRatePercent}% (SLO OK)</p>
        </div>
      </div>

      {/* Prometheus Alerts Stream */}
      <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-100">Firing & Acknowledged Alerts ({alerts.length})</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Prometheus Alertmanager v2.45</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl bg-[#0f172a] border border-slate-800/80 hover:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${alert.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{alert.name}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {alert.source}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">
                    Target: {alert.targetService} • Firing since: {new Date(alert.firingSince).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <StatusBadge status={alert.status} size="sm" />
                {alert.status === 'firing' && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
                {alert.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-colors"
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
