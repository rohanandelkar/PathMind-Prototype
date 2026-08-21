"use client";

import { useEffect, useState } from 'react';
import { fetchActiveRoadmap } from '@/lib/api';
import { PersonalizedRoadmap } from '@/lib/types';
import RoadmapPhaseCard from '@/components/RoadmapPhaseCard';
import { Map, Sparkles, Filter, RefreshCw, Award, CheckCircle } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';

function RoadmapContent() {
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap | null>(null);
  const [filter, setFilter] = useState<'All' | 'In-Progress' | 'Completed' | 'Locked'>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const loadRoadmap = async () => {
    setLoading(true);
    const data = await fetchActiveRoadmap();
    setRoadmap(data);
    setLoading(false);
  };

  useEffect(() => {
    setRoadmap(null);
    loadRoadmap();
  }, [user?.selected_learning_path]);

  if (loading || !roadmap) {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
        <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
        <p className="text-sm">Calculating prerequisite graph & loading roadmap...</p>
      </div>
    );
  }

  const filteredItems = roadmap.roadmap_items.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">Personalized Learning Roadmap</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
                  Prerequisite-Aware DAG
                </span>
              </div>
              <p className="text-xs text-slate-300">Target Career Role: <span className="font-semibold text-white">{roadmap.target_role}</span></p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-extrabold text-sky-400">{roadmap.overall_progress}%</span>
            <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Overall Completion</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${roadmap.overall_progress}%` }}
          ></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter Phases:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['All', 'In-Progress', 'Completed', 'Locked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === tab
                  ? 'bg-sky-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Ordered Roadmap Phases List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <RoadmapPhaseCard key={item.id} item={item} onRefreshRoadmap={loadRoadmap} />
        ))}
      </div>

    </div>
  );
}

export default function RoadmapPage() {
  return (
    <ProtectedRoute>
      <AppNavbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RoadmapContent />
      </main>
    </ProtectedRoute>
  );
}
