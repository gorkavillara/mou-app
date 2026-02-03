 'use client';
 
 import React from 'react';
 import Link from 'next/link';
 import { usePathname } from 'next/navigation';
 import { LayoutDashboard, Users, Activity } from 'lucide-react';
 
 export default function DoctorLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const nav = [
     { label: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
     { label: 'Pacientes', href: '/doctor/pacientes', icon: Users }
   ];
 
   return (
     <div className="min-h-screen bg-[#F2F2F7] font-sans flex">
       <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 sticky top-0 h-screen">
         <div className="flex items-center gap-2 text-blue-600 px-2">
           <Activity size={20} />
           <span className="font-semibold">Mou · Doctor</span>
         </div>
         <nav className="flex-1 mt-2">
           <ul className="space-y-1">
             {nav.map(item => {
               const Icon = item.icon;
               const active = pathname === item.href || pathname.startsWith(item.href + '/');
               return (
                 <li key={item.href}>
                   <Link
                     href={item.href}
                     className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors ${
                       active
                         ? 'bg-blue-50 border-blue-200 text-blue-700'
                         : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                     }`}>
                     <Icon size={18} />
                     <span className="text-sm font-medium">{item.label}</span>
                   </Link>
                 </li>
               );
             })}
           </ul>
         </nav>
         <div className="text-xs text-gray-400 px-2">
           © Mou, panel clínico de prueba
         </div>
       </aside>
       <div className="flex-1">
         <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center px-8">
           <div className="flex items-center gap-3 text-blue-600">
             <Activity size={22} />
             <span className="font-semibold">Panel del Doctor</span>
           </div>
         </header>
         <main className="max-w-6xl mx-auto p-8">
           {children}
         </main>
       </div>
     </div>
   );
 }
