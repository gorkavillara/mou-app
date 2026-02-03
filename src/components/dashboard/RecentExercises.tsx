import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';

const exercises = [
  {
    id: 1,
    name: 'Flexión de Dedos',
    duration: '15 min',
    score: 92,
    date: 'Hoy'
  },
  {
    id: 2,
    name: 'Rotación de Muñeca',
    duration: '10 min',
    score: 88,
    date: 'Ayer'
  },
  {
    id: 3,
    name: 'Pinza Fina',
    duration: '12 min',
    score: 78,
    date: 'Ayer'
  }
];

export function RecentExercises() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-xl font-bold text-gray-900">
          Ejercicios Recientes
        </h2>
        <button className="text-blue-500 text-sm font-medium">Historial</button>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 scrollbar-hide snap-x">
        {exercises.map((ex, index) =>
          <motion.div
            key={ex.id}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            whileTap={{
              scale: 0.98
            }}
            className="min-w-[240px] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 snap-center flex flex-col justify-between h-[160px]">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  {ex.date}
                </span>
                <div
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${ex.score >= 90 ? 'bg-green-100 text-green-700' : ex.score >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {ex.score}%
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                {ex.name}
              </h3>
              <p className="text-gray-500 text-sm">{ex.duration}</p>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Play size={14} fill="currentColor" />
              </div>
              <span>Repetir</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}