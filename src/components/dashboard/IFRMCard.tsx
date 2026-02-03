import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Info } from 'lucide-react';

export function IFRMCard() {
  return (
    <motion.div
      whileTap={{
        scale: 0.98
      }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <TrendingUp size={120} />
      </div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
          Índice Funcional (IFRM)
        </h2>
        <Info size={18} className="text-gray-400" />
      </div>

      <div className="flex items-baseline gap-3 relative z-10">
        <span className="text-5xl font-bold text-gray-900 tracking-tight">
          78
        </span>
        <span className="text-gray-400 font-medium text-lg">/100</span>
      </div>

      <div className="mt-4 flex items-center gap-2 relative z-10">
        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <TrendingUp size={12} />
          <span>+2.4%</span>
        </div>
        <p className="text-gray-500 text-sm">vs. semana anterior</p>
      </div>

      <p className="mt-4 text-gray-600 text-sm leading-relaxed relative z-10">
        Tu movilidad ha mejorado significativamente en los ejercicios de pinza y
        extensión.
      </p>
    </motion.div>
  );
}