'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { IFRMCard } from '@/components/dashboard/IFRMCard';
import { AdherenceChart } from '@/components/dashboard/AdherenceChart';
import { QualityChart } from '@/components/dashboard/QualityChart';
import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress';
import { RecentExercises } from '@/components/dashboard/RecentExercises';
import { Suggestions } from '@/components/dashboard/Suggestions';
import { Home, Activity, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-24 font-sans">
      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-screen bg-[#F2F2F7] relative">
        <div className="p-6 pt-12">
          <DashboardHeader name="Carlos" />

          <IFRMCard />

          <div className="grid grid-cols-1 gap-4 mb-8">
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
                delay: 0.1
              }}
              className="h-[240px]">
              <AdherenceChart />
            </motion.div>

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
                delay: 0.2
              }}
              className="h-[240px]">
              <QualityChart />
            </motion.div>
          </div>

          <WeeklyProgress />

          <RecentExercises />

          <Suggestions />
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe pt-2 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center px-4 h-16">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-blue-600">
            <Home size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">Inicio</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Activity size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Ejercicios</span>
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Calendar size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Informe</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <User size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}