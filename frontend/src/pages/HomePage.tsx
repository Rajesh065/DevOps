import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Layers,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  GitFork,
  Server,
  Zap,
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink,
  ChevronRight,
  Bookmark
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
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#58a6ff]">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive DevOps & CI/CD Platform Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#e6edf3] tracking-tight leading-tight">
            Master <span className="text-[#58a6ff]">DevOps</span> & Explore the <span className="text-[#3fb950]">CI/CD</span> Ecosystem
          </h1>

          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Welcome to <strong>DevOps Navigator</strong>. Learn core DevOps methodologies, understand the 8-phase infinite lifecycle, compare industry-standard CI/CD engines (Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD), and track your learning journey locally.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('learn')}
              className="px-5 py-2.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Learning DevOps</span>
            </button>

            <button
              onClick={() => onNavigate('platforms')}
              className="px-5 py-2.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] font-semibold text-xs sm:text-sm flex items-center gap-2 border border-[#30363d] transition-colors"
            >
              <Layers className="w-4 h-4 text-[#58a6ff]" />
              <span>Explore CI/CD Platforms</span>
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className="px-4 py-2.5 rounded-md text-[#8b949e] hover:text-[#e6edf3] text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#30363d] text-xs font-mono">
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] block text-[11px]">Learning Topics</span>
            <span className="text-lg font-bold text-[#e6edf3]">{learningTopics.length} Modules</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] block text-[11px]">CI/CD Platforms</span>
            <span className="text-lg font-bold text-[#58a6ff]">{platforms.length} Engines</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] block text-[11px]">Your Progress</span>
            <span className="text-lg font-bold text-[#3fb950]">
              {completedTopicIds.length}/{learningTopics.length} Done
            </span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <span className="text-[#8b949e] block text-[11px]">Data Storage</span>
            <span className="text-lg font-bold text-[#a371f7]">LocalStorage</span>
          </div>
        </div>
      </section>

      {/* 2. What is CI/CD? Concept Breakdown */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#30363d]">
          <div>
            <h2 className="text-xl font-bold text-[#e6edf3]">Understanding CI / CD Fundamentals</h2>
            <p className="text-xs text-[#8b949e] mt-0.5">The engine driving high-velocity modern software delivery</p>
          </div>
          <button
            onClick={() => onNavigate('learn', 'ci-fundamentals')}
            className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read Complete CI/CD Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: CI */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-3">
            <div className="w-8 h-8 rounded bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-[#58a6ff] font-mono font-bold text-xs">
              CI
            </div>
            <h3 className="text-sm font-bold text-[#e6edf3]">Continuous Integration</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Developers merge code changes into the central branch multiple times per day. Every commit triggers automated builds, linters, and unit tests to catch defects within minutes.
            </p>
            <div className="text-[11px] font-mono text-[#3fb950] pt-2 border-t border-[#21262d]">
              Key goal: Eliminate "Merge Hell" & fast feedback
            </div>
          </div>

          {/* Card 2: Continuous Delivery */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-3">
            <div className="w-8 h-8 rounded bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-[#3fb950] font-mono font-bold text-xs">
              CD
            </div>
            <h3 className="text-sm font-bold text-[#e6edf3]">Continuous Delivery</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Every passing build is automatically packaged, tested in staging environments, and kept in a continuously releasable state. Actual production deployment happens with a manual approval button.
            </p>
            <div className="text-[11px] font-mono text-[#58a6ff] pt-2 border-t border-[#21262d]">
              Key goal: Safe, reliable, push-button releases
            </div>
          </div>

          {/* Card 3: Continuous Deployment */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-3">
            <div className="w-8 h-8 rounded bg-[#a371f7]/10 border border-[#a371f7]/30 flex items-center justify-center text-[#a371f7] font-mono font-bold text-xs">
              CD+
            </div>
            <h3 className="text-sm font-bold text-[#e6edf3]">Continuous Deployment</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Takes delivery one step further: every single commit that passes automated testing stages deploys straight to production automatically with zero human manual intervention.
            </p>
            <div className="text-[11px] font-mono text-[#a371f7] pt-2 border-t border-[#21262d]">
              Key goal: Zero-touch autonomous shipping
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive DevOps Lifecycle Explorer */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3fb950]">
            <GitFork className="w-4 h-4" />
            <span>The 8-Phase Infinite Loop</span>
          </div>
          <h2 className="text-xl font-bold text-[#e6edf3]">Interactive DevOps Lifecycle</h2>
          <p className="text-xs text-[#8b949e]">Click any phase below to explore its objectives and toolchain ecosystem</p>
        </div>

        {/* Phase Buttons Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {lifecycleStages.map((stage, idx) => {
            const isSelected = selectedLifecycleStage === idx;
            return (
              <button
                key={stage.name}
                onClick={() => setSelectedLifecycleStage(idx)}
                className={`p-2.5 rounded-md border text-left transition-all ${
                  isSelected
                    ? 'bg-[#21262d] border-[#58a6ff] text-[#e6edf3] shadow-sm'
                    : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:border-[#8b949e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#8b949e]">0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
                </div>
                <div className="font-bold text-xs text-[#e6edf3]">{stage.name}</div>
                <div className="text-[10px] text-[#8b949e]">{stage.phase}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Box */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff]">
              <span>Stage {selectedLifecycleStage + 1} of 8</span>
              <span>•</span>
              <span className="uppercase">{lifecycleStages[selectedLifecycleStage].phase}</span>
            </div>
            <h3 className="text-base font-bold text-[#e6edf3]">
              Phase: {lifecycleStages[selectedLifecycleStage].name}
            </h3>
            <p className="text-xs text-[#c9d1d9] leading-relaxed pt-1">
              {lifecycleStages[selectedLifecycleStage].desc}
            </p>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-xs space-y-1">
            <span className="text-[11px] font-mono text-[#8b949e] block font-semibold">Standard Industry Tools</span>
            <p className="text-[#3fb950] font-mono font-medium">{lifecycleStages[selectedLifecycleStage].tools}</p>
          </div>
        </div>
      </section>

      {/* 4. Featured CI/CD Platforms */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#30363d]">
          <div>
            <h2 className="text-xl font-bold text-[#e6edf3]">Featured CI/CD Platforms</h2>
            <p className="text-xs text-[#8b949e] mt-0.5">Explore the most widely used automation and GitOps engines</p>
          </div>
          <button
            onClick={() => onNavigate('platforms')}
            className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1 self-start sm:self-auto"
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

      {/* 5. Bottom Learning Banner CTA */}
      <section className="bg-gradient-to-r from-[#161b22] to-[#21262d] border border-[#30363d] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-lg sm:text-xl font-bold text-[#e6edf3]">Ready to master CI/CD pipelines?</h3>
          <p className="text-xs text-[#8b949e] max-w-xl leading-relaxed">
            Step through our 6 interactive learning modules covering CAMS principles, pipeline DAG execution, Docker integration, and Kubernetes deployments.
          </p>
        </div>

        <button
          onClick={() => onNavigate('learn')}
          className="px-6 py-3 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-colors shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Start Learning Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
