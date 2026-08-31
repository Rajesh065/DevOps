import React, { useState } from 'react';
import {
  GitFork,
  Play,
  RotateCw,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Download,
  Terminal as TerminalIcon,
  Layers,
  ArrowUpRight,
  Sparkles,
  GitCommit,
  Check
} from 'lucide-react';
import { PipelineRun, PipelineStage, PipelineStep } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { TerminalViewer } from '../components/TerminalViewer';
import { api } from '../services/api';

interface PipelineViewerProps {
  pipelines: PipelineRun[];
  onRefresh: () => void;
}

export const PipelineViewer: React.FC<PipelineViewerProps> = ({ pipelines, onRefresh }) => {
  const [selectedRunId, setSelectedRunId] = useState<string>(pipelines[0]?.id || 'run-9842');
  const [selectedStageId, setSelectedStageId] = useState<string>('stg-1');
  const [selectedStepId, setSelectedStepId] = useState<string>('stp-1-1');
  const [isTriggering, setIsTriggering] = useState(false);

  const selectedRun = pipelines.find((p) => p.id === selectedRunId) || pipelines[0];
  const selectedStage = selectedRun?.stages.find((s: PipelineStage) => s.id === selectedStageId) || selectedRun?.stages[0];
  const selectedStep = selectedStage?.steps.find((s: PipelineStep) => s.id === selectedStepId) || selectedStage?.steps[0];

  const handleTrigger = async () => {
    setIsTriggering(true);
    try {
      await api.triggerPipeline('pipe-core-release', 'main', 'production');
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTriggering(false);
    }
  };

  const handleApprove = async (stageId: string) => {
    if (!selectedRun) return;
    try {
      await api.approveStage(selectedRun.id, stageId, 'sarah-devops');
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Breadcrumbs & Trigger Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <GitFork className="w-4 h-4 text-[#3fb950]" />
          <span className="hover:underline cursor-pointer">Pipelines</span>
          <span>/</span>
          <span className="font-semibold text-[#e6edf3]">devpulse-core-release</span>
          <span>/</span>
          <span className="font-mono text-[#58a6ff]">#{selectedRun?.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            title="Refresh runs"
            className="p-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] rounded border border-[#30363d] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            disabled={isTriggering}
            onClick={handleTrigger}
            className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isTriggering ? 'Triggering...' : 'Run workflow'}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Bar */}
      {selectedRun && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={selectedRun.status} />
              <div>
                <h3 className="text-sm font-bold text-[#e6edf3]">{selectedRun.commitMessage}</h3>
                <p className="text-[11px] text-[#8b949e] font-mono mt-0.5">
                  Triggered via <span className="text-[#c9d1d9]">{selectedRun.trigger}</span> on branch <span className="text-[#58a6ff]">{selectedRun.branch}</span> ({selectedRun.commitHash})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#8b949e]">
              <div>
                <span className="text-[10px] block">Duration</span>
                <span className="text-[#e6edf3] font-semibold">{selectedRun.durationSeconds || 525}s</span>
              </div>
              <div>
                <span className="text-[10px] block">Started</span>
                <span className="text-[#e6edf3]">{new Date(selectedRun.startedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Clean DAG Stage Graph */}
          <div className="pt-3 border-t border-[#21262d]">
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              {selectedRun.stages.map((stage: PipelineStage, idx: number) => {
                const isSelected = selectedStage?.id === stage.id;

                return (
                  <React.Fragment key={stage.id}>
                    <button
                      onClick={() => {
                        setSelectedStageId(stage.id);
                        setSelectedStepId(stage.steps[0]?.id || '');
                      }}
                      className={`px-3 py-2 rounded-md border text-left min-w-[150px] shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#21262d] border-[#58a6ff] text-[#e6edf3]'
                          : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:border-[#8b949e]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono">Stage {idx + 1}</span>
                        <StatusBadge status={stage.status} size="sm" showIcon={false} />
                      </div>
                      <p className="text-xs font-semibold text-[#e6edf3] truncate">{stage.name}</p>
                      <span className="text-[10px] text-[#8b949e] font-mono">{stage.steps.length} steps</span>

                      {stage.requiresApproval && !stage.approvedBy && stage.status === 'pending' && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(stage.id);
                          }}
                          className="mt-2 text-center py-1 rounded bg-[#9e6a03]/30 text-[#d29922] font-semibold text-[10px] border border-[#9e6a03]/50 hover:bg-[#9e6a03]/50"
                        >
                          Approve Gate
                        </div>
                      )}
                    </button>

                    {idx < selectedRun.stages.length - 1 && (
                      <div className="w-4 h-0.5 bg-[#30363d] shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Stage Steps Breakdown & Live Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Steps list */}
        <div className="lg:col-span-4 bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden divide-y divide-[#30363d]">
          <div className="px-3.5 py-2.5 bg-[#161b22] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
            <span>{selectedStage?.name}</span>
            <span className="font-mono text-[11px]">{selectedStage?.steps.length} tasks</span>
          </div>

          <div className="p-2 space-y-1 bg-[#0d1117]">
            {selectedStage?.steps.map((step: PipelineStep) => {
              const isSelected = selectedStep?.id === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStepId(step.id)}
                  className={`w-full p-2.5 rounded text-left transition-colors flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d]'
                      : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                    <span className="truncate max-w-[180px]">{step.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8b949e]">
                    {step.durationMs ? `${(step.durationMs / 1000).toFixed(0)}s` : '12s'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Integrated Terminal Viewer */}
        <div className="lg:col-span-8">
          <TerminalViewer
            title={`Step: ${selectedStep?.name || 'Output'} (${selectedStep?.command || ''})`}
            logs={selectedStep?.logs || []}
            height="h-96"
          />
        </div>
      </div>
    </div>
  );
};
