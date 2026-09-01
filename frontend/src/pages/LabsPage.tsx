import React from 'react';
import {
  Play,
  Terminal,
  Activity,
  Code2,
  GitFork,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen
} from 'lucide-react';
import { LifecycleSimulator } from '../components/LifecycleSimulator';
import { CiCdFlowSimulator } from '../components/CiCdFlowSimulator';
import { CanaryRolloutSimulator } from '../components/CanaryRolloutSimulator';
import { YamlGeneratorPage } from './YamlGeneratorPage';

export const LabsPage: React.FC = () => {
  return (
    <div className="space-y-16 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Hands-On Interactive Simulation Labs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          DevOps & CI/CD Interactive Practice Labs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          Learn how DevOps actually works in production. Each lab provides a <strong>Step-by-Step Architectural Process Guide</strong> first, followed by a <strong>Live Real-Time Interactive Simulator</strong> where you can trigger commands, simulate outages, and inspect streaming terminal outputs.
        </p>

        {/* 4 Lab Jump Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs font-mono">
          <a href="#lab-1" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 transition-colors flex items-center justify-between">
            <span className="font-bold text-slate-900">Lab 1: CI vs CD Flow</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </a>
          <a href="#lab-2" className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 transition-colors flex items-center justify-between">
            <span className="font-bold text-slate-900">Lab 2: 8-Stage Lifecycle</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </a>
          <a href="#lab-3" className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-400 transition-colors flex items-center justify-between">
            <span className="font-bold text-slate-900">Lab 3: Canary & Rollback</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
          </a>
          <a href="#lab-4" className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 transition-colors flex items-center justify-between">
            <span className="font-bold text-slate-900">Lab 4: YAML Pipeline Lab</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAB 1: CI vs Continuous Delivery vs Continuous Deployment */}
      {/* ========================================================================= */}
      <section id="lab-1" className="space-y-6 pt-4">
        {/* Step-by-Step Educational Concept Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-bold">
            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">LAB 01 GUIDE</span>
            <span>Architecture & Process Flow</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            1. Understanding Continuous Integration, Delivery, & Deployment Under the Hood
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many developers confuse CI and CD. In enterprise software delivery, these represent three distinct levels of pipeline automation maturity:
          </p>

          {/* 3 Step Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
              <span className="text-[11px] font-mono text-blue-700 font-bold uppercase block">Stage 1 • Continuous Integration (CI)</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>How it works:</strong> Developer merges code into <code>main</code> branch. The CI runner automatically compiles the code, executes linters, and runs 100+ unit tests. If tests pass, the artifact is built.
              </p>
              <span className="text-[10px] font-mono text-blue-700 font-bold block pt-1 border-t border-blue-200">
                Ends at: Tested Build Artifact
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase block">Stage 2 • Continuous Delivery (CD)</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>How it works:</strong> Everything in CI, plus code is automatically deployed to a <strong>Staging environment</strong>. Before deploying to Production, it pauses for a <strong>Human Approval Button</strong> (e.g. Release Manager / QA signoff).
              </p>
              <span className="text-[10px] font-mono text-emerald-700 font-bold block pt-1 border-t border-emerald-200">
                Ends at: Manual Production Approval Gate
              </span>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
              <span className="text-[11px] font-mono text-purple-700 font-bold uppercase block">Stage 3 • Continuous Deployment (CD+)</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>How it works:</strong> 100% Autonomous. Every passing commit automatically validates, deploys to Staging, runs smoke tests, and deploys directly to Production without human intervention.
              </p>
              <span className="text-[10px] font-mono text-purple-700 font-bold block pt-1 border-t border-purple-200">
                Ends at: Autonomous Zero-Touch Production
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <CiCdFlowSimulator />
      </section>

      {/* ========================================================================= */}
      {/* LAB 2: 8-Stage DevOps Lifecycle Terminal Simulator */}
      {/* ========================================================================= */}
      <section id="lab-2" className="space-y-6 pt-4">
        {/* Step-by-Step Educational Concept Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">LAB 02 GUIDE</span>
            <span>8-Phase DevOps Infinite Loop</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            2. The 8-Stage DevOps Lifecycle: Step-by-Step Toolchain Walkthrough
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Modern high-velocity software engineering follows an infinite 8-phase feedback loop. Here is what happens at every step:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">01. PLAN</span>
              <h4 className="font-bold text-slate-900">Sprint Backlogs & Stories</h4>
              <p className="text-slate-600 text-[11px]">Product roadmaps, acceptance criteria, and Jira sprint issues.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">02. CODE</span>
              <h4 className="font-bold text-slate-900">Git Version Control</h4>
              <p className="text-slate-600 text-[11px]">Feature branch commits, peer pull requests, and automated linting.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">03. BUILD</span>
              <h4 className="font-bold text-slate-900">Docker Containerization</h4>
              <p className="text-slate-600 text-[11px]">Compiling TypeScript and packaging immutable OCI Docker images.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">04. TEST</span>
              <h4 className="font-bold text-slate-900">Automated Vitest & Trivy</h4>
              <p className="text-slate-600 text-[11px]">Unit tests, integration suites, and container CVE vulnerability scans.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">05. RELEASE</span>
              <h4 className="font-bold text-slate-900">Semantic Versioning</h4>
              <p className="text-slate-600 text-[11px]">Tagging releases (e.g. v2.4.0) and packaging Helm chart manifests.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">06. DEPLOY</span>
              <h4 className="font-bold text-slate-900">ArgoCD GitOps Sync</h4>
              <p className="text-slate-600 text-[11px]">Pulling Git state and executing zero-downtime Canary traffic shifts.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">07. OPERATE</span>
              <h4 className="font-bold text-slate-900">Kubernetes Autoscaling</h4>
              <p className="text-slate-600 text-[11px]">Horizontal Pod Autoscaler (HPA) and HashiCorp Vault dynamic secrets.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-slate-500 text-[10px]">08. MONITOR</span>
              <h4 className="font-bold text-slate-900">Prometheus Telemetry</h4>
              <p className="text-slate-600 text-[11px]">Real-time P99 latency tracking, error rates, and continuous feedback.</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <LifecycleSimulator />
      </section>

      {/* ========================================================================= */}
      {/* LAB 3: ArgoCD GitOps Canary & Self-Healing Auto-Rollback */}
      {/* ========================================================================= */}
      <section id="lab-3" className="space-y-6 pt-4">
        {/* Step-by-Step Educational Concept Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold">
            <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200">LAB 03 GUIDE</span>
            <span>GitOps & Progressive Canary Rollouts</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            3. Progressive Delivery: How Canary Deployments & Auto-Rollbacks Prevent Outages
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In traditional deployments, releasing a buggy update to 100% of users immediately takes down the site. <strong>Canary Deployments</strong> mitigate risk by gradually shifting traffic (10% ➔ 25% ➔ 50% ➔ 100%) while observing Prometheus error rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-slate-900 text-[11px]">Step 1: 10% Initial Traffic Shift</span>
              <p className="text-slate-600">Only 10% of users receive the new version. The other 90% remain on the battle-tested stable version.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-slate-900 text-[11px]">Step 2: Prometheus SRE Metric Check</span>
              <p className="text-slate-600">The controller continuously monitors HTTP 5xx error rates and latency against predefined Service Level Objectives (SLOs).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-mono font-bold text-slate-900 text-[11px]">Step 3: Self-Healing Instant Rollback</span>
              <p className="text-slate-600">If error rates exceed 1.0%, the controller instantly redirects 100% of traffic back to the healthy version in seconds!</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <CanaryRolloutSimulator />
      </section>

      {/* ========================================================================= */}
      {/* LAB 4: Interactive YAML Pipeline Playground */}
      {/* ========================================================================= */}
      <section id="lab-4" className="space-y-6 pt-4">
        {/* Step-by-Step Educational Concept Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">LAB 04 GUIDE</span>
            <span>Pipeline as Code (YAML Syntax)</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            4. Pipeline as Code: Structuring Real Production YAML Workflows
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In modern DevOps, pipelines are declared in version-controlled YAML files (e.g. <code>.github/workflows/deploy.yml</code>). Choose your runtime below to generate real production-ready pipeline code.
          </p>
        </div>

        {/* Interactive YAML Generator */}
        <YamlGeneratorPage />
      </section>
    </div>
  );
};
