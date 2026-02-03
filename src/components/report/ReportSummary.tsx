import React from 'react';
import { Activity, TrendingUp, CheckCircle } from 'lucide-react';

export function ReportSummary() {
  return (
    <section className="mb-8">
      <h2 className="text-gray-900 font-bold text-lg mb-4 px-1">
        Resumen del Período
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-blue-600">
            <CheckCircle size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            18<span className="text-gray-400 text-lg font-normal">/21</span>
          </p>
          <p className="text-gray-500 text-sm font-medium">
            Ejercicios Completados
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3 text-green-600">
            <Activity size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">86%</p>
          <p className="text-gray-500 text-sm font-medium">
            Tasa de Adherencia
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3 text-purple-600">
            <TrendingUp size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            78<span className="text-gray-400 text-lg font-normal">/100</span>
          </p>
          <p className="text-gray-500 text-sm font-medium">
            Índice Funcional (IFRM)
          </p>
        </div>
      </div>
    </section>
  );
}