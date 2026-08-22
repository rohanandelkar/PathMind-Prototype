"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { Sparkles, Compass, LayoutDashboard, Map, Bot, Award, User, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Personalized Roadmap', href: '/roadmap', icon: Map },
    { name: 'AI Goal Onboarding', href: '/onboarding', icon: Compass },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Assessments', href: '/assessment', icon: Award },
    { name: 'AI Mentor Chat', href: '/assistant', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-theme-surface/90 border-b border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-red flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-theme-main tracking-tight">PathMind</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-brand-500/10 text-primary border border-brand-500/20 rounded-full">
                  HCLTech AI
                </span>
              </div>
              <p className="text-xs text-theme-muted font-medium">Personalized Learning Recommender</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-500/10 text-primary border border-brand-500/20 shadow-sm font-semibold'
                      : 'text-theme-muted hover:text-theme-main hover:bg-theme-hover'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Active AI Engine Badge & Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-theme-muted hover:text-theme-main bg-theme-hover border border-theme-border transition-colors flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-rose-600 fill-rose-600/20" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-hover border border-theme-border text-xs text-theme-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400">RAG + DAG Engine Active</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
