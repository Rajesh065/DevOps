import React from 'react';
import { Compass, ArrowLeft, Home, Layers } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-md mx-auto my-16 bg-[#161b22] border border-[#30363d] rounded-xl p-8 text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mx-auto">
        <Compass className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <span className="font-mono text-xs text-[#f85149] font-bold">404 • Page Not Found</span>
        <h2 className="text-xl font-bold text-[#e6edf3]">Lost in the DevOps Pipeline?</h2>
        <p className="text-xs text-[#8b949e]">
          The page or platform resource you requested doesn't exist or has moved.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-4 py-2 rounded bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Go Home</span>
        </button>
        <button
          onClick={() => onNavigate('platforms')}
          className="px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#e6edf3] border border-[#30363d] flex items-center gap-1.5 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span>Explore Platforms</span>
        </button>
      </div>
    </div>
  );
};
