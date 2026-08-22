"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.selected_learning_path) {
          router.replace("/dashboard");
        } else {
          router.replace("/learning-path-selection");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  // Splash screen while auth state resolves
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-red flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30 animate-pulse">
          P
        </div>
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
