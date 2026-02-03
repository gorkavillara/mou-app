import React from 'react';
import { MetricCard } from './MetricCard';
import {
  Gauge,
  TrendingUp,
  TrendingDown,
  Repeat,
  Clock,
  Target
} from 'lucide-react';

type MetricsGridProps = {
  rom: number;
  maxFlexion: number;
  maxExtension: number;
  repetitions: number;
  elapsedTime: number;
  progress: number;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function getRomStatus(rom: number): 'good' | 'active' | 'attention' | 'neutral' {
  if (rom >= 60) return 'good';
  if (rom >= 30) return 'active';
  if (rom > 0) return 'attention';
  return 'neutral';
}

export function MetricsGrid({
  rom,
  maxFlexion,
  maxExtension,
  repetitions,
  elapsedTime,
  progress
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
      <MetricCard
        label="ROM"
        value={rom}
        unit="°"
        status={getRomStatus(rom)}
        icon={<Gauge className="w-4 h-4" />} />

      <MetricCard
        label="Flexión Máx"
        value={maxFlexion}
        unit="°"
        status={maxFlexion > 0 ? 'active' : 'neutral'}
        icon={<TrendingUp className="w-4 h-4" />} />

      <MetricCard
        label="Extensión Máx"
        value={maxExtension}
        unit="°"
        status={maxExtension > 0 ? 'active' : 'neutral'}
        icon={<TrendingDown className="w-4 h-4" />} />

      <MetricCard
        label="Repeticiones"
        value={repetitions}
        status={
          repetitions >= 10 ? 'good' : repetitions > 0 ? 'active' : 'neutral'
        }
        icon={<Repeat className="w-4 h-4" />} />

      <MetricCard
        label="Tiempo"
        value={formatTime(elapsedTime)}
        status="active"
        icon={<Clock className="w-4 h-4" />} />

      <MetricCard
        label="Progreso"
        value={progress}
        unit="%"
        status={
          progress >= 100 ? 'good' : progress >= 50 ? 'active' : 'attention'
        }
        icon={<Target className="w-4 h-4" />}
        progress={progress} />
    </div>
  );
}