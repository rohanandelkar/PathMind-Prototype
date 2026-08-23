import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ActivityTrackerProvider } from '@/context/ActivityTrackerContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PathMind – AI-Powered Personalized Learning Path Recommender',
  description:
    'Intelligent learning mentor that analyzes skill gaps, prerequisites, and goals to generate ordered, adaptive, and explainable learning roadmaps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-theme-bg text-theme-main min-h-screen flex flex-col selection:bg-brand-500 selection:text-white transition-colors duration-200`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ActivityTrackerProvider>{children}</ActivityTrackerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
