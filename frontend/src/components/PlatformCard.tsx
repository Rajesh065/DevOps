import React from 'react';
import { Bookmark, ArrowRight, Check } from 'lucide-react';
import { Platform } from '../types/navigator';

interface PlatformCardProps {
  platform: Platform;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  onCompareToggle?: (platformId: string) => void;
  isCompared?: boolean;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  isBookmarked,
  onToggleBookmark,
  onSelectPlatform,
  onCompareToggle,
  isCompared
}) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group">
      {/* Top Header: Platform Name, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                {platform.name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${getDifficultyBadge(platform.difficulty)}`}>
                {platform.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-sans">{platform.tagline}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(platform.id);
            }}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Platform'}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {platform.shortDescription}
        </p>

        {/* Badges strip: Deployment, License, YAML */}
        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            {platform.deploymentType}
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
            {platform.licenseType}
          </span>
          {platform.hasYamlSupport ? (
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              YAML Config
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
              Groovy DSL
            </span>
          )}
        </div>

        {/* Highlight features (Top 3) */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
          {platform.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="text-emerald-600 text-xs font-bold leading-none mt-0.5">✓</span>
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(platform.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-600 font-bold'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isCompared ? '✓ Compared' : '+ Compare'}
          </button>
        )}

        <button
          onClick={() => onSelectPlatform(platform)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
