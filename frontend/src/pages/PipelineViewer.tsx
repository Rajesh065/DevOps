import React, { useState } from 'react';
import {
  GitFork,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  RotateCw,
  Terminal as TerminalIcon,
  ChevronRight,
  UserCheck,
  Send
} from 'lucide-react';
import { PipelineRun, PipelineStage, PipelineStep } from '../types/index.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { TerminalViewer } from '../components/TerminalViewer.js';
import { api } from '../services/api.js';

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
  const selectedStage = selectedRun?.stages.find((s) => s.id === selectedStageId) || selectedRun?.stages[0];
  const selectedStep = selectedStage?.steps.find((s) => s.id === selectedStepId) || selectedStage?.steps[0];

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
    <div className="space-y-6">
      {/* Header & Trigger Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">CI/CD Pipeline Orchestrator</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              DAG Visualizer
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Declarative multi-stage pipeline execution engine with automated gates, OPA compliance verification, and log streaming.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Refresh runs"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            disabled={isTriggering}
            onClick={handleTrigger}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isTriggering ? 'Scheduling Run...' : 'Execute Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Runs Selector Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {pipelines.map((run) => (
          <button
            key={run.id}
            onClick={() => {
              setSelectedRunId(run.id);
              setSelectedStageId(run.stages[0]?.id || 'stg-1');
              setSelectedStepId(run.stages[0]?.steps[0]?.id || 'stp-1-1');
            }}
            className={`px-4 py-3 rounded-xl border text-left shrink-0 transition-all ${
              selectedRun?.id === run.id
                ? 'bg-[#18233c] border-emerald-500/60 shadow-md shadow-emerald-500/10'
                : 'bg-[#131b2e] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono text-xs font-bold text-emerald-400">#{run.id}</span>
              <StatusBadge status={run.status} size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-200 line-clamp-1 max-w-[200px]">
              {run.commitMessage}
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">
              {run.branch} • {new Date(run.startedAt).toLocaleTimeString()}
            </p>
          </button>
        ))}
      </div>

      {selectedRun && (
        <div className="space-y-6">
          {/* DAG Pipeline Visualizer Card */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <span>{selectedRun.pipelineName}</span>
                  <span className="font-mono text-xs text-slate-400">({selectedRun.environment})</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Commit: {selectedRun.commitHash} by {selectedRun.author}
                </p>
              </div>
              <StatusBadge status={selectedRun.status} />
            </div>

            {/* Directed Acyclic Graph (DAG) Stage Flow */}
            <div className="flex items-center justify-between overflow-x-auto py-4 px-2 gap-2">
              {selectedRun.stages.map((stage, idx) => {
                const isSelected = selectedStage?.id === stage.id;

                return (
                  <React.Fragment key={stage.id}>
                    <div
                      onClick={() => {
                        setSelectedStageId(stage.id);
                        setSelectedStepId(stage.steps[0]?.id || '');
                      }}
                      className={`p-4 rounded-xl border min-w-[160px] cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#18233c] border-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'bg-[#0f172a] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-400">Stage {idx + 1}</span>
                        <StatusBadge status={stage.status} size="sm" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{stage.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{stage.steps.length} Steps</p>

                      {stage.requiresApproval && !stage.approvedBy && stage.status === 'pending' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(stage.id);
                          }}
                          className="mt-3 w-full py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] rounded transition-all"
                        >
                          Approve Gate
                        </button>
                      )}
                    </div>

                    {idx < selectedRun.stages.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Stage Steps & Live Execution Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Steps in Selected Stage */}
            <div className="lg:col-span-4 bg-[#131b2e] border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  {selectedStage?.name} Steps
                </h4>
                {selectedStage && <StatusBadge status={selectedStage.status} size="sm" />}
              </div>

              <div className="space-y-2">
                {selectedStage?.steps.map((step) => {
                  const isSelected = selectedStep?.id === step.id;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStepId(step.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#18233c] border-emerald-500/60 shadow-sm'
                          : 'bg-[#0f172a] border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{step.name}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate max-w-[180px]">
                          {step.command}
                        </p>
                      </div>
                      <StatusBadge status={step.status} size="sm" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Output Terminal */}
            <div className="lg:col-span-8">
              <TerminalViewer
                title={`Live Logs: ${selectedStep?.name || 'Step Output'} (${selectedStep?.command || ''})`}
                logs={selectedStep?.logs || []}
                height="h-96"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
