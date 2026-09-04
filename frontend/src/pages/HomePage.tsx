import React from 'react';
import {
  BookOpen,
  Layers,
  GitCompare,
  ArrowRight,
  GitFork,
  Check,
  ShieldCheck,
  Award,
  Users,
  Code2,
  Briefcase,
  Building2,
  GraduationCap,
  Sparkles,
  Play
} from 'lucide-react';
import { Platform, LearningTopic, UserAccount } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';
import { LifecycleSimulator } from '../components/LifecycleSimulator';
import { CiCdFlowSimulator } from '../components/CiCdFlowSimulator';
import { rolePermissions } from '../data/personasData';

interface HomePageProps {
  platforms: Platform[];
  learningTopics: LearningTopic[];
  onNavigate: (page: string, param?: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  completedTopicIds: string[];
  onOpenAuth: () => void;
  currentUser: UserAccount;
}

export const HomePage: React.FC<HomePageProps> = ({
  platforms,
  learningTopics,
  onNavigate,
  onSelectPlatform,
  bookmarkedIds,
  onToggleBookmark,
  completedTopicIds,
  onOpenAuth,
  currentUser
}) => {
  const featuredPlatforms = platforms.slice(0, 4);
  const currentRoleInfo = rolePermissions[currentUser.role] || rolePermissions.student;

  const renderPersonaQuickActions = () => {
    switch (currentUser.role) {
      case 'student':
        return (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('learn')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start 6-Module Curriculum</span>
            </button>
            <button
              onClick={() => onNavigate('labs')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-emerald-600" />
              <span>Open Simulation Labs</span>
            </button>
            <button
              onClick={() => onNavigate('master-quiz')}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Take 30 Qs Assessment</span>
            </button>
          </div>
        );

      case 'developer':
        return (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('platforms')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore 8 CI/CD Engines</span>
            </button>
            <button
              onClick={() => onNavigate('yaml-gen')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Generate YAML Pipeline</span>
            </button>
            <button
              onClick={() => onNavigate('labs')}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Execution Playground</span>
            </button>
          </div>
        );

      case 'architect':
        return (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('compare')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Tool Comparison Matrix</span>
            </button>
            <button
              onClick={() => onNavigate('governance')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Cloud SaaS vs Self-Hosted TCO</span>
            </button>
            <button
              onClick={() => onNavigate('labs')}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-amber-600" />
              <span>ArgoCD Canary Lab</span>
            </button>
          </div>
        );

      case 'jobseeker':
        return (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('interview-prep')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>25+ Scenario Interview Q&A</span>
            </button>
            <button
              onClick={() => onNavigate('master-quiz')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>Interview Readiness Quiz</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Portfolio Resume Points</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero Section with Tailored Role Focus */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700">Active Workspace: <strong>{currentRoleInfo.roleTitle}</strong> ({currentUser.name})</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master <span className="text-blue-600">DevOps</span> & Explore the <span className="text-emerald-600">CI/CD</span> Ecosystem
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {currentRoleInfo.description}
          </p>

          {/* Role-tailored action buttons */}
          {renderPersonaQuickActions()}
        </div>

        {/* 4 Interactive Clickable Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100 text-xs font-mono">
          {/* 1. Curriculum Topics */}
          <div
            onClick={() => onNavigate('learn')}
            className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 block text-[11px]">Curriculum Topics</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {learningTopics.length} Modules
            </span>
          </div>

          {/* 2. CI/CD Platforms */}
          <div
            onClick={() => onNavigate('platforms')}
            className="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 block text-[11px]">CI/CD Engines</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-lg font-bold text-blue-600">
              {platforms.length} Platforms
            </span>
          </div>

          {/* 3. Progress Tracking */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="bg-slate-50 hover:bg-emerald-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 block text-[11px]">Your Progress</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <span className="text-lg font-bold text-emerald-600">
              {completedTopicIds.length}/{learningTopics.length} Done
            </span>
          </div>

          {/* 4. Persona Switcher */}
          <div
            onClick={onOpenAuth}
            className="bg-slate-50 hover:bg-purple-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 block text-[11px]">Switch Role (4 Logins)</span>
              <Users className="w-3 h-3 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <span className="text-lg font-bold text-purple-600">
              {currentRoleInfo.roleTitle.split('/')[0]} ⚡
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive CI vs CD vs CD+ Flow Simulator */}
      <CiCdFlowSimulator />

      {/* 3. Interactive Real-Time 8-Stage Lifecycle Simulator */}
      <LifecycleSimulator />

      {/* 4. Featured CI/CD Platforms */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Featured CI/CD Platforms</h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore the most widely used automation and GitOps engines</p>
          </div>
          <button
            onClick={() => onNavigate('platforms')}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All {platforms.length} Platforms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPlatforms.map((plat) => (
            <PlatformCard
              key={plat.id}
              platform={plat}
              isBookmarked={bookmarkedIds.includes(plat.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectPlatform={onSelectPlatform}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
