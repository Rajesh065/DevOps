import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Layers,
  GitCompare,
  ArrowRight,
  GitFork,
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Platform, LearningTopic } from '../types/navigator';
import { PlatformCard } from '../components/PlatformCard';

interface HomePageProps {
  platforms: Platform[];
  learningTopics: LearningTopic[];
  onNavigate: (page: string, param?: string) => void;
  onSelectPlatform: (platform: Platform) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  completedTopicIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  platforms,
  learningTopics,
  onNavigate,
  onSelectPlatform,
  bookmarkedIds,
  onToggleBookmark,
  completedTopicIds
}) => {
  const [selectedLifecycleStage, setSelectedLifecycleStage] = useState<number>(0);

  const lifecycleStages = [
    { name: 'Plan', phase: 'Development', desc: 'Agile sprint backlogs, issue tracking, and roadmap definition.', tools: 'Jira, Linear, GitHub Issues' },
    { name: 'Code', phase: 'Development', desc: 'Writing clean code, git branch management, and peer pull reviews.', tools: 'Git, GitHub, GitLab, VS Code' },
    { name: 'Build', phase: 'Development', desc: 'Compiling source code, bundling dependencies, and building Docker images.', tools: 'Maven, npm, Docker, BuildKit' },
    { name: 'Test', phase: 'Development', desc: 'Automated unit, integration, and security vulnerability scanning.', tools: 'Vitest, Jest, Trivy, SonarQube' },
    { name: 'Release', phase: 'Operations', desc: 'Semantic version tagging, changelog generation, and artifacts packaging.', tools: 'Helm, Semantic Release, OCI' },
    { name: 'Deploy', phase: 'Operations', desc: 'Automated Canary and Blue-Green rollouts to cloud Kubernetes clusters.', tools: 'ArgoCD, Flux, Terraform, K8s' },
    { name: 'Operate', phase: 'Operations', desc: 'High-availability infrastructure scaling, configuration, and secret leases.', tools: 'Kubernetes, AWS EKS, HashiCorp Vault' },
    { name: 'Monitor', phase: 'Operations', desc: 'Real-time telemetry, golden signal metrics, and incident alert triaging.', tools: 'Prometheus, Grafana, Datadog' }
  ];

  const featuredPlatforms = platforms.slice(0, 4);

  return (
    <div className="space-y-10">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <span>DevOps Learning & CI/CD Platform Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master <span className="text-blue-600">DevOps</span> & Explore the <span className="text-emerald-600">CI/CD</span> Ecosystem
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to <strong>DevOps Navigator</strong>. Learn core DevOps methodologies, explore the 8-phase lifecycle, compare industry-standard CI/CD engines (Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD), and track your progress with role-based access.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('learn')}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Curriculum</span>
            </button>

            <button
              onClick={() => onNavigate('platforms')}
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-200 transition-colors"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>CI/CD Platforms</span>
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className="px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100 text-xs font-mono">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Curriculum Topics</span>
            <span className="text-lg font-bold text-slate-900">{learningTopics.length} Modules</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">CI/CD Engines</span>
            <span className="text-lg font-bold text-blue-600">{platforms.length} Platforms</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Your Progress</span>
            <span className="text-lg font-bold text-emerald-600">
              {completedTopicIds.length}/{learningTopics.length} Done
            </span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">User Personas</span>
            <span className="text-lg font-bold text-purple-600">4 Access Tiers</span>
          </div>
        </div>
      </section>

      {/* 2. What is CI/CD? Concept Breakdown */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Understanding CI / CD Fundamentals</h2>
            <p className="text-xs text-slate-500 mt-0.5">The core engine driving modern agile cloud delivery</p>
          </div>
          <button
            onClick={() => onNavigate('learn', 'ci-fundamentals')}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read Complete CI/CD Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: CI */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-bold text-xs">
              CI
            </div>
            <h3 className="text-sm font-bold text-slate-900">Continuous Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Developers merge code changes into the central repository multiple times per day. Every commit triggers automated builds, linters, and unit tests to catch defects within minutes.
            </p>
            <div className="text-[11px] font-mono text-emerald-700 font-semibold pt-2 border-t border-slate-100">
              Key goal: Fast feedback & zero "Merge Hell"
            </div>
          </div>

          {/* Card 2: Continuous Delivery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
              CD
            </div>
            <h3 className="text-sm font-bold text-slate-900">Continuous Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every passing build is automatically packaged, deployed to staging, and maintained in a continuously releasable state. Final production release requires a human approval button.
            </p>
            <div className="text-[11px] font-mono text-blue-700 font-semibold pt-2 border-t border-slate-100">
              Key goal: Safe, reliable, push-button releases
            </div>
          </div>

          {/* Card 3: Continuous Deployment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-mono font-bold text-xs">
              CD+
            </div>
            <h3 className="text-sm font-bold text-slate-900">Continuous Deployment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Takes delivery one step further: every single commit that passes all automated test and security gates deploys straight to production automatically with zero manual gates.
            </p>
            <div className="text-[11px] font-mono text-purple-700 font-semibold pt-2 border-t border-slate-100">
              Key goal: Autonomous, zero-touch shipping
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive DevOps Lifecycle Explorer */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
            <GitFork className="w-4 h-4" />
            <span>The 8-Phase Infinite Loop</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Interactive DevOps Lifecycle</h2>
          <p className="text-xs text-slate-500">Click any phase below to explore its objectives and toolchain ecosystem</p>
        </div>

        {/* Phase Buttons Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {lifecycleStages.map((stage, idx) => {
            const isSelected = selectedLifecycleStage === idx;
            return (
              <button
                key={stage.name}
                onClick={() => setSelectedLifecycleStage(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-600 text-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">0{idx + 1}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`} />
                </div>
                <div className="font-bold text-xs text-slate-900">{stage.name}</div>
                <div className="text-[10px] text-slate-500">{stage.phase}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-semibold">
              <span>Stage {selectedLifecycleStage + 1} of 8</span>
              <span>•</span>
              <span className="uppercase">{lifecycleStages[selectedLifecycleStage].phase}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Phase: {lifecycleStages[selectedLifecycleStage].name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {lifecycleStages[selectedLifecycleStage].desc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 text-xs space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-mono text-slate-500 block font-semibold">Standard Industry Tools:</span>
            <p className="text-emerald-700 font-mono font-semibold">{lifecycleStages[selectedLifecycleStage].tools}</p>
          </div>
        </div>
      </section>

      {/* 4. Featured CI/CD Platforms */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Featured CI/CD Platforms</h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore the most widely used automation and GitOps engines</p>
          </div>
          <button
            onClick={() => onNavigate('platforms')}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All {platforms.length} Platforms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPlatforms.map((plat) => (
            <PlatformCard
              key={plat.id}
              platform={plat}
              isBookmarked={bookmarkedIds.includes(plat.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectPlatform={onSelectPlatform}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
