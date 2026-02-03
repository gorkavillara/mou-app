import React from 'react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  name?: string;
}

export function DashboardHeader({ name = 'Usuario' }: DashboardHeaderProps) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const dateString = date.toLocaleDateString('es-ES', options);
  // Capitalize first letter of the date
  const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="mb-6 px-1">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
        {formattedDate}
      </p>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Buenos días, {name}
      </h1>
    </motion.div>
  );
}