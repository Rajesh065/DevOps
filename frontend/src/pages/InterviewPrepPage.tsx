import React, { useState } from 'react';
import { Briefcase, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Award, Copy, Check, Sparkles } from 'lucide-react';
import { interviewQuestionsData } from '../data/personasData';

export const InterviewPrepPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openQuestionIds, setOpenQuestionIds] = useState<string[]>(['q1', 'q2']);
  const [copiedResume, setCopiedResume] = useState<boolean>(false);

  const categories = ['All', 'CI/CD', 'Kubernetes', 'Architecture', 'GitOps'];

  const filteredQuestions = interviewQuestionsData.filter(
    q => selectedCategory === 'All' || q.category === selectedCategory
  );

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const resumePoints = [
    'Architected automated multi-stage CI/CD pipelines using GitHub Actions and GitLab CI, reducing deployment lead time by 45%.',
    'Implemented GitOps continuous delivery with ArgoCD on Kubernetes, achieving zero-downtime Canary rollouts and automated self-healing drift reconciliation.',
    'Authored reusable Terraform HCL modules for multi-cloud infrastructure provisioning across AWS and Azure with automated state drift detection.',
    'Integrated Open Policy Agent (OPA & Rego) guardrails and Trivy CVE container vulnerability scans into pull request verification gates.'
  ];

  const handleCopyResume = () => {
    navigator.clipboard.writeText(resumePoints.map(p => `• ${p}`).join('\n'));
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#a371f7] mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Job Aspirant & SRE Interview Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3]">
              DevOps Interview Master & Scenario Q&A
            </h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Master top scenario-based interview questions, DORA metric frameworks, and resume project bullet points.
            </p>
          </div>

          <button
            onClick={handleCopyResume}
            className="px-3.5 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-[#e6edf3] border border-[#30363d] flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            {copiedResume ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5 text-[#58a6ff]" />}
            <span>{copiedResume ? 'Copied Resume Points' : 'Copy Portfolio Resume Points'}</span>
          </button>
        </div>

        {/* 4 DORA Metrics Flashcards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#21262d] text-xs font-mono">
          <div className="bg-[#0d1117] p-3.5 rounded border border-[#30363d] space-y-1">
            <span className="text-[#8b949e] text-[10px] uppercase font-bold">DORA Metric 01</span>
            <h4 className="text-sm font-bold text-[#e6edf3]">Deployment Frequency</h4>
            <p className="text-[#3fb950] text-[11px]">Elite: Multiple deploys per day</p>
          </div>
          <div className="bg-[#0d1117] p-3.5 rounded border border-[#30363d] space-y-1">
            <span className="text-[#8b949e] text-[10px] uppercase font-bold">DORA Metric 02</span>
            <h4 className="text-sm font-bold text-[#e6edf3]">Lead Time for Changes</h4>
            <p className="text-[#58a6ff] text-[11px]">Elite: Less than 1 hour</p>
          </div>
          <div className="bg-[#0d1117] p-3.5 rounded border border-[#30363d] space-y-1">
            <span className="text-[#8b949e] text-[10px] uppercase font-bold">DORA Metric 03</span>
            <h4 className="text-sm font-bold text-[#e6edf3]">Change Failure Rate</h4>
            <p className="text-[#d29922] text-[11px]">Elite: 0% - 15%</p>
          </div>
          <div className="bg-[#0d1117] p-3.5 rounded border border-[#30363d] space-y-1">
            <span className="text-[#8b949e] text-[10px] uppercase font-bold">DORA Metric 04</span>
            <h4 className="text-sm font-bold text-[#e6edf3]">Mean Time to Recovery (MTTR)</h4>
            <p className="text-[#a371f7] text-[11px]">Elite: Less than 1 hour</p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#8b949e] font-mono mr-1 text-[11px]">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d]'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => {
            const isOpen = openQuestionIds.includes(q.id);
            return (
              <div
                key={q.id}
                className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <div
                  onClick={() => toggleQuestion(q.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#1c2128] select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-mono font-bold text-[#58a6ff] shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                          {q.category}
                        </span>
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#8957e5]/15 text-[#a371f7] border border-[#8957e5]/30">
                          {q.difficulty} Level
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#e6edf3] leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <button className="text-[#8b949e] p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#21262d] space-y-3 text-xs sm:text-sm text-[#c9d1d9] bg-[#0d1117] leading-relaxed">
                    <p className="whitespace-pre-line">{q.answer}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#21262d]">
                      <span className="text-[10px] font-mono text-[#8b949e]">Key Keywords to Mention:</span>
                      {q.keyKeywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#21262d] text-[#3fb950] border border-[#30363d]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
