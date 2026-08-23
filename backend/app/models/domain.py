from app.core.db import Base
from app.models.user import User

# Re-export for database migrations and queries
UserDB = User

from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime
from datetime import datetime

class ProfileDB(Base):
    __tablename__ = "learner_profiles"
    user_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    experience_level = Column(String, nullable=False)
    target_role = Column(String, nullable=False)
    timeline_months = Column(Integer, default=6)
    hours_per_week = Column(Float, default=14.0)
    learning_style = Column(String, nullable=False)
    existing_skills_json = Column(Text, nullable=False)
    skill_gaps_json = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class RoadmapDB(Base):
    __tablename__ = "personalized_roadmaps"
    roadmap_id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    target_role = Column(String, nullable=False)
    overall_progress = Column(Float, default=0.0)
    roadmap_items_json = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class GeneratedAssessmentDB(Base):
    __tablename__ = "generated_assessments"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    learning_path = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    num_questions = Column(Integer, nullable=False)
    time_limit_minutes = Column(Integer, nullable=False)
    questions_json = Column(Text, nullable=False)
    correct_answers_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AssessmentResultDB(Base):
    __tablename__ = "assessment_results"
    id = Column(String, primary_key=True, index=True)
    assessment_id = Column(String, nullable=False)
    user_id = Column(String, index=True, nullable=True)
    learning_path = Column(String, nullable=True)
    topic = Column(String, nullable=True)
    difficulty = Column(String, nullable=True)
    skill_name = Column(String, nullable=False)
    total_questions = Column(Integer, default=0)
    correct_count = Column(Integer, default=0)
    score_percentage = Column(Float, nullable=False)
    passed = Column(Boolean, default=True)
    points_earned = Column(Float, default=0.0)
    attempt_number = Column(Integer, default=1)
    time_taken_seconds = Column(Float, default=0.0)
    user_answers_json = Column(Text, nullable=True)
    detailed_results_json = Column(Text, nullable=True)
    adaptation_applied = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FeedbackDB(Base):
    __tablename__ = "user_feedbacks"
    id = Column(String, primary_key=True, index=True)
    roadmap_item_id = Column(String, nullable=False)
    feedback_type = Column(String, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class LearningSessionDB(Base):
    __tablename__ = "learning_sessions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, index=True, nullable=False)
    learning_path = Column(String, nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_active_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    ended_at = Column(DateTime, nullable=True)
    duration_seconds = Column(Float, default=0.0, nullable=False)
    activity_type = Column(String, default="general_learning", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
