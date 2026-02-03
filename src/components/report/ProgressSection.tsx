import React from 'react';
import { AdherenceChart } from '../dashboard/AdherenceChart';
import { QualityChart } from '../dashboard/QualityChart';

export function ProgressSection() {
  return (
    <section className="mb-8">
      <h2 className="text-gray-900 font-bold text-lg mb-4 px-1">
        Progreso y Adherencia
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <AdherenceChart />
        </div>
        <div className="h-[300px] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <QualityChart />
        </div>
      </div>
    </section>
  );
}