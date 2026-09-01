import React from 'react';
import { Play, Sparkles, Terminal, Layers, ArrowRight } from 'lucide-react';
import { LifecycleSimulator } from '../components/LifecycleSimulator';
import { CiCdFlowSimulator } from '../components/CiCdFlowSimulator';
import { YamlGeneratorPage } from './YamlGeneratorPage';

export const LabsPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
          <Play className="w-4 h-4" />
          <span>Interactive Student Simulation Labs & Real-World Demos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Hands-On DevOps & CI/CD Interactive Labs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Experience real-world DevOps in action. Run the 8-stage lifecycle simulator with real terminal outputs, compare CI vs Continuous Delivery vs Continuous Deployment execution flows, and generate live production pipeline YAML.
        </p>
      </div>

      {/* Lab 1: Interactive CI vs CD vs CD+ Flow Simulator */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xs font-mono font-bold">1</span>
            <span>Live CI vs CD vs CD+ Pipeline Execution Simulator</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test and understand why Continuous Delivery requires a human approval gate before production while Continuous Deployment is 100% automated.
          </p>
        </div>
        <CiCdFlowSimulator />
      </section>

      {/* Lab 2: Real-Time 8-Stage DevOps Lifecycle Simulator */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xs font-mono font-bold">2</span>
            <span>Real-Time 8-Stage DevOps Lifecycle Terminal Simulator</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click through all 8 phases (Plan, Code, Build, Test, Release, Deploy, Operate, Monitor) to see simulated commands and industry tools in action.
          </p>
        </div>
        <LifecycleSimulator />
      </section>

      {/* Lab 3: Interactive YAML Pipeline Generator */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center text-xs font-mono font-bold">3</span>
            <span>Interactive YAML Pipeline Playground</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate and customize production-ready GitHub Actions or GitLab CI workflows with linting, testing, and Docker stages.
          </p>
        </div>
        <YamlGeneratorPage />
      </section>
    </div>
  );
};
