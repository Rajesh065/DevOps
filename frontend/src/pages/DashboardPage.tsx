import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle2,
  Bookmark,
  History,
  RotateCcw,
  ArrowRight,
  Trash2,
  Award,
  Code2,
  Briefcase,
  Building2,
  GraduationCap,
  Copy,
  Check
} from 'lucide-react';
import { Platform, LearningTopic, UserAccount } from '../types/navigator';
import { rolePermissions } from '../data/personasData';

interface DashboardPageProps {
  topics: LearningTopic[];
  platforms: Platform[];
  completedLessonIds: string[];
  bookmarkedPlatformIds: string[];
  recentlyViewedIds: string[];
  onToggleComplete: (topicId: string) => void;
  onToggleBookmark: (platformId: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  onNavigate: (page: string, param?: string) => void;
  onResetProgress: () => void;
  currentUser: UserAccount;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  topics,
  platforms,
  completedLessonIds,
  bookmarkedPlatformIds,
  recentlyViewedIds,
  onToggleComplete,
  onToggleBookmark,
  onSelectPlatform,
  onNavigate,
  onResetProgress,
  currentUser
}) => {
  const completedCount = completedLessonIds.length;
  const totalLessons = topics.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  const bookmarkedPlatforms = platforms.filter(p => bookmarkedPlatformIds.includes(p.id));
  const recentlyViewedPlatforms = platforms.filter(p => recentlyViewedIds.includes(p.id));
  const currentRoleInfo = rolePermissions[currentUser.role] || rolePermissions.student;

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base font-mono">
              {currentUser.avatarText || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${currentRoleInfo.badgeClass}`}>
                  {currentRoleInfo.roleTitle}
                </span>
                <span className="text-xs text-slate-500 font-mono">• {currentUser.joinedDate}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentUser.name}'s Workspace Dashboard
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentRoleInfo.primaryFocus} • {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all your learning progress and bookmarks?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-xs font-mono text-slate-600 border border-slate-200 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Local Data</span>
          </button>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          {/* Card 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Curriculum Progress</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{progressPercent}%</div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Completed Lessons</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-blue-600">
              {completedCount} <span className="text-xs font-normal text-slate-500">/ {totalLessons}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              {totalLessons - completedCount} lessons remaining
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Saved Bookmarks</span>
              <Bookmark className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-purple-600">
              {bookmarkedPlatforms.length}
            </div>
            <button
              onClick={() => onNavigate('bookmarks')}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-mono font-medium"
            >
              <span>View Bookmarks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Role Permissions</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 truncate">
              {currentRoleInfo.roleTitle}
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Custom Workspace Active</p>
          </div>
        </div>
      </div>

      {/* Role-Specific Content Section */}
      {currentUser.role === 'developer' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Developer Fast Actions & Pipeline Generators</h2>
            </div>
            <button
              onClick={() => onNavigate('yaml-gen')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Open YAML Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div onClick={() => onNavigate('yaml-gen')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 cursor-pointer space-y-1">
              <span className="font-bold text-slate-900 block">Node.js GitHub Actions</span>
              <span className="text-slate-500 text-[11px]">TypeScript, Vitest & Docker build</span>
            </div>
            <div onClick={() => onNavigate('yaml-gen')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 cursor-pointer space-y-1">
              <span className="font-bold text-slate-900 block">Python Pytest Pipeline</span>
              <span className="text-slate-500 text-[11px]">FastAPI, Pytest coverage & K8s deploy</span>
            </div>
            <div onClick={() => onNavigate('yaml-gen')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 cursor-pointer space-y-1">
              <span className="font-bold text-slate-900 block">GitLab CI Multi-Stage</span>
              <span className="text-slate-500 text-[11px]">Test, container package & rollout</span>
            </div>
          </div>
        </div>
      )}

      {currentUser.role === 'architect' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">Platform Architect Evaluation & TCO ROI</h2>
            </div>
            <button
              onClick={() => onNavigate('governance')}
              className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Open TCO Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 font-mono">Side-by-Side Platform Matrix</h4>
              <p className="text-slate-600">Compare Jenkins, GitHub Actions, GitLab CI, ArgoCD across 13 enterprise governance criteria.</p>
              <button onClick={() => onNavigate('compare')} className="text-xs text-blue-600 font-semibold hover:underline font-mono">
                Launch Matrix →
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 font-mono">Cloud SaaS vs Self-Hosted ROI</h4>
              <p className="text-slate-600">Calculate annual compute, license, and sysadmin maintenance costs based on team size.</p>
              <button onClick={() => onNavigate('governance')} className="text-xs text-blue-600 font-semibold hover:underline font-mono">
                Calculate TCO →
              </button>
            </div>
          </div>
        </div>
      )}

      {currentUser.role === 'jobseeker' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">Job Aspirant Career Hub & Interview Readiness</h2>
            </div>
            <button
              onClick={() => onNavigate('interview-prep')}
              className="text-xs text-purple-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Practice 25+ Interview Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div onClick={() => onNavigate('interview-prep')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 cursor-pointer space-y-1">
              <span className="font-bold text-purple-700 block">Scenario Technical Q&A</span>
              <span className="text-slate-500 text-[11px]">Canary, GitOps, DORA metrics</span>
            </div>
            <div onClick={() => onNavigate('master-quiz')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 cursor-pointer space-y-1">
              <span className="font-bold text-purple-700 block">30 Qs Readiness Test</span>
              <span className="text-slate-500 text-[11px]">Instant score breakdown</span>
            </div>
            <div onClick={() => onNavigate('interview-prep')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 cursor-pointer space-y-1">
              <span className="font-bold text-purple-700 block">Resume Bullet Points</span>
              <span className="text-slate-500 text-[11px]">1-click copy to LinkedIn/CV</span>
            </div>
          </div>
        </div>
      )}

      {/* Main 2-Column Section: Curriculum Checklist + Saved Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Curriculum Checklist */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">DevOps Curriculum Checklist</h2>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Go to Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {topics.map((topic) => {
              const isDone = completedLessonIds.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleComplete(topic.id)}
                      title={isDone ? 'Mark as Incomplete' : 'Mark as Complete'}
                      className="text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`}
                      />
                    </button>
                    <div>
                      <h3
                        onClick={() => onNavigate('learn', topic.slug)}
                        className={`text-xs font-semibold cursor-pointer hover:underline ${
                          isDone ? 'text-slate-400 line-through' : 'text-slate-900'
                        }`}
                      >
                        {topic.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">{topic.estimatedTime} • {topic.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('learn', topic.slug)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 border border-slate-200 transition-colors"
                  >
                    Open
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Bookmarked Platforms */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">Saved Platforms ({bookmarkedPlatforms.length})</h2>
            </div>
            <button
              onClick={() => onNavigate('platforms')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {bookmarkedPlatforms.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <Bookmark className="w-6 h-6 mx-auto opacity-40" />
              <p>No platforms bookmarked yet.</p>
              <button
                onClick={() => onNavigate('platforms')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs border border-slate-200 font-medium"
              >
                Browse Platforms
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookmarkedPlatforms.map((plat) => (
                <div
                  key={plat.id}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onSelectPlatform(plat)}
                        className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                      >
                        {plat.name}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                        {plat.licenseType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{plat.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPlatform(plat)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 border border-slate-200 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onToggleBookmark(plat.id)}
                      title="Remove Bookmark"
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
