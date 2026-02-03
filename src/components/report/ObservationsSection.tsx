import React from 'react';

export function ObservationsSection() {
  return (
    <section className="mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-gray-900 font-bold text-lg mb-4 border-b border-gray-100 pb-2">
        Observaciones Clínicas
      </h2>
      <textarea
        className="w-full min-h-[120px] p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder-gray-400"
        placeholder="Escribe observaciones sobre el progreso del paciente..." />
    </section>
  );
}