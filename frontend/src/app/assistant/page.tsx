"use client";

import { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { chatWithAIMentor } from '@/lib/api';
import { Bot, Send, RefreshCw, PlusCircle } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppNavbar from '@/components/AppNavbar';
import AIMentorWelcome from '@/components/AIMentorWelcome';

function AssistantContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-theme-border pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-primary border border-brand-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-theme-main tracking-tight">AI Personal Learning Mentor</h1>
            <p className="text-xs text-theme-muted">Contextual conversational assistance powered by Gemini RAG & LangGraph.</p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleNewConversation}
            className="px-3.5 py-2 rounded-xl bg-theme-surface border border-theme-border hover:border-brand-500/40 text-theme-main font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-primary" /> New Conversation
          </button>
        )}
      </div>

      {/* Chat Window */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl h-[560px] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Messages Feed or Onboarding Welcome */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <AIMentorWelcome onSelectSuggestion={(q) => handleSend(q)} />
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-primary border border-brand-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-600/10'
                      : 'bg-theme-hover text-theme-main border border-theme-border rounded-tl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="block text-[10px] opacity-60 text-right mt-1">{msg.timestamp}</span>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex gap-2 items-center text-theme-muted text-xs py-2">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" /> AI Mentor evaluating prerequisite graph & context...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-theme-surface border-t border-theme-border flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask mentor a question..."
            className="flex-1 px-4 py-3 bg-theme-hover border border-theme-border rounded-xl text-xs sm:text-sm text-theme-main placeholder:text-theme-muted focus:outline-none focus:border-brand-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default function AssistantPage() {
  return (
    <ProtectedRoute>
      <AppNavbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AssistantContent />
      </main>
    </ProtectedRoute>
  );
}
