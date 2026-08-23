from datetime import datetime, date, timedelta
from typing import Dict, Any, Tuple, Optional
from sqlalchemy.orm import Session
from app.models.domain import LearningSessionDB
from app.models.user import User

MAX_IDLE_TIMEOUT_SECONDS = 300.0  # 5 minutes idle timeout
MAX_HEARTBEAT_INTERVAL_SECONDS = 15.0  # Max delta added per heartbeat ping

def get_active_learning_session(db: Session, user: User) -> Optional[LearningSessionDB]:
    """
    Finds currently active session (ended_at IS NULL) for the user.
    If the active session has been idle for more than MAX_IDLE_TIMEOUT_SECONDS,
    it is automatically expired and closed.
    """
    user_id_str = str(user.id)
    active = db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str,
        LearningSessionDB.ended_at.is_(None)
    ).order_by(LearningSessionDB.started_at.desc()).first()

    if not active:
        return None

    now = datetime.utcnow()
    last_active = active.last_active_at or active.started_at or now
    idle_time = (now - last_active).total_seconds()

    if idle_time > MAX_IDLE_TIMEOUT_SECONDS:
        # Expire stale session at its last active timestamp
        active.ended_at = last_active
        db.commit()
        return None

    return active

def process_session_heartbeat(
    db: Session,
    user: User,
    activity_type: str = "general_learning"
) -> Tuple[LearningSessionDB, bool]:
    """
    Processes a real-time active heartbeat for the user.
    Increments accumulated duration strictly using server timestamps.
    """
    user_id_str = str(user.id)
    now = datetime.utcnow()
    active = get_active_learning_session(db, user)

    if active:
        last_active = active.last_active_at or active.started_at or now
        delta = max(0.0, (now - last_active).total_seconds())

        # Accumulate time only if delta is within normal heartbeat bounds
        if 0 < delta <= MAX_HEARTBEAT_INTERVAL_SECONDS:
            active.duration_seconds = round(active.duration_seconds + delta, 1)

        active.last_active_at = now
        if user.selected_learning_path and active.learning_path != user.selected_learning_path:
            active.learning_path = user.selected_learning_path

        db.commit()
        db.refresh(active)
        return active, False

    # Create new active session
    new_session = LearningSessionDB(
        user_id=user_id_str,
        learning_path=user.selected_learning_path,
        started_at=now,
        last_active_at=now,
        ended_at=None,
        duration_seconds=0.0,
        activity_type=activity_type or "general_learning",
        created_at=now
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session, True

def get_or_create_active_session(
    db: Session,
    user: User,
    activity_type: str = "general_learning"
) -> Tuple[LearningSessionDB, bool]:
    """
    Alias/Wrapper for process_session_heartbeat.
    Starts or resumes an active learning session.
    """
    return process_session_heartbeat(db, user, activity_type=activity_type)

def pause_active_session(db: Session, user: User) -> Optional[LearningSessionDB]:
    """
    Pauses/Ends the current active learning session (e.g. on tab hide, blur, or logout).
    Finalizes accumulated duration in PostgreSQL.
    """
    user_id_str = str(user.id)
    now = datetime.utcnow()
    active = db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str,
        LearningSessionDB.ended_at.is_(None)
    ).order_by(LearningSessionDB.started_at.desc()).first()

    if not active:
        return None

    last_active = active.last_active_at or active.started_at or now
    delta = max(0.0, (now - last_active).total_seconds())
    if 0 < delta <= MAX_HEARTBEAT_INTERVAL_SECONDS:
        active.duration_seconds = round(active.duration_seconds + delta, 1)

    active.last_active_at = now
    active.ended_at = now

    db.commit()
    db.refresh(active)
    return active

def end_active_session(db: Session, user: User) -> Optional[LearningSessionDB]:
    """
    Ends active session.
    """
    return pause_active_session(db, user)

def format_duration(total_seconds: float) -> str:
    """
    Formats total active seconds into human-readable text.
    """
    secs = int(max(0, total_seconds))
    if secs < 60:
        return f"{secs}s"
    mins = secs // 60
    rem_secs = secs % 60
    if mins < 60:
        return f"{mins}m {rem_secs}s"
    hrs = round(secs / 3600.0, 1)
    return f"{hrs} Hours"

def calculate_user_learning_stats(
    db: Session,
    user: User,
    user_tz_offset_minutes: int = 0
) -> Dict[str, Any]:
    """
    Calculates real, PostgreSQL-backed learning statistics for user:
    - total_seconds_learned: sum of all persisted duration_seconds
    - total_hours_learned: total hours (rounded to 1 decimal place)
    - formatted_time_invested: human-readable formatted string
    - learning_streak_days: consecutive active learning calendar days (timezone aware)
    - total_sessions_count: total sessions count
    """
    user_id_str = str(user.id)

    # 1. Close any stale sessions first
    now = datetime.utcnow()
    stale_sessions = db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str,
        LearningSessionDB.ended_at.is_(None)
    ).all()
    for s in stale_sessions:
        last_act = s.last_active_at or s.started_at or now
        if (now - last_act).total_seconds() > MAX_IDLE_TIMEOUT_SECONDS:
            s.ended_at = last_act
    db.commit()

    # 2. Sum duration_seconds across all user sessions
    all_user_sessions = db.query(LearningSessionDB).filter(
        LearningSessionDB.user_id == user_id_str
    ).all()

    total_seconds = sum(s.duration_seconds for s in all_user_sessions)
    total_hours = round(total_seconds / 3600.0, 1)
    formatted_time = format_duration(total_seconds)

    active_session = get_active_learning_session(db, user)

    # 3. Calculate timezone-aware active streak from unique activity dates
    tz_delta = timedelta(minutes=user_tz_offset_minutes)

    unique_dates = set()
    for s in all_user_sessions:
        if s.started_at:
            local_start = s.started_at + tz_delta
            unique_dates.add(local_start.date())
        if s.last_active_at:
            local_last = s.last_active_at + tz_delta
            unique_dates.add(local_last.date())

    now_local = now + tz_delta
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
            "last_active_at": active_session.last_active_at.isoformat() if active_session.last_active_at else active_session.started_at.isoformat(),
            "learning_path": active_session.learning_path,
            "activity_type": active_session.activity_type,
            "duration_seconds": active_session.duration_seconds
        }

    return {
        "user_id": user_id_str,
        "selected_learning_path": user.selected_learning_path,
        "total_seconds_learned": round(total_seconds, 1),
        "total_hours_learned": total_hours,
        "formatted_time_invested": formatted_time,
        "learning_streak_days": streak,
        "total_sessions_count": len(all_user_sessions),
        "active_session": active_session_info
    }
