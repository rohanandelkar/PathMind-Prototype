export interface SkillProficiency {
  skill_name: string;
  category: string;
  level: string;
  score: number;
}

export interface SkillGapItem {
  skill_name: string;
  category: string;
  current_score: number;
  required_score: number;
  gap_score: number;
  status: string; // Missing, Inadequate, Proficient
  priority: number;
  prerequisites: string[];
}

export interface LearnerProfile {
  user_id: string;
  name: string;
  experience_level: string;
  target_role: string;
  timeline_months: number;
  hours_per_week: number;
  learning_style: string;
  existing_skills: SkillProficiency[];
  skill_gaps: SkillGapItem[];
  created_at: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: string;
  url: string;
  duration_hours: number;
  difficulty: string;
  provider: string;
  description: string;
  skill_name: string;
  thumbnail_url?: string;
}

export interface RoadmapItem {
  id: string;
  phase_number: number;
  phase_title: string;
  skill_name: string;
  description: string;
  status: 'Completed' | 'In-Progress' | 'Locked';
  estimated_days: number;
  prerequisites: string[];
  explanation: string;
  resources: LearningResource[];
  project_prompt?: string;
  assessment_id?: string;
  completion_criteria: string;
}

export interface PersonalizedRoadmap {
  roadmap_id: string;
  user_id: string;
  target_role: string;
  overall_progress: number;
  total_phases: number;
  current_phase_index: number;
  roadmap_items: RoadmapItem[];
  generated_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  skill_name: string;
  title: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export interface AssessmentResult {
  assessment_id: string;
  skill_name: string;
  score_percentage: number;
  passed: boolean;
  feedback_summary: string;
  adaptation_applied: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
  timestamp?: string;
}

export interface DashboardMetrics {
  user_name: string;
  target_role: string;
  overall_progress: number;
  learning_streak_days: number;
  total_hours_learned: number;
  milestone_summary: {
    total: number;
    completed: number;
    in_progress: number;
    locked: number;
  };
  next_recommended_action: {
    title: string;
    description: string;
    skill_name: string;
    estimated_duration: string;
  };
  skills_visualization: Array<{
    skill: string;
    current: number;
    required: number;
    gap: number;
  }>;
  skill_gaps_summary: Array<{
    skill: string;
    priority: number;
    status: string;
    gap: number;
  }>;
}

export interface LearningSession {
  id: number;
  user_id: string;
  learning_path?: string;
  started_at: string;
  ended_at?: string;
  duration_seconds: number;
  activity_type: string;
  elapsed_seconds?: number;
}

export interface LearningStats {
  user_id: string;
  selected_learning_path?: string;
  total_hours_learned: number;
  learning_streak_days: number;
  total_sessions_count: number;
  active_session?: {
    id: number;
    started_at: string;
    learning_path?: string;
    activity_type: string;
    elapsed_seconds: number;
  } | null;
}

export interface GeneratedAssessmentQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface GeneratedAssessment {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  num_questions: number;
  time_limit_minutes: number;
  learning_path: string;
  questions: GeneratedAssessmentQuestion[];
}

export interface QuestionDetailedResult {
  question_id: string;
  question: string;
  options: string[];
  user_selected_index?: number;
  correct_option_index: number;
  is_correct: boolean;
  explanation: string;
}

export interface AssessmentEvaluationResult {
  assessment_id: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  correct_count: number;
  score_percentage: number;
  passed: boolean;
  time_taken_seconds: number;
  adaptation_applied: string;
  detailed_results: QuestionDetailedResult[];
}
