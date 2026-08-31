import React from 'react';
import { ShieldCheck, Activity, Bell, Search, Terminal, Zap, GitPullRequest } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  wsConnected: boolean;
  closedPrCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, wsConnected, closedPrCount }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap className="w-5 h-5 text-slate-950 fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              DevPulse
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v1.2.0-PROD
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">DevOps & IDP Orchestrator</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-[#131b2e] border border-slate-800 rounded-lg px-3 py-1.5 w-72 text-xs">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search pipelines, PRs, clusters..."
            className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-400 w-full"
          />
          <kbd className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Closed PR counter badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>{closedPrCount} Closed PRs</span>
        </div>

        {/* Live WebSocket indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs">
          <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
          <span className="text-slate-300 font-mono text-[11px]">
            {wsConnected ? 'LIVE STREAM' : 'OFFLINE'}
          </span>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60"
            alt="Sarah Chen"
            className="w-8 h-8 rounded-full border border-slate-700 object-cover"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-200">sarah-devops</p>
            <p className="text-[10px] text-emerald-400 font-mono">Principal DevSecOps</p>
          </div>
        </div>
      </div>
    </header>
  );
};
