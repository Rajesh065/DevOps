import React, { useState } from 'react';
import { X, Check, GraduationCap, Code2, Building2, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../types/navigator';
import { predefinedPersonas, rolePermissions } from '../data/personasData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
  onSignup: (name: string, email: string, role: UserRole) => void;
  currentRole: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  currentRole
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'login' | 'signup'>('quick');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const personas = [
    {
      role: 'student' as UserRole,
      title: 'Student / Beginner',
      subtitle: 'DevOps Learner',
      desc: '6-Module Curriculum, 8-Stage Lifecycle Simulator, 30-Question Master Assessment Quiz with Scorecards.',
      icon: GraduationCap,
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      highlights: ['DevOps Curriculum (6 Modules)', '8-Stage Lifecycle Terminal Lab', 'Master Quiz (30 Qs & Scorecard)', 'Progress Tracking Checklist']
    },
    {
      role: 'developer' as UserRole,
      title: 'Software Developer',
      subtitle: 'CI/CD & Pipeline Engineer',
      desc: 'CI/CD Platforms Explorer (8 Engines), Interactive YAML Generator (Node/Python/Go/Java), and Saved Bookmarks.',
      icon: Code2,
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      highlights: ['8 CI/CD Engines & Syntax Docs', 'Interactive YAML Pipeline Builder', 'Live Execution Playground', 'Saved Platform Templates']
    },
    {
      role: 'architect' as UserRole,
      title: 'Tech Lead / Architect',
      subtitle: 'Platform & Cloud Architect',
      desc: 'Side-by-side Tool Comparison Matrix, Cloud SaaS vs Self-Hosted TCO ROI Cost Calculator, and SOC2/OPA Governance.',
      icon: Building2,
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      highlights: ['Side-by-Side Comparison Matrix', 'Cloud vs Self-Hosted TCO Calculator', 'ArgoCD Canary Rollout Lab', 'Enterprise Security & OPA Policies']
    },
    {
      role: 'jobseeker' as UserRole,
      title: 'DevOps Job Aspirant',
      subtitle: 'SRE & Interview Candidate',
      desc: '25+ Scenario-Based Real Production Interview Questions, DORA Metrics Cheatsheet, and 1-Click Resume Talking Points.',
      icon: Briefcase,
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
      highlights: ['25+ Scenario Technical Q&A', 'DORA Metrics Framework (Elite Stats)', '1-Click Resume Bullet Points', 'Interview Readiness Assessment']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      onLogin(email || predefinedPersonas[selectedRole].email, selectedRole);
    } else {
      onSignup(name || predefinedPersonas[selectedRole].name, email, selectedRole);
    }
    onClose();
  };

  const handleQuickSwitch = (role: UserRole) => {
    onLogin(predefinedPersonas[role].email, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                DevOps Navigator • 4 Role Logins
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your role to get a tailored workspace with exactly what you need.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-xs font-semibold text-center bg-slate-50">
          <button
            onClick={() => setActiveTab('quick')}
            className={`py-3 transition-colors ${
              activeTab === 'quick'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ⚡ 1-Click Switch
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`py-3 transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-3 transition-colors ${
              activeTab === 'signup'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {activeTab === 'quick' ? (
            /* 1-Click Fast Persona Cards */
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-600 block font-semibold">
                Select a Persona to Instantly Switch Workspace:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personas.map((p) => {
                  const Icon = p.icon;
                  const isCurrent = currentRole === p.role;

                  return (
                    <div
                      key={p.role}
                      onClick={() => handleQuickSwitch(p.role)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-blue-500 hover:shadow-xs flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-blue-50/40 border-blue-600 ring-1 ring-blue-600'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-900">{p.title}</h4>
                              <span className="text-[10px] text-slate-500 font-mono">{p.subtitle}</span>
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">
                              Active
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                          {p.desc}
                        </p>

                        <div className="space-y-1 pt-2 border-t border-slate-100 text-[10px] text-slate-600 font-mono">
                          {p.highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1">
                        <span>Switch to {p.title}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 block font-semibold">
                  Select Role & Permission Level:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {personas.map(p => (
                    <button
                      key={p.role}
                      type="button"
                      onClick={() => setSelectedRole(p.role)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedRole === p.role
                          ? 'bg-blue-50 border-blue-600 font-bold text-slate-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold">{p.title}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{p.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="text-xs font-mono text-slate-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder={predefinedPersonas[selectedRole].email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-600 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                {activeTab === 'login'
                  ? `Sign In as ${predefinedPersonas[selectedRole].name}`
                  : 'Create Persona Account & Enter'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
