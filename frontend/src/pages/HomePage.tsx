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
  Users
} from 'lucide-react';
import { Platform, LearningTopic } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';
import { LifecycleSimulator } from '../components/LifecycleSimulator';
import { CiCdFlowSimulator } from '../components/CiCdFlowSimulator';

interface HomePageProps {
  platforms: Platform[];
  learningTopics: LearningTopic[];
  onNavigate: (page: string, param?: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  completedTopicIds: string[];
  onOpenAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  platforms,
  learningTopics,
  onNavigate,
  onSelectPlatform,
  bookmarkedIds,
  onToggleBookmark,
  completedTopicIds,
  onOpenAuth
}) => {
  const featuredPlatforms = platforms.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <span>DevOps Learning & CI/CD Platform Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master <span className="text-blue-600">DevOps</span> & Explore the <span className="text-emerald-600">CI/CD</span> Ecosystem
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to <strong>DevOps Navigator</strong>. Learn core DevOps methodologies, run live simulated pipelines, compare industry-standard CI/CD engines (Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD), and test your knowledge with interactive quizzes.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('learn')}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Curriculum</span>
            </button>

            <button
              onClick={() => onNavigate('platforms')}
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-200 transition-colors"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>CI/CD Platforms</span>
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className="px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Interactive Clickable Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100 text-xs font-mono">
          {/* 1. Curriculum Topics -> Navigates to Learn */}
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

          {/* 2. CI/CD Platforms -> Navigates to Platforms */}
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

          {/* 3. Your Progress -> Navigates to Dashboard */}
          <div
            onClick={() => onNavigate('student-dashboard')}
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

          {/* 4. User Personas -> Opens Persona Switcher Modal */}
          <div
            onClick={onOpenAuth}
            className="bg-slate-50 hover:bg-purple-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 block text-[11px]">User Personas</span>
              <Users className="w-3 h-3 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <span className="text-lg font-bold text-purple-600">
              4 Access Tiers
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
