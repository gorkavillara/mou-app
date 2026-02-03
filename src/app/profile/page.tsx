 'use client';
 
 import React from 'react';
 import Link from 'next/link';
 import { Home, Activity, Calendar, User, Mail, Phone, CalendarCheck } from 'lucide-react';
 import { PatientHeader } from '@/components/report/PatientHeader';
 import { IFRMCard } from '@/components/dashboard/IFRMCard';
 import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress';
 import { RecentExercises } from '@/components/dashboard/RecentExercises';
 
 export default function Profile() {
   return (
     <div className="min-h-screen bg-[#F2F2F7] pb-24 font-sans">
       <main className="max-w-md mx-auto min-h-screen bg-[#F2F2F7] relative">
         <div className="p-6 pt-12">
           <div className="mb-6 px-1">
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Perfil</h1>
             <p className="text-gray-500 text-sm">Información del paciente y progreso</p>
           </div>
 
           <PatientHeader
             name="Carlos Mendoza"
             id="P-2024-1847"
             period="Tratamiento activo"
             clinic="Centro de Rehabilitación San José"
           />
 
           <IFRMCard />
 
           <WeeklyProgress />
 
           <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Datos de Cuenta</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                   <Mail size={18} className="text-blue-600" />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Correo</p>
                   <p className="text-gray-900 font-medium text-base">jcoloma@mouapp.com</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                   <Phone size={18} className="text-green-600" />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Teléfono</p>
                   <p className="text-gray-900 font-medium text-base">+34 600 123 456</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                   <Calendar size={18} className="text-purple-600" />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Plan</p>
                   <p className="text-gray-900 font-medium text-base">Rehabilitación mano y muñeca</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                   <CalendarCheck size={18} className="text-orange-600" />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Próxima cita</p>
                   <p className="text-gray-900 font-medium text-base">12 Feb 2025, 10:30</p>
                 </div>
               </div>
             </div>
           </section>
 
           <RecentExercises />
         </div>
       </main>
 
       <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe pt-2 z-50">
         <div className="max-w-md mx-auto flex justify-around items-center px-4 h-16">
           <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
             <Home size={24} strokeWidth={2} />
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
           <Link href="/profile" className="flex flex-col items-center gap-1 text-blue-600">
             <User size={24} strokeWidth={2.5} />
             <span className="text-[10px] font-medium">Perfil</span>
           </Link>
         </div>
       </div>
     </div>
   );
 }
