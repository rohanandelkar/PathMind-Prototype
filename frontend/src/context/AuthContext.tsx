"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Extract the root backend origin from the API URL (strips any /api/v1 path)
const _apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_BASE = _apiUrl.replace(/\/api\/v\d+.*$/, "").replace(/\/$/, "") || "http://localhost:8000";

export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  selected_learning_path?: string | null;
  is_active: boolean;
  created_at?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (full_name: string, email: string, password: string, confirm_password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSelectedLearningPath: (learningPath: string) => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On mount: check if there is an existing session
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: "include", // send HttpOnly cookie
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Login failed");
    }

    setUser(data.user);
    if (data.user?.selected_learning_path) {
      router.push("/dashboard");
    } else {
      router.push("/learning-path-selection");
    }
  }

  async function signup(full_name: string, email: string, password: string, confirm_password: string) {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password, confirm_password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Signup failed");
    }
    // After signup success, redirect to login
    router.push("/login?registered=true");
  }

  async function updateSelectedLearningPath(learningPath: string) {
    const res = await fetch(`${API_BASE}/api/users/me/learning-path`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learning_path: learningPath }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Unable to save your learning path. Please try again.");
    }

    setUser((prev) => (prev ? { ...prev, selected_learning_path: data.selected_learning_path } : prev));
  }

  async function logout() {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateSelectedLearningPath, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
