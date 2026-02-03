 'use client';
 
 import React from 'react';
 import Link from 'next/link';
 import { patients } from '@/data/patients';
 
 export default function PatientsList() {
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {patients.map(p =>
           <Link
             key={p.id}
             href={`/doctor/pacientes/${p.id}`}
             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-blue-200 transition-colors">
             <div className="flex items-start justify-between">
               <div>
                 <p className="text-sm text-gray-500 font-mono">{p.id}</p>
                 <h2 className="text-lg font-bold text-gray-900">{p.name}</h2>
                 <p className="text-sm text-gray-500">{p.diagnosis}</p>
               </div>
               <div className="text-right">
                 <div className="text-3xl font-bold text-gray-900">{p.ifrm}</div>
                 <div className="text-gray-400 text-sm">IFRM</div>
               </div>
             </div>
             <div className="mt-4 flex items-center justify-between text-sm">
               <span className="text-gray-500">Última sesión: {p.lastSession}</span>
               <span className="text-gray-500">Adherencia: {Math.round(p.adherence * 100)}%</span>
             </div>
           </Link>
         )}
       </div>
     </div>
   );
 }
