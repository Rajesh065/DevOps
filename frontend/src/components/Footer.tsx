import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 mt-16 select-none">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & Purpose */}
        <div className="space-y-3">
          <span className="font-extrabold text-slate-900 text-sm">DevOps Navigator</span>
          <p className="text-slate-600 leading-relaxed text-xs">
            Role-partitioned DevOps learning, CI/CD platform explorer, and enterprise governance dashboard.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero database required • LocalStorage enabled</span>
          </div>
        </div>

        {/* Col 2: Persona Profiles */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">4 User Personas</h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>🎓 <strong>Student:</strong> Foundations & 6-module curriculum</li>
            <li>💻 <strong>Developer:</strong> CI/CD explorer & YAML generator</li>
            <li>🏛️ <strong>Architect:</strong> Comparison matrix & TCO calculator</li>
            <li>💼 <strong>Job Aspirant:</strong> Scenario Q&A & DORA metrics</li>
          </ul>
        </div>

        {/* Col 3: Key Tools */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Platform Tools</h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>• 8 Industry-Standard CI/CD Engines</li>
            <li>• Interactive YAML Pipeline Builder</li>
            <li>• Cloud SaaS vs Self-Hosted TCO ROI</li>
            <li>• DORA Metrics & Scenario Drills</li>
          </ul>
        </div>

        {/* Col 4: Quick Navigation */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Navigation</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setActivePage('home')}
              className="px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 text-left border border-slate-200 transition-colors font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('learn')}
              className="px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 text-left border border-slate-200 transition-colors font-semibold"
            >
              Curriculum
            </button>
            <button
              onClick={() => setActivePage('platforms')}
              className="px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 text-left border border-slate-200 transition-colors font-semibold"
            >
              Platforms
            </button>
            <button
              onClick={() => setActivePage('compare')}
              className="px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 text-left border border-slate-200 transition-colors font-semibold"
            >
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 py-4 px-4 sm:px-8 lg:px-12 bg-slate-50/50">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© 2026 DevOps Navigator. Clean Educational & Platform Architecture Explorer.</span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>React 18</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Role-Based LocalStorage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
