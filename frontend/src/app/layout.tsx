import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PathMind – AI-Powered Personalized Learning Path Recommender',
  description:
    'Intelligent learning mentor that analyzes skill gaps, prerequisites, and goals to generate ordered, adaptive, and explainable learning roadmaps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-sky-500 selection:text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
