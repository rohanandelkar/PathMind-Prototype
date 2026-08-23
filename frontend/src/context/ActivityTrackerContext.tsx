"use client";

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { sendSessionHeartbeat, pauseLearningSession, fetchLearningStats } from '@/lib/api';

interface ActivityTrackerContextType {
  totalSeconds: number;
  formattedTime: string;
  totalHours: number;
  streakDays: number;
  isTracking: boolean;
  refreshStats: () => Promise<void>;
}

const ActivityTrackerContext = createContext<ActivityTrackerContextType | null>(null);

export function formatSecondsToDisplay(seconds: number): string {
  const secs = Math.max(0, Math.floor(seconds));
  if (secs < 60) {
    return `${secs}s`;
  }
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  if (mins < 60) {
    return `${mins}m ${remSecs}s`;
  }
  const hrs = (secs / 3600).toFixed(1);
  return `${hrs} Hours`;
}

const IDLE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const HEARTBEAT_INTERVAL_MS = 5 * 1000; // 5 seconds

export function ActivityTrackerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const lastInteractionRef = useRef<number>(Date.now());
  const isTrackingRef = useRef<boolean>(false);

  // Keep ref in sync for event callbacks
  useEffect(() => {
    isTrackingRef.current = isTracking;
  }, [isTracking]);

  // Sync stats from backend
  async function refreshStats() {
    if (!user) return;
    const stats = await fetchLearningStats();
    if (stats) {
      const secs = stats.total_seconds_learned ?? (stats.total_hours_learned * 3600);
      setTotalSeconds(secs);
      setStreakDays(stats.learning_streak_days);
    }
  }

  // Handle user activity listeners (mouse, keyboard, scroll)
  useEffect(() => {
    if (!user) {
      setIsTracking(false);
      setTotalSeconds(0);
      setStreakDays(0);
      return;
    }

    const handleUserActivity = () => {
      const now = Date.now();
      lastInteractionRef.current = now;

      // If user was paused/idle, resume tracking
      if (!isTrackingRef.current && document.visibilityState === 'visible') {
        setIsTracking(true);
        sendSessionHeartbeat().then((res) => {
          if (res?.stats) {
            const secs = res.stats.total_seconds_learned ?? (res.stats.total_hours_learned * 3600);
            setTotalSeconds(secs);
            setStreakDays(res.stats.learning_streak_days);
          }
        });
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
    };
  }, [user]);

  // Initial load and heartbeat / visibility tracking
  useEffect(() => {
    if (!user) return;

    // Load initial stats
    refreshStats();
    setIsTracking(document.visibilityState === 'visible');

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTracking(false);
        pauseLearningSession();
      } else {
        lastInteractionRef.current = Date.now();
        setIsTracking(true);
        sendSessionHeartbeat().then((res) => {
          if (res?.stats) {
            const secs = res.stats.total_seconds_learned ?? (res.stats.total_hours_learned * 3600);
            setTotalSeconds(secs);
            setStreakDays(res.stats.learning_streak_days);
          }
        });
      }
    };

    const handleBeforeUnload = () => {
      pauseLearningSession();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  // Real-time 1-second ticker & idle check loop
  useEffect(() => {
    if (!user || !isTracking) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastInteractionRef.current;

      // Idle > 5 minutes: pause session
      if (idleTime > IDLE_TIMEOUT_MS) {
        setIsTracking(false);
        pauseLearningSession();
        return;
      }

      // Increment local second timer smoothly while active
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [user, isTracking]);

  // Backend Heartbeat loop every 5 seconds while active
  useEffect(() => {
    if (!user || !isTracking) return;

    const heartbeatInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionRef.current <= IDLE_TIMEOUT_MS && document.visibilityState === 'visible') {
        sendSessionHeartbeat().then((res) => {
          if (res?.stats) {
            const secs = res.stats.total_seconds_learned ?? (res.stats.total_hours_learned * 3600);
            setTotalSeconds(secs);
            setStreakDays(res.stats.learning_streak_days);
          }
        });
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(heartbeatInterval);
  }, [user, isTracking]);

  const formattedTime = formatSecondsToDisplay(totalSeconds);
  const totalHours = roundToOneDecimal(totalSeconds / 3600.0);

  function roundToOneDecimal(val: number): number {
    return Math.round(val * 10) / 10;
  }

  return (
    <ActivityTrackerContext.Provider
      value={{
        totalSeconds,
        formattedTime,
        totalHours,
        streakDays,
        isTracking,
        refreshStats
      }}
    >
      {children}
    </ActivityTrackerContext.Provider>
  );
}

export function useActivityTracker() {
  const ctx = useContext(ActivityTrackerContext);
  if (!ctx) {
    return {
      totalSeconds: 0,
      formattedTime: '0s',
      totalHours: 0.0,
      streakDays: 0,
      isTracking: false,
      refreshStats: async () => {}
    };
  }
  return ctx;
}
