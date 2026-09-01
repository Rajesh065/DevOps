import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Award, User, RotateCcw } from 'lucide-react';
import { UserAccount } from '../types/navigator';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onUpdateProfile: (name: string, email: string) => void;
  completedLessonsCount: number;
  totalLessons: number;
  onResetProgress: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  completedLessonsCount,
  totalLessons,
  onResetProgress
}) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name || 'DevOps Student', email || 'student@devopsnav.io');
    setIsEditing(false);
  };

  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Student Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Avatar & Info */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base font-mono">
              {currentUser.avatarText || 'ST'}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
              <span className="inline-block mt-1 px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                🎓 Active DevOps Student
              </span>
            </div>
          </div>

          {/* Progress Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-slate-500">Curriculum Progress</span>
              <div className="text-xl font-bold text-emerald-700">{progressPercent}%</div>
              <span className="text-[10px] text-slate-500">{completedLessonsCount}/{totalLessons} Lessons Done</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-slate-500">Master Quiz</span>
              <div className="text-xl font-bold text-purple-700">30 Qs</div>
              <span className="text-[10px] text-slate-500">Scorecard Enabled</span>
            </div>
          </div>

          {/* Edit Name Form */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-mono text-slate-600 block mb-1">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-600 block mb-1">Student Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-600 font-semibold hover:underline font-mono"
              >
                Edit Student Details
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset all completed lessons and local bookmarks?')) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="text-xs text-rose-600 hover:underline font-mono flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Learning Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
