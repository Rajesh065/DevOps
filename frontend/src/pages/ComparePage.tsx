import React from 'react';
import {
  GitCompare,
  Check,
  X
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
        p.isOpenSource ? <span className="text-emerald-700 font-bold">✓ 100% Open Source</span> : <span className="text-slate-500">✕ Proprietary / SaaS</span>
    },
    {
      label: 'Cloud SaaS Hosted',
      render: (p: Platform) =>
        p.isCloudBased ? <span className="text-emerald-700 font-bold">✓ Yes</span> : <span className="text-slate-500">✕ Self-host only</span>
    },
    {
      label: 'Self-Hosted Support',
      render: (p: Platform) =>
        p.isSelfHosted ? <span className="text-emerald-700 font-bold">✓ Yes</span> : <span className="text-slate-500">✕ No</span>
    },
    {
      label: 'YAML Pipeline Support',
      render: (p: Platform) =>
        p.hasYamlSupport ? <span className="text-emerald-700 font-bold">✓ Declarative YAML</span> : <span className="text-amber-700 font-semibold">Groovy DSL</span>
    },
    {
      label: 'Docker Native Support',
      render: (p: Platform) =>
        p.hasDockerSupport ? <span className="text-emerald-700 font-bold">✓ Supported</span> : <span className="text-slate-500">✕ Limited</span>
    },
    {
      label: 'Kubernetes Integration',
      render: (p: Platform) =>
        p.hasK8sSupport ? <span className="text-emerald-700 font-bold">✓ Native K8s</span> : <span className="text-slate-500">✕ Plugin required</span>
    },
    { label: 'Initial Release Year', render: (p: Platform) => `${p.releaseYear}` },
    { label: 'Community Rating', render: (p: Platform) => `★ ${p.rating} / 5.0` },
    { label: 'Best Suited For', render: (p: Platform) => <span className="text-xs text-slate-700 leading-relaxed">{p.bestFor}</span> }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-1">
              <GitCompare className="w-4 h-4" />
              <span>Side-by-Side Comparison Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Compare CI/CD Platforms</h1>
            <p className="text-xs text-slate-500 mt-1">
              Select 2 or 3 platforms to evaluate features, deployment models, and ecosystem capabilities side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearCompare}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 border border-slate-200 transition-colors"
            >
              Reset Selection
            </button>
          </div>
        </div>

        {/* Platform Selector Checkboxes / Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-600 font-mono font-semibold block">Select platforms to compare (Max 4):</span>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => {
              const isSelected = activeComparedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => onToggleCompare(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
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
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-500">
          <span className="font-semibold text-slate-700">Popular Presets:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.ids)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedPlatforms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <GitCompare className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-900">No platforms selected for comparison</h3>
          <p className="text-xs text-slate-500">
            Choose at least 2 platforms above to view their side-by-side feature comparison matrix.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 font-mono text-[11px] text-slate-600 uppercase tracking-wider w-48 sticky left-0 bg-slate-50 z-10 font-bold">
                    Platform / Metric
                  </th>
                  {selectedPlatforms.map((p) => (
                    <th key={p.id} className="p-4 min-w-[220px] align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">{p.name}</h3>
                          <span className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</span>
                        </div>
                        <button
                          onClick={() => onToggleCompare(p.id)}
                          title="Remove from comparison"
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectPlatform(p)}
                        className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-[11px] rounded-lg transition-colors shadow-xs"
                      >
                        View Full Details →
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">
                      {row.label}
                    </td>
                    {selectedPlatforms.map((p) => (
                      <td key={p.id} className="p-3.5 text-xs text-slate-800">
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
