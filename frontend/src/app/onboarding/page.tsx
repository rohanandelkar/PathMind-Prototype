"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateProfileFromPrompt } from '@/lib/api';
import { LearnerProfile } from '@/lib/types';
import SkillGapChart from '@/components/SkillGapChart';
import { Compass, Sparkles, ArrowRight, CheckCircle2, RefreshCw, Code, BookOpen, Clock, Target } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>(
    "I am a beginner in programming. I know basic HTML and SQL. I want to become a Java backend developer in 6 months. I can study 2 hours per day and prefer hands-on learning."
  );
  const [targetRole, setTargetRole] = useState<string>("Java Backend Developer");
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedProfile, setGeneratedProfile] = useState<LearnerProfile | null>(null);

  const presets = [
    {
      title: "Java Backend Developer (6 Months)",
      role: "Java Backend Developer",
      text: "I am a beginner in programming. I know basic HTML and SQL. I want to become a Java backend developer in 6 months. I can study 2 hours per day and prefer hands-on learning."
    },
    {
      title: "AI & Data Science Engineer (8 Months)",
      role: "AI & Data Science Engineer",
      text: "I know basic Python and statistics. I want to become an AI & Data Science Engineer specializing in LLMs and RAG architectures within 8 months."
    },
    {
      title: "Full-Stack Web Developer (5 Months)",
      role: "Full-Stack Web Developer",
      text: "I know HTML, CSS, and basic JavaScript. I want to become a Full-Stack Web Developer using Next.js and PostgreSQL in 5 months."
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    const profile = await generateProfileFromPrompt(prompt, targetRole);
    setGeneratedProfile(profile);
    setLoading(false);
  };

  const handleProceedToRoadmap = () => {
    router.push('/roadmap');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-theme-border pb-4">
        <div className="p-3 rounded-2xl bg-brand-500/10 text-primary border border-brand-500/20">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-theme-main tracking-tight">AI Goal Onboarding Wizard</h1>
          <p className="text-xs text-theme-muted">Describe your learning background and target career in natural language.</p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider">Quick Preset Prompts</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(preset.text);
                setTargetRole(preset.role);
              }}
              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                targetRole === preset.role
                  ? 'bg-brand-500/10 border-brand-500/50 text-primary shadow-sm'
                  : 'bg-theme-surface border-theme-border text-theme-main hover:bg-theme-hover'
              }`}
            >
              <div className="font-semibold text-theme-main mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-primary" /> {preset.title}
              </div>
              <p className="text-[11px] text-theme-muted line-clamp-2">{preset.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Natural Language Prompt Area */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-4">
        <label className="block text-xs font-semibold text-theme-main uppercase tracking-wider">
          Your Natural Language Learning Goal
        </label>
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., I am a beginner in programming..."
          className="w-full p-4 bg-theme-hover border border-theme-border rounded-xl text-xs sm:text-sm text-theme-main placeholder:text-theme-muted focus:outline-none focus:border-brand-500 font-mono leading-relaxed"
        />

        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-theme-muted">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>AI will extract goal, skills, timeline & prerequisites</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Skill Graph...
              </>
            ) : (
              <>
                Analyze Skill Gap & Build Path <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Profile Preview */}
      {generatedProfile && (
        <div className="space-y-6 animate-fade-in pt-4">
          
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-theme-main">Learner Profile Extracted Successfully</h3>
                <p className="text-xs text-emerald-300/90">Target Role: {generatedProfile.target_role} • Timeline: {generatedProfile.timeline_months} Months</p>
              </div>
            </div>

            <button
              onClick={handleProceedToRoadmap}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Open Personalized Roadmap <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skill Gap Visualizer */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-theme-main">Calculated Skill Gap Breakdown</h3>
            <SkillGapChart
              data={generatedProfile.skill_gaps.map((g) => ({
                skill: g.skill_name.slice(0, 18),
                current: g.current_score,
                required: g.required_score,
                gap: g.gap_score
              }))}
            />
          </div>

        </div>
      )}

    </div>
  );
}
