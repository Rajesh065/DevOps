import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Play,
  Award,
  Code2,
  Briefcase,
  Building2,
  ChevronDown,
  Bookmark
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
  // Dynamically tailor the navigation links based on the active Persona Role
  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'Curriculum (6 Modules)', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
          { id: 'labs', label: 'Interactive Demos & Labs', icon: Play, badge: 'Demos' },
          { id: 'master-quiz', label: 'Master Quiz (30 Qs)', icon: Award, badge: 'Score' },
          { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard }
        ];

      case 'developer':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'CI/CD Platforms (8 Tools)', icon: Layers, badge: 'Engines' },
          { id: 'yaml-gen', label: 'YAML Generator', icon: Code2, badge: 'Tool' },
          { id: 'labs', label: 'Execution Playground', icon: Play },
          { id: 'bookmarks', label: 'Saved Templates', icon: Bookmark, badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined },
          { id: 'dashboard', label: 'Developer Dashboard', icon: LayoutDashboard }
        ];

      case 'architect':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'platforms', label: 'Platforms Specs', icon: Layers },
          { id: 'compare', label: 'Compare Matrix', icon: GitCompare, badge: 'Matrix' },
          { id: 'governance', label: 'TCO & Cost Calculator', icon: Building2, badge: 'ROI' },
          { id: 'labs', label: 'ArgoCD Canary Lab', icon: Play },
          { id: 'dashboard', label: 'Architect Dashboard', icon: LayoutDashboard }
        ];

      case 'jobseeker':
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'interview-prep', label: 'Scenario Interview Q&A', icon: Briefcase, badge: '25+ Qs' },
          { id: 'master-quiz', label: 'Interview Readiness Quiz', icon: Award, badge: '30 Qs' },
          { id: 'platforms', label: 'Platforms Review', icon: Layers },
          { id: 'learn', label: 'Foundations Reference', icon: BookOpen },
          { id: 'dashboard', label: 'Career Hub & Resume', icon: LayoutDashboard }
        ];

      default:
        return [
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'learn', label: 'Curriculum', icon: BookOpen }
        ];
    }
  };

  const navLinks = getNavLinks();
  const currentRoleInfo = rolePermissions[currentUser.role] || rolePermissions.student;

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
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${currentRoleInfo.badgeClass}`}>
            {currentRoleInfo.roleTitle}
          </span>
        </div>

        {/* User Account & 4-Persona Switcher Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            title="Click to Switch Persona or Login with Another Account"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shadow-2xs group"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] font-mono">
              {currentUser.avatarText || 'U'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-none group-hover:text-blue-600 transition-colors">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold leading-tight font-mono">
                {currentRoleInfo.roleTitle}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 ml-1" />
          </button>
        </div>
      </div>

      {/* Horizontal Role-Tailored Navigation Tabs */}
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
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
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

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span>Role Focus:</span>
            <span className="text-slate-700 font-bold">{currentRoleInfo.primaryFocus}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
