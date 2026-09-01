import React, { useState } from 'react';
import { Bookmark, Layers, Search, Trash2, ArrowRight } from 'lucide-react';
import { Platform } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';

interface BookmarksPageProps {
  platforms: Platform[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  onNavigate: (page: string) => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  platforms,
  bookmarkedIds,
  onToggleBookmark,
  onSelectPlatform,
  onNavigate,
  comparedIds,
  onToggleCompare
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const bookmarkedPlatforms = platforms.filter(p => bookmarkedIds.includes(p.id));

  const filtered = bookmarkedPlatforms.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#a371f7] mb-1">
              <Bookmark className="w-4 h-4" />
              <span>Saved CI/CD Platforms Collection</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3]">
              Your Bookmarked Platforms ({bookmarkedPlatforms.length})
            </h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Quick access to your preferred automation engines, saved locally in your browser.
            </p>
          </div>

          <button
            onClick={() => onNavigate('platforms')}
            className="px-3.5 py-2 rounded bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white flex items-center gap-2 transition-colors self-start sm:self-auto shadow-sm"
          >
            <Layers className="w-4 h-4" />
            <span>Browse All Platforms</span>
          </button>
        </div>

        {/* Search bar inside bookmarks */}
        {bookmarkedPlatforms.length > 0 && (
          <div className="pt-2 border-t border-[#21262d]">
            <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] focus-within:border-[#58a6ff] px-3 py-2 rounded-md transition-colors max-w-md">
              <Search className="w-4 h-4 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Search within saved bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] w-full text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bookmarks Grid or Empty State */}
      {bookmarkedPlatforms.length === 0 ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#8b949e] mx-auto">
            <Bookmark className="w-6 h-6 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#e6edf3]">No bookmarks saved yet</h3>
            <p className="text-xs text-[#8b949e] max-w-sm mx-auto">
              Explore the CI/CD platforms catalog and click the bookmark icon on any platform to save it here for quick reference.
            </p>
          </div>
          <button
            onClick={() => onNavigate('platforms')}
            className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#e6edf3] rounded border border-[#30363d] inline-flex items-center gap-2 transition-colors"
          >
            <span>Explore CI/CD Platforms</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#58a6ff]" />
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-12 text-center space-y-2">
          <p className="text-xs text-[#8b949e]">No saved bookmarks match "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#58a6ff] hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((plat) => (
            <PlatformCard
              key={plat.id}
              platform={plat}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onSelectPlatform={onSelectPlatform}
              onCompareToggle={onToggleCompare}
              isCompared={comparedIds.includes(plat.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
