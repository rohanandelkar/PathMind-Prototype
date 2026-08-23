"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProfile } from '@/lib/api';
import { LearnerProfile } from '@/lib/types';
import { Award, Clock, BookOpen, Target, Sliders, Brain, Laptop, Layers } from 'lucide-react';
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
      <div className="py-16 text-center text-theme-muted">
        Loading learner profile...
      </div>
    );
  }

  const displayName = user?.full_name || profile.name || "Learner";

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">

      {/* Profile Header */}
      <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-accent-red flex items-center justify-center font-extrabold text-2xl text-white shadow-xl shadow-brand-500/20">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-theme-main tracking-tight">{displayName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                Active Learner
              </span>
            </div>
            <p className="text-xs text-theme-muted">
              Target Goal: <span className="font-semibold text-primary">{profile.target_role}</span> • Experience: <span className="text-theme-main">{profile.experience_level}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/learning-path-selection"
            className="px-4 py-2.5 rounded-xl bg-theme-hover hover:opacity-90 text-primary font-semibold text-xs transition-colors flex items-center gap-2 border border-theme-border shadow-sm"
          >
            <Layers className="w-4 h-4 text-primary" /> Change Learning Path
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-brand-500/20"
          >
            <Sliders className="w-4 h-4" /> Update AI Goal & Profile
          </Link>
        </div>
      </div>

      {/* Grid Layout for Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Personal Learning Parameters */}
        <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Learning Schedule & Commitment
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-theme-border pb-2">
              <span className="text-theme-muted">Weekly Learning Hours:</span>
              <span className="font-bold text-theme-main">{profile.hours_per_week} hrs/week</span>
            </div>
            <div className="flex justify-between border-b border-theme-border pb-2">
              <span className="text-theme-muted">Target Timeline:</span>
              <span className="font-bold text-theme-main">{profile.timeline_months} Months</span>
            </div>
            <div className="flex justify-between border-b border-theme-border pb-2">
              <span className="text-theme-muted">Preferred Modality:</span>
              <span className="font-bold text-primary">{profile.learning_style}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-theme-muted">Profile Created:</span>
              <span className="text-theme-main">{new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Objectives & Career Aspirations */}
        <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" /> Career Goals & Objectives
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-theme-hover p-3 rounded-xl border border-theme-border">
              <span className="text-[10px] text-theme-muted uppercase font-semibold block">Primary Career Goal</span>
              <span className="text-sm font-bold text-theme-main">{profile.target_role}</span>
            </div>
            <div className="bg-theme-hover p-3 rounded-xl border border-theme-border">
              <span className="text-[10px] text-theme-muted uppercase font-semibold block">Target Core Competency</span>
              <span className="text-xs font-semibold text-primary">Backend System Architecture & Rest APIs</span>
            </div>
          </div>
        </div>

        {/* Card 3: Learning Preferences & Modalities */}
        <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <Brain className="w-4 h-4" /> Learning Preferences
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20 flex items-center gap-1.5 font-medium">
              <Laptop className="w-3.5 h-3.5" /> Hands-on Coding
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-brand-500/10 text-primary border border-brand-500/20 flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5" /> Capstone Projects
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5" /> Skill Quizzes
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5" /> Documentation
            </span>
          </div>
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

