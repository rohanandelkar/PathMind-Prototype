"use client";

import { LearningResource } from '@/lib/types';
import { ExternalLink, Clock, BookOpen, Video, Code, Play } from 'lucide-react';

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isYouTube = resource.provider.toLowerCase().includes('youtube') || resource.url.includes('youtube.com') || resource.url.includes('youtu.be');
  
  const getIcon = () => {
    if (isYouTube || resource.type.includes('Video')) return Video;
    if (resource.type.includes('Project') || resource.type.includes('Code')) return Code;
    return BookOpen;
  };

  const Icon = getIcon();

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 hover:border-sky-500/40 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/5 group flex flex-col justify-between">
      <div>
        {/* Optional YouTube Video Thumbnail Banner */}
        {resource.thumbnail_url && (
          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden border border-slate-700/80 group-hover:border-red-500/30 transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={resource.thumbnail_url} 
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all duration-200"
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </a>
            </div>
            {isYouTube && (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider shadow">
                YouTube Video
              </span>
            )}
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isYouTube ? 'bg-red-500/10 text-red-400 group-hover:bg-red-500/20' : 'bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20'} transition-colors`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isYouTube ? 'text-red-400' : 'text-sky-400'}`}>
                {resource.provider}
              </span>
              <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                {resource.title}
              </h4>
            </div>
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
            {resource.difficulty}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-3 line-clamp-2">{resource.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
        <span className="flex items-center gap-1 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {resource.duration_hours} hours
        </span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 font-medium text-[11px] ${isYouTube ? 'text-red-400 hover:text-red-300' : 'text-sky-400 hover:text-sky-300'}`}
        >
          {isYouTube ? 'Watch Video' : 'Open Resource'} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

