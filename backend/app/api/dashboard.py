from typing import Dict, Any, List
from fastapi import APIRouter, Request, Depends, Query
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.profile import get_current_profile, get_current_user_obj
from app.api.roadmap import get_active_roadmap
from app.services.learning_service import calculate_user_learning_stats, get_or_create_active_session

router = APIRouter()

@router.get("/metrics")
def get_dashboard_metrics(
    request: Request,
    tz_offset: int = Query(default=0, description="Timezone offset in minutes"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    user = get_current_user_obj(request, db)
    profile = get_current_profile(request, db)
    roadmap = get_active_roadmap(request, db)

    if user:
        get_or_create_active_session(db, user, activity_type="dashboard_view")
        stats = calculate_user_learning_stats(db, user, user_tz_offset_minutes=tz_offset)
        streak_days = stats["learning_streak_days"]
        hours_learned = stats["total_hours_learned"]
    else:
        streak_days = 0
        hours_learned = 0.0

    # Skill Radar Data
    skill_chart = []
    for gap in profile.skill_gaps:
        skill_chart.append({
            "skill": gap.skill_name[:18],
            "current": gap.current_score,
            "required": gap.required_score,
            "gap": gap.gap_score
        })

    # Milestone stats
    total_phases = roadmap.total_phases
    completed_phases = sum(1 for item in roadmap.roadmap_items if item.status == "Completed")
    in_progress_phases = sum(1 for item in roadmap.roadmap_items if item.status == "In-Progress")
    locked_phases = total_phases - (completed_phases + in_progress_phases)

    # Next Recommended Action
    next_action_title = "Continue Learning"
    next_action_desc = "Begin your next module"
    next_action_skill = ""
    
    for item in roadmap.roadmap_items:
        if item.status == "In-Progress":
            next_action_title = f"Focus on {item.skill_name}"
            next_action_desc = item.explanation
            next_action_skill = item.skill_name
            break

    return {
        "user_name": profile.name,
        "target_role": profile.target_role,
        "overall_progress": roadmap.overall_progress,
        "learning_streak_days": streak_days,
        "total_hours_learned": hours_learned,
        "milestone_summary": {
            "total": total_phases,
            "completed": completed_phases,
            "in_progress": in_progress_phases,
            "locked": locked_phases
        },
        "next_recommended_action": {
            "title": next_action_title,
            "description": next_action_desc,
            "skill_name": next_action_skill,
            "estimated_duration": "45 mins today"
        },
        "skills_visualization": skill_chart,
        "skill_gaps_summary": [
            {"skill": gap.skill_name, "priority": gap.priority, "status": gap.status, "gap": gap.gap_score}
            for gap in profile.skill_gaps if gap.status != "Proficient"
        ]
    }
