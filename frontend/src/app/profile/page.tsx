"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProfile } from '@/lib/api';
import { LearnerProfile } from '@/lib/types';
import { User, Award, Clock, BookOpen, Target, Sparkles, CheckCircle2, Sliders, Shield, Brain, Laptop, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';

function ProfileContent() {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setProfile(null);
    fetchProfile().then(setProfile);
  }, [user?.selected_learning_path]);

  if (!profile) {
    return (
      <div className="py-16 text-center text-slate-400">
        Loading learner profile...
      </div>
    );
  }

  const displayName = user?.full_name || profile.name || "Learner";

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center font-extrabold text-2xl text-white shadow-xl shadow-sky-500/20">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">{displayName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                Active Learner
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Target Goal: <span className="font-semibold text-sky-400">{profile.target_role}</span> • Experience: <span className="text-purple-300">{profile.experience_level}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/learning-path-selection"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700 shadow-sm"
          >
            <Layers className="w-4 h-4 text-sky-400" /> Change Learning Path
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/20"
          >
            <Sliders className="w-4 h-4" /> Update AI Goal & Profile
          </Link>
        </div>
      </div>

      {/* Grid Layout for Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Personal Learning Parameters */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Learning Schedule & Commitment
          </div>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Weekly Learning Hours:</span>
              <span className="font-bold text-white">{profile.hours_per_week} hrs/week</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Target Timeline:</span>
              <span className="font-bold text-white">{profile.timeline_months} Months</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Preferred Modality:</span>
              <span className="font-bold text-sky-300">{profile.learning_style}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Profile Created:</span>
              <span className="text-slate-300">{new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Objectives & Career Aspirations */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" /> Career Goals & Objectives
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Primary Career Goal</span>
              <span className="text-sm font-bold text-white">{profile.target_role}</span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Core Competency</span>
              <span className="text-xs font-semibold text-purple-300">Backend System Architecture & Rest APIs</span>
            </div>
          </div>
        </div>

        {/* Card 3: Learning Preferences & Modalities */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <Brain className="w-4 h-4" /> Learning Preferences
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1.5 font-medium">
              <Laptop className="w-3.5 h-3.5" /> Hands-on Coding
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5" /> Capstone Projects
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5" /> Skill Quizzes
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5" /> Documentation
            </span>
          </div>
        </div>

      </div>

      {/* Existing Verified Skills Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Existing Skills & Verified Knowledge Base
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.existing_skills.map((skill, idx) => (
            <div key={idx} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{skill.category}</span>
                <h4 className="text-sm font-bold text-white">{skill.skill_name}</h4>
                <span className="text-xs text-sky-400 font-medium">Level: {skill.level}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-400">{skill.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Identified Skill Gaps Queue */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> Identified Skill Gaps to Master
          </h3>
          <Link href="/roadmap" className="text-xs font-semibold text-sky-400 hover:text-sky-300">
            View Learning Path →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.skill_gaps.map((gap, idx) => (
            <div key={idx} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Priority P{gap.priority}
                </span>
                <span className="text-xs text-slate-400">{gap.status}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{gap.skill_name}</h4>
              <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Points Gap:</span>
                <span className="font-extrabold text-rose-400">+{gap.gap_score} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AppNavbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProfileContent />
      </main>
    </ProtectedRoute>
  );
}

