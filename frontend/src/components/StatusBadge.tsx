import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case 'success':
      case 'running':
      case 'passed':
      case 'merged':
      case 'healthy':
      case 'synced':
      case 'in_sync':
      case 'resolved':
      case 'connected':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'failed':
      case 'critical':
      case 'drift_detected':
      case 'drifted':
      case 'degraded':
      case 'crashloopbackoff':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'warning':
      case 'pending_approval':
      case 'in_progress':
      case 'progressing':
      case 'acknowledged':
      case 'firing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'closed':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getDotColor = () => {
    switch (normalized) {
      case 'success':
      case 'running':
      case 'passed':
      case 'merged':
      case 'healthy':
      case 'synced':
      case 'in_sync':
      case 'resolved':
      case 'connected':
        return 'bg-emerald-400';
      case 'failed':
      case 'critical':
      case 'drift_detected':
      case 'drifted':
      case 'degraded':
        return 'bg-rose-400';
      case 'warning':
      case 'pending_approval':
      case 'in_progress':
      case 'progressing':
      case 'acknowledged':
      case 'firing':
        return 'bg-amber-400';
      case 'closed':
        return 'bg-purple-400';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full font-mono uppercase tracking-wider ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${getStyle()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()} ${normalized === 'running' || normalized === 'in_progress' ? 'animate-pulse' : ''}`} />
      {status.replace(/_/g, ' ')}
    </span>
  );
};
