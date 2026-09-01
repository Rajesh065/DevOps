import React, { useState } from 'react';
import { Bookmark, Layers, Search, ArrowRight } from 'lucide-react';
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
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-1">
              <Bookmark className="w-4 h-4" />
              <span>Saved CI/CD Platforms Collection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Bookmarked Platforms ({bookmarkedPlatforms.length})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Quick access to your preferred automation engines, saved locally in your browser.
            </p>
          </div>

          <button
            onClick={() => onNavigate('platforms')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Layers className="w-4 h-4" />
            <span>Browse All Platforms</span>
          </button>
        </div>

        {bookmarkedPlatforms.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white px-3.5 py-2 rounded-xl transition-colors max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search within saved bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 w-full text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bookmarks Grid or Empty State */}
      {bookmarkedPlatforms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <Bookmark className="w-6 h-6 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No bookmarks saved yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore the CI/CD platforms catalog and click the bookmark icon on any platform to save it here for quick reference.
            </p>
          </div>
          <button
            onClick={() => onNavigate('platforms')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 rounded-lg border border-slate-200 inline-flex items-center gap-2 transition-colors"
          >
            <span>Explore CI/CD Platforms</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-2 shadow-xs">
          <p className="text-xs text-slate-500">No saved bookmarks match "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-blue-600 font-semibold hover:underline"
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
