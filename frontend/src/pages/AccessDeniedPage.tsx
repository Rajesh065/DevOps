import React from 'react';
import { Lock, ArrowRight, ShieldAlert, UserCheck } from 'lucide-react';
import { UserAccount, UserRole } from '../types/navigator';
import { rolePermissions } from '../data/personasData';

interface AccessDeniedPageProps {
  currentUser: UserAccount;
  targetPage: string;
  onSwitchRole: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({
  currentUser,
  targetPage,
  onSwitchRole,
  onNavigateHome
}) => {
  const getRequiredRole = (page: string): UserRole => {
    if (['learn', 'student-dashboard'].includes(page)) return 'student';
    if (['yaml-gen', 'bookmarks'].includes(page)) return 'developer';
    if (['compare', 'governance'].includes(page)) return 'architect';
    if (['interview-prep', 'aspirant-hub'].includes(page)) return 'jobseeker';
    return 'developer';
  };

  const requiredRole = getRequiredRole(targetPage);
  const requiredRoleInfo = rolePermissions[requiredRole];
  const currentRoleInfo = rolePermissions[currentUser.role];

  return (
    <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-xl p-8 text-center space-y-5 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
        <Lock className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs text-amber-600 font-bold tracking-wider uppercase">
          403 • Role Restricted Area
        </span>
        <h2 className="text-xl font-extrabold text-slate-900">
          Access Exclusively Reserved for {requiredRoleInfo.roleTitle}
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          You are currently signed in as <strong className="text-slate-900">{currentUser.name}</strong> ({currentRoleInfo.roleTitle}). This feature is partitioned for {requiredRoleInfo.roleTitle}s.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-1">
        <span className="font-bold text-slate-900 font-mono block text-[11px]">
          Target Tool Permissions:
        </span>
        <p className="text-slate-600 text-xs">{requiredRoleInfo.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onSwitchRole(requiredRole)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <UserCheck className="w-4 h-4" />
          <span>Switch to {requiredRoleInfo.roleTitle} Persona</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-4 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};
