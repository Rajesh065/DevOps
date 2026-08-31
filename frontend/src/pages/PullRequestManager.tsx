import React, { useState } from 'react';
import {
  GitPullRequest,
  GitMerge,
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
  MessageSquare,
  FileDiff,
  Tag,
  CornerDownRight
} from 'lucide-react';
import { PullRequest } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';

interface PullRequestManagerProps {
  pullRequests: PullRequest[];
  onRefresh: () => void;
}

export const PullRequestManager: React.FC<PullRequestManagerProps> = ({ pullRequests, onRefresh }) => {
  const [filter, setFilter] = useState<'closed' | 'merged' | 'all'>('closed');
  const [selectedPrId, setSelectedPrId] = useState<number>(108);
  const [activeTab, setActiveTab] = useState<'conversation' | 'commits' | 'checks' | 'files'>('conversation');
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
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-sm">
          <GitPullRequest className="w-5 h-5 text-[#a371f7]" />
          <span className="font-bold text-[#e6edf3]">Pull Requests</span>
          <span className="text-[#8b949e]">/</span>
          <span className="font-mono text-xs text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]">
            {filteredPrs.length} Closed PRs
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] p-1 rounded-md text-xs">
          <button
            onClick={() => setFilter('closed')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              filter === 'closed'
                ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Closed / Merged ({pullRequests.filter(p => p.status === 'closed' || p.status === 'merged').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            All PRs ({pullRequests.length})
          </button>
        </div>
      </div>

      {/* Main Grid: Left PR List, Right Detailed PR view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: PR List */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-md divide-y divide-[#30363d] overflow-hidden">
          <div className="px-3.5 py-2.5 bg-[#161b22] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
            <span>Pull Request Archive</span>
            <span className="font-mono text-[11px]">8 merged</span>
          </div>

          <div className="max-h-[680px] overflow-y-auto divide-y divide-[#21262d]">
            {filteredPrs.map((pr) => {
              const isSelected = selectedPr?.id === pr.id;
              const passedChecks = pr.checks.filter(c => c.status === 'passed').length;

              return (
                <div
                  key={pr.id}
                  onClick={() => {
                    setSelectedPrId(pr.id);
                    setActiveTab('conversation');
                  }}
                  className={`p-3 cursor-pointer text-left transition-colors ${
                    isSelected
                      ? 'bg-[#21262d] border-l-2 border-l-[#a371f7]'
                      : 'hover:bg-[#1c2128]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <GitMerge className="w-4 h-4 text-[#a371f7] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-[#e6edf3] leading-snug hover:text-[#58a6ff] transition-colors line-clamp-1">
                          {pr.title}
                        </h4>
                        <p className="text-[11px] text-[#8b949e] font-mono mt-0.5">
                          #{pr.id} by <span className="text-[#c9d1d9]">{pr.author.username}</span> • {pr.filesChanged} files
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={pr.status} size="sm" showIcon={false} />
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-[#21262d] text-[10px] text-[#8b949e]">
                    <span className="text-[#3fb950] font-mono">
                      ✓ {passedChecks}/{pr.checks.length} checks passed
                    </span>
                    <span className="font-mono">
                      {pr.closedAt ? new Date(pr.closedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Merged'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected PR Details */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-md p-5 shadow-sm space-y-4">
          {selectedPr ? (
            <div className="space-y-4">
              {/* Header Title & Branch Route */}
              <div className="space-y-2 pb-3 border-b border-[#30363d]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-[#e6edf3]">
                    {selectedPr.title} <span className="font-mono text-[#8b949e] font-normal">#{selectedPr.id}</span>
                  </h3>
                  <StatusBadge status={selectedPr.status} />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8b949e]">
                  <span className="bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d] text-[#a371f7]">
                    {selectedPr.sourceBranch}
                  </span>
                  <span>into</span>
                  <span className="bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d] text-[#3fb950]">
                    {selectedPr.targetBranch}
                  </span>
                  <span>•</span>
                  <span>Merged by <span className="text-[#e6edf3] font-semibold">{selectedPr.mergedBy || 'sarah-devops'}</span></span>
                </div>
              </div>

              {/* GitHub Style PR Tabs */}
              <div className="flex items-center gap-1 border-b border-[#30363d] text-xs font-medium">
                <button
                  onClick={() => setActiveTab('conversation')}
                  className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                    activeTab === 'conversation'
                      ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                      : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Conversation</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#30363d] text-[10px] font-mono">
                    {selectedPr.reviews.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('commits')}
                  className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                    activeTab === 'commits'
                      ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                      : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>Commits</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#30363d] text-[10px] font-mono">
                    {selectedPr.commits.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('checks')}
                  className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                    activeTab === 'checks'
                      ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                      : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Checks</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#238636]/20 text-[#3fb950] text-[10px] font-mono">
                    {selectedPr.checks.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('files')}
                  className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                    activeTab === 'files'
                      ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                      : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  <FileDiff className="w-3.5 h-3.5" />
                  <span>Files changed</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#30363d] text-[10px] font-mono">
                    +{selectedPr.linesAdded}
                  </span>
                </button>
              </div>

              {/* Tab 1: Conversation & Description */}
              {activeTab === 'conversation' && (
                <div className="space-y-4">
                  {/* PR Description Box */}
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-xs">
                    <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between text-[#8b949e]">
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedPr.author.avatarUrl}
                          alt={selectedPr.author.username}
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="font-semibold text-[#e6edf3]">{selectedPr.author.username}</span>
                        <span>commented</span>
                      </div>
                      <span className="font-mono text-[10px]">{new Date(selectedPr.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="p-3.5 text-[#c9d1d9] leading-relaxed">
                      {selectedPr.description}
                    </div>
                  </div>

                  {/* Review Comments */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">
                      Reviews & Approvals ({selectedPr.reviews.length})
                    </p>

                    {selectedPr.reviews.map((rev: any) => (
                      <div
                        key={rev.id}
                        className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-xs"
                      >
                        <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={rev.avatarUrl}
                              alt={rev.reviewer}
                              className="w-4 h-4 rounded-full"
                            />
                            <span className="font-semibold text-[#e6edf3]">{rev.reviewer}</span>
                            <span className="text-[#8b949e]">approved these changes</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#3fb950] font-semibold bg-[#238636]/15 px-2 py-0.5 rounded border border-[#238636]/30">
                            APPROVED
                          </span>
                        </div>
                        <div className="p-3 text-[#c9d1d9] leading-relaxed">
                          {rev.comment}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Merge Box */}
                  <div className="p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <GitMerge className="w-5 h-5 text-[#a371f7]" />
                      <div>
                        <p className="font-semibold text-[#e6edf3]">Pull request successfully merged and closed</p>
                        <p className="text-[#8b949e] text-[11px] font-mono mt-0.5">
                          Merged commit {selectedPr.commits[0]?.hash || 'e4f8b91'} into main
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded font-mono text-[11px] text-[#a371f7] bg-[#8957e5]/15 border border-[#8957e5]/30">
                      Closed
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Commits */}
              {activeTab === 'commits' && (
                <div className="space-y-2">
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-md divide-y divide-[#30363d] text-xs font-mono">
                    {selectedPr.commits.map((cmt: any) => (
                      <div key={cmt.hash} className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <GitCommit className="w-4 h-4 text-[#8b949e]" />
                          <div>
                            <span className="text-[#e6edf3] font-sans font-medium">{cmt.message}</span>
                            <p className="text-[#8b949e] text-[10px] mt-0.5">
                              {cmt.author} committed on {new Date(cmt.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] text-[11px] font-bold border border-[#30363d]">
                          {cmt.hash}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Checks */}
              {activeTab === 'checks' && (
                <div className="space-y-2">
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-md divide-y divide-[#30363d] text-xs">
                    {selectedPr.checks.map((chk: any) => (
                      <div key={chk.id} className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                          <div>
                            <span className="font-semibold text-[#e6edf3]">{chk.name}</span>
                            <p className="text-[#8b949e] text-[11px] font-mono mt-0.5">{chk.details}</p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-[#8b949e]">
                          {(chk.durationMs / 1000).toFixed(1)}s
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Files Changed / Diff View */}
              {activeTab === 'files' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#8b949e] text-[11px]">
                    <span>Showing {selectedPr.filesChanged} changed files</span>
                    <span className="text-[#3fb950]">+{selectedPr.linesAdded} lines</span>
                  </div>

                  <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
                    <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between text-[11px] text-[#e6edf3]">
                      <span>src/pipeline/dagExecutionEngine.ts</span>
                      <span className="text-[#3fb950] font-bold">+{selectedPr.linesAdded}</span>
                    </div>
                    <div className="p-3 bg-[#0d1117] text-[11px] leading-relaxed space-y-1">
                      <div className="text-[#8b949e]">@@ -1,8 +1,18 @@</div>
                      <div className="text-[#c9d1d9]">+ export class DagExecutionEngine {'{'}</div>
                      <div className="text-[#3fb950] bg-[#238636]/10 px-1">+   private topologicalSort(graph: Map&lt;string, string[]&gt;): string[] {'{'}</div>
                      <div className="text-[#3fb950] bg-[#238636]/10 px-1">+     const visited = new Set&lt;string&gt;();</div>
                      <div className="text-[#3fb950] bg-[#238636]/10 px-1">+     const result: string[] = [];</div>
                      <div className="text-[#3fb950] bg-[#238636]/10 px-1">+     // Traverse nodes in topological dependency order</div>
                      <div className="text-[#c9d1d9]">+   {'}'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-[#8b949e] text-xs">
              Select a pull request from the archive list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
