"use client";

import { useState, useEffect } from 'react';
import { GeneratedAssessment, AssessmentEvaluationResult } from '@/lib/types';
import { evaluateAssessment } from '@/lib/api';
import {
  X, Clock, CheckCircle2, XCircle, Award, ArrowLeft, ArrowRight,
  Zap, Loader2, RefreshCw, Trophy
} from 'lucide-react';

interface AssessmentRunnerModalProps {
  assessment: GeneratedAssessment | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: (result: AssessmentEvaluationResult) => void;
}

export default function AssessmentRunnerModal({
  assessment,
  isOpen,
  onClose,
  onCompleted
}: AssessmentRunnerModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<AssessmentEvaluationResult | null>(null);

  // Initialize Timer and State when Modal Opens
  useEffect(() => {
    if (isOpen && assessment) {
      setCurrentIdx(0);
      setUserAnswers({});
      setEvaluationResult(null);
      setSubmitting(false);
      const totalSecs = (assessment.time_limit_minutes || 10) * 60;
      setTimeLeftSeconds(totalSecs);
      setStartTime(Date.now());
    }
  }, [isOpen, assessment]);

  // Countdown Timer Interval
  useEffect(() => {
    if (!isOpen || evaluationResult || submitting || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, evaluationResult, submitting, timeLeftSeconds]);

  if (!isOpen || !assessment) return null;

  const questions = assessment.questions || [];
  const currentQuestion = questions[currentIdx];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));
  };

  const handleAutoSubmit = async () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (submitting || evaluationResult) return;
    setSubmitting(true);

    const elapsedSecs = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const result = await evaluateAssessment(assessment.id, userAnswers, elapsedSecs, assessment.seed);

    setSubmitting(false);
    if (result) {
      setEvaluationResult(result);
      if (onCompleted) onCompleted(result);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-theme-surface border border-theme-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-theme-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-main">{assessment.title}</h3>
              <div className="flex items-center gap-2 text-xs text-theme-muted mt-0.5">
                <span>Topic: {assessment.topic}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-theme-hover text-primary font-semibold border border-theme-border">{assessment.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!evaluationResult && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-hover border border-theme-border text-primary font-mono text-xs font-bold">
                <Clock className="w-4 h-4 text-primary animate-pulse" />
                <span>Timer: {formatTime(timeLeftSeconds)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-hover transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Content: Evaluation Result View OR Active Stepper */}
        {evaluationResult ? (
          /* RESULT VIEW */
          <div className="space-y-6">
            
            {/* Score Banner */}
            <div className="bg-theme-hover border border-theme-border rounded-2xl p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-brand-500/10 text-primary border border-brand-500/20 mb-1">
                <Trophy className="w-10 h-10 text-amber-400" />
              </div>
              <h4 className="text-2xl font-extrabold text-theme-main">Assessment Result Breakdown</h4>
              <div className="flex justify-center items-center gap-6 pt-2 flex-wrap">
                <div>
                  <span className="block text-3xl font-extrabold text-amber-400">
                    {evaluationResult.points_earned !== undefined ? evaluationResult.points_earned : Math.round((evaluationResult.correct_count / (evaluationResult.total_questions || 1)) * 100) / 10} / 10
                  </span>
                  <span className="text-[11px] text-theme-muted uppercase font-semibold">Points Earned</span>
                </div>
                <div className="h-8 w-px bg-theme-border" />
                <div>
                  <span className="block text-3xl font-extrabold text-primary">{evaluationResult.score_percentage}%</span>
                  <span className="text-[11px] text-theme-muted uppercase font-semibold">Percentage</span>
                </div>
                <div className="h-8 w-px bg-theme-border" />
                <div>
                  <span className="block text-3xl font-extrabold text-emerald-400">{evaluationResult.correct_count} / {evaluationResult.total_questions}</span>
                  <span className="text-[11px] text-theme-muted uppercase font-semibold">Correct Answers</span>
                </div>
                <div className="h-8 w-px bg-theme-border" />
                <div>
                  <span className="block text-3xl font-extrabold text-sky-400">{formatTime(Math.round(evaluationResult.time_taken_seconds))}</span>
                  <span className="text-[11px] text-theme-muted uppercase font-semibold">Time Taken</span>
                </div>
              </div>
            </div>

            {/* AI Adaptive Roadmap Result */}
            <div className="bg-theme-hover border border-brand-500/30 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Zap className="w-4 h-4" /> AI Adaptive Roadmap Impact:
              </div>
              <p className="text-xs text-theme-main">{evaluationResult.adaptation_applied}</p>
            </div>

            {/* Question by Question Detailed Review */}
            <div className="space-y-4 pt-2">
              <h5 className="text-sm font-bold text-theme-main">Per-Question Detailed Review</h5>
              <div className="space-y-3">
                {evaluationResult.detailed_results.map((res, idx) => (
                  <div key={idx} className="bg-theme-hover border border-theme-border rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold text-theme-main">
                        <span className="text-primary mr-1.5">{idx + 1}.</span> {res.question}
                      </p>
                      {res.is_correct ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {res.options.map((opt, oIdx) => {
                        const isUserSelect = res.user_selected_index === oIdx;
                        const isCorrectOpt = res.correct_option_index === oIdx;
                        
                        let optStyle = "bg-theme-surface text-theme-muted border-theme-border";
                        if (isCorrectOpt) {
                          optStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold";
                        } else if (isUserSelect && !isCorrectOpt) {
                          optStyle = "bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold";
                        }

                        return (
                          <div key={oIdx} className={`p-2.5 rounded-lg text-xs border ${optStyle} flex items-center justify-between`}>
                            <span>{opt}</span>
                            {isCorrectOpt && <span className="text-[10px] uppercase font-bold text-emerald-400">Correct Answer</span>}
                            {isUserSelect && !isCorrectOpt && <span className="text-[10px] uppercase font-bold text-rose-400">Your Selection</span>}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-theme-muted bg-theme-surface p-2.5 rounded-lg border border-theme-border leading-relaxed">
                      <strong className="text-theme-main">Explanation: </strong>{res.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-bold text-xs transition-colors shadow-lg shadow-brand-500/20"
              >
                Close & Return to Roadmap
              </button>
            </div>

          </div>
        ) : (
          /* ACTIVE ASSESSMENT STEPPER VIEW */
          <div className="space-y-6">
            
            {/* Progress Stepper Bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-theme-muted">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-primary">{Math.round(((currentIdx + 1) / questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-theme-hover rounded-full overflow-hidden border border-theme-border">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-accent-red transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            {currentQuestion && (
              <div className="bg-theme-hover border border-theme-border rounded-2xl p-5 sm:p-6 space-y-4">
                <p className="text-sm sm:text-base font-bold text-theme-main leading-relaxed">
                  <span className="text-primary mr-2">{currentIdx + 1}.</span> {currentQuestion.question}
                </p>

                <div className="space-y-2.5 pt-2">
                  {currentQuestion.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-brand-500/20 text-primary border-brand-500/50 shadow-md font-bold'
                            : 'bg-theme-surface text-theme-main border-theme-border hover:bg-theme-hover'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-theme-border text-theme-muted'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation & Submit Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 rounded-xl bg-theme-hover hover:opacity-90 text-theme-main font-semibold text-xs transition-colors flex items-center gap-1.5 border border-theme-border disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-brand-500/20"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Evaluating Results...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Submit Assessment
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
