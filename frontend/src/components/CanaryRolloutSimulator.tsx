import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';

export const CanaryRolloutSimulator: React.FC = () => {
  const [trafficPercent, setTrafficPercent] = useState<number>(0);
  const [stage, setStage] = useState<'idle' | 'canary-10' | 'canary-25' | 'canary-50' | 'promoted' | 'rollback'>('idle');
  const [errorRate, setErrorRate] = useState<number>(0.01);
  const [isSimulatingOutage, setIsSimulatingOutage] = useState<boolean>(false);

  const startCanary = () => {
    setIsSimulatingOutage(false);
    setStage('canary-10');
    setTrafficPercent(10);
    setErrorRate(0.01);
  };

  const advanceCanary = () => {
    if (stage === 'canary-10') {
      setStage('canary-25');
      setTrafficPercent(25);
    } else if (stage === 'canary-25') {
      setStage('canary-50');
      setTrafficPercent(50);
    } else if (stage === 'canary-50') {
      setStage('promoted');
      setTrafficPercent(100);
    }
  };

  const triggerChaosOutage = () => {
    setIsSimulatingOutage(true);
    setErrorRate(8.4); // Spike error rate above 1% threshold!
    setTimeout(() => {
      // Auto-rollback triggered by Prometheus SLO rule
      setStage('rollback');
      setTrafficPercent(0);
      setErrorRate(0.01);
    }, 1500);
  };

  const handleReset = () => {
    setStage('idle');
    setTrafficPercent(0);
    setErrorRate(0.01);
    setIsSimulatingOutage(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-1">
            <Activity className="w-4 h-4" />
            <span>Interactive GitOps & Progressive Delivery Lab</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            ArgoCD Canary Rollout & Self-Healing Auto-Rollback
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Progressively route user traffic to the new version while observing Prometheus golden error metrics in real time.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 self-start sm:self-auto"
          title="Reset Simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {stage === 'idle' && (
          <button
            onClick={startCanary}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Canary Deployment (Route 10% Traffic)</span>
          </button>
        )}

        {['canary-10', 'canary-25', 'canary-50'].includes(stage) && (
          <>
            <button
              onClick={advanceCanary}
              disabled={isSimulatingOutage}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Promote to Next Step ({stage === 'canary-10' ? '25%' : stage === 'canary-25' ? '50%' : '100%'}) →</span>
            </button>

            <button
              onClick={triggerChaosOutage}
              disabled={isSimulatingOutage}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Simulate Production Bug & Trigger Auto-Rollback</span>
            </button>
          </>
        )}

        {(stage === 'promoted' || stage === 'rollback') && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Run Another Rollout Test
          </button>
        )}
      </div>

      {/* Visual Live Traffic Split Diagram */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 uppercase text-[11px]">Live Traffic Distribution:</span>
          <span className="text-slate-600 font-semibold">
            {stage === 'promoted' ? '100% on v2.0 (Success)' : stage === 'rollback' ? '100% Rolled Back to v1.0 (Safe)' : `${trafficPercent}% on v2.0 (Canary) / ${100 - trafficPercent}% on v1.0 (Stable)`}
          </span>
        </div>

        {/* Traffic Progress Bars */}
        <div className="space-y-2">
          {/* Stable Version Bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-blue-700 font-bold">Stable Version (v1.0 - Blue)</span>
              <span className="text-slate-700 font-bold">{100 - trafficPercent}% traffic</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${100 - trafficPercent}%` }}
              />
            </div>
          </div>

          {/* Canary Version Bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-purple-700 font-bold">New Canary Version (v2.0 - Green)</span>
              <span className="text-slate-700 font-bold">{trafficPercent}% traffic</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${trafficPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Real-Time Prometheus SRE Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block">Prometheus Error Rate</span>
            <div className={`text-base font-extrabold ${errorRate > 1.0 ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`}>
              {errorRate}% (Threshold: &lt; 1.0%)
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block">P99 Latency (Response Time)</span>
            <div className="text-base font-extrabold text-slate-800">
              {isSimulatingOutage ? '840ms (DEGRADED)' : '24ms (HEALTHY)'}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block">GitOps Controller State</span>
            <div className={`text-base font-extrabold ${stage === 'rollback' ? 'text-rose-600' : 'text-emerald-600'}`}>
              {stage === 'rollback' ? 'Auto-Rolled Back ✓' : stage === 'promoted' ? 'Fully Synchronized ✓' : stage === 'idle' ? 'Ready' : 'Evaluating Metrics'}
            </div>
          </div>
        </div>

        {/* Status Callout Box */}
        {stage === 'rollback' && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Self-Healing Triggered: High Error Rate Detected (&gt; 1.0%)</span>
            </div>
            <p className="text-[11px] text-rose-800 font-sans">
              ArgoCD Rollouts detected anomalous 5xx HTTP responses on the v2.0 canary pods. The controller instantly shifted 100% of user traffic back to stable v1.0 in under 1.2 seconds, preventing customer outages.
            </p>
          </div>
        )}

        {stage === 'promoted' && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Canary Promotion Successful!</span>
            </div>
            <p className="text-[11px] text-emerald-800 font-sans">
              All canary health checks and SLO metrics remained pristine across 10%, 25%, 50%, and 100% traffic steps. Version v2.0 is now live across all Kubernetes pods.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
