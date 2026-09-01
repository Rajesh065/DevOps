import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Bookmark,
  Sun,
  Moon,
  Search,
  Code2,
  Briefcase,
  Building2,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { UserAccount, UserRole } from '../types/navigator';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  currentUser: UserAccount;
  completedCount: number;
  totalLessons: number;
  bookmarkCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  currentUser,
  completedCount,
  totalLessons,
  bookmarkCount,
  theme,
  toggleTheme,
  onOpenAuth
}) => {
  // Define Role-specific navigation tabs based on currently logged in Persona
  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'Learn DevOps', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers },
          { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard }
        ];
      case 'developer':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers, badge: '8 Engines' },
          { id: 'yaml-gen', label: 'YAML Generator', icon: Code2, badge: 'Tool' },
          { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined },
          { id: 'dashboard', label: 'Developer Hub', icon: LayoutDashboard }
        ];
      case 'architect':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers },
          { id: 'compare', label: 'Compare Matrix', icon: GitCompare, badge: 'Side-by-Side' },
          { id: 'governance', label: 'Governance & TCO', icon: Building2, badge: 'ROI' },
          { id: 'dashboard', label: 'Architect Hub', icon: LayoutDashboard }
        ];
      case 'jobseeker':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'interview-prep', label: 'Interview Prep', icon: Briefcase, badge: 'Q&A' },
          { id: 'learn', label: 'DevOps Curriculum', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers },
          { id: 'dashboard', label: 'Aspirant Hub', icon: LayoutDashboard }
        ];
      default:
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'Learn DevOps', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers },
          { id: 'compare', label: 'Compare Platforms', icon: GitCompare },
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark }
        ];
    }
  };

  const navLinks = getNavLinks();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return { label: 'Student / Beginner', color: 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30' };
      case 'developer':
        return { label: 'Software Developer', color: 'bg-[#58a6ff]/15 text-[#58a6ff] border-[#58a6ff]/30' };
      case 'architect':
        return { label: 'Tech Lead / Architect', color: 'bg-[#9e6a03]/15 text-[#d29922] border-[#9e6a03]/30' };
      case 'jobseeker':
        return { label: 'DevOps Job Aspirant', color: 'bg-[#8957e5]/15 text-[#a371f7] border-[#8957e5]/30' };
    }
  };

  const roleInfo = getRoleBadge(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d] select-none shadow-sm">
      {/* Top Header Bar - Full Width with balanced padding */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
        {/* Left: Clean Brand Title (NO ICON, crisp typography) */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-extrabold text-base text-[#e6edf3] tracking-tight group-hover:text-[#58a6ff] transition-colors">
            DevOps Navigator
          </span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#238636]/20 text-[#3fb950] border border-[#238636]/30">
            v2.1
          </span>
        </div>

        {/* Center / Right: Search, Persona Switcher & Theme */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Search */}
          <button
            onClick={() => setActivePage('platforms')}
            className="hidden md:flex items-center gap-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-[#8b949e] px-3 py-1 rounded text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search CI/CD tools...</span>
          </button>

          {/* User Persona & Switcher Button */}
          <button
            onClick={onOpenAuth}
            title="Click to Switch Persona or Login/Signup"
            className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-[#58a6ff]/20 border border-[#58a6ff]/40 flex items-center justify-center text-[#58a6ff] font-bold text-[10px] font-mono">
              {currentUser.avatarText}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-[11px] font-semibold text-[#e6edf3] block leading-none">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className={`text-[9px] font-mono leading-none ${roleInfo.color.split(' ')[1]}`}>
                {roleInfo.label}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-[#8b949e]" />
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
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-medium scrollbar-none py-0.5">
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
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#21262d] text-[#8b949e]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick role indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-[#8b949e]">
            <span>Active Persona:</span>
            <span className={`px-2 py-0.5 rounded border ${roleInfo.color}`}>
              {roleInfo.label}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
