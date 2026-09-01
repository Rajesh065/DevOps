import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Bookmark,
  Code2,
  Briefcase,
  Building2,
  ChevronDown
} from 'lucide-react';
import { UserAccount, UserRole } from '../types/navigator';
import { rolePermissions } from '../data/personasData';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  currentUser: UserAccount;
  completedCount: number;
  totalLessons: number;
  bookmarkCount: number;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  currentUser,
  completedCount,
  totalLessons,
  bookmarkCount,
  onOpenAuth
}) => {
  // Seamless unified navigation tabs tailored to highlight role priority
  const getNavLinks = () => {
    return [
      { id: 'home', label: 'Home', icon: BookOpen },
      { id: 'learn', label: 'Curriculum & Quiz', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
      { id: 'platforms', label: 'CI/CD Platforms', icon: Layers, badge: '8 Tools' },
      { id: 'compare', label: 'Compare Matrix', icon: GitCompare },
      { id: 'yaml-gen', label: 'YAML Generator', icon: Code2, badge: 'Tool' },
      { id: 'interview-prep', label: 'Interview Q&A', icon: Briefcase, badge: '30+ Qs' },
      { id: 'governance', label: 'TCO Calculator', icon: Building2 },
      { id: 'dashboard', label: 'My Progress', icon: LayoutDashboard, badge: bookmarkCount > 0 ? `${bookmarkCount} saved` : undefined }
    ];
  };

  const navLinks = getNavLinks();
  const currentRoleInfo = rolePermissions[currentUser.role] || rolePermissions['student'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 select-none shadow-xs">
      {/* Top Header Bar */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
        {/* Brand Title (Clean Text, No Icon) */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-extrabold text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            DevOps Navigator
          </span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            v2.3
          </span>
        </div>

        {/* Center / Right: Persona Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={onOpenAuth}
            title="Click to Switch Persona or Login/Signup"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shadow-2xs"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] font-mono">
              {currentUser.avatarText}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 block leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold leading-tight font-mono">
                {currentRoleInfo.roleTitle}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
          </button>
        </div>
      </div>

      {/* Horizontal Navigation Tabs (Full Seamless Access, No 403 Blocks) */}
      <div className="border-t border-slate-100 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto text-xs font-medium scrollbar-none py-0.5">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/40'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>

                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Persona Tag */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-400">Persona Profile:</span>
            <span className={`px-2.5 py-0.5 rounded-full border font-semibold ${currentRoleInfo.badgeClass}`}>
              {currentRoleInfo.roleTitle}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
