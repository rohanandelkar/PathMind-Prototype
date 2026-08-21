"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDashboardMetrics } from '@/lib/api';
import { DashboardMetrics } from '@/lib/types';
import SkillGapChart from '@/components/SkillGapChart';
import ProgressChart from '@/components/ProgressChart';
import { LayoutDashboard, Zap, Award, Flame, Clock, ArrowRight, Target, CheckCircle } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';
import { useAuth } from '@/context/AuthContext';

function DashboardContent() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setMetrics(null);
    if (user) {
      fetchDashboardMetrics().then(setMetrics);
    }
  }, [user, user?.selected_learning_path]);

  if (!metrics) {
    return (
      <div className="py-16 text-center text-slate-400">
        Loading analytics dashboard...
      </div>
    );
  }

  const displayName = user?.full_name || metrics.user_name || "Learner";

  return (
    <div className="space-y-8 py-2">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[11px] font-semibold border border-sky-500/20">
              Target Track: {metrics.target_role}
            </span>
            <Link
              href="/learning-path-selection"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 text-[11px] font-medium border border-indigo-500/20 transition-colors"
            >
              Change Learning Path →
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, {displayName}!</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Your AI learning roadmap is actively tailored to your goals and pace.</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
            <div>
              <span className="block text-lg font-bold text-white">{metrics.learning_streak_days} Days</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Streak</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-sky-400" />
            <div>
              <span className="block text-lg font-bold text-white">{metrics.total_hours_learned} Hours</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Invested</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Highlight Card */}
      <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> AI Recommended Next Action
            </span>
            <h2 className="text-xl font-bold text-white">{metrics.next_recommended_action.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{metrics.next_recommended_action.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-medium text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              {metrics.next_recommended_action.estimated_duration}
            </span>
            <Link
              href="/roadmap"
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              Go to Active Module <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Overall Progress Gauge & Milestone Breakdown */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-sky-400" /> Roadmap Completion Status
        </h2>
        <ProgressChart
          milestones={metrics.milestone_summary}
          overallProgress={metrics.overall_progress}
        />
      </div>

      {/* Skill Gap Visualizations */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400" /> Skill Proficiency Radar & Priority Gaps
        </h2>
        <SkillGapChart data={metrics.skills_visualization} />
      </div>

      {/* Priority Skill Gaps Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Prioritized Skill Gap Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Skill Name</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Points to Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {metrics.skill_gaps_summary.map((gap, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-medium text-white">{gap.skill}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      gap.priority === 1 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      P{gap.priority}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{gap.status}</td>
                  <td className="py-3 text-right font-bold text-purple-400">+{gap.gap} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppNavbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardContent />
      </main>
    </ProtectedRoute>
  );
}
