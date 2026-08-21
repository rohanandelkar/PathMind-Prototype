from datetime import datetime, date, timedelta
from typing import Dict, Any, Tuple, Optional
from sqlalchemy.orm import Session
from app.models.domain import LearningSessionDB
from app.models.user import User

def get_active_learning_session(db: Session, user: User) -> Optional[LearningSessionDB]:
    """
    Finds currently active session (ended_at IS NULL) for the user.
    """
    user_id_str = str(user.id)
    return db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str,
        LearningSessionDB.ended_at.is_(None)
    ).order_by(LearningSessionDB.started_at.desc()).first()

def get_or_create_active_session(
    db: Session,
    user: User,
    activity_type: str = "general_learning"
) -> Tuple[LearningSessionDB, bool]:
    """
    Starts or resumes an active learning session.
    If an active session already exists for user, detects and returns it (is_new=False).
    Otherwise creates a new session (is_new=True).
    """
    user_id_str = str(user.id)
    active = get_active_learning_session(db, user)
    
    if active:
        # Synchronize learning_path if user changed it
        if user.selected_learning_path and active.learning_path != user.selected_learning_path:
            active.learning_path = user.selected_learning_path
            db.commit()
            db.refresh(active)
        return active, False

    # Create new active session
    new_session = LearningSessionDB(
        user_id=user_id_str,
        learning_path=user.selected_learning_path,
        started_at=datetime.utcnow(),
        ended_at=None,
        duration_seconds=0.0,
        activity_type=activity_type or "general_learning"
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session, True

def end_active_session(db: Session, user: User) -> Optional[LearningSessionDB]:
    """
    Ends the current active learning session for user.
    Calculates duration in seconds and updates ended_at and duration_seconds.
    """
    active = get_active_learning_session(db, user)
    if not active:
        return None

    now = datetime.utcnow()
    duration = max(0.0, (now - active.started_at).total_seconds())
    
    active.ended_at = now
    active.duration_seconds = round(duration, 1)
    
    db.commit()
    db.refresh(active)
    return active

def calculate_user_learning_stats(
    db: Session,
    user: User,
    user_tz_offset_minutes: int = 0
) -> Dict[str, Any]:
    """
    Calculates real, PostgreSQL-backed learning statistics for user:
    - total_hours_learned: sum of completed session durations + current active session elapsed time
    - learning_streak_days: consecutive active learning calendar days (timezone aware)
    - total_sessions_count: total sessions count
    """
    user_id_str = str(user.id)
    
    # 1. Fetch completed sessions
    completed_sessions = db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str,
        LearningSessionDB.ended_at.is_not(None)
    ).all()
    
    # 2. Fetch active session if present
    active_session = get_active_learning_session(db, user)
    
    total_completed_seconds = sum(s.duration_seconds for s in completed_sessions)
    active_elapsed_seconds = 0.0
    if active_session:
        active_elapsed_seconds = max(0.0, (datetime.utcnow() - active_session.started_at).total_seconds())
        
    total_seconds = total_completed_seconds + active_elapsed_seconds
    total_hours = round(total_seconds / 3600.0, 1)
    
    # 3. Calculate timezone-aware active streak
    all_sessions = db.query(LearningSessionDB.started_at).filter(
        LearningSessionDB.user_id == user_id_str
    ).all()
    
    tz_delta = timedelta(minutes=user_tz_offset_minutes)
    
    unique_dates = set()
    for (s_time,) in all_sessions:
        if s_time:
            local_dt = s_time + tz_delta
            unique_dates.add(local_dt.date())
            
    now_local = datetime.utcnow() + tz_delta
    today = now_local.date()
    yesterday = today - timedelta(days=1)
    
    streak = 0
    if today in unique_dates:
        curr = today
        while curr in unique_dates:
            streak += 1
            curr -= timedelta(days=1)
    elif yesterday in unique_dates:
        curr = yesterday
        while curr in unique_dates:
            streak += 1
            curr -= timedelta(days=1)
    else:
        streak = 0

    active_session_info = None
    if active_session:
        active_session_info = {
            "id": active_session.id,
            "started_at": active_session.started_at.isoformat(),
            "learning_path": active_session.learning_path,
            "activity_type": active_session.activity_type,
            "elapsed_seconds": round(active_elapsed_seconds, 1)
        }

    return {
        "user_id": user_id_str,
        "selected_learning_path": user.selected_learning_path,
        "total_hours_learned": total_hours,
        "learning_streak_days": streak,
        "total_sessions_count": len(completed_sessions) + (1 if active_session else 0),
        "active_session": active_session_info
    }
