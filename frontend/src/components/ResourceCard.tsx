"use client";

import { LearningResource } from '@/lib/types';
import { ExternalLink, Clock, BookOpen, Video, Globe, Play, FileText, ArrowRight } from 'lucide-react';

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isYouTube = resource.provider.toLowerCase().includes('youtube') || resource.url.includes('youtube.com') || resource.url.includes('youtu.be');
  const isDoc = resource.type === "Official Documentation" || resource.type.toLowerCase().includes('doc');
  const isVid = isYouTube || resource.type === "Video Resource" || resource.type.toLowerCase().includes('video');

  const getBadgeConfig = () => {
    if (isDoc) {
      return {
        label: "📘 Official Documentation",
        buttonText: "Open Documentation →",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        btnColor: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20",
        borderHover: "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
        Icon: BookOpen,
        iconBg: "bg-indigo-500/10 text-indigo-400"
      };
    }
    if (isVid) {
      return {
        label: "🎥 Video Resource",
        buttonText: "Watch Video →",
        badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        btnColor: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20",
        borderHover: "hover:border-rose-500/50 hover:shadow-rose-500/10",
        Icon: Video,
        iconBg: "bg-rose-500/10 text-rose-400"
      };
    }
    return {
      label: "🌐 Additional Resource",
      buttonText: "Open Resource →",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20",
      borderHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      Icon: Globe,
      iconBg: "bg-emerald-500/10 text-emerald-400"
    };
  };

  const config = getBadgeConfig();
  const CardIcon = config.Icon;

  return (
    <div className={`bg-theme-surface border border-theme-border ${config.borderHover} rounded-2xl p-4 transition-all duration-300 shadow-md group flex flex-col justify-between h-full`}>
      <div>
        {/* Optional YouTube Video Thumbnail Banner */}
        {resource.thumbnail_url && (
          <div className="relative w-full h-32 mb-3.5 rounded-xl overflow-hidden border border-theme-border group-hover:border-rose-500/30 transition-colors shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={resource.thumbnail_url} 
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:bg-rose-500 group-hover:scale-110 transition-all duration-200"
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </a>
            </div>
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider shadow flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" /> YouTube Video
            </span>
          </div>
        )}

        {/* Category Badge & Difficulty */}
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${config.badgeBg}`}>
            {config.label}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-theme-hover text-theme-muted border border-theme-border">
            {resource.difficulty || 'All Levels'}
          </span>
        </div>

        {/* Title & Provider */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className={`p-2 rounded-xl ${config.iconBg} shrink-0 mt-0.5`}>
            <CardIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-theme-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {resource.title}
            </h4>
            <span className="text-[11px] font-medium text-theme-muted block mt-0.5">
              {resource.provider}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-theme-muted leading-relaxed mb-4 line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Card Footer Action */}
      <div className="pt-3 border-t border-theme-border flex items-center justify-between gap-2 mt-auto">
        <span className="flex items-center gap-1 text-[11px] text-theme-muted font-medium">
          <Clock className="w-3.5 h-3.5 text-theme-muted" />
          {resource.duration_hours ? `${resource.duration_hours} hrs` : 'Self-paced'}
        </span>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1 shadow-sm ${config.btnColor}`}
        >
          <span>{config.buttonText}</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>
    </div>
  );
}

