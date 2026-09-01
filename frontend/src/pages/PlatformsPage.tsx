import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Filter,
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  GitCompare,
  CheckCircle2,
  Bookmark
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
      // Search query
      const matchesSearch =
        plat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plat.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      // Difficulty
      const matchesDifficulty = difficultyFilter === 'All' || plat.difficulty === difficultyFilter;

      // License
      const matchesLicense =
        licenseFilter === 'All' ||
        (licenseFilter === 'Open Source' ? plat.isOpenSource : !plat.isOpenSource);

      // Deployment
      const matchesDeployment =
        deploymentFilter === 'All' ||
        (deploymentFilter === 'Cloud' ? plat.isCloudBased : plat.isSelfHosted);

      // YAML Support
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff] mb-1">
              <Layers className="w-4 h-4" />
              <span>CI/CD & Automation Ecosystem</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3]">Explore CI/CD Platforms</h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Search, filter, and compare industry-standard build, deployment, and GitOps engines.
            </p>
          </div>

          {/* Compare Badge Indicator */}
          {comparedIds.length > 0 && (
            <div className="flex items-center gap-3 bg-[#0d1117] p-2.5 rounded-lg border border-[#58a6ff]/40">
              <span className="text-xs font-mono text-[#58a6ff]">
                {comparedIds.length} platforms selected for comparison
              </span>
              <button
                onClick={() => onNavigate('compare')}
                className="px-3 py-1 bg-[#58a6ff] hover:bg-[#79c0ff] text-[#0d1117] font-bold text-xs rounded transition-colors"
              >
                Compare Now →
              </button>
            </div>
          )}
        </div>

        {/* Search Input Bar & Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-[#21262d]">
          {/* Search Box */}
          <div className="md:col-span-6 flex items-center gap-2 bg-[#0d1117] border border-[#30363d] focus-within:border-[#58a6ff] px-3 py-2 rounded-md transition-colors">
            <Search className="w-4 h-4 text-[#8b949e] shrink-0" />
            <input
              type="text"
              placeholder="Search by name (e.g. Jenkins, GitHub, ArgoCD, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] w-full text-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#8b949e] hover:text-[#e6edf3]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs px-3 py-2 rounded-md outline-none cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Deployment Type Dropdown */}
          <div className="md:col-span-2">
            <select
              value={deploymentFilter}
              onChange={(e) => setDeploymentFilter(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs px-3 py-2 rounded-md outline-none cursor-pointer"
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
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs px-3 py-2 rounded-md outline-none cursor-pointer"
            >
              <option value="All">All Licenses</option>
              <option value="Open Source">Open Source Only</option>
              <option value="Proprietary">SaaS / Commercial</option>
            </select>
          </div>
        </div>

        {/* Secondary Toggles & Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#c9d1d9]">
              <input
                type="checkbox"
                checked={yamlOnly}
                onChange={(e) => setYamlOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-[#0d1117] border-[#30363d] text-[#58a6ff] focus:ring-0"
              />
              <span>YAML Pipeline Support Only</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[#58a6ff] hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#8b949e]">
            <span className="font-mono text-[11px]">{filteredPlatforms.length} platforms found</span>
            <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#21262d] text-[#e6edf3]' : 'text-[#8b949e]'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#21262d] text-[#e6edf3]' : 'text-[#8b949e]'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms Grid / List View */}
      {filteredPlatforms.length === 0 ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-12 text-center space-y-3">
          <Layers className="w-8 h-8 text-[#8b949e] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#e6edf3]">No matching platforms found</h3>
          <p className="text-xs text-[#8b949e] max-w-sm mx-auto">
            Try adjusting your search keywords or resetting your active filters to view all platforms.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#e6edf3] rounded border border-[#30363d] transition-colors"
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
