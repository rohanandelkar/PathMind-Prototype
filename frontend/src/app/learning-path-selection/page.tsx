"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  AlertCircle,
  LogOut
} from "lucide-react";

interface PathOption {
  id: "C" | "CPP" | "FULL_STACK_JAVA" | "FULL_STACK_PYTHON";
  name: string;
  badge: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyColor: string;
  duration: string;
  colorScheme: {
    border: string;
    glow: string;
    gradient: string;
    iconBg: string;
    iconColor: string;
    buttonGradient: string;
  };
  features: string[];
}

const LEARNING_PATHS: PathOption[] = [
  {
    id: "C",
    name: "C",
    badge: "Systems & Memory Core",
    tagline: "Foundational Systems Programming",
    description:
      "Master pointers, dynamic memory management, data structures, and low-level system design in ANSI C.",
    difficulty: "Beginner",
    difficultyColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    duration: "3 – 4 Months",
    colorScheme: {
      border: "hover:border-sky-500/50",
      glow: "group-hover:shadow-sky-500/10",
      gradient: "from-sky-500/10 via-slate-900/50 to-slate-900",
      iconBg: "bg-sky-500/10 border-sky-500/20",
      iconColor: "text-sky-400",
      buttonGradient: "from-sky-500 to-cyan-600 hover:from-sky-400 hover:to-cyan-500 shadow-sky-500/20",
    },
    features: [
      "Pointers & Dynamic Memory (malloc/free)",
      "Custom Structs, Unions & Bitwise Operations",
      "Data Structures & Linked Lists from Scratch",
      "POSIX File I/O & Memory Leak Debugging (GDB/Valgrind)",
    ],
  },
  {
    id: "CPP",
    name: "C++",
    badge: "High Performance & STL",
    tagline: "Modern Systems & OOP Engineering",
    description:
      "Deep dive into Modern C++ (C++17/20), OOP, STL containers, smart pointers, RAII, and concurrent multithreading.",
    difficulty: "Intermediate",
    difficultyColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    duration: "4 – 5 Months",
    colorScheme: {
      border: "hover:border-indigo-500/50",
      glow: "group-hover:shadow-indigo-500/10",
      gradient: "from-indigo-500/10 via-slate-900/50 to-slate-900",
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
      iconColor: "text-indigo-400",
      buttonGradient: "from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-indigo-500/20",
    },
    features: [
      "Modern C++ (C++17/20) & Move Semantics",
      "Object-Oriented Design & Virtual Polymorphism",
      "RAII, Smart Pointers (unique_ptr, shared_ptr)",
      "STL Containers, Iterators & Multithreading (std::thread)",
    ],
  },
  {
    id: "FULL_STACK_JAVA",
    name: "Full Stack Java Roadmap",
    badge: "Enterprise Architecture",
    tagline: "Spring Boot Microservices & Full Stack",
    description:
      "Design and deploy production microservices with Java, Spring Boot 3, REST APIs, Hibernate ORM, and Next.js frontend.",
    difficulty: "Intermediate",
    difficultyColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    duration: "5 – 6 Months",
    colorScheme: {
      border: "hover:border-amber-500/50",
      glow: "group-hover:shadow-amber-500/10",
      gradient: "from-amber-500/10 via-slate-900/50 to-slate-900",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      iconColor: "text-amber-400",
      buttonGradient: "from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/20",
    },
    features: [
      "Core Java, OOP Paradigms & Exception Handling",
      "Spring Boot 3, REST Controllers & Dependency Injection",
      "PostgreSQL, JPA / Hibernate ORM & Database Design",
      "Spring Security 6 with JWT & Next.js Client Integration",
    ],
  },
  {
    id: "FULL_STACK_PYTHON",
    name: "Full Stack Python Roadmap",
    badge: "Modern Web & Async Stack",
    tagline: "FastAPI, PostgreSQL & Next.js Integration",
    description:
      "Build high-performance web applications using Python, FastAPI async framework, SQLAlchemy ORM, and modern React/Next.js.",
    difficulty: "Beginner",
    difficultyColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    duration: "4 – 5 Months",
    colorScheme: {
      border: "hover:border-emerald-500/50",
      glow: "group-hover:shadow-emerald-500/10",
      gradient: "from-emerald-500/10 via-slate-900/50 to-slate-900",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      iconColor: "text-emerald-400",
      buttonGradient: "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20",
    },
    features: [
      "Python 3 Fundamentals & Functional / OOP Patterns",
      "FastAPI Async Web APIs & Pydantic Data Validation",
      "PostgreSQL Relational Schema Design & SQLAlchemy 2.0",
      "Stateless JWT Cookie Auth & Next.js Frontend Integration",
    ],
  },
];

