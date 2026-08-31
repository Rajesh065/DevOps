import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  DollarSign,
  FileCode,
  ArrowRight,
  ShieldAlert,
  Wrench
} from 'lucide-react';
import { TerraformWorkspace, TerraformResource } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { api } from '../services/api.js';

interface IaCManagerProps {
  workspaces: TerraformWorkspace[];
  onRefresh: () => void;
}

export const IaCManager: React.FC<IaCManagerProps> = ({ workspaces, onRefresh }) => {
  const [selectedWsId, setSelectedWsId] = useState<string>(workspaces[0]?.id || 'ws-aws-production');
  const [isCheckingDrift, setIsCheckingDrift] = useState(false);

  const selectedWs = workspaces.find((w) => w.id === selectedWsId) || workspaces[0];

  const handleDriftCheck = async () => {
    if (!selectedWs) return;
    setIsCheckingDrift(true);
    try {
      await api.runDriftCheck(selectedWs.id);
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingDrift(false);
    }
  };

  const handleReconcile = async (resourceId: string) => {
    if (!selectedWs) return;
    try {
      await api.reconcileDrift(selectedWs.id, resourceId);
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
            <h2 className="text-xl font-extrabold text-white">Infrastructure as Code (Terraform)</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              State & Drift Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated cloud state parsing, drift detection, resource dependency graphing, and Infracost financial estimation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isCheckingDrift}
            onClick={handleDriftCheck}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isCheckingDrift ? 'animate-spin' : ''}`} />
            <span>{isCheckingDrift ? 'Auditing Cloud API...' : 'Run Drift Detection'}</span>
          </button>
        </div>
      </div>

      {/* Workspaces Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workspaces.map((ws) => {
          const isSelected = selectedWs?.id === ws.id;

          return (
            <div
              key={ws.id}
              onClick={() => setSelectedWsId(ws.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#18233c] border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                  : 'bg-[#131b2e] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    {ws.environment} Workspace
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-0.5">{ws.name}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Terraform v{ws.terraformVersion} • Applied by {ws.appliedBy}
                  </p>
                </div>
                <StatusBadge status={ws.driftStatus} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-400 text-[10px] block">Resources</span>
                  <span>{ws.resourcesCount} Managed Assets</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Estimated Cost</span>
                  <span className="text-emerald-400 font-bold">${ws.totalMonthlyCostUsd.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Managed Resources & Drift Inventory */}
      {selectedWs && (
        <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <span>Managed Resources ({selectedWs.resources.length})</span>
                <span className="text-xs text-slate-400 font-mono">in {selectedWs.name}</span>
              </h3>
            </div>
            <StatusBadge status={selectedWs.driftStatus} />
          </div>

          <div className="space-y-3">
            {selectedWs.resources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-[#0f172a] border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400">{res.type}</span>
                      <span className="text-xs font-semibold text-slate-200">{res.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">
                      Provider: <span className="text-slate-300 uppercase">{res.provider}</span> • Region: {res.region}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={res.status} size="sm" />
                    {res.status === 'drifted' && (
                      <button
                        onClick={() => handleReconcile(res.id)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Reconcile Drift</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Drift Details Callout if present */}
                {res.driftDetails && res.driftDetails.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs font-mono">
                    <p className="text-rose-400 font-bold flex items-center gap-1.5 mb-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Configuration Drift Detected from Git Baseline:</span>
                    </p>
                    {res.driftDetails.map((d, i) => (
                      <div key={i} className="text-slate-300 space-y-0.5">
                        <div>Attribute: <span className="text-amber-300">{d.attribute}</span></div>
                        <div className="text-emerald-400 font-bold">Desired: {d.expectedValue}</div>
                        <div className="text-rose-400 font-bold">Actual Live: {d.actualValue}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
