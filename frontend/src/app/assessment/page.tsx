"use client";

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';
import CreateAssessmentCard from '@/components/CreateAssessmentCard';
import AssessmentRunnerModal from '@/components/AssessmentRunnerModal';
import { GeneratedAssessment, AssessmentEvaluationResult } from '@/lib/types';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';

function AssessmentPageContent() {
  const [activeAssessment, setActiveAssessment] = useState<GeneratedAssessment | null>(null);
  const [lastResult, setLastResult] = useState<AssessmentEvaluationResult | null>(null);

  const handleAssessmentCreated = (assessment: GeneratedAssessment) => {
    setLastResult(null);
    setActiveAssessment(assessment);
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-theme-border pb-4">
        <div className="p-3 rounded-2xl bg-brand-500/10 text-primary border border-brand-500/20">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-theme-main tracking-tight">Interactive Skill Assessments</h1>
          <p className="text-xs text-theme-muted">Validate your skill progression. Quiz scores automatically adapt your roadmap timeline and skill gaps in PostgreSQL.</p>
        </div>
      </div>

      {/* Dynamic Assessment Generator Form */}
      <CreateAssessmentCard onAssessmentCreated={handleAssessmentCreated} />

      {/* Recent Completed Result Highlight (If available) */}
      {lastResult && (
        <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recent Assessment Evaluation
            </span>
            <span className="text-xs text-theme-muted">Score: {lastResult.score_percentage}% ({lastResult.correct_count}/{lastResult.total_questions})</span>
          </div>
          <h3 className="text-base font-bold text-theme-main">{lastResult.topic} ({lastResult.difficulty})</h3>
          <p className="text-xs text-theme-muted">{lastResult.adaptation_applied}</p>
        </div>
      )}

      {/* Interactive Assessment Runner Modal */}
      {activeAssessment && (
        <AssessmentRunnerModal
          assessment={activeAssessment}
          isOpen={!!activeAssessment}
          onClose={() => setActiveAssessment(null)}
          onCompleted={(res) => setLastResult(res)}
        />
      )}

    </div>
  );
}

export default function AssessmentPage() {
  return (
    <ProtectedRoute>
      <AppNavbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AssessmentPageContent />
      </main>
    </ProtectedRoute>
  );
}
