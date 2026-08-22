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
    { name: 'In-Progress', value: milestones.in_progress, color: '#FF0000' },
    { name: 'Locked', value: milestones.locked, color: '#5C0000' }
  ];

  return (
    <div className="bg-theme-surface border border-theme-border rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      
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
              contentStyle={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-theme-main">{overallProgress}%</span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-theme-muted">Completed</span>
        </div>
      </div>

      {/* Milestone Breakdown List */}
      <div className="flex-1 grid grid-cols-3 gap-3 w-full">
        <div className="bg-theme-hover border border-theme-border rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-emerald-400">{milestones.completed}</span>
          <span className="text-xs text-theme-muted font-medium">Completed</span>
        </div>
        <div className="bg-theme-hover border border-theme-border rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-primary">{milestones.in_progress}</span>
          <span className="text-xs text-theme-muted font-medium">In-Progress</span>
        </div>
        <div className="bg-theme-hover border border-theme-border rounded-xl p-3 text-center">
          <span className="block text-2xl font-bold text-theme-muted">{milestones.locked}</span>
          <span className="text-xs text-theme-muted font-medium">Upcoming</span>
        </div>
      </div>

    </div>
  );
}
