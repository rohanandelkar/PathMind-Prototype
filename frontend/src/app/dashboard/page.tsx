"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDashboardMetrics, fetchAssessmentHistory } from '@/lib/api';
import { DashboardMetrics, AssessmentAttempt } from '@/lib/types';
import SkillGapChart from '@/components/SkillGapChart';
import ProgressChart from '@/components/ProgressChart';
import AssessmentActivity from '@/components/AssessmentActivity';
import { LayoutDashboard, Zap, Award, Flame, Clock, ArrowRight, Target, CheckCircle } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';
import { useAuth } from '@/context/AuthContext';
import { useActivityTracker } from '@/context/ActivityTrackerContext';

function DashboardContent() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState<boolean>(true);
  const { user } = useAuth();
  const { formattedTime, streakDays, totalHours } = useActivityTracker();

  useEffect(() => {
    setMetrics(null);
    setLoadingAttempts(true);
    if (user) {
      fetchDashboardMetrics().then(setMetrics);
      fetchAssessmentHistory().then((data) => {
        setAttempts(data);
        setLoadingAttempts(false);
      });
    }
  }, [user, user?.selected_learning_path]);

  if (!metrics) {
    return (
      <div className="py-16 text-center text-theme-muted">
        Loading analytics dashboard...
      </div>
    );
  }

  const displayName = user?.full_name || metrics.user_name || "Learner";
  const displayStreak = streakDays !== undefined ? streakDays : metrics.learning_streak_days;
  const displayTime = formattedTime || metrics.formatted_time_invested || `${metrics.total_hours_learned} Hours`;

  return (
    <div className="space-y-8 py-2">
      
      {/* Top Banner */}
      <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-primary text-[11px] font-semibold border border-brand-500/20">
              Target Track: {metrics.target_role}
            </span>
            <Link
              href="/learning-path-selection"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-theme-hover text-theme-main hover:bg-brand-500/10 text-[11px] font-medium border border-theme-border transition-colors"
            >
              Change Learning Path →
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-main">Welcome back, {displayName}!</h1>
          <p className="text-xs sm:text-sm text-theme-muted mt-1">Your AI learning roadmap is actively tailored to your goals and pace.</p>
        </div>

        <div className="flex items-center gap-4 bg-theme-hover border border-theme-border p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
            <div>
              <span className="block text-lg font-bold text-theme-main">{displayStreak} Days</span>
              <span className="text-[10px] text-theme-muted uppercase font-semibold">Active Streak</span>
            </div>
          </div>
          <div className="h-8 w-px bg-theme-border"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <span className="block text-lg font-bold text-theme-main min-w-[70px]">{displayTime}</span>
              <span className="text-[10px] text-theme-muted uppercase font-semibold">Time Invested</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Highlight Card */}
      <div className="bg-theme-surface border border-brand-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Zap className="w-4 h-4" /> AI Recommended Next Action
            </span>
            <h2 className="text-xl font-bold text-theme-main">{metrics.next_recommended_action.title}</h2>
            <p className="text-xs text-theme-muted leading-relaxed">{metrics.next_recommended_action.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-medium text-theme-muted bg-theme-hover px-3 py-1.5 rounded-lg border border-theme-border">
              {metrics.next_recommended_action.estimated_duration}
            </span>
            <Link
              href="/roadmap"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-brand-500/20"
            >
              Go to Active Module <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Overall Progress Gauge & Milestone Breakdown */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-theme-main flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Roadmap Completion Status
        </h2>
        <ProgressChart
          milestones={metrics.milestone_summary}
          overallProgress={metrics.overall_progress}
        />
      </div>

      {/* Skill Gap Visualizations */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-theme-main flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" /> Skill Proficiency Radar & Priority Gaps
        </h2>
        <SkillGapChart data={metrics.skills_visualization} />
      </div>

      {/* Assessment Activity Section (Replaces Prioritized Skill Gap Queue) */}
      <AssessmentActivity attempts={attempts} loading={loadingAttempts} />

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
