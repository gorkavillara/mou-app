import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    day: 'L',
    value: 85
  },
  {
    day: 'M',
    value: 90
  },
  {
    day: 'X',
    value: 75
  },
  {
    day: 'J',
    value: 95
  },
  {
    day: 'V',
    value: 88
  },
  {
    day: 'S',
    value: 92
  },
  {
    day: 'D',
    value: 80
  }
];

export function AdherenceChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="text-gray-900 font-bold mb-1">Adherencia Diaria</h3>
      <p className="text-gray-400 text-xs mb-4">Últimos 7 días</p>

      <div className="flex-1 min-h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 0
            }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9CA3AF',
                fontSize: 12
              }}
              dy={10} />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9CA3AF',
                fontSize: 12
              }} />

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              cursor={{
                stroke: '#007AFF',
                strokeWidth: 1,
                strokeDasharray: '4 4'
              }} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#007AFF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)" />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}