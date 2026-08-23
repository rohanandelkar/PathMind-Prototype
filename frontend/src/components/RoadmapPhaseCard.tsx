"use client";

import { useState } from 'react';
import { RoadmapItem } from '@/lib/types';
import ResourceCard from './ResourceCard';
import AssessmentModal from './AssessmentModal';
import FeedbackModal from './FeedbackModal';
import { CheckCircle2, Lock, PlayCircle, Info, Clock, Award, Sparkles, Sliders, ChevronDown, ChevronUp, BookOpen, Video } from 'lucide-react';

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
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-primary border border-brand-500/20 animate-pulse">
          <PlayCircle className="w-3.5 h-3.5" /> Active Phase
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        item.status === 'In-Progress'
          ? 'bg-theme-surface border-brand-500/50 shadow-xl shadow-brand-500/5 ring-1 ring-brand-500/20'
          : item.status === 'Completed'
          ? 'bg-theme-surface border-emerald-500/30'
          : 'bg-theme-surface border-theme-border'
      }`}
    >
      {/* Header Bar - Clickable to expand/collapse */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-theme-hover/40 transition-colors rounded-2xl"
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
              item.status === 'Completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : item.status === 'In-Progress'
                ? 'bg-brand-500/20 text-primary border border-brand-500/30'
                : 'bg-theme-hover text-theme-main border border-theme-border'
            }`}
          >
            {item.phase_number}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-base font-bold text-theme-main">{item.phase_title}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-xs text-theme-muted line-clamp-1">{item.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-theme-muted font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-theme-muted" /> ~{item.estimated_days} days
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-2 rounded-xl bg-theme-hover hover:opacity-90 text-theme-main transition-colors border border-theme-border"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Phase Content */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-theme-border space-y-4">
          
          {/* AI Explanation Banner */}
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">AI Recommender Explanation</span>
              <p className="text-xs text-theme-main leading-relaxed mt-0.5">{item.explanation}</p>
            </div>
          </div>

          {/* Prerequisites & Completion Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-theme-hover/60 border border-theme-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider block mb-1">Prerequisites</span>
              {item.prerequisites && item.prerequisites.length > 0 ? (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.prerequisites.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-theme-surface text-theme-main text-[11px] border border-theme-border">
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-theme-muted">None (Foundational Skill)</span>
              )}
            </div>

            <div className="bg-theme-hover/60 border border-theme-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider block mb-1">Completion Criteria</span>
              <span className="text-theme-main">{item.completion_criteria}</span>
            </div>
          </div>

          {/* Practical Project Prompt */}
          {item.project_prompt && (
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1">Practical Capstone Task</span>
              <p className="text-xs text-theme-main">{item.project_prompt}</p>
            </div>
          )}

          {/* Topic-Specific Learning Resources */}
          {(() => {
            const videos = item.resources?.filter(r => r.type === "Video Resource" || r.type.toLowerCase().includes("video") || r.provider.toLowerCase().includes("youtube") || r.url.includes("youtube.com")) || [];
            const docs = item.resources?.filter(r => r.type === "Official Documentation" || r.type.toLowerCase().includes("doc")) || [];

            return (
              <div className="space-y-4">
                {/* 🎥 YouTube Videos Section */}
                {videos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-rose-400" />
                        Topic Video Tutorials ({videos.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {videos.map((res) => (
                        <ResourceCard key={res.id} resource={res} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 📘 Official Documentation Section */}
                {docs.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                        Official Documentation ({docs.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {docs.map((res) => (
                        <ResourceCard key={res.id} resource={res} />
                      ))}
                    </div>
                  </div>
                )}

                {(!item.resources || item.resources.length === 0) && (
                  <p className="text-xs text-slate-400 py-2">Loading topic-specific official documentation and video resources...</p>
                )}
              </div>
            );
          })()}

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
