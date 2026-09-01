import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  X,
  LayoutGrid,
  List
} from 'lucide-react';
import { Platform } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';

interface PlatformsPageProps {
  platforms: Platform[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const PlatformsPage: React.FC<PlatformsPageProps> = ({
  platforms,
  bookmarkedIds,
  onToggleBookmark,
  onSelectPlatform,
  comparedIds,
  onToggleCompare,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [licenseFilter, setLicenseFilter] = useState<string>('All');
  const [deploymentFilter, setDeploymentFilter] = useState<string>('All');
  const [yamlOnly, setYamlOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((plat) => {
      const matchesSearch =
        plat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty = difficultyFilter === 'All' || plat.difficulty === difficultyFilter;
      const matchesLicense =
        licenseFilter === 'All' ||
        (licenseFilter === 'Open Source' ? plat.isOpenSource : !plat.isOpenSource);
      const matchesDeployment =
        deploymentFilter === 'All' ||
        (deploymentFilter === 'Cloud' ? plat.isCloudBased : plat.isSelfHosted);
      const matchesYaml = !yamlOnly || plat.hasYamlSupport;

      return matchesSearch && matchesDifficulty && matchesLicense && matchesDeployment && matchesYaml;
    });
  }, [platforms, searchQuery, difficultyFilter, licenseFilter, deploymentFilter, yamlOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setDifficultyFilter('All');
    setLicenseFilter('All');
    setDeploymentFilter('All');
    setYamlOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    difficultyFilter !== 'All' ||
    licenseFilter !== 'All' ||
    deploymentFilter !== 'All' ||
    yamlOnly;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-1">
              <Layers className="w-4 h-4" />
              <span>CI/CD & Automation Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore CI/CD Platforms</h1>
            <p className="text-xs text-slate-500 mt-1">
              Search, filter, and compare industry-standard build, deployment, and GitOps engines.
            </p>
          </div>

          {comparedIds.length > 0 && (
            <div className="flex items-center gap-3 bg-blue-50/70 p-3 rounded-xl border border-blue-200">
              <span className="text-xs font-mono text-blue-700 font-semibold">
                {comparedIds.length} tools selected
              </span>
              <button
                onClick={() => onNavigate('compare')}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
              >
                Compare Now →
              </button>
            </div>
          )}
        </div>

        {/* Search Input Bar & Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          {/* Search Box */}
          <div className="md:col-span-6 flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white px-3.5 py-2 rounded-xl transition-colors">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name (e.g. Jenkins, GitHub, ArgoCD, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 w-full text-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-blue-600"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Deployment Dropdown */}
          <div className="md:col-span-2">
            <select
              value={deploymentFilter}
              onChange={(e) => setDeploymentFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-blue-600"
            >
              <option value="All">All Deployments</option>
              <option value="Cloud">Cloud (SaaS)</option>
              <option value="Self-Hosted">Self-Hosted</option>
            </select>
          </div>

          {/* License Dropdown */}
          <div className="md:col-span-2">
            <select
              value={licenseFilter}
              onChange={(e) => setLicenseFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-blue-600"
            >
              <option value="All">All Licenses</option>
              <option value="Open Source">Open Source Only</option>
              <option value="Proprietary">SaaS / Commercial</option>
            </select>
          </div>
        </div>

        {/* Secondary Toggles & Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={yamlOnly}
                onChange={(e) => setYamlOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0"
              />
              <span>YAML Pipeline Support Only</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span className="font-mono text-[11px]">{filteredPlatforms.length} platforms found</span>
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms Grid / List */}
      {filteredPlatforms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <Layers className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-900">No matching platforms found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting your active filters to view all platforms.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 rounded-lg border border-slate-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {filteredPlatforms.map((plat) => (
            <PlatformCard
              key={plat.id}
              platform={plat}
              isBookmarked={bookmarkedIds.includes(plat.id)}
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
