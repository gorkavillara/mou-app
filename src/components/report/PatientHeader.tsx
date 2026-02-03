import React from 'react';

interface PatientHeaderProps {
  name: string;
  id: string;
  period: string;
  clinic: string;
}

export function PatientHeader({
  name,
  id,
  period,
  clinic
}: PatientHeaderProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <h2 className="text-gray-900 font-bold text-lg mb-4 border-b border-gray-100 pb-2">
        Datos del Paciente
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
            Nombre
          </p>
          <p className="text-gray-900 font-medium text-base">{name}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
            ID Paciente
          </p>
          <p className="text-gray-900 font-medium text-base font-mono">{id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
            Período
          </p>
          <p className="text-gray-900 font-medium text-base">{period}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
            Centro
          </p>
          <p className="text-gray-900 font-medium text-base">{clinic}</p>
        </div>
      </div>
    </section>
  );
}