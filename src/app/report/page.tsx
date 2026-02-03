'use client';

import React from 'react';
import { ChevronLeft, Download, Home, Activity, Calendar, User } from 'lucide-react';
import { PatientHeader } from '@/components/report/PatientHeader';
import { ReportSummary } from '@/components/report/ReportSummary';
import { ProgressSection } from '@/components/report/ProgressSection';
import { ObservationsSection } from '@/components/report/ObservationsSection';
import { RecommendationsSection } from '@/components/report/RecommendationsSection';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

export default function Report() {
  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Informe de Rehabilitación', 20, 20);
    doc.setFontSize(11);
    doc.text('Paciente: Carlos Mendoza', 20, 35);
    doc.text('ID: P-2024-1847', 20, 42);
    doc.text('Período: 1-31 Enero 2025', 20, 49);
    doc.text('Centro: Centro de Rehabilitación San José', 20, 56);
    doc.setFontSize(13);
    doc.text('Resumen', 20, 72);
    doc.setFontSize(11);
    doc.text('- IFRM: 78/100 (↑ 2.4% vs semana anterior)', 20, 82);
    doc.text('- Adherencia: 5/7 sesiones, 180 de 210 min', 20, 90);
    doc.text('- Calidad de ejecución: estable', 20, 98);
    doc.text('Observaciones', 20, 114);
    doc.text('- Buena respuesta en ejercicios de pinza y extensión', 20, 122);
    doc.text('Recomendaciones', 20, 138);
    doc.text('- Mantener rutina y añadir “Pinza con Esponja”', 20, 146);
    doc.save('informe_mou.pdf');
  };
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-24 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button className="flex items-center text-blue-600 font-medium text-base active:opacity-70 transition-opacity">
          <ChevronLeft size={22} className="-ml-1" />
          Atrás
        </button>
        <h1 className="text-gray-900 font-semibold text-base">
          Informe de Rehabilitación
        </h1>
        <button onClick={handleExportPdf} className="w-8 h-8 flex items-center justify-center text-blue-600 active:opacity-70 transition-opacity">
          <Download size={20} />
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        <PatientHeader
          name="Carlos Mendoza"
          id="P-2024-1847"
          period="1-31 Enero 2025"
          clinic="Centro de Rehabilitación San José" />

        <ReportSummary />

        <ProgressSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ObservationsSection />
          <RecommendationsSection />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full border-gray-200 p-4 pb-safe z-50 md:hidden">
        <button onClick={handleExportPdf} className="w-full text-white font-semibold py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <Download size={18} />
          Exportar PDF
        </button>
      </div>

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
          <Link href="/report" className="flex flex-col items-center gap-1 text-blue-600">
            <Calendar size={24} strokeWidth={2.5} />
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
