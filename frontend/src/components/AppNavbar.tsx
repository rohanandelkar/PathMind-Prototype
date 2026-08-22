"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import FloatingChatWidget from "@/components/FloatingChatWidget";

const NAV_LINKS = [
  { href: "/dashboard",   label: "Dashboard"  },
  { href: "/roadmap",     label: "Roadmap"    },
  { href: "/assessment",  label: "Assessment" },
  { href: "/assistant",   label: "AI Mentor"  },
  { href: "/profile",     label: "Profile"    },
];

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-theme-border bg-theme-surface/90 backdrop-blur-xl transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-red flex items-center justify-center text-white font-bold text-sm shadow shadow-brand-500/30">
              P
            </div>
            <span className="font-bold text-theme-main text-sm tracking-tight hidden sm:block">PathMind</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(href)
                    ? "bg-brand-500/15 text-primary font-semibold"
                    : "text-theme-muted hover:text-theme-main hover:bg-theme-hover"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & User menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
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

            {/* User menu */}
            <div className="relative">
              <button
                id="user-menu-button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1 bg-theme-hover hover:opacity-90 transition-colors border border-theme-border"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-accent-red flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <span className="text-sm text-theme-main font-medium hidden sm:block max-w-[120px] truncate">
                  {user?.full_name ?? "User"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-theme-muted transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-52 z-50 bg-theme-surface border border-theme-border rounded-xl shadow-2xl py-1 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-theme-border">
                      <p className="text-xs font-semibold text-theme-main truncate">{user?.full_name}</p>
                      <p className="text-xs text-theme-muted truncate mt-0.5">{user?.email}</p>
                    </div>
                    <Link
                      href="/learning-path-selection"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary font-medium hover:bg-theme-hover transition-colors"
                    >
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Change Learning Path
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-theme-main hover:bg-theme-hover transition-colors"
                    >
                      <svg className="w-4 h-4 text-theme-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button
                      id="logout-button"
                      onClick={() => { setUserMenuOpen(false); logout(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Floating Chatbot Widget available across pages */}
      <FloatingChatWidget />
    </>
  );
}

