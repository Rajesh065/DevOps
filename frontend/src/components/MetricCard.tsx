import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'emerald' | 'blue' | 'purple' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'emerald'
}) => {
  const getIconColor = () => {
    switch (variant) {
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'blue': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'purple': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'amber': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-200 shadow-sm relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-1.5 tracking-tight font-mono">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg border ${getIconColor()} transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs">
          <span className={`font-mono font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.value}
          </span>
          <span className="text-slate-400">vs last deploy cycle</span>
        </div>
      )}
    </div>
  );
};
