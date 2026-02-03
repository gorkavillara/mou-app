 'use client';
 
 import React, { useMemo } from 'react';
 import { AlertTriangle, Play, Grid3x3 } from 'lucide-react';
 import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   ResponsiveContainer
 } from 'recharts';
 
 const adherence = [
   { day: 'L', value: 1 },
   { day: 'M', value: 0.8 },
   { day: 'X', value: 0.6 },
   { day: 'J', value: 1 },
   { day: 'V', value: 0.4 },
   { day: 'S', value: 0.9 },
   { day: 'D', value: 0.7 }
 ];
 
 const biomecData = [
   { session: 'S1', flexion: 62, objetivo: 75 },
   { session: 'S2', flexion: 66, objetivo: 75 },
   { session: 'S3', flexion: 68, objetivo: 75 },
   { session: 'S4', flexion: 70, objetivo: 75 },
   { session: 'S5', flexion: 72, objetivo: 75 },
   { session: 'S6', flexion: 73, objetivo: 75 },
   { session: 'S7', flexion: 74, objetivo: 75 }
 ];
 
export default function DoctorDashboard() {
   const heatColors = useMemo(
     () => adherence.map(a => {
       const g = Math.round(255 * a.value);
       return `rgb(${255 - g}, ${g}, 120)`;
     }),
     []
   );
 
   return (
    <div className="grid grid-cols-12 gap-6">
           <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Métricas de Adherencia</h2>
               <Grid3x3 size={18} className="text-gray-400" />
             </div>
             <div className="grid grid-cols-7 gap-2">
               {adherence.map((a, i) =>
                 <div key={a.day} className="flex flex-col items-center gap-2">
                   <div
                     className="w-10 h-10 rounded-md border border-gray-200"
                     style={{ backgroundColor: heatColors[i] }} />
                   <span className="text-xs text-gray-500 font-medium">{a.day}</span>
                 </div>
               )}
             </div>
             <div className="mt-4 text-xs text-gray-500">
               Verde intenso: alta constancia · rojo: baja constancia
             </div>
           </section>
 
           <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Evolución Biomecánica</h2>
             </div>
             <div className="h-[320px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={biomecData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                   <XAxis dataKey="session" />
                   <YAxis unit="°" />
                   <Tooltip />
                   <Legend />
                   <Line type="monotone" dataKey="flexion" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="Flexión" />
                   <Line type="monotone" dataKey="objetivo" stroke="#EF4444" strokeWidth={2} dot={false} name="Objetivo" />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </section>
 
           <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Alertas Críticas</h2>
               <AlertTriangle size={18} className="text-orange-500" />
             </div>
             <div className="space-y-3">
               <div className="flex items-start gap-3">
                 <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                   <AlertTriangle size={16} className="text-orange-600" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-900 font-semibold">Retroceso ROM detectado</p>
                   <p className="text-xs text-gray-500">Sesión S6 vs S5: -3° en flexión</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                   <AlertTriangle size={16} className="text-red-600" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-900 font-semibold">Dolor agudo reportado</p>
                   <p className="text-xs text-gray-500">Nivel 8/10 en muñeca derecha</p>
                 </div>
               </div>
             </div>
           </section>
 
           <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Visualizador de Sesión</h2>
               <button className="flex items-center gap-2 text-blue-600 font-semibold">
                 <Play size={16} />
                 Reproducir
               </button>
             </div>
             <div className="relative h-[360px] rounded-xl overflow-hidden border border-gray-200 bg-black">
               <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff1_1px,transparent_1px)] [background-size:16px_16px]" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[540px] h-[300px] bg-neutral-900 rounded-lg border border-neutral-700 relative">
                   <div className="absolute inset-0">
                     {[...Array(21)].map((_, i) =>
                       <div
                         key={i}
                         className="absolute w-2 h-2 rounded-full"
                         style={{
                           left: `${10 + (i % 7) * 12}%`,
                           top: `${10 + Math.floor(i / 7) * 28}%`,
                           backgroundColor: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#3B82F6' : '#F59E0B'
                         }} />
                     )}
                   </div>
                   <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                     Keypoints estimados · mano derecha
                   </div>
                 </div>
               </div>
             </div>
          </section>
    </div>
   );
 }
