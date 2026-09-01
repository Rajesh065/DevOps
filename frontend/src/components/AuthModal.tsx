import React, { useState } from 'react';
import { X, Check, Shield, User, GraduationCap, Code2, Building2, Briefcase } from 'lucide-react';
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
      desc: 'DevOps & CI/CD Fundamentals, CAMS framework, step-by-step beginner lessons.',
      icon: GraduationCap,
      badgeColor: 'text-[#3fb950] bg-[#238636]/15 border-[#238636]/30'
    },
    {
      role: 'developer' as UserRole,
      title: 'Software Developer',
      desc: 'CI/CD Platform Explorer, YAML Generator, pipeline templates, and bookmarks.',
      icon: Code2,
      badgeColor: 'text-[#58a6ff] bg-[#58a6ff]/15 border-[#58a6ff]/30'
    },
    {
      role: 'architect' as UserRole,
      title: 'Tech Lead / Architect',
      desc: 'Side-by-side platform comparison matrix, cloud vs self-host governance & TCO.',
      icon: Building2,
      badgeColor: 'text-[#d29922] bg-[#9e6a03]/15 border-[#9e6a03]/30'
    },
    {
      role: 'jobseeker' as UserRole,
      title: 'DevOps Job Aspirant',
      desc: 'Scenario-based interview Q&A, DORA metrics cheatsheet, and resume pointers.',
      icon: Briefcase,
      badgeColor: 'text-[#a371f7] bg-[#8957e5]/15 border-[#8957e5]/30'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 select-none">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
          <div>
            <h2 className="text-base font-bold text-[#e6edf3]">
              {activeTab === 'login' ? 'Sign In / Choose Persona' : 'Create New Account'}
            </h2>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Select your persona to unlock role-tailored DevOps features
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-[#30363d] text-xs font-semibold text-center bg-[#0d1117]">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-3 transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-[#58a6ff] text-[#e6edf3] bg-[#161b22]'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Sign In (or 1-Click Persona)
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-3 transition-colors ${
              activeTab === 'signup'
                ? 'border-b-2 border-[#58a6ff] text-[#e6edf3] bg-[#161b22]'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Create Account (Sign Up)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Persona Selection Cards */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8b949e] block font-semibold">
              Select User Persona:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedRole === p.role;
                return (
                  <div
                    key={p.role}
                    onClick={() => setSelectedRole(p.role)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#21262d] border-[#58a6ff] shadow-sm'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#58a6ff]" />
                        <span className="text-xs font-bold text-[#e6edf3]">{p.title}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
                    </div>
                    <p className="text-[11px] text-[#8b949e] leading-snug line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-[#21262d]">
            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-mono text-[#8b949e] block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-[#e6edf3] outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-[#8b949e] block mb-1">Email Address</label>
              <input
                type="email"
                placeholder={predefinedPersonas[selectedRole].email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-[#e6edf3] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#8b949e] block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded px-3 py-2 text-xs text-[#e6edf3] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs rounded transition-colors shadow-sm mt-2"
            >
              {activeTab === 'login'
                ? `Sign In as ${predefinedPersonas[selectedRole].name}`
                : 'Create Account & Start Exploring'}
            </button>
          </form>

          {/* 1-Click Fast Persona Switcher */}
          <div className="pt-3 border-t border-[#21262d] space-y-2">
            <span className="text-[11px] font-mono text-[#8b949e] block text-center">
              Or 1-Click Instant Demo Login:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-1.5 bg-[#0d1117] hover:bg-[#21262d] rounded border border-[#30363d] text-[#3fb950] text-center"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('developer')}
                className="p-1.5 bg-[#0d1117] hover:bg-[#21262d] rounded border border-[#30363d] text-[#58a6ff] text-center"
              >
                💻 Developer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('architect')}
                className="p-1.5 bg-[#0d1117] hover:bg-[#21262d] rounded border border-[#30363d] text-[#d29922] text-center"
              >
                🏛️ Architect
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('jobseeker')}
                className="p-1.5 bg-[#0d1117] hover:bg-[#21262d] rounded border border-[#30363d] text-[#a371f7] text-center"
              >
                💼 Job Aspirant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
