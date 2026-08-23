"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AssessmentAttempt } from '@/lib/types';
import { Award, CheckCircle2, ArrowRight, HelpCircle, Trophy, Clock } from 'lucide-react';

interface AssessmentActivityProps {
  attempts: AssessmentAttempt[];
  loading?: boolean;
}

export default function AssessmentActivity({ attempts, loading }: AssessmentActivityProps) {
  const router = useRouter();

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return (
      <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-theme-border pb-4">
          <h3 className="text-base font-bold text-theme-main flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" /> Assessment Activity
          </h3>
        </div>
        <div className="py-8 text-center text-xs text-theme-muted">
          Loading assessment history...
        </div>
      </div>
    );
  }

  const totalCount = attempts ? attempts.length : 0;

  return (
    <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-5">
      
      {/* Header with Title and Total Count */}
      <div className="flex items-center justify-between border-b border-theme-border pb-4 flex-wrap gap-2">
        <div>
          <h3 className="text-base font-bold text-theme-main flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" /> Assessment Activity
          </h3>
          <p className="text-xs text-theme-muted mt-0.5">
            Your real assessment attempt history from PostgreSQL
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-primary">
          Total Assessments: {totalCount}
        </div>
      </div>

      {/* Empty State */}
      {totalCount === 0 ? (
        <div className="py-10 text-center space-y-3">
          <p className="text-xs sm:text-sm text-theme-muted font-medium">
            No assessments attempted yet.{' '}
            <Link
              href="/assessment"
              className="text-primary hover:underline font-semibold inline-flex items-center gap-1 transition-colors"
            >
              Create your first assessment →
            </Link>
          </p>
        </div>
      ) : (
        /* Assessment Attempts List */
        <div className="space-y-3">
          {attempts.map((attempt, index) => {
            const countLabel = `#${index + 1}`;
            const displayTitle = attempt.title || `${attempt.topic} Assessment`;
            const displayTopic = attempt.topic || attempt.skill_name || 'General Skill';
            const displayDifficulty = attempt.difficulty || 'Medium';
            const formattedDate = formatDate(attempt.completed_at);
            const statusText = attempt.passed ? 'Completed' : 'Completed (Needs Improvement)';

            return (
              <div
                key={attempt.id || index}
                onClick={() => router.push('/assessment')}
                className="group bg-theme-hover/40 hover:bg-theme-hover border border-theme-border hover:border-brand-500/30 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left Section: #Count, Title, Topic, Difficulty */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="font-extrabold text-sm text-primary bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                    {countLabel}
                  </span>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-theme-main group-hover:text-primary transition-colors truncate">
                        {displayTitle}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-theme-surface border border-theme-border text-theme-muted">
                        {displayDifficulty}
                      </span>
                    </div>

                    <p className="text-xs text-theme-muted flex items-center gap-2 flex-wrap">
                      <span>Topic: <strong className="text-theme-main font-medium">{displayTopic}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> {statusText}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right Section: Score, Percentage, Date Attempted */}
                <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 border-theme-border pt-3 sm:pt-0 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center sm:justify-end gap-2">
                      <span className="font-bold text-xs text-theme-main">Score: {attempt.score}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-brand-500/10 text-primary border border-brand-500/20">
                        {attempt.score_percentage}%
                      </span>
                    </div>
                    <span className="text-[11px] text-theme-muted block mt-0.5">
                      Completed: {formattedDate}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-theme-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
