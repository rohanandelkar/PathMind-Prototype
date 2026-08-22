"use client";

import { useAuth } from '@/context/AuthContext';
import { BookOpen, FileCheck, Lightbulb, Target, Sparkles } from 'lucide-react';

interface AIMentorWelcomeProps {
  onSelectSuggestion: (query: string) => void;
}

export default function AIMentorWelcome({ onSelectSuggestion }: AIMentorWelcomeProps) {
  const { user } = useAuth();

  const pathMap: Record<string, string> = {
    C: 'C Systems Programming Roadmap',
    CPP: 'C++ Systems & Applications Roadmap',
    FULL_STACK_JAVA: 'Full Stack Java Roadmap',
    FULL_STACK_PYTHON: 'Full Stack Python Roadmap'
  };

  const selectedPathKey = user?.selected_learning_path || 'FULL_STACK_JAVA';
  const trackTitle = pathMap[selectedPathKey] || 'Full Stack Software Engineering Roadmap';

  const suggestions = [
    {
      icon: BookOpen,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      title: '📚 Help with my current roadmap',
      prompt: 'What should I learn next in my current roadmap?'
    },
    {
      icon: FileCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: '📝 Help with assessments',
      prompt: 'Help me prepare for my upcoming quiz or assessment.'
    },
    {
      icon: Lightbulb,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: '💡 Explain a topic',
      prompt: "Explain a topic from my roadmap that I'm struggling with."
    },
    {
      icon: Target,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: '🎯 Find my skill gaps',
      prompt: 'What are my current skill gaps and how can I improve them?'
    }
  ];

  return (
    <div className="py-3 px-2 space-y-5 animate-fade-in">
      
      {/* Greeting Header */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl p-4 sm:p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-primary border border-brand-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-theme-main tracking-tight">
            Hey! 👋 I'm your AI Learning Mentor.
          </h2>
        </div>
        
        <p className="text-xs text-theme-muted leading-relaxed">
          How can I assist you today? I can help you with your current roadmap, quizzes and assessments, skill gaps, or any learning topic you're struggling with.
        </p>

        {/* Dynamic Track Badge */}
        <div className="pt-1 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-theme-muted">You're currently following:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-primary text-[11px] font-bold border border-brand-500/20">
            {trackTitle}
          </span>
        </div>
      </div>

      {/* 4 Interactive Clickable Suggestion Cards */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-theme-muted uppercase tracking-wider block px-1">
          Suggested Questions
        </span>

        <div className="grid grid-cols-1 gap-2.5">
          {suggestions.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectSuggestion(item.prompt)}
                className="w-full text-left p-3.5 rounded-xl bg-theme-surface border border-theme-border hover:border-brand-500/50 hover:bg-theme-hover transition-all group flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${item.color} shrink-0`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-theme-main group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-theme-muted mt-0.5 line-clamp-1">
                      "{item.prompt}"
                    </p>
                  </div>
                </div>
                <span className="text-theme-muted group-hover:text-primary text-xs font-bold transition-colors shrink-0">
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
