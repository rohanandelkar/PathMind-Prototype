"use client";

import { useState, useEffect } from 'react';
import { Assessment, AssessmentResult } from '@/lib/types';
import { fetchAssessment, submitAssessment } from '@/lib/api';
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
    const res = await submitAssessment(assessment.id, selectedAnswers);
    setResult(res);
    setSubmitting(false);
    if (onAssessmentCompleted) {
      onAssessmentCompleted(res);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{assessment?.title || 'Interactive Assessment'}</h3>
              <p className="text-xs text-slate-400">Skill: {assessment?.skill_name} • Difficulty: {assessment?.difficulty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
            <p className="text-sm text-slate-400">Loading evaluation questions...</p>
          </div>
        ) : result ? (
          /* Result View */
          <div className="py-4 space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div>
              <span className="text-4xl font-extrabold text-white">{result.score_percentage}%</span>
              <h4 className="text-lg font-bold text-emerald-400 mt-1">Assessment Evaluation Complete</h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">{result.feedback_summary}</p>
            </div>

            {/* AI Path Adaptation Result */}
            <div className="bg-slate-800/80 border border-sky-500/30 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-1">
                <Zap className="w-4 h-4" /> AI Adaptive Roadmap Modification:
              </div>
              <p className="text-xs text-slate-200">{result.adaptation_applied}</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/25"
            >
              Back to Personalized Roadmap
            </button>
          </div>
        ) : (
          /* Quiz Question Stepper */
          <div className="space-y-6">
            {assessment?.questions.map((q, qIdx) => (
              <div key={q.id} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <p className="text-sm font-semibold text-white mb-3">
                  <span className="text-sky-400 mr-2">{qIdx + 1}.</span> {q.question}
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
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm'
                            : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-sky-400" />}
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
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
