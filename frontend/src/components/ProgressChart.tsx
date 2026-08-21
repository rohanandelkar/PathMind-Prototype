"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProgressChartProps {
  milestones: {
    total: number;
    completed: number;
    in_progress: number;
    locked: number;
  };
  overallProgress: number;
}

export default function ProgressChart({ milestones, overallProgress }: ProgressChartProps) {
  const pieData = [
    { name: 'Completed', value: milestones.completed, color: '#10b981' },
    { name: 'In-Progress', value: milestones.in_progress, color: '#38bdf8' },
    { name: 'Locked', value: milestones.locked, color: '#334155' }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Donut Gauge Chart */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-white">{overallProgress}%</span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Completed</span>
        </div>
      </div>

      {/* Milestone Breakdown List */}
      <div className="flex-1 grid grid-cols-3 gap-3 w-full">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-emerald-400">{milestones.completed}</span>
          <span className="text-xs text-slate-400 font-medium">Completed</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-sky-400">{milestones.in_progress}</span>
          <span className="text-xs text-slate-400 font-medium">In-Progress</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-slate-400">{milestones.locked}</span>
          <span className="text-xs text-slate-400 font-medium">Upcoming</span>
        </div>
      </div>

    </div>
  );
}
