import React, { useState } from 'react';
import {
  GitCompare,
  Check,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Platform } from '../types/navigator';

interface ComparePageProps {
  platforms: Platform[];
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectPlatform: (platform: Platform) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  platforms,
  comparedIds,
  onToggleCompare,
  onClearCompare,
  onSelectPlatform
}) => {
  // Default to comparing GitHub Actions vs GitLab CI vs Jenkins if none selected
  const activeComparedIds =
    comparedIds.length > 0
      ? comparedIds
      : ['plat-github-actions', 'plat-gitlab-ci', 'plat-jenkins'];

  const selectedPlatforms = platforms.filter(p => activeComparedIds.includes(p.id));

  const presets = [
    { label: 'GitHub Actions vs GitLab CI vs Jenkins', ids: ['plat-github-actions', 'plat-gitlab-ci', 'plat-jenkins'] },
    { label: 'CircleCI vs Azure Pipelines', ids: ['plat-circleci', 'plat-azure-pipelines'] },
    { label: 'ArgoCD vs Tekton (GitOps & K8s)', ids: ['plat-argocd', 'plat-tekton'] },
    { label: 'Jenkins vs Drone CI (Self-Hosted)', ids: ['plat-jenkins', 'plat-drone-ci'] }
  ];

  const applyPreset = (ids: string[]) => {
    onClearCompare();
    ids.forEach(id => onToggleCompare(id));
  };

  const comparisonRows = [
    { label: 'Category', render: (p: Platform) => p.category },
    { label: 'Difficulty Level', render: (p: Platform) => p.difficulty },
    { label: 'License Type', render: (p: Platform) => p.licenseType },
    { label: 'Deployment Model', render: (p: Platform) => p.deploymentType },
    {
      label: 'Open Source',
      render: (p: Platform) =>
        p.isOpenSource ? <span className="text-[#3fb950] font-bold">✓ 100% Open Source</span> : <span className="text-[#8b949e]">✕ Proprietary / SaaS</span>
    },
    {
      label: 'Cloud SaaS Hosted',
      render: (p: Platform) =>
        p.isCloudBased ? <span className="text-[#3fb950] font-bold">✓ Yes</span> : <span className="text-[#8b949e]">✕ Self-host only</span>
    },
    {
      label: 'Self-Hosted Support',
      render: (p: Platform) =>
        p.isSelfHosted ? <span className="text-[#3fb950] font-bold">✓ Yes</span> : <span className="text-[#8b949e]">✕ No</span>
    },
    {
      label: 'YAML Pipeline Support',
      render: (p: Platform) =>
        p.hasYamlSupport ? <span className="text-[#3fb950] font-bold">✓ Declarative YAML</span> : <span className="text-[#d29922]">Groovy DSL</span>
    },
    {
      label: 'Docker Native Support',
      render: (p: Platform) =>
        p.hasDockerSupport ? <span className="text-[#3fb950] font-bold">✓ Supported</span> : <span className="text-[#8b949e]">✕ Limited</span>
    },
    {
      label: 'Kubernetes Integration',
      render: (p: Platform) =>
        p.hasK8sSupport ? <span className="text-[#3fb950] font-bold">✓ Native K8s</span> : <span className="text-[#8b949e]">✕ Plugin required</span>
    },
    { label: 'Initial Release Year', render: (p: Platform) => `${p.releaseYear}` },
    { label: 'Community Rating', render: (p: Platform) => `★ ${p.rating} / 5.0` },
    { label: 'Best Suited For', render: (p: Platform) => <span className="text-xs text-[#c9d1d9]">{p.bestFor}</span> }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff] mb-1">
              <GitCompare className="w-4 h-4" />
              <span>Side-by-Side Comparison Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3]">Compare CI/CD Platforms</h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Select 2 or 3 platforms to evaluate features, deployment models, and ecosystem capabilities side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearCompare}
              className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] transition-colors"
            >
              Reset Selection
            </button>
          </div>
        </div>

        {/* Platform Selector Checkboxes / Pills */}
        <div className="space-y-2 pt-2 border-t border-[#21262d]">
          <span className="text-xs text-[#8b949e] font-mono block">Select platforms to compare (Max 4):</span>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => {
              const isSelected = activeComparedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => onToggleCompare(p.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#58a6ff]/20 text-[#58a6ff] border-[#58a6ff]/50 shadow-sm'
                      : 'bg-[#0d1117] text-[#8b949e] hover:text-[#e6edf3] border-[#30363d]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-[#8b949e]">
          <span>Popular Presets:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.ids)}
              className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedPlatforms.length === 0 ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-12 text-center space-y-3">
          <GitCompare className="w-8 h-8 text-[#8b949e] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#e6edf3]">No platforms selected for comparison</h3>
          <p className="text-xs text-[#8b949e]">
            Choose at least 2 platforms above to view their side-by-side feature comparison matrix.
          </p>
        </div>
      ) : (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              {/* Header: Platform Names & Actions */}
              <thead>
                <tr className="border-b border-[#30363d] bg-[#0d1117]">
                  <th className="p-4 font-mono text-[11px] text-[#8b949e] uppercase tracking-wider w-48 sticky left-0 bg-[#0d1117] z-10">
                    Platform / Metric
                  </th>
                  {selectedPlatforms.map((p) => (
                    <th key={p.id} className="p-4 min-w-[220px] align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-[#e6edf3]">{p.name}</h3>
                          <span className="text-[10px] text-[#8b949e] line-clamp-1">{p.tagline}</span>
                        </div>
                        <button
                          onClick={() => onToggleCompare(p.id)}
                          title="Remove from comparison"
                          className="p-1 rounded text-[#8b949e] hover:text-[#f85149] hover:bg-[#21262d] transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectPlatform(p)}
                        className="mt-3 w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] font-semibold text-[11px] rounded border border-[#30363d] transition-colors"
                      >
                        View Full Details →
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-[#21262d]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1c2128] transition-colors">
                    <td className="p-3.5 font-mono text-[11px] font-semibold text-[#8b949e] sticky left-0 bg-[#161b22] z-10">
                      {row.label}
                    </td>
                    {selectedPlatforms.map((p) => (
                      <td key={p.id} className="p-3.5 text-xs text-[#e6edf3]">
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
