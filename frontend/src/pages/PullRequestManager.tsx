import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  FileCode,
  GitCommit,
  User,
  Plus,
  Filter,
  Check,
  ArrowRight,
  ExternalLink,
  Lock
} from 'lucide-react';
import { PullRequest } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { api } from '../services/api.js';

interface PullRequestManagerProps {
  pullRequests: PullRequest[];
  onRefresh: () => void;
}

export const PullRequestManager: React.FC<PullRequestManagerProps> = ({ pullRequests, onRefresh }) => {
  const [filter, setFilter] = useState<'all' | 'closed' | 'merged' | 'open'>('closed');
  const [selectedPrId, setSelectedPrId] = useState<number>(108);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredPrs = pullRequests.filter((pr) => {
    if (filter === 'all') return true;
    if (filter === 'closed') return pr.status === 'closed' || pr.status === 'merged';
    return pr.status === filter;
  });

  const selectedPr = pullRequests.find((p) => p.id === selectedPrId) || filteredPrs[0];

  const handleMerge = async (id: number) => {
    setIsSubmitting(true);
    try {
      await api.mergePullRequest(id, 'sarah-devops');
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">Pull Requests & GitOps Gatekeeper</h2>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/30">
              {pullRequests.filter(p => p.status === 'closed' || p.status === 'merged').length} Closed PRs
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated PR lifecycle with Trivy security scanners, Vitest gates, OPA Rego compliance, and immutable Git commit history.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-[#131b2e] border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setFilter('closed')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'closed'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Closed / Merged ({pullRequests.filter(p => p.status === 'closed' || p.status === 'merged').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All PRs ({pullRequests.length})
          </button>
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: PR List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredPrs.map((pr) => {
            const isSelected = selectedPr?.id === pr.id;
            const passedChecks = pr.checks.filter(c => c.status === 'passed').length;

            return (
              <div
                key={pr.id}
                onClick={() => setSelectedPrId(pr.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#18233c] border-purple-500/60 shadow-lg shadow-purple-500/10'
                    : 'bg-[#131b2e] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-400">#{pr.id}</span>
                    <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">
                      {pr.title}
                    </h4>
                  </div>
                  <StatusBadge status={pr.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                  <img
                    src={pr.author.avatarUrl}
                    alt={pr.author.username}
                    className="w-4 h-4 rounded-full"
                  />
                  <span>{pr.author.username}</span>
                  <span>•</span>
                  <span className="font-mono text-emerald-400">+{pr.linesAdded}</span>
                  <span className="font-mono text-rose-400">-{pr.linesDeleted}</span>
                  <span>•</span>
                  <span>{pr.filesChanged} files</span>
                </div>

                {/* Check status badges */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80 text-[10px]">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{passedChecks}/{pr.checks.length} Automated Checks Passed</span>
                  </div>
                  <span className="font-mono text-slate-400">
                    {pr.closedAt ? new Date(pr.closedAt).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected PR Details */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-xl p-6 shadow-sm">
          {selectedPr ? (
            <div className="space-y-6">
              {/* Header Details */}
              <div className="pb-5 border-b border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
                      PR #{selectedPr.id}
                    </span>
                    <StatusBadge status={selectedPr.status} />
                  </div>

                  {selectedPr.status === 'open' && (
                    <button
                      disabled={isSubmitting}
                      onClick={() => handleMerge(selectedPr.id)}
                      className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Merging...' : 'Merge Pull Request'}</span>
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100">{selectedPr.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-[#0f172a] p-3 rounded-lg border border-slate-800">
                  {selectedPr.description}
                </p>

                {/* Branch route pill */}
                <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-300">
                  <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-purple-300">
                    {selectedPr.sourceBranch}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-emerald-300">
                    {selectedPr.targetBranch}
                  </span>
                  <span className="text-slate-400 text-[11px] ml-auto">
                    Merged by <span className="text-slate-200">{selectedPr.mergedBy || 'sarah-devops'}</span>
                  </span>
                </div>
              </div>

              {/* Automated Security & Quality Checks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CI/CD Security & Compliance Checks</span>
                </h4>

                <div className="space-y-2">
                  {selectedPr.checks.map((chk) => (
                    <div
                      key={chk.id}
                      className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-200">{chk.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{chk.details}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {(chk.durationMs / 1000).toFixed(1)}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commits in PR */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-sky-400" />
                  <span>Verified Commits ({selectedPr.commits.length})</span>
                </h4>

                <div className="space-y-2">
                  {selectedPr.commits.map((cmt) => (
                    <div
                      key={cmt.hash}
                      className="p-2.5 rounded-lg bg-[#0f172a] border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-bold">{cmt.hash}</span>
                        <span className="text-slate-300 font-sans">{cmt.message}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {cmt.filesChanged} files
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approvals & Reviews */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Peer Code Reviews & Sign-offs</span>
                </h4>

                <div className="space-y-2">
                  {selectedPr.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.avatarUrl}
                            alt={rev.reviewer}
                            className="w-4 h-4 rounded-full"
                          />
                          <span className="font-semibold text-emerald-300">{rev.reviewer}</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {rev.state}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-1">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              Select a pull request from the list to view check logs and approvals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
