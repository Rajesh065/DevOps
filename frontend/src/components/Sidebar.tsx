import React from 'react';
import {
  LayoutDashboard,
  GitFork,
  GitPullRequest,
  Server,
  Layers,
  Activity,
  ShieldCheck,
  FileCode,
  Terminal,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closedPrCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, closedPrCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'pipelines', label: 'CI/CD Pipelines', icon: GitFork, badge: 'Active' },
    { id: 'pull-requests', label: 'Closed Pull Requests', icon: GitPullRequest, badge: `${closedPrCount}` },
    { id: 'kubernetes', label: 'Kubernetes Multi-Cluster', icon: Server, badge: '3 Clusters' },
    { id: 'iac', label: 'Terraform & IaC', icon: Layers },
    { id: 'observability', label: 'Observability & SRE', icon: Activity, badge: 'Realtime' },
    { id: 'security', label: 'OPA Policy & CVEs', icon: ShieldCheck }
  ];

  return (
    <aside className="w-64 bg-[#0d1424] border-r border-slate-800/80 flex flex-col justify-between py-6 shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="px-3 space-y-1.5">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Control Plane
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : item.id === 'pull-requests'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="px-4 pt-4 border-t border-slate-800/80 mx-2">
        <div className="bg-[#131b2e] p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Multi-Cloud Mesh</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            AWS us-east-1 • GCP europe-west1 • Azure westus2
          </p>
        </div>
      </div>
    </aside>
  );
};
