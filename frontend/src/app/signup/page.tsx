"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PasswordStrength {
  score: number;      // 0-4
  label: string;
  color: string;
}

function checkPasswordStrength(pw: string): PasswordStrength {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const levels: PasswordStrength[] = [
    { score: 0, label: "Too short",  color: "bg-red-500" },
    { score: 1, label: "Weak",       color: "bg-orange-500" },
    { score: 2, label: "Fair",       color: "bg-yellow-500" },
    { score: 3, label: "Good",       color: "bg-emerald-500" },
    { score: 4, label: "Strong",     color: "bg-sky-500" },
  ];
  return levels[score];
}

export default function SignupPage() {
  const { user, loading, signup } = useAuth();
  const router = useRouter();

  const [fullName, setFullName]               = useState("");
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [error, setError]                     = useState("");
  const [submitting, setSubmitting]           = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  const strength = checkPasswordStrength(password);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (strength.score < 2) {
      setError("Password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.");
      return;
    }

    setSubmitting(true);
    try {
      await signup(fullName.trim(), email, password, confirmPassword);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4 transition-colors duration-200">
      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-red flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/30">
              P
            </div>
            <span className="text-2xl font-bold text-theme-main tracking-tight">PathMind</span>
          </div>
          <h1 className="text-xl font-semibold text-theme-main">Create your account</h1>
          <p className="text-sm text-theme-muted mt-1">Start your personalized AI-powered learning journey</p>
        </div>

        {/* Card */}
        <div className="bg-theme-surface border border-theme-border rounded-2xl p-8 shadow-2xl">
          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2 text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-theme-main mb-1.5">
                Full name
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full px-4 py-2.5 rounded-xl bg-theme-hover border border-theme-border text-theme-main placeholder:text-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-theme-main mb-1.5">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-theme-hover border border-theme-border text-theme-main placeholder:text-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-theme-main mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, uppercase, number, symbol"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-theme-hover border border-theme-border text-theme-main placeholder:text-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-main transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : "bg-theme-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${
                    strength.score >= 3 ? "text-emerald-400" : strength.score >= 2 ? "text-amber-400" : "text-rose-400"
                  }`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm" className="block text-sm font-medium text-theme-main mb-1.5">
                Confirm password
              </label>
              <input
                id="signup-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-xl bg-theme-hover border text-theme-main placeholder:text-theme-muted text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  confirmPassword && confirmPassword !== password
                    ? "border-rose-500/60 focus:ring-rose-500"
                    : "border-theme-border focus:ring-brand-500"
                }`}
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-rose-400 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-brand-500 to-accent-red hover:from-brand-600 hover:to-brand-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Requirements hint */}
          <div className="mt-5 p-3 bg-theme-hover rounded-xl border border-theme-border">
            <p className="text-xs text-theme-muted font-medium mb-2">Password requirements:</p>
            <ul className="space-y-1">
              {[
                { check: password.length >= 8, label: "At least 8 characters" },
                { check: /[A-Z]/.test(password), label: "One uppercase letter" },
                { check: /[0-9]/.test(password), label: "One number" },
                { check: /[^A-Za-z0-9]/.test(password), label: "One special character" },
              ].map(({ check, label }) => (
                <li key={label} className={`flex items-center gap-2 text-xs transition-colors ${check ? "text-emerald-400" : "text-theme-muted"}`}>
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    {check ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                      <circle cx="12" cy="12" r="9" />
                    )}
                  </svg>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-theme-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:opacity-80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
