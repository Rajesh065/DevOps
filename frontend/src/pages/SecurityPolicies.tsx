import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Play,
  Copy,
  Check
} from 'lucide-react';
import { OPAPolicy } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { api } from '../services/api.js';

interface SecurityPoliciesProps {
  policies: OPAPolicy[];
}

export const SecurityPolicies: React.FC<SecurityPoliciesProps> = ({ policies }) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id || 'pol-k8s-root');
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId) || policies[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-white">Policy as Code & DevSecOps</h2>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
            Open Policy Agent (OPA)
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Zero-trust security policies written in Rego enforcing Kubernetes Pod Security Standards and Terraform guardrails before deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policies List */}
        <div className="lg:col-span-5 space-y-3">
          {policies.map((pol) => {
            const isSelected = selectedPolicy?.id === pol.id;

            return (
              <div
                key={pol.id}
                onClick={() => setSelectedPolicyId(pol.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                  isSelected
                    ? 'bg-[#18233c] border-emerald-500/60 shadow-md shadow-emerald-500/10'
                    : 'bg-[#131b2e] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      {pol.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 mt-0.5">{pol.name}</h4>
                  </div>
                  <StatusBadge status={pol.enforcement} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {pol.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Rego Code Inspector */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-xl p-6 shadow-sm">
          {selectedPolicy && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{selectedPolicy.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedPolicy.category}</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Enforced
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#0f172a] p-3 rounded-lg border border-slate-800">
                  {selectedPolicy.description}
                </p>
              </div>

              {/* Code viewer */}
              <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-sky-300">
                <pre>{selectedPolicy.regoCode}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
