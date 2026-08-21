from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.services.learning_service import (
    get_or_create_active_session,
    end_active_session,
    get_active_learning_session,
    calculate_user_learning_stats
)

router = APIRouter()

class SessionStartRequest(BaseModel):
    activity_type: Optional[str] = "general_learning"

class SessionResponse(BaseModel):
    id: int
    user_id: str
    learning_path: Optional[str] = None
    started_at: str
    ended_at: Optional[str] = None
    duration_seconds: float
    activity_type: str
    is_new: bool = False

@router.post("/session/start")
def start_session(
    payload: Optional[SessionStartRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/learning/session/start
    Starts or resumes an active learning session in PostgreSQL for the authenticated user.
    If session is already active (ended_at IS NULL), returns existing active session (is_new=False).
    """
    activity_type = payload.activity_type if payload and payload.activity_type else "general_learning"
    session, is_new = get_or_create_active_session(db, current_user, activity_type=activity_type)
    
    return {
        "success": True,
        "is_new": is_new,
        "session": {
            "id": session.id,
            "user_id": str(session.user_id),
            "learning_path": session.learning_path,
            "started_at": session.started_at.isoformat(),
            "ended_at": session.ended_at.isoformat() if session.ended_at else None,
            "duration_seconds": session.duration_seconds,
            "activity_type": session.activity_type
        }
    }

@router.post("/session/end")
def end_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/learning/session/end
    Ends current active learning session in PostgreSQL, calculates elapsed duration_seconds, and returns stats.
    """
    ended_session = end_active_session(db, current_user)
    stats = calculate_user_learning_stats(db, current_user)
    
    if not ended_session:
        return {
            "success": False,
            "message": "No active session found to end.",
            "stats": stats
        }
        
    return {
        "success": True,
        "message": "Session ended successfully.",
        "ended_session": {
            "id": ended_session.id,
            "user_id": str(ended_session.user_id),
            "learning_path": ended_session.learning_path,
            "started_at": ended_session.started_at.isoformat(),
            "ended_at": ended_session.ended_at.isoformat() if ended_session.ended_at else None,
            "duration_seconds": ended_session.duration_seconds,
            "activity_type": ended_session.activity_type
        },
        "stats": stats
    }

@router.get("/session/current")
def get_current_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/learning/session/current
    Returns active session metadata if present.
    """
    active = get_active_learning_session(db, current_user)
    if not active:
        return {"active": False, "session": None}
        
    from datetime import datetime
    elapsed = max(0.0, (datetime.utcnow() - active.started_at).total_seconds())
    return {
        "active": True,
        "session": {
            "id": active.id,
            "user_id": str(active.user_id),
            "learning_path": active.learning_path,
            "started_at": active.started_at.isoformat(),
            "activity_type": active.activity_type,
            "elapsed_seconds": round(elapsed, 1)
        }
    }

@router.get("/stats")
def get_stats(
    tz_offset_minutes: int = Query(default=0, description="Timezone offset in minutes (e.g. -330 for IST)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/learning/stats
    Returns user's real, PostgreSQL-backed learning statistics (total_hours_learned, learning_streak_days).
    """
    return calculate_user_learning_stats(db, current_user, user_tz_offset_minutes=tz_offset_minutes)
