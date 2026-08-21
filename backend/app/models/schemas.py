from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, EmailStr

# Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    selected_learning_path: Optional[str] = None
    token: Optional[str] = None

# Learner Profile Schemas
class GoalInput(BaseModel):
    raw_prompt: str = Field(..., example="I am a beginner in programming. I know basic HTML and SQL. I want to become a Java backend developer in 6 months. I can study 2 hours per day and prefer hands-on learning.")
    target_role: Optional[str] = None
    timeline_months: Optional[int] = 6
    hours_per_day: Optional[float] = 2.0
    preferred_style: Optional[str] = "Hands-on projects"

class SkillProficiency(BaseModel):
    skill_name: str
    category: str
    level: str  # Beginner, Intermediate, Advanced, Mastered
    score: int  # 0 to 100

class TargetRoleSkillRequirement(BaseModel):
    skill_name: str
    category: str
    required_score: int
    importance: str  # Critical, Important, Helpful
    prerequisites: List[str] = []

class SkillGapItem(BaseModel):
    skill_name: str
    category: str
    current_score: int
    required_score: int
    gap_score: int
    status: str  # Missing, Inadequate, Proficient
    priority: int  # 1 (Highest) to 5
    prerequisites: List[str] = []

class LearnerProfile(BaseModel):
    user_id: str
    name: str
    experience_level: str
    target_role: str
    timeline_months: int
    hours_per_week: float
    learning_style: str
    existing_skills: List[SkillProficiency]
    target_skills: List[TargetRoleSkillRequirement]
    skill_gaps: List[SkillGapItem]
    created_at: str

# Resource & Roadmap Schemas
class LearningResource(BaseModel):
    id: str
    title: str
    type: str  # Video, Article, Hands-on Project, Interactive Coding, Documentation, Quiz
    url: str
    duration_hours: float
    difficulty: str
    provider: str
    description: str
    skill_name: str
    thumbnail_url: Optional[str] = None

class RoadmapItem(BaseModel):
    id: str
    phase_number: int
    phase_title: str
    skill_name: str
    description: str
    status: str  # Completed, In-Progress, Locked
    estimated_days: int
    prerequisites: List[str] = []
    explanation: str
    resources: List[LearningResource]
    project_prompt: Optional[str] = None
    assessment_id: Optional[str] = None
    completion_criteria: str

class PersonalizedRoadmap(BaseModel):
    roadmap_id: str
    user_id: str
    target_role: str
    overall_progress: float
    total_phases: int
    current_phase_index: int
    roadmap_items: List[RoadmapItem]
    generated_at: str

# Assessment Schemas
class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_option_index: int
    explanation: str

class Assessment(BaseModel):
    id: str
    skill_name: str
    title: str
    difficulty: str
    questions: List[QuizQuestion]

class AssessmentSubmit(BaseModel):
    assessment_id: str
    answers: Dict[str, int]  # question_id -> chosen option index

class AssessmentResult(BaseModel):
    assessment_id: str
    skill_name: str
    score_percentage: float
    passed: bool
    feedback_summary: str
    adaptation_applied: str  # e.g., "Fast-tracked next module" or "Injected revision materials"

# Feedback Schemas
class UserFeedback(BaseModel):
    roadmap_item_id: str
    feedback_type: str  # Too Easy, Too Difficult, Already Know This, Not Helpful, Loved It
    comment: Optional[str] = None

class FeedbackResponse(BaseModel):
    status: str
    action_taken: str
    updated_roadmap_id: str

# Assistant Chat Schemas
class ChatMessage(BaseModel):
    sender: str  # user or ai
    content: str
    timestamp: Optional[str] = None

class AssistantRequest(BaseModel):
    user_id: str
    message: str
    history: List[ChatMessage] = []

class AssistantResponse(BaseModel):
    reply: str
    suggested_actions: List[str] = []
    explanation: Optional[str] = None
