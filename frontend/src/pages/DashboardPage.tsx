import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Clock,
  History,
  RotateCcw,
  ArrowRight,
  Trash2,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';
import { Platform, LearningTopic } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';

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
  onResetProgress
}) => {
  const completedCount = completedLessonIds.length;
  const totalLessons = topics.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  const bookmarkedPlatforms = platforms.filter(p => bookmarkedPlatformIds.includes(p.id));
  const recentlyViewedPlatforms = platforms.filter(p => recentlyViewedIds.includes(p.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff] mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>Personal Learning & Bookmark Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3]">
              User Learning Dashboard
            </h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Track your DevOps curriculum progress, saved platform bookmarks, and activity history locally.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all your learning progress and bookmarks?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#da3633]/20 hover:text-[#f85149] text-xs font-mono text-[#8b949e] border border-[#30363d] transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Local Data</span>
          </button>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#21262d]">
          {/* Card 1: Overall Progress */}
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>Curriculum Progress</span>
              <Award className="w-4 h-4 text-[#3fb950]" />
            </div>
            <div className="text-2xl font-extrabold text-[#e6edf3]">{progressPercent}%</div>
            <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden border border-[#30363d]">
              <div
                className="bg-[#3fb950] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Completed Lessons */}
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>Completed Lessons</span>
              <CheckCircle2 className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <div className="text-2xl font-extrabold text-[#58a6ff]">
              {completedCount} <span className="text-xs font-normal text-[#8b949e]">/ {totalLessons}</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-mono">
              {totalLessons - completedCount} lessons remaining
            </p>
          </div>

          {/* Card 3: Saved Bookmarks */}
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>Bookmarked Platforms</span>
              <Bookmark className="w-4 h-4 text-[#a371f7]" />
            </div>
            <div className="text-2xl font-extrabold text-[#a371f7]">
              {bookmarkedPlatforms.length}
            </div>
            <button
              onClick={() => onNavigate('bookmarks')}
              className="text-[11px] text-[#58a6ff] hover:underline flex items-center gap-1 font-mono"
            >
              <span>View Bookmarks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 4: Recently Viewed */}
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span>Recently Viewed</span>
              <History className="w-4 h-4 text-[#d29922]" />
            </div>
            <div className="text-2xl font-extrabold text-[#d29922]">
              {recentlyViewedPlatforms.length}
            </div>
            <p className="text-[11px] text-[#8b949e] font-mono">Platforms explored</p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Completed Lessons Checklist */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#58a6ff]" />
              <h2 className="text-base font-bold text-[#e6edf3]">DevOps Curriculum Progress</h2>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1"
            >
              <span>Go to Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#21262d]">
            {topics.map((topic) => {
              const isDone = completedLessonIds.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#1c2128] px-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleComplete(topic.id)}
                      title={isDone ? 'Mark as Incomplete' : 'Mark as Complete'}
                      className="text-[#8b949e] hover:text-[#3fb950] transition-colors"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${isDone ? 'text-[#3fb950] fill-[#238636]/20' : 'text-[#30363d]'}`}
                      />
                    </button>
                    <div>
                      <h3
                        onClick={() => onNavigate('learn', topic.slug)}
                        className={`text-xs font-semibold cursor-pointer hover:underline ${
                          isDone ? 'text-[#8b949e] line-through' : 'text-[#e6edf3]'
                        }`}
                      >
                        {topic.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#8b949e]">{topic.estimatedTime} • {topic.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('learn', topic.slug)}
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[11px] font-mono text-[#c9d1d9] border border-[#30363d] transition-colors"
                  >
                    Open
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Bookmarked Platforms */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#a371f7]" />
              <h2 className="text-base font-bold text-[#e6edf3]">Saved Platforms ({bookmarkedPlatforms.length})</h2>
            </div>
            <button
              onClick={() => onNavigate('platforms')}
              className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {bookmarkedPlatforms.length === 0 ? (
            <div className="py-12 text-center text-[#8b949e] text-xs space-y-2">
              <Bookmark className="w-6 h-6 mx-auto opacity-40" />
              <p>No platforms bookmarked yet.</p>
              <button
                onClick={() => onNavigate('platforms')}
                className="px-3 py-1.5 rounded bg-[#21262d] text-[#e6edf3] text-xs border border-[#30363d]"
              >
                Browse Platforms
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#21262d]">
              {bookmarkedPlatforms.map((plat) => (
                <div
                  key={plat.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#1c2128] px-2 rounded transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onSelectPlatform(plat)}
                        className="text-xs font-bold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer"
                      >
                        {plat.name}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#21262d] text-[#8b949e]">
                        {plat.licenseType}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8b949e] line-clamp-1">{plat.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPlatform(plat)}
                      className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[11px] font-mono text-[#c9d1d9] border border-[#30363d] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onToggleBookmark(plat.id)}
                      title="Remove Bookmark"
                      className="p-1 text-[#8b949e] hover:text-[#f85149] transition-colors"
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

      {/* Bottom Section: Recently Viewed Platforms */}
      {recentlyViewedPlatforms.length > 0 && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-[#30363d]">
            <History className="w-4 h-4 text-[#d29922]" />
            <h2 className="text-base font-bold text-[#e6edf3]">Recently Viewed Platforms</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyViewedPlatforms.map((plat) => (
              <div
                key={plat.id}
                onClick={() => onSelectPlatform(plat)}
                className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e] cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#e6edf3]">{plat.name}</h3>
                  <span className="text-[10px] font-mono text-[#3fb950]">{plat.difficulty}</span>
                </div>
                <p className="text-[11px] text-[#8b949e] line-clamp-1">{plat.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
