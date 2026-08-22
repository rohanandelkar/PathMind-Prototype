"use client";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

interface SkillGapChartProps {
  data: Array<{
    skill: string;
    current: number;
    required: number;
    gap: number;
  }>;
}

export default function SkillGapChart({ data }: SkillGapChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Radar Chart Component */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-theme-main flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-red"></span>
            Skill Proficiency vs Target Role Benchmark
          </h3>
          <p className="text-xs text-theme-muted">Radar comparison of current capability against target role requirements.</p>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="skill" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--border-color)" />
              <Radar name="Current Level" dataKey="current" stroke="#950101" fill="#950101" fillOpacity={0.4} />
              <Radar name="Required Level" dataKey="required" stroke="#FF0000" fill="#FF0000" fillOpacity={0.15} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Component */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-theme-main flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
            Skill Gap Magnitude (Points to Target)
          </h3>
          <p className="text-xs text-theme-muted">Quantitative gap score prioritized for learning sequence.</p>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="skill" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="gap" name="Skill Gap Score" fill="#FF0000" radius={[6, 6, 0, 0]} />
              <Bar dataKey="current" name="Current Score" fill="#950101" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
