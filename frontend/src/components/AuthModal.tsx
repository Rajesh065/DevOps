import React, { useState } from 'react';
import { X, Check, GraduationCap, Code2, Building2, Briefcase } from 'lucide-react';
import { UserRole } from '../types/navigator';
import { predefinedPersonas } from '../data/personasData';

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
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const personas = [
    {
      role: 'student' as UserRole,
      title: 'Student / Beginner',
      desc: 'DevOps & CI/CD Foundations, CAMS culture, and 6-module curriculum.',
      icon: GraduationCap,
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      role: 'developer' as UserRole,
      title: 'Software Developer',
      desc: 'CI/CD Platforms Explorer, Interactive YAML Generator & Saved Bookmarks.',
      icon: Code2,
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      role: 'architect' as UserRole,
      title: 'Tech Lead / Architect',
      desc: 'Side-by-side platform comparison matrix, Cloud vs Self-host TCO & Governance.',
      icon: Building2,
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      role: 'jobseeker' as UserRole,
      title: 'DevOps Job Aspirant',
      desc: '25+ Scenario-based interview Q&A, DORA metrics & Resume talking points.',
      icon: Briefcase,
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200'
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

  const handleQuickDemo = (role: UserRole) => {
    onLogin(predefinedPersonas[role].email, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {activeTab === 'login' ? 'Sign In / Persona Switcher' : 'Create New Account'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your persona to unlock role-tailored DevOps features
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
        <div className="grid grid-cols-2 border-b border-slate-100 text-xs font-semibold text-center bg-slate-50">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-3 transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In (1-Click Persona)
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-3 transition-colors ${
              activeTab === 'signup'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account (Sign Up)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Persona Selection Cards */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-600 block font-semibold">
              Select Persona & Access Level:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedRole === p.role;
                return (
                  <div
                    key={p.role}
                    onClick={() => setSelectedRole(p.role)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/40 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                        <span className="text-xs font-bold text-slate-900">{p.title}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-100">
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
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs mt-2"
            >
              {activeTab === 'login'
                ? `Sign In as ${predefinedPersonas[selectedRole].name}`
                : 'Create Account & Start Exploring'}
            </button>
          </form>

          {/* 1-Click Fast Persona Switcher */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-mono text-slate-500 block text-center">
              1-Click Instant Persona Login:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-lg border border-slate-200 text-emerald-700 text-center font-medium transition-colors"
              >
                🎓 Student View
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('developer')}
                className="p-2 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 text-blue-700 text-center font-medium transition-colors"
              >
                💻 Developer View
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('architect')}
                className="p-2 bg-slate-50 hover:bg-amber-50 rounded-lg border border-slate-200 text-amber-700 text-center font-medium transition-colors"
              >
                🏛️ Architect View
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('jobseeker')}
                className="p-2 bg-slate-50 hover:bg-purple-50 rounded-lg border border-slate-200 text-purple-700 text-center font-medium transition-colors"
              >
                💼 Job Aspirant View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
