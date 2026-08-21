"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowUnselectedPath?: boolean;
}

export default function ProtectedRoute({
  children,
  allowUnselectedPath = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (!user.selected_learning_path && !allowUnselectedPath && pathname !== "/learning-path-selection") {
        router.replace("/learning-path-selection");
      }
    }
  }, [user, loading, router, allowUnselectedPath, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!user.selected_learning_path && !allowUnselectedPath && pathname !== "/learning-path-selection") {
    return null;
  }

  return <>{children}</>;
}
