import React from 'react';
import {
  LayoutDashboard,
  GitFork,
  GitPullRequest,
  Server,
  Layers,
  Activity,
  ShieldCheck,
  Terminal,
  Settings,
  HelpCircle,
  Cpu,
  Flame
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closedPrCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, closedPrCount }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipelines', label: 'Pipelines & CI/CD', icon: GitFork, badge: 'Live' },
    { id: 'pull-requests', label: 'Pull Requests', icon: GitPullRequest, badge: `${closedPrCount}` },
    { id: 'kubernetes', label: 'Kubernetes Workloads', icon: Server, badge: '3 Clusters' },
    { id: 'iac', label: 'Terraform & IaC', icon: Layers },
    { id: 'observability', label: 'Metrics & Telemetry', icon: Activity, badge: 'Prometheus' },
    { id: 'security', label: 'Policies & Security', icon: ShieldCheck }
  ];

  return (
    <aside className="w-60 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between py-4 shrink-0 min-h-[calc(100vh-3.5rem)] select-none">
      <div className="px-2 space-y-1">
        <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">
          Platform Navigation
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d] shadow-sm'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] font-mono rounded ${
                    isActive
                      ? 'bg-[#30363d] text-[#e6edf3]'
                      : item.id === 'pull-requests'
                      ? 'bg-[#8957e5]/20 text-[#a371f7] font-semibold'
                      : 'bg-[#21262d] text-[#8b949e]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cluster Quick Switcher & SRE Status */}
      <div className="px-3 space-y-3 pt-3 border-t border-[#30363d]">
        <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d] space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e]">Cluster Target</span>
            <span className="text-[#3fb950] font-mono font-medium">EKS-US-East-1</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e]">GitOps State</span>
            <span className="text-[#58a6ff] font-mono">Synced (Argo)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e]">Error Budget</span>
            <span className="text-[#3fb950] font-mono">99.98% OK</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-[#8b949e]">
          <span>DevPulse v1.2.0</span>
          <span className="hover:underline cursor-pointer">Docs & Runbooks</span>
        </div>
      </div>
    </aside>
  );
};
