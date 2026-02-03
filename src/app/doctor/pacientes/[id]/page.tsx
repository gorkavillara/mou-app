 'use client';
 
 import React from 'react';
 import Link from 'next/link';
 import { useParams } from 'next/navigation';
 import { patients } from '@/data/patients';
 import { PatientHeader } from '@/components/report/PatientHeader';
 import { IFRMCard } from '@/components/dashboard/IFRMCard';
 import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer
 } from 'recharts';
 
 export default function PatientDetail() {
   const params = useParams() as { id?: string };
   const p = patients.find(x => x.id === params?.id);
 
   if (!p) {
     return (
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold text-gray-900">Paciente</h1>
           <Link href="/doctor/pacientes" className="text-blue-600 text-sm font-semibold">
             Volver a lista
           </Link>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <p className="text-sm text-gray-900 font-semibold">Paciente no encontrado</p>
           <p className="text-xs text-gray-500 mt-1">Verifica el identificador y vuelve a intentarlo.</p>
         </div>
       </div>
     );
   }
 
   const sessions = [
     { session: 'S1', flexion: Math.max(55, p.ifrm - 25), objetivo: 75 },
     { session: 'S2', flexion: Math.max(58, p.ifrm - 22), objetivo: 75 },
     { session: 'S3', flexion: Math.max(60, p.ifrm - 20), objetivo: 75 },
     { session: 'S4', flexion: Math.max(63, p.ifrm - 17), objetivo: 75 },
     { session: 'S5', flexion: Math.max(66, p.ifrm - 14), objetivo: 75 },
     { session: 'S6', flexion: Math.max(69, p.ifrm - 11), objetivo: 75 },
     { session: 'S7', flexion: Math.max(72, p.ifrm - 8), objetivo: 75 }
   ];
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-900">Paciente</h1>
         <Link href="/doctor/pacientes" className="text-blue-600 text-sm font-semibold">
           Volver a lista
         </Link>
       </div>
 
       <PatientHeader
         name={p.name}
         id={p.id}
         period={p.lastSession}
         clinic={p.clinic}
       />
 
       <div className="grid grid-cols-12 gap-6">
         <section className="col-span-12 lg:col-span-4">
           <IFRMCard />
         </section>
 
         <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900">Flexión vs Objetivo</h2>
           </div>
           <div className="h-[320px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={sessions} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                 <XAxis dataKey="session" />
                 <YAxis unit="°" />
                 <Tooltip />
                 <Line type="monotone" dataKey="flexion" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="Flexión" />
                 <Line type="monotone" dataKey="objetivo" stroke="#EF4444" strokeWidth={2} dot={false} name="Objetivo" />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </section>
 
         <section className="col-span-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h2 className="text-lg font-bold text-gray-900 mb-3">Alertas</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             <div className="p-4 border border-gray-200 rounded-xl">
               <p className="text-sm text-gray-900 font-semibold">Dolor reportado</p>
               <p className="text-xs text-gray-500">Nivel {p.painLevel}/10 en última sesión</p>
             </div>
             <div className="p-4 border border-gray-200 rounded-xl">
               <p className="text-sm text-gray-900 font-semibold">Variación ROM</p>
               <p className="text-xs text-gray-500">Revisar consistencia en ejercicios de pinza</p>
             </div>
           </div>
         </section>
       </div>
     </div>
   );
 }
