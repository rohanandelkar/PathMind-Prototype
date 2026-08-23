"use client";

import { useState } from 'react';
import { AssessmentAttempt } from '@/lib/types';
import {
  History, Trophy, Clock, HelpCircle, Calendar, RefreshCw, CheckCircle2,
  XCircle, ChevronDown, ChevronUp, RotateCcw, Award, Layers
} from 'lucide-react';

interface AssessmentHistoryProps {
  attempts: AssessmentAttempt[];
  loading: boolean;
  onRetake: (assessmentId: string) => void;
  onRefresh: () => void;
}

export default function AssessmentHistory({
  attempts,
  loading,
  onRetake,
  onRefresh
}: AssessmentHistoryProps) {
  const [expandedAssessmentId, setExpandedAssessmentId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="bg-theme-surface border border-theme-border rounded-3xl p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-theme-border pb-4">
          <History className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-theme-main">My Assessment History</h2>
        </div>
        <div className="py-12 flex items-center justify-center gap-3 text-theme-muted">
          <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          <span className="text-xs">Loading assessment attempts from PostgreSQL...</span>
        </div>
      </div>
    );
  }

  if (!attempts || attempts.length === 0) {
    return (
      <div className="bg-theme-surface border border-theme-border rounded-3xl p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-theme-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-main">My Assessment History</h2>
              <p className="text-xs text-theme-muted">Your completed skill quizzes and attempt timeline</p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-theme-hover text-theme-muted hover:text-theme-main transition-colors border border-theme-border"
            title="Refresh History"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="py-12 text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-theme-hover text-theme-muted border border-theme-border mb-1">
            <Award className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-sm font-semibold text-theme-main">No Assessments Completed Yet</h3>
          <p className="text-xs text-theme-muted max-w-md mx-auto">
            Use the generator above to take your first skill assessment. Completed quizzes and retake attempts will appear here.
          </p>
        </div>
      </div>
    );
  }

  // Group attempts by assessment_id
  const grouped = attempts.reduce<Record<string, AssessmentAttempt[]>>((acc, att) => {
    const key = att.assessment_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(att);
    return acc;
  }, {});

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

  const formatTimeSeconds = (secs?: number) => {
    if (!secs || secs <= 0) return '< 1 min';
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    if (m === 0) return `${s} sec`;
    return `${m} min ${s} sec`;
  };

  return (
    <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-theme-border pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-theme-main tracking-tight">My Assessment History</h2>
            <p className="text-xs text-theme-muted">
              Permanent PostgreSQL records for your completed skill tests ({attempts.length} total attempts)
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl bg-theme-hover text-theme-muted hover:text-theme-main transition-colors border border-theme-border flex items-center gap-1.5 text-xs font-medium"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Assessment Cards List */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([assessmentId, groupAttempts]) => {
          // Sort attempts ascending by completed_at for chronological Attempt 1, Attempt 2...
          const chronAttempts = [...groupAttempts].sort((a, b) => 
            new Date(a.completed_at || 0).getTime() - new Date(b.completed_at || 0).getTime()
          );
          
          // Latest attempt is the last element
          const latestAttempt = chronAttempts[chronAttempts.length - 1];
          const isExpanded = expandedAssessmentId === assessmentId;

          return (
            <div
              key={assessmentId}
              className="bg-theme-hover/50 border border-theme-border rounded-2xl p-5 space-y-4 transition-all hover:border-brand-500/30"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-theme-main">
                      {latestAttempt.title || `${latestAttempt.topic} Assessment`}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      latestAttempt.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {latestAttempt.passed ? 'Passed' : 'Needs Improvement'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-theme-surface text-primary text-[11px] font-semibold border border-theme-border">
                      {latestAttempt.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-theme-muted flex items-center gap-1.5 flex-wrap">
                    <span>Topic: <strong className="text-theme-main">{latestAttempt.topic}</strong></span>
                    <span>•</span>
                    <span>Completed: {formatDate(latestAttempt.completed_at)}</span>
                  </p>
                </div>

                {/* Retake Action Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onRetake(assessmentId)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-bold text-xs transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
                  </button>
                </div>
              </div>

              {/* Assessment Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-theme-surface border border-theme-border rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[11px] text-theme-muted font-semibold block uppercase">Points Earned</span>
                  <span className="font-extrabold text-amber-400 text-sm flex items-center gap-1 mt-0.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" /> {latestAttempt.points_earned !== undefined ? latestAttempt.points_earned : Math.round((latestAttempt.correct_count / (latestAttempt.total_questions || 1)) * 100) / 10} / 10
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-theme-muted font-semibold block uppercase">Percentage</span>
                  <span className="font-bold text-primary text-sm mt-0.5 block">
                    {latestAttempt.score_percentage}%
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-theme-muted font-semibold block uppercase">Score Ratio</span>
                  <span className="font-bold text-theme-main mt-0.5 block">
                    {latestAttempt.score}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-theme-muted font-semibold block uppercase">Questions</span>
                  <span className="font-semibold text-theme-main flex items-center gap-1 mt-0.5">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-400" /> {latestAttempt.total_questions} questions
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-theme-muted font-semibold block uppercase">Time Taken</span>
                  <span className="font-semibold text-theme-main flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {formatTimeSeconds(latestAttempt.time_taken_seconds)}
                  </span>
                </div>
              </div>

              {/* Toggle Attempt History Timeline */}
              {chronAttempts.length > 1 && (
                <div>
                  <button
                    onClick={() => setExpandedAssessmentId(isExpanded ? null : assessmentId)}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    {isExpanded ? 'Hide' : 'View'} Attempt History ({chronAttempts.length} attempts)
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 border-t border-theme-border pt-3">
                      {chronAttempts.map((att, idx) => (
                        <div
                          key={att.id}
                          className="bg-theme-surface border border-theme-border rounded-xl p-3 flex items-center justify-between text-xs flex-wrap gap-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-primary bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                              Attempt #{att.attempt_number || (idx + 1)}
                            </span>
                            <span className="font-extrabold text-amber-400">
                              {att.points_earned !== undefined ? att.points_earned : Math.round((att.correct_count / (att.total_questions || 1)) * 100) / 10}/10 Pts
                            </span>
                            <span className="font-semibold text-theme-main">
                              {att.score_percentage}% ({att.score})
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              att.passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {att.passed ? 'Passed' : 'Needs Work'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-theme-muted text-[11px]">
                            <span>Time: {formatTimeSeconds(att.time_taken_seconds)}</span>
                            <span>•</span>
                            <span>{formatDate(att.completed_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
