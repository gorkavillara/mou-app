import React from 'react';
import { Activity } from 'lucide-react';

type DashboardHeaderProps = {
  exerciseName: string;
  dayInfo: string;
  phaseInfo: string;
};

export function DashboardHeader({
  exerciseName,
  dayInfo,
  phaseInfo
}: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">
              {exerciseName}
            </h1>
            <p className="text-blue-100 text-sm">
              {dayInfo} • {phaseInfo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-100">En sesión</span>
        </div>
      </div>
    </header>
  );
}