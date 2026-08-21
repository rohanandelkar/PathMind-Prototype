"use client";

import { useState } from 'react';
import { RoadmapItem } from '@/lib/types';
import ResourceCard from './ResourceCard';
import AssessmentModal from './AssessmentModal';
import FeedbackModal from './FeedbackModal';
import { CheckCircle2, Lock, PlayCircle, Info, Clock, Award, Sparkles, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

interface RoadmapPhaseCardProps {
  item: RoadmapItem;
  onRefreshRoadmap?: () => void;
}

export default function RoadmapPhaseCard({ item, onRefreshRoadmap }: RoadmapPhaseCardProps) {
  const [expanded, setExpanded] = useState<boolean>(item.status === 'In-Progress');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  const getStatusBadge = () => {
    if (item.status === 'Completed') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
        </span>
      );
    }
    if (item.status === 'In-Progress') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 animate-pulse">
          <PlayCircle className="w-3.5 h-3.5" /> Active Phase
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
        <Lock className="w-3.5 h-3.5" /> Locked
      </span>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        item.status === 'In-Progress'
          ? 'bg-slate-900/90 border-sky-500/50 shadow-xl shadow-sky-500/5 ring-1 ring-sky-500/20'
          : item.status === 'Completed'
          ? 'bg-slate-900/60 border-emerald-500/30'
          : 'bg-slate-900/40 border-slate-800/80 opacity-80'
      }`}
    >
      {/* Header Bar */}
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
              item.status === 'Completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : item.status === 'In-Progress'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {item.phase_number}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-base font-bold text-white">{item.phase_title}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-xs text-slate-300 line-clamp-1">{item.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{item.estimated_days} days
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Phase Content */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
          
          {/* AI Explanation Banner */}
          <div className="bg-sky-950/40 border border-sky-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">AI Recommender Explanation</span>
              <p className="text-xs text-sky-200/90 leading-relaxed mt-0.5">{item.explanation}</p>
            </div>
          </div>

          {/* Prerequisites & Completion Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Prerequisites</span>
              {item.prerequisites && item.prerequisites.length > 0 ? (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.prerequisites.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-400">None (Foundational Skill)</span>
              )}
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Completion Criteria</span>
              <span className="text-slate-300">{item.completion_criteria}</span>
            </div>
          </div>

          {/* Practical Project Prompt */}
          {item.project_prompt && (
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block mb-1">Practical Capstone Task</span>
              <p className="text-xs text-purple-200">{item.project_prompt}</p>
            </div>
          )}

          {/* Learning Resources List */}
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Curated Resources</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item.resources && item.resources.length > 0 ? (
                item.resources.map((res) => <ResourceCard key={res.id} resource={res} />)
              ) : (
                <p className="text-xs text-slate-400 col-span-2 py-2">Resources loading from pgvector RAG database...</p>
              )}
            </div>
          </div>

          {/* Phase Actions */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" /> Adapt Recommendation
            </button>

            {item.assessment_id && (
              <button
                onClick={() => setIsAssessmentOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <Award className="w-3.5 h-3.5" /> Take Skill Assessment
              </button>
            )}
          </div>

        </div>
      )}

      {/* Assessment Modal */}
      {item.assessment_id && (
        <AssessmentModal
          assessmentId={item.assessment_id}
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
          onAssessmentCompleted={() => {
            if (onRefreshRoadmap) onRefreshRoadmap();
          }}
        />
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        itemId={item.id}
        skillName={item.skill_name}
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onFeedbackApplied={() => {
          if (onRefreshRoadmap) onRefreshRoadmap();
        }}
      />
    </div>
  );
}
