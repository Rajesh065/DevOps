import React from 'react';
import {
  Compass,
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Bookmark,
  Sun,
  Moon,
  Search,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  completedCount: number;
  totalLessons: number;
  bookmarkCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  completedCount,
  totalLessons,
  bookmarkCount,
  theme,
  toggleTheme,
  onSearchClick
}) => {
  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'learn', label: 'Learn DevOps', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
    { id: 'platforms', label: 'CI/CD Platforms', icon: Layers, badge: '8 Platforms' },
    { id: 'compare', label: 'Compare Platforms', icon: GitCompare },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined }
  ];

  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] select-none shadow-sm">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff] group-hover:border-[#58a6ff] transition-colors">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#e6edf3] tracking-tight">DevOps Navigator</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#238636]/20 text-[#3fb950] border border-[#238636]/30">
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-[#8b949e] font-mono hidden sm:block">Learning & CI/CD Platform Explorer</p>
          </div>
        </div>

        {/* Center / Right Controls: Quick Search, Progress pill, Theme toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Search trigger button */}
          <button
            onClick={() => {
              setActivePage('platforms');
              if (onSearchClick) onSearchClick();
            }}
            className="flex items-center gap-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-[#8b949e] px-2.5 py-1 rounded text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search platforms...</span>
            <kbd className="hidden md:inline text-[10px] font-mono bg-[#161b22] px-1.5 py-0.5 rounded border border-[#30363d]">/ </kbd>
          </button>

          {/* Quick Progress Indicator */}
          <button
            onClick={() => setActivePage('dashboard')}
            title="View Learning Progress in Dashboard"
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#21262d] border border-[#30363d] text-xs hover:border-[#8b949e] transition-colors"
          >
            <div className="w-16 bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
              <div
                className="bg-[#3fb950] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-[#3fb950] font-semibold">{progressPercent}%</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#d29922]" /> : <Moon className="w-3.5 h-3.5 text-[#58a6ff]" />}
          </button>
        </div>
      </div>

      {/* Horizontal Navigation Tabs (Full Width GitHub / Linear Style) */}
      <div className="border-t border-[#21262d] bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-medium scrollbar-none py-0.5">
          {navLinks.map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                    : 'border-transparent text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? tab.id === 'bookmarks'
                          ? 'bg-[#8957e5]/20 text-[#a371f7] font-bold'
                          : 'bg-[#30363d] text-[#e6edf3] font-semibold'
                        : tab.id === 'bookmarks'
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
      </div>
    </header>
  );
};
