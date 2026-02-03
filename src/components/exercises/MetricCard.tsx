import React from 'react';

type CardStatus = 'good' | 'active' | 'attention' | 'neutral';
type MetricCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  status?: CardStatus;
  icon?: React.ReactNode;
  progress?: number;
};

const statusColors: Record<CardStatus, string> = {
  good: 'border-l-emerald-500',
  active: 'border-l-blue-500',
  attention: 'border-l-amber-500',
  neutral: 'border-l-gray-300'
};

export function MetricCard({
  label,
  value,
  unit,
  status = 'neutral',
  icon,
  progress
}: MetricCardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-100
        border-l-4 ${statusColors[status]}
        p-4 flex flex-col gap-1
      `}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>

      {progress !== undefined &&
        <div className="mt-2">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`
              }} />
          </div>
        </div>
      }
    </div>
  );
}