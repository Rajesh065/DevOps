import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Play,
  Copy,
  Check,
  Lock,
  RotateCw
} from 'lucide-react';
import { OPAPolicy } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';

interface SecurityPoliciesProps {
  policies: OPAPolicy[];
}

export const SecurityPolicies: React.FC<SecurityPoliciesProps> = ({ policies }) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id || 'pol-k8s-root');
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId) || policies[0];

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
          <ShieldCheck className="w-4 h-4 text-[#3fb950]" />
          <span>Open Policy Agent (OPA) Guardrails & DevSecOps</span>
          <span className="text-[#8b949e] font-normal font-mono text-xs">
            ({policies.length} active rules)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#8b949e] bg-[#161b22] px-2.5 py-1 rounded border border-[#30363d]">
            OPA Gatekeeper v3.15
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Policy Rules List */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden divide-y divide-[#30363d]">
          <div className="px-3.5 py-2.5 bg-[#161b22] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
            <span>Security Guardrails</span>
            <span className="font-mono text-[11px]">100% Enforced</span>
          </div>

          <div className="divide-y divide-[#21262d]">
            {policies.map((pol) => {
              const isSelected = selectedPolicy?.id === pol.id;

              return (
                <div
                  key={pol.id}
                  onClick={() => setSelectedPolicyId(pol.id)}
                  className={`p-3 text-left cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#21262d] border-l-2 border-l-[#3fb950]'
                      : 'hover:bg-[#1c2128]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase block font-semibold">
                        {pol.category}
                      </span>
                      <h4 className="text-xs font-semibold text-[#e6edf3] mt-0.5">{pol.name}</h4>
                    </div>
                    <StatusBadge status={pol.enforcement} size="sm" showIcon={false} />
                  </div>
                  <p className="text-[11px] text-[#8b949e] mt-1.5 line-clamp-2 leading-relaxed">
                    {pol.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rego Code & Rule Inspector */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
          {selectedPolicy && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
                <div>
                  <h3 className="font-bold text-sm text-[#e6edf3]">{selectedPolicy.name}</h3>
                  <p className="text-[11px] text-[#8b949e] font-mono mt-0.5">{selectedPolicy.category}</p>
                </div>
                <span className="text-xs font-mono text-[#3fb950] bg-[#238636]/15 px-2 py-0.5 rounded border border-[#238636]/30">
                  Enforced in CI/CD
                </span>
              </div>

              <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded text-xs text-[#c9d1d9] leading-relaxed">
                {selectedPolicy.description}
              </div>

              {/* Code viewer */}
              <div className="bg-[#0d1117] border border-[#30363d] rounded p-3 font-mono text-xs overflow-x-auto text-[#58a6ff]">
                <pre>{selectedPolicy.regoCode}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
