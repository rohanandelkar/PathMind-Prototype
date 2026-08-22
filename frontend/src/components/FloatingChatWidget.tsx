"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bot, X, Send, RefreshCw, ExternalLink, PlusCircle } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { chatWithAIMentor } from '@/lib/api';
import AIMentorWelcome from '@/components/AIMentorWelcome';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    if (!textToSend) setInput('');

    const userMsg: ChatMessage = {
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const reply = await chatWithAIMentor(query, messages);

    const aiMsg: ChatMessage = {
      sender: 'ai',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-theme-surface border border-theme-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Drawer Header */}
          <div className="bg-theme-hover px-4 py-3 border-b border-theme-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-primary border border-brand-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-theme-main">AI Learning Mentor</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active RAG Agent
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleNewConversation}
                  title="New Conversation"
                  className="p-1 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-surface transition-colors flex items-center gap-1 text-[10px]"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-primary" />
                </button>
              )}
              <Link
                href="/assistant"
                onClick={() => setIsOpen(false)}
                title="Open Fullscreen Chat"
                className="p-1 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-surface transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-surface transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed or Onboarding Welcome */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <AIMentorWelcome onSelectSuggestion={(q) => handleSend(q)} />
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-theme-hover text-theme-main border border-theme-border rounded-tl-none'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-2 items-center text-theme-muted text-[11px] py-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" /> Thinking...
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-theme-surface border-t border-theme-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI Mentor..."
              className="flex-1 px-3 py-2 bg-theme-hover border border-theme-border rounded-xl text-xs text-theme-main placeholder:text-theme-muted focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <Bot className="w-5 h-5 animate-bounce" />
            <span>AI Mentor Chat</span>
          </>
        )}
      </button>
    </div>
  );
}
