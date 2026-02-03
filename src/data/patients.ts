 export type Patient = {
   id: string;
   name: string;
   email: string;
   diagnosis: string;
   clinic: string;
   lastSession: string;
   ifrm: number;
   adherence: number;
   painLevel: number;
 };
 
 export const patients: Patient[] = [
   {
     id: 'P-2024-1847',
     name: 'Carlos Mendoza',
     email: 'c.mendoza@gmail.com',
     diagnosis: 'Rehabilitación mano derecha',
     clinic: 'Centro de Rehabilitación San José',
     lastSession: 'S7 · 31 Ene 2025',
     ifrm: 78,
     adherence: 0.8,
     painLevel: 2
   },
   {
     id: 'P-2024-1901',
     name: 'Laura Gómez',
     email: 'l.gomez@gmail.com',
     diagnosis: 'Síndrome del túnel carpiano',
     clinic: 'Clínica Las Hadas',
     lastSession: 'S5 · 29 Ene 2025',
     ifrm: 72,
     adherence: 0.7,
     painLevel: 3
   },
   {
     id: 'P-2024-2044',
     name: 'Javier Ruiz',
     email: 'j.ruiz@gmail.com',
     diagnosis: 'Fractura radial · postoperatorio',
     clinic: 'Hospital Norte',
     lastSession: 'S3 · 28 Ene 2025',
     ifrm: 65,
     adherence: 0.6,
     painLevel: 5
   },
   {
     id: 'P-2024-2120',
     name: 'María López',
     email: 'm.lopez@gmail.com',
     diagnosis: 'Lesión tendinosa',
     clinic: 'Centro FisioFit',
     lastSession: 'S6 · 30 Ene 2025',
     ifrm: 80,
     adherence: 0.9,
     painLevel: 1
   }
 ];
