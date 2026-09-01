import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  GitFork,
  Check,
  ChevronRight,
  Layers
} from 'lucide-react';

export const LifecycleSimulator: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedStages, setCompletedStages] = useState<number[]>([0]);

  const stages = [
    {
      name: 'Plan',
      tool: 'Jira / Linear',
      command: 'jira issue create --title "Payment Gateway Microservice"',
      output: '[JIRA-1042] User Story Created: "As a customer, I want instant checkout." Priority: High -> Sprint Backlog Ready.',
      details: 'Product team defines requirements, breaks tasks into sprint tickets, and establishes Acceptance Criteria.'
    },
    {
      name: 'Code',
      tool: 'Git & GitHub',
      command: 'git checkout -b feat/payment-api && git commit -m "feat(payment): add stripe webhook"',
      output: '[feat/payment-api 9a38f02] feat(payment): add stripe webhook handler\n 3 files changed, 240 insertions(+)\n Branch pushed to origin/feat/payment-api -> PR #402 opened.',
      details: 'Developer authors clean code on short-lived feature branch and opens peer Pull Request with automated lint checks.'
    },
    {
      name: 'Build',
      tool: 'Docker & BuildKit',
      command: 'docker build -t registry.io/payment-api:v2.4.0 .',
      output: '[+] Building 4.2s (8/8) FINISHED\n => [internal] load build definition from Dockerfile\n => => naming to registry.io/payment-api:v2.4.0 (14.2 MB)\n Immutable OCI Container Image Built Successfully.',
      details: 'Compiles TypeScript runtime and packages application into an immutable container image ready for distribution.'
    },
    {
      name: 'Test',
      tool: 'Vitest & Trivy Scanner',
      command: 'npm run test:ci && trivy image registry.io/payment-api:v2.4.0',
      output: '✓ src/tests/payment.spec.ts (14 tests passed)\n✓ src/tests/auth.spec.ts (12 tests passed)\n[TRIVY] 0 CRITICAL, 0 HIGH vulnerabilities found in container base image.',
      details: 'Automated test suite validates logic, unit test assertions, and security scanners verify zero CVE vulnerabilities.'
    },
    {
      name: 'Release',
      tool: 'Semantic Release & Helm',
      command: 'helm package k8s/helm/payment-api --version 2.4.0',
      output: 'Successfully packaged chart and saved it to: ./payment-api-2.4.0.tgz\nRelease Tag v2.4.0 published with automated changelog.',
      details: 'Generates versioned Helm charts and semantic Git release tags with changelogs.'
    },
    {
      name: 'Deploy',
      tool: 'ArgoCD (GitOps Canary)',
      command: 'argocd app sync payment-api-prod --strategy canary',
      output: 'Syncing application: payment-api-prod (Revision: v2.4.0)\n[CANARY] 10% traffic shifted to new pods -> Prometheus health OK\n[CANARY] 100% traffic promoted. Deployment healthy.',
      details: 'ArgoCD pulls declared Git manifests and executes a progressive Canary rollout without downtime.'
    },
    {
      name: 'Operate',
      tool: 'Kubernetes HPA & Vault',
      command: 'kubectl get hpa payment-api-hpa --namespace production',
      output: 'NAME              REFERENCE                TARGETS   MINPODS   MAXPODS   REPLICAS\npayment-api-hpa   Deployment/payment-api   42%/70%   3         10        5\nDynamic HashiCorp Vault secrets rotated successfully.',
      details: 'Kubernetes Horizontal Pod Autoscaler dynamically scales pods based on traffic while Vault manages secret leases.'
    },
    {
      name: 'Monitor',
      tool: 'Prometheus & Grafana',
      command: 'curl -s http://prometheus:9090/api/v1/query?query=http_requests_total',
      output: '{"status":"success","data":{"result":[{"metric":{"job":"payment-api"},"value":[1725213000,"412.5 req/sec"]}]}}\nP99 Latency: 28ms • Error Rate: 0.00% • SLO Status: 99.99% Met.',
      details: 'Continuous telemetry collection tracks SRE golden signals and feeds operational insights back into sprint planning.'
    }
  ];

  const handleSimulateStage = (index: number) => {
    setIsRunning(true);
    setActiveStageIndex(index);

    setTimeout(() => {
      setIsRunning(false);
      setCompletedStages(prev => Array.from(new Set([...prev, index])));
    }, 400);
  };

  const handleRunAll = () => {
    let current = 0;
    const interval = setInterval(() => {
      setActiveStageIndex(current);
      setCompletedStages(prev => Array.from(new Set([...prev, current])));
      current++;
      if (current >= stages.length) {
        clearInterval(interval);
      }
    }, 600);
  };

  const handleReset = () => {
    setActiveStageIndex(0);
    setCompletedStages([0]);
  };

  const currentStage = stages[activeStageIndex];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold mb-1">
            <Play className="w-4 h-4" />
            <span>Interactive Student Simulation Lab</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Real-Time 8-Stage DevOps Lifecycle Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any phase to trigger live simulated terminal commands and observe how DevOps works in production.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAll}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate All 8 Stages</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 8 Stage Interactive Progress Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stg, idx) => {
          const isSelected = activeStageIndex === idx;
          const isDone = completedStages.includes(idx);

          return (
            <button
              key={stg.name}
              onClick={() => handleSimulateStage(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-600 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-500">0{idx + 1}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </div>
              <div className="font-bold text-xs text-slate-900">{stg.name}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1">{stg.tool}</div>
            </button>
          );
        })}
      </div>

      {/* Live Stage Terminal Output Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-md">
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-bold text-xs">
              Phase {activeStageIndex + 1}: {currentStage.name} Simulator ({currentStage.tool})
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            {isRunning ? 'Executing...' : 'STATUS: SUCCESS ✓'}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sky-300">
            <span className="text-slate-500 select-none">$</span>
            <span>{currentStage.command}</span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg text-slate-300 text-xs leading-relaxed whitespace-pre-line">
            {currentStage.output}
          </div>

          <div className="text-slate-400 text-[11px] font-sans border-t border-slate-800 pt-2 flex items-center gap-1.5">
            <span className="text-blue-400 font-bold font-mono">Concept:</span>
            <span>{currentStage.details}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
