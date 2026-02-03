import React from 'react';
import { Check } from 'lucide-react';

const recommendations = [
  'Continuar con ejercicios de flexión 3 veces por semana',
  'Incrementar resistencia en ejercicios de agarre',
  'Monitorear dolor en articulación de muñeca',
  'Próxima evaluación en 2 semanas'
];

export function RecommendationsSection() {
  return (
    <section className="mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-gray-900 font-bold text-lg mb-4 border-b border-gray-100 pb-2">
        Recomendaciones
      </h2>
      <ul className="space-y-3">
        {recommendations.map((rec, index) =>
          <li key={index} className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-blue-600" strokeWidth={3} />
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">{rec}</span>
          </li>
        )}
      </ul>
    </section>
  );
}