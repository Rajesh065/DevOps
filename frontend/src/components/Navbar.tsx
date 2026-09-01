import React from 'react';
import {
  GitBranch,
  GitPullRequest,
  Search,
  LayoutDashboard,
  GitFork,
  Server,
  Layers,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wsConnected: boolean;
  closedPrCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wsConnected,
  closedPrCount
}) => {
  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipelines', label: 'Pipelines & CI/CD', icon: GitFork, badge: 'Live' },
    { id: 'pull-requests', label: 'Pull Requests', icon: GitPullRequest, badge: `${closedPrCount}` },
    { id: 'kubernetes', label: 'Kubernetes Workloads', icon: Server, badge: '3 Clusters' },
    { id: 'iac', label: 'Terraform & IaC', icon: Layers },
    { id: 'observability', label: 'Metrics & Telemetry', icon: Activity, badge: 'Prometheus' },
    { id: 'security', label: 'Policies & Security', icon: ShieldCheck }
  ];

  return (
    <header className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-40 select-none">
      {/* Top Header Bar */}
      <div className="h-14 px-4 lg:px-6 flex items-center justify-between border-b border-[#21262d]">
        {/* Left: Organization / Repo switcher (Without Icon) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#e6edf3] pr-3 border-r border-[#30363d]">
            <span className="text-[#8b949e] font-normal hover:underline cursor-pointer">deveops</span>
            <span className="text-[#8b949e]">/</span>
            <span className="hover:underline cursor-pointer text-[#e6edf3] font-bold">devpulse-platform</span>
          </div>

          {/* Environment pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e]">
            <GitBranch className="w-3 h-3 text-[#3fb950]" />
            <span className="text-[#e6edf3]">main</span>
            <span className="text-[#8b949e]">•</span>
            <span className="text-[#3fb950] font-semibold">prod-us-east</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e] transition-colors rounded-md px-3 py-1 w-80 text-xs text-[#8b949e]">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Type / to search pipelines, PRs, clusters..."
            className="bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] w-full text-xs font-mono"
          />
          <kbd className="text-[10px] font-mono bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] text-[#8b949e]">⌘K</kbd>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* WebSocket health indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#8b949e] bg-[#0d1117] border border-[#30363d]">
            <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-[#3fb950]' : 'bg-[#f85149]'}`} />
            <span className="hidden sm:inline">{wsConnected ? 'Cluster Live' : 'Reconnecting'}</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#30363d]">
            <div className="w-7 h-7 rounded-full bg-[#238636] border border-[#30363d] flex items-center justify-center text-white text-xs font-bold font-mono">
              SD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-[#e6edf3] leading-none">sarah-devops</p>
              <p className="text-[10px] text-[#8b949e] font-mono leading-tight mt-0.5">Staff DevOps Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Bar (GitHub Repository Tabs Style) */}
      <div className="px-4 lg:px-6 flex items-center gap-1 overflow-x-auto text-xs font-medium scrollbar-none">
        {navigationTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                  : 'border-transparent text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e]/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
              <span>{tab.label}</span>

              {tab.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? tab.id === 'pull-requests'
                        ? 'bg-[#8957e5]/20 text-[#a371f7] font-bold'
                        : 'bg-[#30363d] text-[#e6edf3] font-semibold'
                      : tab.id === 'pull-requests'
                      ? 'bg-[#8957e5]/15 text-[#a371f7]'
                      : 'bg-[#21262d] text-[#8b949e]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
