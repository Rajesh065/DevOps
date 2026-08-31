import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
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
  trend
}) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#8b949e]">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-[#8b949e]" />}
      </div>

      <div className="my-2">
        <div className="text-2xl font-bold font-mono text-[#e6edf3] tracking-tight">{value}</div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#8b949e] border-t border-[#21262d] pt-2 mt-1">
        <span>{subtitle}</span>
        {trend && (
          <span className={`font-mono flex items-center font-semibold ${trend.isPositive ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
