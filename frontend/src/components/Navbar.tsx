import React from 'react';
import { GitBranch, GitPullRequest, Search, Bell, Terminal, Server, ExternalLink, ChevronDown, Check, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  wsConnected: boolean;
  closedPrCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, wsConnected, closedPrCount }) => {
  return (
    <header className="h-14 bg-[#161b22] border-b border-[#30363d] sticky top-0 z-40 px-4 flex items-center justify-between select-none">
      {/* Left: Organization / Repo switcher & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-[#30363d]">
          <div className="w-7 h-7 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
            <Server className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e6edf3]">
            <span className="text-[#8b949e] font-normal hover:underline cursor-pointer">deveops</span>
            <span className="text-[#8b949e]">/</span>
            <span className="hover:underline cursor-pointer">devpulse-platform</span>
          </div>
        </div>

        {/* Environment pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e]">
          <GitBranch className="w-3 h-3 text-[#3fb950]" />
          <span className="text-[#e6edf3]">main</span>
          <span className="text-[#8b949e]">•</span>
          <span className="text-[#3fb950] font-semibold">prod-us-east</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center gap-2 bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e] transition-colors rounded-md px-2.5 py-1 w-80 text-xs text-[#8b949e]">
        <Search className="w-3.5 h-3.5" />
        <input
          type="text"
          placeholder="Type / to search pipelines, PRs, clusters..."
          className="bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] w-full text-xs"
        />
        <kbd className="text-[10px] font-mono bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] text-[#8b949e]">⌘K</kbd>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Closed PR count */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#a371f7]">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>{closedPrCount} Closed PRs</span>
        </div>

        {/* WebSocket health indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono text-[#8b949e] bg-[#0d1117] border border-[#30363d]">
          <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-[#3fb950]' : 'bg-[#f85149]'}`} />
          <span className="hidden sm:inline">{wsConnected ? 'Cluster Live' : 'Reconnecting'}</span>
        </div>

        {/* User avatar */}
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
    </header>
  );
};
