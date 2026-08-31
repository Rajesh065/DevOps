import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, GitMerge, RotateCw, GitPullRequest } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  const normalized = status.toLowerCase();

  const getBadgeConfig = () => {
    switch (normalized) {
      case 'success':
      case 'passed':
      case 'healthy':
      case 'synced':
      case 'in_sync':
      case 'resolved':
      case 'connected':
      case 'running':
        return {
          bg: 'bg-[#238636]/15',
          text: 'text-[#3fb950]',
          border: 'border-[#238636]/40',
          icon: CheckCircle2
        };
      case 'merged':
        return {
          bg: 'bg-[#8957e5]/15',
          text: 'text-[#a371f7]',
          border: 'border-[#8957e5]/40',
          icon: GitMerge
        };
      case 'closed':
        return {
          bg: 'bg-[#8b949e]/15',
          text: 'text-[#8b949e]',
          border: 'border-[#8b949e]/40',
          icon: GitPullRequest
        };
      case 'failed':
      case 'critical':
      case 'drift_detected':
      case 'drifted':
      case 'degraded':
      case 'crashloopbackoff':
        return {
          bg: 'bg-[#da3633]/15',
          text: 'text-[#f85149]',
          border: 'border-[#da3633]/40',
          icon: XCircle
        };
      case 'warning':
      case 'pending_approval':
      case 'in_progress':
      case 'progressing':
      case 'acknowledged':
      case 'firing':
        return {
          bg: 'bg-[#9e6a03]/15',
          text: 'text-[#d29922]',
          border: 'border-[#9e6a03]/40',
          icon: AlertTriangle
        };
      default:
        return {
          bg: 'bg-[#30363d]',
          text: 'text-[#8b949e]',
          border: 'border-[#30363d]',
          icon: Clock
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full font-mono ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${config.bg} ${config.text} ${config.border}`}
    >
      {showIcon && <Icon className={`shrink-0 ${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${normalized === 'in_progress' ? 'animate-spin' : ''}`} />}
      <span>{status.replace(/_/g, ' ')}</span>
    </span>
  );
};
