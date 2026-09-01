import React, { useState } from 'react';
import { Building2, ShieldCheck, DollarSign, Check, X, Layers, Server, Cloud, Cpu } from 'lucide-react';

export const ArchitectGovernancePage: React.FC = () => {
  const [devCount, setDevCount] = useState<number>(30);
  const [concurrency, setConcurrency] = useState<number>(10);
  const [infraCostMonthly, setInfraCostMonthly] = useState<number>(450);

  // Simple TCO Calculator Formula
  const saasMonthlyCost = Math.round(devCount * 21 + concurrency * 35);
  const selfHostedMonthlyCost = Math.round(infraCostMonthly + 800); // Server cost + 10 hours sysadmin labor
  const annualSavings = (saasMonthlyCost - selfHostedMonthlyCost) * 12;

  const complianceItems = [
    { name: 'Role-Based Access Control (RBAC) & SSO (SAML / OIDC)', saas: 'Enterprise Tier', self: 'Native / Free' },
    { name: 'Air-Gapped / Isolated On-Premise Operation', saas: 'Not Available', self: 'Full Support' },
    { name: 'OPA (Open Policy Agent) Policy as Code Gatekeeper', saas: 'Plugin / Webhook', self: 'Native K8s Admission' },
    { name: 'Automated Container Vulnerability Scanning (Trivy / Clair)', saas: 'Integrated', self: 'Integrated via Runner' },
    { name: 'Immutable Audit Logs & SOC2 Type II Certification', saas: 'Vendor Provided', self: 'Requires Internal Audit' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d29922]">
          <Building2 className="w-4 h-4" />
          <span>Platform Architecture & Governance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3]">
          Enterprise CI/CD Governance & TCO Calculator
        </h1>
        <p className="text-xs text-[#8b949e]">
          Evaluate total cost of ownership (TCO), compare Cloud SaaS vs Self-Hosted ROI, and review enterprise compliance guardrails.
        </p>
      </div>

      {/* 2-Column TCO Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Controls */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Organization Infrastructure Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#8b949e]">Engineering Team Size:</span>
                <span className="text-[#e6edf3] font-bold">{devCount} Developers</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                value={devCount}
                onChange={(e) => setDevCount(Number(e.target.value))}
                className="w-full accent-[#58a6ff]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#8b949e]">Peak Concurrent Pipeline Jobs:</span>
                <span className="text-[#e6edf3] font-bold">{concurrency} Parallel Runners</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-full accent-[#58a6ff]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#8b949e]">Self-Hosted VM/Cloud Infra Budget:</span>
                <span className="text-[#e6edf3] font-bold">${infraCostMonthly} / month</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={infraCostMonthly}
                onChange={(e) => setInfraCostMonthly(Number(e.target.value))}
                className="w-full accent-[#58a6ff]"
              />
            </div>
          </div>
        </div>

        {/* Right: Projected Cost Comparison */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Projected Monthly Cost Comparison
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-1">
              <span className="text-[11px] font-mono text-[#58a6ff] block">Cloud SaaS (GitHub/GitLab)</span>
              <div className="text-2xl font-extrabold text-[#e6edf3]">${saasMonthlyCost}</div>
              <span className="text-[10px] text-[#8b949e]">Zero maintenance effort</span>
            </div>

            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-1">
              <span className="text-[11px] font-mono text-[#3fb950] block">Self-Hosted (Jenkins/Argo)</span>
              <div className="text-2xl font-extrabold text-[#e6edf3]">${selfHostedMonthlyCost}</div>
              <span className="text-[10px] text-[#8b949e]">Infra + 10h sysadmin labor</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-[#8b949e]">Projected Annual Difference:</span>
              <span className={annualSavings > 0 ? 'text-[#3fb950] font-bold' : 'text-[#58a6ff] font-bold'}>
                {annualSavings > 0 ? `Self-hosted saves \$${annualSavings.toLocaleString()}/yr` : `SaaS saves \$${Math.abs(annualSavings).toLocaleString()}/yr`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Compliance Matrix */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-[#e6edf3]">Enterprise Security & Compliance Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#30363d] bg-[#0d1117]">
                <th className="p-3 font-mono text-[11px] text-[#8b949e]">Governance Capability</th>
                <th className="p-3 font-mono text-[11px] text-[#58a6ff]">Cloud SaaS Model</th>
                <th className="p-3 font-mono text-[11px] text-[#3fb950]">Self-Hosted Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {complianceItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#1c2128]">
                  <td className="p-3 font-semibold text-[#e6edf3]">{item.name}</td>
                  <td className="p-3 text-[#c9d1d9]">{item.saas}</td>
                  <td className="p-3 text-[#c9d1d9]">{item.self}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