function SelectionPageContent() {
  const { user, updateSelectedLearningPath, logout } = useAuth();
  const router = useRouter();

  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [submittingPath, setSubmittingPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const currentActivePath = user?.selected_learning_path;

  const handleSelectPath = async (pathId: "C" | "CPP" | "FULL_STACK_JAVA" | "FULL_STACK_PYTHON") => {
    if (submittingPath) return; // Prevent repeated clicks
    setSelectedPath(pathId);
    setSubmittingPath(pathId);
    setErrorMessage("");

    try {
      await updateSelectedLearningPath(pathId);
      // Success: redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      setErrorMessage("Unable to save your learning path. Please try again.");
      setSubmittingPath(null);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col justify-between relative overflow-hidden transition-colors duration-200">
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl" />
      </div>

      {/* Header Bar with Logo & Logout */}
      <header className="relative z-10 border-b border-theme-border bg-theme-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-red flex items-center justify-center text-white font-bold text-base shadow-lg shadow-brand-500/30">
              P
            </div>
            <div>
              <span className="font-bold text-base text-theme-main tracking-tight">PathMind</span>
              <span className="text-[10px] text-theme-muted block -mt-1 font-medium">HCLTech Learning Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-theme-muted hidden sm:block">
              Logged in as <strong className="text-theme-main">{user?.email}</strong>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-theme-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors border border-theme-border"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col justify-center">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-primary text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Guided Career Tracks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-main tracking-tight">
            Choose Your Learning Path
          </h1>
          <p className="text-sm sm:text-base text-theme-muted max-w-2xl mx-auto leading-relaxed">
            Select a tailored curriculum to unlock your personalized milestone roadmap, skill radar diagnostics, and hands-on learning resources.
          </p>

          {currentActivePath && (
            <div className="pt-1">
              <span className="text-xs text-theme-muted bg-theme-hover border border-theme-border px-3 py-1 rounded-full">
                Currently Active: <span className="font-semibold text-primary">{currentActivePath}</span> (You can switch anytime without losing your profile data)
              </span>
            </div>
          )}
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="max-w-xl mx-auto mb-8 w-full flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm shadow-lg">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {/* The 4 Learning Path Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          {LEARNING_PATHS.map((path) => {
            const isSelected = selectedPath === path.id || currentActivePath === path.id;
            const isCurrentlySubmitting = submittingPath === path.id;
            const isDisabled = submittingPath !== null;

            return (
              <div
                key={path.id}
                className={`group relative rounded-3xl border bg-theme-surface/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  isSelected
                    ? "border-brand-500 ring-2 ring-brand-500/30 shadow-2xl"
                    : "border-theme-border hover:border-brand-500/50"
                }`}
              >
                {/* Active/Current Badge */}
                {currentActivePath === path.id && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand-600 text-white text-[11px] font-bold shadow-lg shadow-brand-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Current Path
                  </div>
                )}

                <div>
                  {/* Card Header with Icon & Meta Badges */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-primary shadow-inner">
                        {path.id === "C" && <Terminal className="w-6 h-6" />}
                        {path.id === "CPP" && <Cpu className="w-6 h-6" />}
                        {path.id === "FULL_STACK_JAVA" && <Layers className="w-6 h-6" />}
                        {path.id === "FULL_STACK_PYTHON" && <Code2 className="w-6 h-6" />}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-muted block">
                          {path.badge}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-theme-main group-hover:text-primary transition-colors">
                          {path.name}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-xs font-semibold text-theme-main mb-2">{path.tagline}</p>
                  <p className="text-xs text-theme-muted leading-relaxed mb-5">
                    {path.description}
                  </p>

                  {/* Metadata Chips: Difficulty & Duration */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                    <span className="px-2.5 py-1 rounded-lg font-semibold bg-brand-500/10 text-primary border border-brand-500/20 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" /> {path.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg font-semibold bg-theme-hover text-theme-main border border-theme-border flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-theme-muted" /> {path.duration}
                    </span>
                  </div>

                  {/* Key Curriculum Highlights */}
                  <div className="space-y-2 border-t border-theme-border pt-4 mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-muted block mb-1">
                      Key Topics Covered
                    </span>
                    {path.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-theme-main">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Action Button */}
                <button
                  id={`select-path-${path.id.toLowerCase()}`}
                  onClick={() => handleSelectPath(path.id)}
                  disabled={isDisabled}
                  className="w-full py-3 px-5 rounded-2xl text-white text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
                >
                  {isCurrentlySubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Configuring Learning Path...</span>
                    </>
                  ) : currentActivePath === path.id ? (
                    <>
                      <span>Continue Roadmap</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <span>Start {path.name} Roadmap</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-theme-border py-6 text-center text-xs text-theme-muted">
        <p>PathMind AI Recommender • Your progress and data are automatically preserved across all tracks.</p>
      </footer>
    </div>
  );
}

export default function LearningPathSelectionPage() {
  return (
    <ProtectedRoute allowUnselectedPath={true}>
      <SelectionPageContent />
    </ProtectedRoute>
  );
}
