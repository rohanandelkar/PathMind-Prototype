"use client";

import { useState, useEffect } from 'react';
import { Assessment, AssessmentResult } from '@/lib/types';
import { fetchAssessment, submitAssessment, evaluateAssessment } from '@/lib/api';
import { X, CheckCircle, AlertTriangle, Award, ArrowRight, RefreshCw, Zap } from 'lucide-react';

interface AssessmentModalProps {
  assessmentId: string;
  isOpen: boolean;
  onClose: () => void;
  onAssessmentCompleted?: (result: AssessmentResult) => void;
}

export default function AssessmentModal({ assessmentId, isOpen, onClose, onAssessmentCompleted }: AssessmentModalProps) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && assessmentId) {
      setLoading(true);
      setResult(null);
      setSelectedAnswers({});
      fetchAssessment(assessmentId).then((data) => {
        setAssessment(data);
        setLoading(false);
      });
    }
  }, [isOpen, assessmentId]);

  if (!isOpen) return null;

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!assessment) return;
    setSubmitting(true);
    const evalRes = await evaluateAssessment(assessment.id, selectedAnswers, 60);
    let res: AssessmentResult;
    if (evalRes) {
      res = {
        assessment_id: evalRes.assessment_id,
        skill_name: evalRes.topic,
        score_percentage: evalRes.score_percentage,
        passed: evalRes.passed,
        feedback_summary: `Scored ${evalRes.score_percentage}% (${evalRes.correct_count}/${evalRes.total_questions})`,
        adaptation_applied: evalRes.adaptation_applied
      };
    } else {
      res = await submitAssessment(assessment.id, selectedAnswers);
    }
    setResult(res);
    setSubmitting(false);
    if (onAssessmentCompleted) {
      onAssessmentCompleted(res);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-theme-surface border border-theme-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-theme-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-main">{assessment?.title || 'Interactive Assessment'}</h3>
              <p className="text-xs text-theme-muted">Skill: {assessment?.skill_name} • Difficulty: {assessment?.difficulty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-theme-muted">Loading evaluation questions...</p>
          </div>
        ) : result ? (
          /* Result View */
          <div className="py-4 space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div>
              <span className="text-4xl font-extrabold text-theme-main">{result.score_percentage}%</span>
              <h4 className="text-lg font-bold text-emerald-400 mt-1">Assessment Evaluation Complete</h4>
              <p className="text-sm text-theme-muted mt-2 max-w-md mx-auto">{result.feedback_summary}</p>
            </div>

            {/* AI Path Adaptation Result */}
            <div className="bg-theme-hover border border-brand-500/30 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1">
                <Zap className="w-4 h-4" /> AI Adaptive Roadmap Modification:
              </div>
              <p className="text-xs text-theme-main">{result.adaptation_applied}</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red text-white font-semibold text-sm hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/25"
            >
              Back to Personalized Roadmap
            </button>
          </div>
        ) : (
          /* Quiz Question Stepper */
          <div className="space-y-6">
            {assessment?.questions.map((q, qIdx) => (
              <div key={q.id} className="bg-theme-hover border border-theme-border rounded-xl p-4">
                <p className="text-sm font-semibold text-theme-main mb-3">
                  <span className="text-primary mr-2">{qIdx + 1}.</span> {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-brand-500/20 text-primary border-brand-500/50 shadow-sm font-bold'
                            : 'bg-theme-surface text-theme-main border-theme-border hover:bg-theme-hover'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Score...
                  </>
                ) : (
                  <>
                    Submit & Adapt Path <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
