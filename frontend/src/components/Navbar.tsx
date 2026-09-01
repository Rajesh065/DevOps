import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Bookmark,
  Search,
  Code2,
  Briefcase,
  Building2,
  ChevronDown,
  UserCheck
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
  // Strict Role-specific navigation tabs per Persona
  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'DevOps Curriculum', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
          { id: 'student-dashboard', label: 'Student Dashboard', icon: LayoutDashboard }
        ];
      case 'developer':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers, badge: '8 Tools' },
          { id: 'yaml-gen', label: 'YAML Generator', icon: Code2, badge: 'Tool' },
          { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined }
        ];
      case 'architect':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms', icon: Layers },
          { id: 'compare', label: 'Compare Matrix', icon: GitCompare, badge: 'Matrix' },
          { id: 'governance', label: 'Governance & TCO', icon: Building2, badge: 'ROI' }
        ];
      case 'jobseeker':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'interview-prep', label: 'Interview Master (Q&A)', icon: Briefcase, badge: 'Q&A' },
          { id: 'aspirant-hub', label: 'Career & DORA Hub', icon: LayoutDashboard }
        ];
      default:
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'Learn DevOps', icon: BookOpen }
        ];
    }
  };

  const navLinks = getNavLinks();
  const currentRoleInfo = rolePermissions[currentUser.role];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 select-none shadow-sm">
      {/* Top Header Bar - Full Width with balanced padding */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
        {/* Left: Clean Brand Title (NO ICON, crisp typography) */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-extrabold text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            DevOps Navigator
          </span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            v2.2
          </span>
        </div>

        {/* Center / Right: Persona Switcher & Search */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* User Persona & Switcher Button */}
          <button
            onClick={onOpenAuth}
            title="Click to Switch Persona or Login/Signup"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shadow-xs"
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

      {/* Horizontal Navigation Tabs (Full Width Clean Style) */}
      <div className="border-t border-slate-100 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-medium scrollbar-none py-0.5">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/40'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>

                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Persona Access Partition Notice */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-500">Access Tier:</span>
            <span className={`px-2.5 py-0.5 rounded-full border font-semibold ${currentRoleInfo.badgeClass}`}>
              {currentRoleInfo.roleTitle} View
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
