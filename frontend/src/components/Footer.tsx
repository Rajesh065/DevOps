import React from 'react';
import { Compass, BookOpen, Layers, GitCompare, Bookmark, ExternalLink, ShieldCheck, Terminal, Heart } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] text-xs text-[#8b949e] mt-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & Purpose */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#e6edf3]">DevOps Navigator</span>
          </div>
          <p className="text-[#8b949e] leading-relaxed text-[11px]">
            An intermediate-level DevOps learning and CI/CD platform explorer. Explore pipeline architectures, compare tools, and track your progress locally.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#3fb950]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero database required • LocalStorage enabled</span>
          </div>
        </div>

        {/* Col 2: Learning Curriculum */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#e6edf3] text-xs uppercase tracking-wider font-mono">Curriculum</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button onClick={() => setActivePage('learn')} className="hover:text-[#58a6ff] transition-colors">
                Introduction to DevOps & CAMS
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('learn')} className="hover:text-[#58a6ff] transition-colors">
                The 8-Stage DevOps Lifecycle
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('learn')} className="hover:text-[#58a6ff] transition-colors">
                Continuous Integration (CI)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('learn')} className="hover:text-[#58a6ff] transition-colors">
                Continuous Delivery & Canary Rollouts
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('learn')} className="hover:text-[#58a6ff] transition-colors">
                Pipeline DAG Workflows & YAML
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: CI/CD Platforms */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#e6edf3] text-xs uppercase tracking-wider font-mono">Platforms</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button onClick={() => setActivePage('platforms')} className="hover:text-[#58a6ff] transition-colors">
                GitHub Actions (Workflow Engine)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('platforms')} className="hover:text-[#58a6ff] transition-colors">
                GitLab CI/CD (All-In-One DevOps)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('platforms')} className="hover:text-[#58a6ff] transition-colors">
                Jenkins (Open Source Automation)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('platforms')} className="hover:text-[#58a6ff] transition-colors">
                CircleCI & Azure DevOps Pipelines
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('platforms')} className="hover:text-[#58a6ff] transition-colors">
                ArgoCD & Tekton (Cloud-Native GitOps)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Quick Actions & Tools */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#e6edf3] text-xs uppercase tracking-wider font-mono">Navigation</h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => setActivePage('home')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('learn')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => setActivePage('platforms')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Platforms
            </button>
            <button
              onClick={() => setActivePage('compare')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Compare
            </button>
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActivePage('bookmarks')}
              className="px-2 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-left border border-[#30363d] transition-colors"
            >
              Bookmarks
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#21262d] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8b949e]">
          <div>
            <span>© 2026 DevOps Navigator. Educational Platform Explorer.</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>React 18 + Vite</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>LocalStorage Persistence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
