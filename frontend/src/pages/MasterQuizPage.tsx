import React from 'react';
import { Award, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { InteractiveQuiz } from '../components/InteractiveQuiz';

export const MasterQuizPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold">
          <Award className="w-4 h-4" />
          <span>Final Knowledge Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          DevOps & CI/CD Master Assessment Quiz
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Complete this comprehensive 30-question assessment covering DevOps Culture (CAMS), the 8-Stage Lifecycle, CI fundamentals, Continuous Delivery vs Deployment, Pipeline DAG workflows, Docker, Kubernetes, and GitOps.
        </p>
      </div>

      {/* 30 Questions Quiz Engine */}
      <InteractiveQuiz />
    </div>
  );
};
