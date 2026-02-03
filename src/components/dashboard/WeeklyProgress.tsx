import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Flame } from 'lucide-react';

interface ProgressCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
  delay: number;
}

function ProgressCard({
  icon,
  label,
  value,
  subtext,
  color,
  delay
}: ProgressCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay
      }}
      whileTap={{
        scale: 0.98
      }}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-900 font-medium text-sm">{label}</p>
        <p className="text-gray-400 text-xs mt-1">{subtext}</p>
      </div>
    </motion.div>
  );
}

export function WeeklyProgress() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-xl font-bold text-gray-900">Progreso Semanal</h2>
        <button className="text-blue-500 text-sm font-medium">Ver todo</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ProgressCard
          icon={<Calendar size={20} className="text-blue-600" />}
          color="bg-blue-100"
          label="Sesiones"
          value="5/7"
          subtext="Meta semanal"
          delay={0.1} />

        <ProgressCard
          icon={<Clock size={20} className="text-green-600" />}
          color="bg-green-100"
          label="Minutos"
          value="180"
          subtext="de 210 min"
          delay={0.2} />

        <div className="col-span-2">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.3
            }}
            whileTap={{
              scale: 0.98
            }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Flame size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Racha de 12 días
              </h3>
              <p className="text-gray-500 text-sm">
                ¡Estás imparable! Sigue así.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}