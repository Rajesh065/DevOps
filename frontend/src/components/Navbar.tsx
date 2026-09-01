import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  LayoutDashboard,
  Play,
  Award,
  User,
  GraduationCap
} from 'lucide-react';
import { UserAccount } from '../types/navigator';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  currentUser: UserAccount;
  completedCount: number;
  totalLessons: number;
  bookmarkCount: number;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  currentUser,
  completedCount,
  totalLessons,
  bookmarkCount,
  onOpenProfile
}) => {
  const navLinks = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'learn', label: 'Curriculum & Lessons', icon: BookOpen, badge: `${completedCount}/${totalLessons}` },
    { id: 'labs', label: 'Interactive Demos & Labs', icon: Play, badge: 'Live Demos' },
    { id: 'platforms', label: 'CI/CD Platforms', icon: Layers, badge: '8 Platforms' },
    { id: 'compare', label: 'Compare Matrix', icon: GitCompare },
    { id: 'master-quiz', label: 'Master Quiz & Score', icon: Award, badge: '30 Qs' },
    { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 select-none shadow-xs">
      {/* Top Header Bar */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
        {/* Brand Title (Clean Text, Student Platform Tag) */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-extrabold text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            DevOps Navigator
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            <span>Student Learning Edition</span>
          </span>
        </div>

        {/* Student Profile Card (Click to open student details) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            title="Student Profile & Learning Stats"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shadow-2xs"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] font-mono">
              {currentUser.avatarText || 'ST'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold leading-tight font-mono">
                🎓 Student Account
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Horizontal Navigation Tabs */}
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

          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span>Lessons Completed:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              {completedCount} / {totalLessons}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
