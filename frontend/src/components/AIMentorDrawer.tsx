"use client";

import { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { chatWithAIMentor } from '@/lib/api';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export default function AIMentorDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      content: "Hello! I'm your AI Personal Learning Mentor. Ask me why courses are in a specific order, request study strategies, or tell me if you want to skip a prerequisite!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    const reply = await chatWithAIMentor(currentInput, messages);

    const aiMsg: ChatMessage = {
      sender: 'ai',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-sm shadow-xl shadow-sky-500/25 hover:scale-105 transition-all flex items-center gap-2 border border-sky-400/30"
      >
        <Sparkles className="w-4 h-4" />
        <span>Ask AI Mentor</span>
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Learning Mentor</h3>
                <p className="text-[10px] text-emerald-400 font-medium">Context-Aware LLM Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs py-2">
                <RefreshCw className="w-4 h-4 animate-spin text-sky-400" /> AI Mentor analyzing your skill path...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask mentor (e.g. 'Why learn Java before Spring?')..."
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
