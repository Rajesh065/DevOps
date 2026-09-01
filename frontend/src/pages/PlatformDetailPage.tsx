import React from 'react';
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  XCircle
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Platforms Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {onCompareToggle && (
            <button
              onClick={() => onCompareToggle(platform.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {isCompared ? '✓ Added to Compare' : '+ Add to Compare'}
            </button>
          )}

          <button
            onClick={() => onToggleBookmark(platform.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isBookmarked
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Platform'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {platform.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border font-semibold ${getDifficultyBadge(platform.difficulty)}`}>
                {platform.difficulty}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 font-sans">{platform.tagline}</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href={platform.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <span>Official Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href={platform.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Specs Matrix Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs font-mono">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">License Type</span>
            <span className="text-slate-900 font-bold">{platform.licenseType}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Deployment</span>
            <span className="text-blue-700 font-bold">{platform.deploymentType}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Initial Release</span>
            <span className="text-slate-900 font-bold">{platform.releaseYear}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Community Rating</span>
            <span className="text-emerald-700 font-bold">★ {platform.rating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Overview & Architecture Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Architecture & Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {platform.fullDescription}
          </p>
        </div>

        {/* Best For Callout */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700">
          <span className="text-blue-700 font-bold font-mono uppercase text-[11px] block mb-1">
            Best Suited For:
          </span>
          {platform.bestFor}
        </div>

        {/* Ecosystem Support Badges */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Ecosystem Integrations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${platform.hasDockerSupport ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
              <span>Docker</span>
              <span>{platform.hasDockerSupport ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${platform.hasK8sSupport ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
              <span>Kubernetes</span>
              <span>{platform.hasK8sSupport ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${platform.hasYamlSupport ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
              <span>YAML Config</span>
              <span>{platform.hasYamlSupport ? '✓ Yes' : '✕ DSL'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${platform.isCloudBased ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
              <span>Cloud SaaS</span>
              <span>{platform.isCloudBased ? '✓ Yes' : '✕ No'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${platform.isSelfHosted ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
              <span>Self-Hosted</span>
              <span>{platform.isSelfHosted ? '✓ Yes' : '✕ No'}</span>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Core Features & Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {platform.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          {/* Pros */}
          <div className="space-y-3 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Advantages (Pros)</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {platform.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-3 bg-rose-50/50 p-5 rounded-2xl border border-rose-200">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Trade-offs & Limitations (Cons)</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {platform.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sample Pipeline Code Block */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Sample Pipeline Configuration
          </h3>
          <p className="text-xs text-slate-500">{platform.sampleYaml.explanation}</p>
          <YamlCodeViewer
            filename={platform.sampleYaml.filename}
            code={platform.sampleYaml.code}
          />
        </div>
      </div>
    </div>
  );
};
