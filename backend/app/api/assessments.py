import json
import uuid
from typing import Dict, Any, List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request, Depends, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.api.auth import get_current_user
from app.api.profile import get_current_user_obj
from app.models.user import User
from app.models.domain import GeneratedAssessmentDB, AssessmentResultDB
from app.services.assessment_service import (
    get_topics_for_path,
    generate_ai_assessment,
    evaluate_and_save_submission
)
from app.services.seed_data import ASSESSMENTS_DATABASE
from app.models.schemas import AssessmentSubmit, AssessmentResult
from app.services.adaptive import evaluate_assessment_and_adapt
from app.api.roadmap import get_active_roadmap, save_roadmap_to_db

router = APIRouter()

class GenerateAssessmentRequest(BaseModel):
    topic: str
    difficulty: str = Field(default="Medium", description="Easy, Medium, Hard")
    num_questions: int = Field(default=5, ge=1, le=20)
    time_limit_minutes: int = Field(default=10, ge=1, le=60)

class EvaluateAssessmentRequest(BaseModel):
    assessment_id: str
    user_answers: Dict[str, int]
    time_taken_seconds: float = 0.0

@router.get("/topics")
def get_available_topics(
    request: Request,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/v1/assessments/topics
    Returns available topics based on the authenticated user's selected learning path.
    """
    user = get_current_user_obj(request, db)
    learning_path = user.selected_learning_path if user else "FULL_STACK_JAVA"
    topics = get_topics_for_path(learning_path)
    
    return {
        "learning_path": learning_path,
        "topics": topics
    }

@router.post("/generate")
def generate_assessment(
    req: GenerateAssessmentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/assessments/generate
    Generates a new AI assessment using Gemini/Rule-Engine and stores it in PostgreSQL.
    """
    assessment_db = generate_ai_assessment(
        db=db,
        user=current_user,
        topic=req.topic,
        difficulty=req.difficulty,
        num_questions=req.num_questions,
        time_limit_minutes=req.time_limit_minutes
    )
    
    questions_public = json.loads(assessment_db.questions_json)
    
    return {
        "id": assessment_db.id,
        "title": f"{req.topic} ({req.difficulty}) Assessment",
        "topic": assessment_db.topic,
        "difficulty": assessment_db.difficulty,
        "num_questions": assessment_db.num_questions,
        "time_limit_minutes": assessment_db.time_limit_minutes,
        "learning_path": assessment_db.learning_path,
        "questions": questions_public
    }

@router.get("/{assessment_id}")
def get_assessment_by_id(
    assessment_id: str,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/v1/assessments/{assessment_id}
    Retrieves public assessment details without leaking answer keys.
    """
    # 1. Search generated_assessments table in PostgreSQL
    db_assessment = db.query(GeneratedAssessmentDB).filter(
        GeneratedAssessmentDB.id == assessment_id
    ).first()
    
    if db_assessment:
        return {
            "id": db_assessment.id,
            "title": f"{db_assessment.topic} ({db_assessment.difficulty}) Assessment",
            "skill_name": db_assessment.topic,
            "topic": db_assessment.topic,
            "difficulty": db_assessment.difficulty,
            "num_questions": db_assessment.num_questions,
            "time_limit_minutes": db_assessment.time_limit_minutes,
            "questions": json.loads(db_assessment.questions_json)
        }

    # 2. Check seed/legacy assessments fallback
    for k, v in ASSESSMENTS_DATABASE.items():
        if v["id"] == assessment_id:
            return {
                "id": v["id"],
                "title": v["title"],
                "skill_name": v["skill_name"],
                "topic": v["skill_name"],
                "difficulty": v["difficulty"],
                "num_questions": len(v["questions"]),
                "time_limit_minutes": 10,
                "questions": v["questions"]
            }

    # Default fallback if not found
    first_key = list(ASSESSMENTS_DATABASE.keys())[0]
    v = ASSESSMENTS_DATABASE[first_key]
    return {
        "id": assessment_id,
        "title": v["title"],
        "skill_name": v["skill_name"],
        "topic": v["skill_name"],
        "difficulty": v["difficulty"],
        "num_questions": len(v["questions"]),
        "time_limit_minutes": 10,
        "questions": v["questions"]
    }

@router.post("/evaluate")
def evaluate_assessment(
    req: EvaluateAssessmentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/assessments/evaluate
    Evaluates user answers against PostgreSQL answer keys, records results, and adapts roadmap.
    """
    try:
        results = evaluate_and_save_submission(
            db=db,
            user=current_user,
            assessment_id=req.assessment_id,
            user_answers=req.user_answers,
            time_taken_seconds=req.time_taken_seconds
        )
        return results
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/submit", response_model=AssessmentResult)
def submit_assessment_legacy(submit: AssessmentSubmit, request: Request, db: Session = Depends(get_db)):
    """
    Legacy submit endpoint for static quizzes.
    """
    roadmap = get_active_roadmap(request, db)
    result, updated_roadmap = evaluate_assessment_and_adapt(submit, roadmap)
    
    save_roadmap_to_db(db, updated_roadmap)
    
    db_result = AssessmentResultDB(
        id=str(uuid.uuid4()),
        assessment_id=result.assessment_id,
        skill_name=result.skill_name,
        score_percentage=result.score_percentage,
        passed=result.passed,
        adaptation_applied=result.adaptation_applied,
        created_at=datetime.utcnow()
    )
    db.add(db_result)
    db.commit()

    return result
