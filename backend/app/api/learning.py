from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.services.learning_service import (
    process_session_heartbeat,
    pause_active_session,
    get_active_learning_session,
    calculate_user_learning_stats
)

router = APIRouter()

class SessionStartRequest(BaseModel):
    activity_type: Optional[str] = "general_learning"

class SessionHeartbeatRequest(BaseModel):
    tz_offset_minutes: int = 0
    activity_type: Optional[str] = "general_learning"

@router.post("/session/start")
def start_session(
    payload: Optional[SessionStartRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/learning/session/start
    Starts or resumes an active learning session in PostgreSQL.
    """
    activity_type = payload.activity_type if payload and payload.activity_type else "general_learning"
    session, is_new = process_session_heartbeat(db, current_user, activity_type=activity_type)
    stats = calculate_user_learning_stats(db, current_user)
    
    return {
        "success": True,
        "is_new": is_new,
        "session": {
            "id": session.id,
            "user_id": str(session.user_id),
            "learning_path": session.learning_path,
            "started_at": session.started_at.isoformat(),
            "last_active_at": session.last_active_at.isoformat() if session.last_active_at else session.started_at.isoformat(),
            "duration_seconds": session.duration_seconds,
            "activity_type": session.activity_type
        },
        "stats": stats
    }

@router.post("/session/heartbeat")
def heartbeat_session(
    payload: Optional[SessionHeartbeatRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/learning/session/heartbeat
    Receives real-time active heartbeat while user is active on tab.
    Calculates delta strictly using server timestamps and returns updated stats.
    """
    tz_offset = payload.tz_offset_minutes if payload else 0
    activity_type = payload.activity_type if payload and payload.activity_type else "general_learning"
    
    session, is_new = process_session_heartbeat(db, current_user, activity_type=activity_type)
    stats = calculate_user_learning_stats(db, current_user, user_tz_offset_minutes=tz_offset)
    
    return {
        "success": True,
        "is_new": is_new,
        "session_id": session.id,
        "stats": stats
    }

@router.post("/session/pause")
def pause_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/learning/session/pause
    Pauses active session when user leaves tab, goes idle, or closes browser.
    """
    paused = pause_active_session(db, current_user)
    stats = calculate_user_learning_stats(db, current_user)
    
    return {
        "success": True,
        "paused": paused is not None,
        "stats": stats
    }

@router.post("/session/end")
def end_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    POST /api/v1/learning/session/end
    Ends current active session.
    """
    ended_session = pause_active_session(db, current_user)
    stats = calculate_user_learning_stats(db, current_user)
    
    return {
        "success": True,
        "ended_session": {
            "id": ended_session.id,
            "user_id": str(ended_session.user_id),
            "duration_seconds": ended_session.duration_seconds
        } if ended_session else None,
        "stats": stats
    }

@router.get("/session/current")
def get_current_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/v1/learning/session/current
    """
    active = get_active_learning_session(db, current_user)
    if not active:
        return {"active": False, "session": None}
        
    return {
        "active": True,
        "session": {
            "id": active.id,
            "user_id": str(active.user_id),
            "learning_path": active.learning_path,
            "started_at": active.started_at.isoformat(),
            "last_active_at": active.last_active_at.isoformat() if active.last_active_at else active.started_at.isoformat(),
            "activity_type": active.activity_type,
            "duration_seconds": active.duration_seconds
        }
    }

@router.get("/stats")
def get_stats(
    tz_offset_minutes: int = Query(default=0, description="Timezone offset in minutes"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    GET /api/v1/learning/stats
    Returns user's real, PostgreSQL-backed learning statistics.
    """
    return calculate_user_learning_stats(db, current_user, user_tz_offset_minutes=tz_offset_minutes)
