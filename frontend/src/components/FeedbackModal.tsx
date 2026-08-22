"use client";

import { useState } from 'react';
import { sendFeedback } from '@/lib/api';
import { X, ThumbsUp, CheckSquare, FastForward, HelpCircle, ArrowUpRight } from 'lucide-react';

interface FeedbackModalProps {
  itemId: string;
  skillName: string;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackApplied?: () => void;
}

export default function FeedbackModal({ itemId, skillName, isOpen, onClose, onFeedbackApplied }: FeedbackModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFeedback = async (type: string) => {
    setSubmitting(true);
    const res = await sendFeedback(itemId, type);
    setStatusMsg(res.action_taken);
    setSubmitting(false);
    setTimeout(() => {
      onClose();
      if (onFeedbackApplied) onFeedbackApplied();
    }, 1500);
  };

  const feedbackOptions = [
    { label: 'Already Know This', type: 'Already Know This', icon: CheckSquare, desc: 'Skip this phase and advance roadmap timeline' },
    { label: 'Too Easy', type: 'Too Easy', icon: FastForward, desc: 'Shorten duration and provide advanced projects' },
    { label: 'Too Difficult', type: 'Too Difficult', icon: HelpCircle, desc: 'Inject prerequisite tutorials & simpler guides' },
    { label: 'Want More Practice', type: 'Want More Practice', icon: ThumbsUp, desc: 'Add extra coding exercises and capstone tasks' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-theme-surface border border-theme-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-theme-border pb-3 mb-4">
          <h3 className="text-base font-bold text-theme-main">Feedback for "{skillName}"</h3>
          <button onClick={onClose} className="text-theme-muted hover:text-theme-main p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMsg ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
            <p className="text-xs text-emerald-400 font-semibold">{statusMsg}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-theme-muted">Tell your AI mentor how this phase fits your current level:</p>
            {feedbackOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.type}
                  onClick={() => handleFeedback(opt.type)}
                  disabled={submitting}
                  className="w-full p-3 bg-theme-hover border border-theme-border hover:border-brand-500/50 rounded-xl text-left transition-all flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-brand-500/10 text-primary group-hover:bg-brand-500/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-theme-main group-hover:text-primary">{opt.label}</h4>
                    <p className="text-[11px] text-theme-muted">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
