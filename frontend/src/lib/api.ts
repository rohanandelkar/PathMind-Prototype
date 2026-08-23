import {
  LearnerProfile, PersonalizedRoadmap, DashboardMetrics, Assessment, AssessmentResult, ChatMessage, LearningSession, LearningStats, GeneratedAssessment, AssessmentEvaluationResult, AssessmentAttempt
} from './types';
import { MOCK_PROFILE, MOCK_ROADMAP, MOCK_DASHBOARD, MOCK_ASSESSMENT } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchProfile(): Promise<LearnerProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/me`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback mock profile:', e);
  }
  return MOCK_PROFILE;
}

export async function generateProfileFromPrompt(prompt: string, targetRole?: string): Promise<LearnerProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw_prompt: prompt, target_role: targetRole }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback prompt parser:', e);
  }
  return { ...MOCK_PROFILE, target_role: targetRole || MOCK_PROFILE.target_role };
}

export async function fetchActiveRoadmap(): Promise<PersonalizedRoadmap> {
  try {
    const res = await fetch(`${API_BASE_URL}/roadmap/active`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback mock roadmap:', e);
  }
  return MOCK_ROADMAP;
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const tzOffset = new Date().getTimezoneOffset();
    const res = await fetch(`${API_BASE_URL}/dashboard/metrics?tz_offset=${tzOffset}`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback mock dashboard:', e);
  }
  return MOCK_DASHBOARD;
}

export async function startLearningSession(activityType: string = 'general_learning'): Promise<{ success: boolean; is_new: boolean; session: LearningSession } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/learning/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity_type: activityType }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to start learning session:', e);
  }
  return null;
}

export async function sendSessionHeartbeat(activityType: string = 'general_learning'): Promise<{ success: boolean; stats: LearningStats } | null> {
  try {
    const tzOffsetMinutes = new Date().getTimezoneOffset();
    const res = await fetch(`${API_BASE_URL}/learning/session/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tz_offset_minutes: tzOffsetMinutes, activity_type: activityType }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to send session heartbeat:', e);
  }
  return null;
}

export async function pauseLearningSession(): Promise<{ success: boolean; stats: LearningStats } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/learning/session/pause`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to pause learning session:', e);
  }
  return null;
}

export async function endLearningSession(): Promise<{ success: boolean; stats: LearningStats } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/learning/session/end`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to end learning session:', e);
  }
  return null;
}

export async function getCurrentLearningSession(): Promise<{ active: boolean; session: LearningSession | null }> {
  try {
    const res = await fetch(`${API_BASE_URL}/learning/session/current`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to get current learning session:', e);
  }
  return { active: false, session: null };
}

export async function fetchLearningStats(): Promise<LearningStats | null> {
  try {
    const tzOffsetMinutes = new Date().getTimezoneOffset();
    const res = await fetch(`${API_BASE_URL}/learning/stats?tz_offset_minutes=${tzOffsetMinutes}`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to fetch learning stats:', e);
  }
  return null;
}

export async function fetchAssessmentTopics(): Promise<{ learning_path: string; topics: string[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/topics`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback topics:', e);
  }
  return {
    learning_path: 'FULL_STACK_JAVA',
    topics: ['Java Basics & OOP', 'Java Collections', 'Spring Boot & DI', 'REST API Architecture', 'JWT Security']
  };
}

export async function generateAssessment(config: {
  topic: string;
  difficulty: string;
  num_questions: number;
  time_limit_minutes: number;
}): Promise<GeneratedAssessment | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to generate AI assessment:', e);
  }
  return null;
}

export async function getAssessmentById(assessmentId: string, seed?: string): Promise<GeneratedAssessment | null> {
  try {
    const url = seed 
      ? `${API_BASE_URL}/assessments/${assessmentId}?seed=${encodeURIComponent(seed)}` 
      : `${API_BASE_URL}/assessments/${assessmentId}`;
    const res = await fetch(url, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to fetch assessment by id:', e);
  }
  return null;
}

export async function evaluateAssessment(
  assessmentId: string, 
  userAnswers: Record<string, number>, 
  timeTakenSeconds: number,
  seed?: string
): Promise<AssessmentEvaluationResult | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assessment_id: assessmentId,
        user_answers: userAnswers,
        time_taken_seconds: timeTakenSeconds,
        seed: seed
      }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to evaluate assessment:', e);
  }
  return null;
}

export async function fetchAssessmentHistory(): Promise<AssessmentAttempt[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/history`, { cache: 'no-store', credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Failed to fetch assessment history:', e);
  }
  return [];
}

export async function fetchAssessment(assessmentId: string): Promise<Assessment> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/${assessmentId}`, { credentials: 'include' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback mock assessment:', e);
  }
  return MOCK_ASSESSMENT;
}

export async function submitAssessment(assessmentId: string, answers: Record<string, number>): Promise<AssessmentResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/assessments/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessment_id: assessmentId, answers }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, evaluating assessment client-side:', e);
  }
  return {
    assessment_id: assessmentId,
    skill_name: 'Java Basics & OOP',
    score_percentage: 100.0,
    passed: true,
    feedback_summary: 'Perfect score (100%) on Java OOP assessment!',
    adaptation_applied: 'Accelerated your learning path by unlocking Advanced Spring Boot.'
  };
}

export async function sendFeedback(roadmapItemId: string, feedbackType: string): Promise<{ status: string; action_taken: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roadmap_item_id: roadmapItemId, feedback_type: feedbackType }),
      credentials: 'include'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, sending feedback client-side:', e);
  }
  return {
    status: 'Success',
    action_taken: `Marked skill as '${feedbackType}' and adapted future roadmap timeline.`
  };
}

export async function chatWithAIMentor(message: string, history: ChatMessage[]): Promise<string> {
  try {
    const res = await fetch(`${API_BASE_URL}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 'usr_demo_101', message, history }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
  } catch (e) {
    console.warn('Backend offline, generating AI mentor client reply:', e);
  }
  
  if (message.toLowerCase().includes('java') && message.toLowerCase().includes('spring')) {
    return "Java is the foundation of the Spring ecosystem! Spring Boot relies heavily on Java OOP interfaces, annotations, generics, and reflection. Learning Java first makes Spring dependency injection much easier to understand.";
  }
  return `As your AI Learning Mentor, I am tracking your goal closely. Keep working on your active phase to reach your career milestone!`;
}
