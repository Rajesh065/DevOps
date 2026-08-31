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
  Wrench,
  Terminal
} from 'lucide-react';
import { TerraformWorkspace, TerraformResource } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';

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
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
          <Layers className="w-4 h-4 text-[#a371f7]" />
          <span>Terraform Cloud & State Manager</span>
          <span className="text-[#8b949e] font-normal font-mono text-xs">
            ({workspaces.length} workspaces)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Workspace Tabs */}
          <div className="flex items-center bg-[#161b22] border border-[#30363d] p-0.5 rounded-md text-xs font-mono">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => setSelectedWsId(ws.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedWs?.id === ws.id
                    ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                {ws.name}
              </button>
            ))}
          </div>

          <button
            disabled={isCheckingDrift}
            onClick={handleDriftCheck}
            className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isCheckingDrift ? 'animate-spin' : ''}`} />
            <span>{isCheckingDrift ? 'Planning...' : 'Run Drift Check'}</span>
          </button>
        </div>
      </div>

      {/* Workspace State Bar */}
      {selectedWs && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#8b949e] text-[11px] block">Terraform Version</span>
            <span className="text-[#e6edf3] font-bold">v{selectedWs.terraformVersion}</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">Managed Resources</span>
            <span className="text-[#e6edf3] font-bold">{selectedWs.resourcesCount} objects</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">Estimated Cost</span>
            <span className="text-[#3fb950] font-bold">${selectedWs.totalMonthlyCostUsd.toLocaleString()}/mo</span>
          </div>
          <div>
            <span className="text-[#8b949e] text-[11px] block">Drift Status</span>
            <StatusBadge status={selectedWs.driftStatus} size="sm" />
          </div>
        </div>
      )}

      {/* Resources & Drift List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden shadow-sm">
        <div className="px-3.5 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
          <span>State Resource Tree ({selectedWs?.resources.length || 0})</span>
          <span className="font-mono text-[11px]">AWS Provider v5.40</span>
        </div>

        <div className="divide-y divide-[#21262d]">
          {selectedWs?.resources.map((res: TerraformResource) => (
            <div key={res.id} className="p-3.5 text-xs text-left hover:bg-[#1c2128] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[#58a6ff] font-semibold">{res.type}</span>
                    <span className="text-[#8b949e]">.</span>
                    <span className="text-[#e6edf3] font-bold">{res.name}</span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] font-mono mt-0.5">
                    Region: {res.region} • Cost: ${res.costMonthlyUsd}/mo
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={res.status} size="sm" showIcon={false} />
                  {res.status === 'drifted' && (
                    <button
                      onClick={() => handleReconcile(res.id)}
                      className="px-2.5 py-1 rounded bg-[#9e6a03]/20 hover:bg-[#9e6a03]/40 text-[#d29922] font-mono text-[10px] font-bold border border-[#9e6a03]/50 transition-colors"
                    >
                      terraform apply -target={res.id}
                    </button>
                  )}
                </div>
              </div>

              {/* Real HCL Diff Callout */}
              {res.driftDetails && res.driftDetails.length > 0 && (
                <div className="mt-2.5 p-2.5 rounded bg-[#0d1117] border border-[#da3633]/40 font-mono text-[11px] space-y-1">
                  <div className="text-[#f85149] font-bold">~ {res.id} (configuration drift detected)</div>
                  {res.driftDetails.map((d: any, i: number) => (
                    <div key={i} className="text-[#8b949e] pl-3">
                      <div>~ {d.attribute}:</div>
                      <div className="text-[#3fb950] pl-3">- desired in git: {d.expectedValue}</div>
                      <div className="text-[#f85149] pl-3">+ actual in cloud: {d.actualValue}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
