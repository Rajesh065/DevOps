import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export const CiCdFlowSimulator: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<'ci' | 'cd-delivery' | 'cd-deployment'>('cd-delivery');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isWaitingManualApproval, setIsWaitingManualApproval] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const startSimulation = (flowType: 'ci' | 'cd-delivery' | 'cd-deployment') => {
    setSelectedFlow(flowType);
    setCurrentStep(1); // Step 1: Code Commit & Lint
    setIsWaitingManualApproval(false);
    setIsSimulating(true);

    setTimeout(() => {
      setCurrentStep(2); // Step 2: Automated Unit Tests
    }, 600);

    setTimeout(() => {
      setCurrentStep(3); // Step 3: Build & Package Container

      if (flowType === 'ci') {
        // CI ends here!
        setTimeout(() => {
          setCurrentStep(4);
          setIsSimulating(false);
        }, 600);
      } else if (flowType === 'cd-delivery') {
        // CD Delivery pauses at Staging for manual human signoff!
        setTimeout(() => {
          setCurrentStep(4); // Staging Deployed
          setIsWaitingManualApproval(true);
          setIsSimulating(false);
        }, 600);
      } else if (flowType === 'cd-deployment') {
        // CD Deployment automatically promotes straight to prod!
        setTimeout(() => {
          setCurrentStep(4); // Staging Deployed
          setTimeout(() => {
            setCurrentStep(5); // Auto Prod Deployed
            setIsSimulating(false);
          }, 600);
        }, 600);
      }
    }, 1200);
  };

  const handleManualApprove = () => {
    setIsWaitingManualApproval(false);
    setIsSimulating(true);
    setTimeout(() => {
      setCurrentStep(5); // Promoted to Production
      setIsSimulating(false);
    }, 500);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsWaitingManualApproval(false);
    setIsSimulating(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-1">
            <Play className="w-4 h-4" />
            <span>Interactive CI vs CD vs CD+ Pipeline Demo</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Compare Live CI / CD Execution Pipelines
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Run each workflow to clearly experience why Continuous Delivery requires a manual approval button while Continuous Deployment is fully autonomous.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 self-start sm:self-auto"
          title="Reset Flow"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Flow Trigger Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => startSimulation('ci')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedFlow === 'ci' && currentStep > 0
              ? 'bg-blue-50/60 border-blue-600 shadow-xs'
              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-blue-700">Workflow 1</span>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
              CI Only
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">Continuous Integration</h4>
          <p className="text-xs text-slate-500 mt-1">
            Validates code via linting and unit tests. Ends at build verification.
          </p>
          <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate CI Pipeline →</span>
          </div>
        </button>

        <button
          onClick={() => startSimulation('cd-delivery')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedFlow === 'cd-delivery' && currentStep > 0
              ? 'bg-emerald-50/60 border-emerald-600 shadow-xs'
              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-emerald-700">Workflow 2</span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Delivery
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">Continuous Delivery</h4>
          <p className="text-xs text-slate-500 mt-1">
            Auto deploys to Staging. Pauses for <strong>Manual Human Approval</strong> before Production.
          </p>
          <div className="mt-3 text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate CD Delivery →</span>
          </div>
        </button>

        <button
          onClick={() => startSimulation('cd-deployment')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedFlow === 'cd-deployment' && currentStep > 0
              ? 'bg-purple-50/60 border-purple-600 shadow-xs'
              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-purple-700">Workflow 3</span>
            <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">
              Deployment
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">Continuous Deployment</h4>
          <p className="text-xs text-slate-500 mt-1">
            100% Autonomous: Every passing commit ships directly to production with zero human gates.
          </p>
          <div className="mt-3 text-xs font-semibold text-purple-700 flex items-center gap-1">
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate CD+ Deployment →</span>
          </div>
        </button>
      </div>

      {/* Live Visual Pipeline DAG Steps */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
        <span className="text-xs font-mono font-bold text-slate-700 block uppercase">
          Live DAG Pipeline Execution Stages:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Step 1: Code & Lint */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${currentStep >= 1 ? 'bg-white border-emerald-300 shadow-xs' : 'bg-slate-100/60 border-slate-200 text-slate-400'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">1. Code & Lint</span>
              {currentStep >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="text-[11px] text-slate-500">git push & ESLint pass</p>
          </div>

          {/* Step 2: Unit Tests */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${currentStep >= 2 ? 'bg-white border-emerald-300 shadow-xs' : 'bg-slate-100/60 border-slate-200 text-slate-400'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">2. Automated Tests</span>
              {currentStep >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="text-[11px] text-slate-500">Vitest 28/28 passed</p>
          </div>

          {/* Step 3: Build Container */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${currentStep >= 3 ? 'bg-white border-emerald-300 shadow-xs' : 'bg-slate-100/60 border-slate-200 text-slate-400'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">3. Build Package</span>
              {currentStep >= 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="text-[11px] text-slate-500">Docker image created</p>
          </div>

          {/* Step 4: Staging Deployment / CI Finish */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${currentStep >= 4 ? 'bg-white border-emerald-300 shadow-xs' : 'bg-slate-100/60 border-slate-200 text-slate-400'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                {selectedFlow === 'ci' ? '4. CI Verified ✓' : '4. Deploy Staging'}
              </span>
              {currentStep >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="text-[11px] text-slate-500">
              {selectedFlow === 'ci' ? 'Artifacts Ready' : 'Staging Kubernetes cluster'}
            </p>
          </div>

          {/* Step 5: Production Deployment */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${currentStep >= 5 ? 'bg-white border-emerald-300 shadow-xs' : selectedFlow === 'ci' ? 'bg-slate-100 border-slate-200 opacity-40' : 'bg-slate-100/60 border-slate-200 text-slate-400'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">5. Production Release</span>
              {currentStep >= 5 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="text-[11px] text-slate-500">
              {selectedFlow === 'ci' ? 'Not part of CI' : 'Live End-User Traffic'}
            </p>
          </div>
        </div>

        {/* Manual Approval Gate Action Box (For Continuous Delivery) */}
        {isWaitingManualApproval && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  Continuous Delivery Manual Approval Gate Triggered
                </h4>
                <p className="text-[11px] text-amber-700">
                  Staging validation passed! Click the button below to authorize production release.
                </p>
              </div>
            </div>

            <button
              onClick={handleManualApprove}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Click to Approve & Promote to Production</span>
            </button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {selectedFlow === 'cd-delivery'
                ? 'Continuous Delivery completed: Manually approved and promoted to production safely!'
                : 'Continuous Deployment completed: Automatically promoted to production with zero human delay!'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
