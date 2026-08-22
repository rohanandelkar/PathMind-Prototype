"use client";

import { useState, useEffect } from 'react';
import { fetchAssessmentTopics, generateAssessment } from '@/lib/api';
import { GeneratedAssessment } from '@/lib/types';
import { Sparkles, Award, Clock, HelpCircle, Layers, ArrowRight, Loader2 } from 'lucide-react';

interface CreateAssessmentCardProps {
  onAssessmentCreated: (assessment: GeneratedAssessment) => void;
}

export default function CreateAssessmentCard({ onAssessmentCreated }: CreateAssessmentCardProps) {
  const [topics, setTopics] = useState<string[]>([]);
  const [learningPath, setLearningPath] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('Medium');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchAssessmentTopics().then(data => {
      setLearningPath(data.learning_path);
      setTopics(data.topics);
      if (data.topics.length > 0) {
        setSelectedTopic(data.topics[0]);
      }
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!selectedTopic) return;
    setGenerating(true);
    setErrorMsg(null);

    const result = await generateAssessment({
      topic: selectedTopic,
      difficulty,
      num_questions: numQuestions,
      time_limit_minutes: timeLimitMinutes
    });

    setGenerating(false);
    if (result) {
      onAssessmentCreated(result);
    } else {
      setErrorMsg('Failed to generate assessment. Please try again.');
    }
  };

  return (
    <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Header Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-theme-border pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-primary text-xs font-semibold border border-brand-500/20">
            <Sparkles className="w-3.5 h-3.5" /> AI Quiz Generator
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-theme-main tracking-tight">
            Create Custom Skill Assessment
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted">
            Dynamically configured for your selected target track ({learningPath || 'Your Roadmap'}).
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex items-center justify-center gap-3 text-theme-muted">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-xs">Loading roadmap topics...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Select Topic */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-theme-main flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" /> Select Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-theme-hover border border-theme-border text-theme-main text-xs rounded-xl p-3 focus:outline-none focus:border-brand-500 transition-colors"
            >
              {topics.map((tp, idx) => (
                <option key={idx} value={tp} className="bg-theme-surface text-theme-main">
                  {tp}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-theme-main flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-theme-hover border border-theme-border text-theme-main text-xs rounded-xl p-3 focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value="Easy" className="bg-theme-surface text-theme-main">Easy</option>
              <option value="Medium" className="bg-theme-surface text-theme-main">Medium</option>
              <option value="Hard" className="bg-theme-surface text-theme-main">Hard</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-theme-main flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary" /> Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full bg-theme-hover border border-theme-border text-theme-main text-xs rounded-xl p-3 focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value={5} className="bg-theme-surface text-theme-main">5 Questions</option>
              <option value={10} className="bg-theme-surface text-theme-main">10 Questions</option>
              <option value={15} className="bg-theme-surface text-theme-main">15 Questions</option>
              <option value={20} className="bg-theme-surface text-theme-main">20 Questions</option>
            </select>
          </div>

          {/* Time Limit */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-theme-main flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" /> Time Limit
            </label>
            <select
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
              className="w-full bg-theme-hover border border-theme-border text-theme-main text-xs rounded-xl p-3 focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value={5} className="bg-theme-surface text-theme-main">5 Minutes</option>
              <option value={10} className="bg-theme-surface text-theme-main">10 Minutes</option>
              <option value={15} className="bg-theme-surface text-theme-main">15 Minutes</option>
              <option value={30} className="bg-theme-surface text-theme-main">30 Minutes</option>
            </select>
          </div>

        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
          {errorMsg}
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleCreate}
          disabled={generating || loading || !selectedTopic}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm transition-all shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> AI Generating Questions...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Create Assessment <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
