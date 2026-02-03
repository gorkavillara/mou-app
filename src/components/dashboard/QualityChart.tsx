import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  {
    name: 'Flex',
    score: 85
  },
  {
    name: 'Ext',
    score: 92
  },
  {
    name: 'Agarre',
    score: 78
  },
  {
    name: 'Rot',
    score: 88
  }
];

export function QualityChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="text-gray-900 font-bold mb-1">Calidad</h3>
      <p className="text-gray-400 text-xs mb-4">Por tipo de ejercicio</p>

      <div className="flex-1 min-h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 0
            }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9CA3AF',
                fontSize: 10
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
              cursor={{
                fill: '#F3F4F6',
                radius: 4
              }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} />

            <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32}>
              {data.map((entry, index) =>
                <Cell
                  key={`cell-${index}`}
                  fill={entry.score > 85 ? '#34C759' : '#007AFF'} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}