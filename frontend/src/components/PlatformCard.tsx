import React from 'react';
import { Bookmark, Star, ArrowRight, ExternalLink, Check, Server, Cloud, FileCode, Box } from 'lucide-react';
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
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30';
      case 'Intermediate':
        return 'bg-[#9e6a03]/15 text-[#d29922] border-[#9e6a03]/30';
      case 'Advanced':
        return 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30';
      default:
        return 'bg-[#30363d] text-[#8b949e] border-[#30363d]';
    }
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md group">
      {/* Top Header: Platform Name, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                {platform.name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                {platform.difficulty}
              </span>
            </div>
            <p className="text-xs text-[#8b949e] line-clamp-1 mt-0.5 font-sans">{platform.tagline}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(platform.id);
            }}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Platform'}
            className={`p-1.5 rounded border transition-colors ${
              isBookmarked
                ? 'bg-[#8957e5]/20 text-[#a371f7] border-[#8957e5]/40'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border-[#30363d]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#c9d1d9] leading-relaxed mb-4 line-clamp-2">
          {platform.shortDescription}
        </p>

        {/* Badges strip: Deployment, License, YAML */}
        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">
            {platform.deploymentType}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d]">
            {platform.licenseType}
          </span>
          {platform.hasYamlSupport ? (
            <span className="px-2 py-0.5 rounded bg-[#238636]/10 text-[#3fb950] border border-[#238636]/20">
              YAML Config
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-[#9e6a03]/10 text-[#d29922] border border-[#9e6a03]/20">
              Groovy DSL
            </span>
          )}
        </div>

        {/* Highlight features (Top 3) */}
        <div className="space-y-1.5 border-t border-[#21262d] pt-3 mb-4">
          {platform.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#8b949e]">
              <span className="text-[#3fb950] text-xs font-bold leading-none mt-0.5">✓</span>
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#21262d]">
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(platform.id)}
            className={`px-2.5 py-1.5 rounded text-xs font-mono border transition-colors ${
              isCompared
                ? 'bg-[#58a6ff]/20 text-[#58a6ff] border-[#58a6ff]/40 font-bold'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border-[#30363d]'
            }`}
          >
            {isCompared ? '✓ Compared' : '+ Compare'}
          </button>
        )}

        <button
          onClick={() => onSelectPlatform(platform)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] font-semibold text-xs rounded border border-[#30363d] transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
