import uuid
from datetime import datetime
from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.schemas import UserFeedback, FeedbackResponse
from app.models.domain import FeedbackDB
from app.services.adaptive import apply_user_feedback
from app.api.roadmap import get_active_roadmap, save_roadmap_to_db

router = APIRouter()

@router.post("/submit", response_model=FeedbackResponse)
def submit_feedback(feedback: UserFeedback, request: Request, db: Session = Depends(get_db)):
    roadmap = get_active_roadmap(request, db)
    response, updated_roadmap = apply_user_feedback(feedback, roadmap)
    
    # Save updated roadmap in Postgres
    save_roadmap_to_db(db, updated_roadmap)
    
    # Save feedback in Postgres
    db_feedback = FeedbackDB(
        id=str(uuid.uuid4()),
        roadmap_item_id=feedback.roadmap_item_id,
        feedback_type=feedback.feedback_type,
        comment=feedback.comment,
        created_at=datetime.utcnow()
    )
    db.add(db_feedback)
    db.commit()

    return response

