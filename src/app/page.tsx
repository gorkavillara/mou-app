'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Por ahora, redirigimos siempre al login
    // En una implementación real, verificaríamos si hay sesión activa
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}