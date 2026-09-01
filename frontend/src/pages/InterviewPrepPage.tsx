import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
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
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Job Aspirant & SRE Interview Master</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              DevOps Scenario-Based Interview Q&A
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Master real-world scenario questions, DORA metric frameworks, and portfolio resume talking points.
            </p>
          </div>

          <button
            onClick={handleCopyResume}
            className="px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-xs font-semibold text-purple-700 border border-purple-200 flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            {copiedResume ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-purple-600" />}
            <span>{copiedResume ? 'Copied Resume Points' : 'Copy Portfolio Resume Points'}</span>
          </button>
        </div>

        {/* 4 DORA Metrics Flashcards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs font-mono">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold">DORA Metric 01</span>
            <h4 className="text-sm font-bold text-slate-900">Deployment Frequency</h4>
            <p className="text-emerald-700 text-[11px] font-semibold">Elite: Multiple deploys / day</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold">DORA Metric 02</span>
            <h4 className="text-sm font-bold text-slate-900">Lead Time for Changes</h4>
            <p className="text-blue-700 text-[11px] font-semibold">Elite: Less than 1 hour</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold">DORA Metric 03</span>
            <h4 className="text-sm font-bold text-slate-900">Change Failure Rate</h4>
            <p className="text-amber-700 text-[11px] font-semibold">Elite: 0% - 15%</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold">DORA Metric 04</span>
            <h4 className="text-sm font-bold text-slate-900">Mean Time to Recovery</h4>
            <p className="text-purple-700 text-[11px] font-semibold">Elite: Less than 1 hour</p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-mono mr-1 text-[11px]">Filter Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <div
                  onClick={() => toggleQuestion(q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-xs font-mono font-bold text-purple-700 shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                          {q.category}
                        </span>
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                          {q.difficulty} Level
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <button className="text-slate-400 p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isOpen && (
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700 bg-slate-50/50 leading-relaxed">
                    <p className="whitespace-pre-line">{q.answer}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">Key Keywords:</span>
                      {q.keyKeywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
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
