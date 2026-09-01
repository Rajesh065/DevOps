import React from 'react';
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Server,
  Cloud,
  Layers,
  FileCode,
  Box,
  Star,
  GitCompare,
  ShieldCheck,
  Calendar,
  Code
} from 'lucide-react';
import { Platform } from '../types/navigator';
import { YamlCodeViewer } from '../components/YamlCodeViewer';

interface PlatformDetailPageProps {
  platform: Platform;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
  onCompareToggle?: (id: string) => void;
  isCompared?: boolean;
}

export const PlatformDetailPage: React.FC<PlatformDetailPageProps> = ({
  platform,
  isBookmarked,
  onToggleBookmark,
  onBack,
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-[#30363d] text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Platforms Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {onCompareToggle && (
            <button
              onClick={() => onCompareToggle(platform.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
                isCompared
                  ? 'bg-[#58a6ff]/20 text-[#58a6ff] border-[#58a6ff]/40 font-bold'
                  : 'bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border-[#30363d]'
              }`}
            >
              {isCompared ? '✓ Added to Compare' : '+ Add to Compare'}
            </button>
          )}

          <button
            onClick={() => onToggleBookmark(platform.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
              isBookmarked
                ? 'bg-[#8957e5]/20 text-[#a371f7] border-[#8957e5]/40'
                : 'bg-[#21262d] text-[#e6edf3] hover:bg-[#30363d] border-[#30363d]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Platform'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3] tracking-tight">
                {platform.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                {platform.difficulty}
              </span>
            </div>
            <p className="text-sm text-[#8b949e] mt-1 font-sans">{platform.tagline}</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href={platform.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#e6edf3] border border-[#30363d] flex items-center gap-1.5 transition-colors"
            >
              <span>Official Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8b949e]" />
            </a>
            <a
              href={platform.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Specs Matrix Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#21262d] text-xs font-mono">
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] text-[11px] block">License Type</span>
            <span className="text-[#e6edf3] font-bold">{platform.licenseType}</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] text-[11px] block">Deployment</span>
            <span className="text-[#58a6ff] font-bold">{platform.deploymentType}</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] text-[11px] block">Initial Release</span>
            <span className="text-[#e6edf3] font-bold">{platform.releaseYear}</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] text-[11px] block">Community Rating</span>
            <span className="text-[#3fb950] font-bold">★ {platform.rating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Overview & Architecture Details */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#e6edf3] uppercase tracking-wider font-mono text-xs">
            Architecture & Overview
          </h2>
          <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
            {platform.fullDescription}
          </p>
        </div>

        {/* Best For Callout */}
        <div className="p-4 rounded-lg bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-xs text-[#c9d1d9]">
          <span className="text-[#58a6ff] font-bold font-mono uppercase text-[11px] block mb-1">
            Best Suited For:
          </span>
          {platform.bestFor}
        </div>

        {/* Ecosystem Support Badges */}
        <div className="space-y-3 pt-2 border-t border-[#21262d]">
          <h3 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Ecosystem Integrations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
            <div className={`p-3 rounded border flex items-center justify-between ${platform.hasDockerSupport ? 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]' : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f85149]'}`}>
              <span>Docker</span>
              <span>{platform.hasDockerSupport ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded border flex items-center justify-between ${platform.hasK8sSupport ? 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]' : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f85149]'}`}>
              <span>Kubernetes</span>
              <span>{platform.hasK8sSupport ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded border flex items-center justify-between ${platform.hasYamlSupport ? 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]' : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f85149]'}`}>
              <span>YAML Config</span>
              <span>{platform.hasYamlSupport ? '✓ Yes' : '✕ DSL'}</span>
            </div>
            <div className={`p-3 rounded border flex items-center justify-between ${platform.isCloudBased ? 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]' : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f85149]'}`}>
              <span>Cloud SaaS</span>
              <span>{platform.isCloudBased ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded border flex items-center justify-between ${platform.isSelfHosted ? 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]' : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f85149]'}`}>
              <span>Self-Hosted</span>
              <span>{platform.isSelfHosted ? '✓ Yes' : '✕ No'}</span>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="space-y-3 pt-2 border-t border-[#21262d]">
          <h3 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Core Features & Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {platform.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#c9d1d9] bg-[#0d1117] p-3 rounded border border-[#30363d]">
                <span className="text-[#3fb950] font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#21262d]">
          {/* Pros */}
          <div className="space-y-3 bg-[#0d1117] p-4 rounded-lg border border-[#238636]/30">
            <h4 className="text-xs font-bold text-[#3fb950] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Advantages (Pros)</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#c9d1d9]">
              {platform.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#3fb950] font-bold">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-3 bg-[#0d1117] p-4 rounded-lg border border-[#da3633]/30">
            <h4 className="text-xs font-bold text-[#f85149] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Trade-offs & Limitations (Cons)</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#c9d1d9]">
              {platform.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#f85149] font-bold">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sample Pipeline Code Block */}
        <div className="space-y-2 pt-2 border-t border-[#21262d]">
          <h3 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Sample Pipeline Configuration
          </h3>
          <p className="text-xs text-[#8b949e]">{platform.sampleYaml.explanation}</p>
          <YamlCodeViewer
            filename={platform.sampleYaml.filename}
            code={platform.sampleYaml.code}
          />
        </div>
      </div>
    </div>
  );
};
