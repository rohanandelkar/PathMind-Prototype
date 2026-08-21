import json
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Request, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.schemas import GoalInput, LearnerProfile, SkillProficiency, TargetRoleSkillRequirement, SkillGapItem
from app.models.domain import ProfileDB
from app.models.user import User
from app.services.profiler import parse_user_goal
from app.services.skill_gap import calculate_skill_gaps
from app.services.seed_data import PATH_TO_ROLE_MAP, TARGET_ROLES_DATABASE
from app.api.auth import get_token_from_request, decode_access_token, get_user_by_id
from app.services.roadmap_generator import build_personalized_roadmap

router = APIRouter()

def get_current_user_obj(request: Request, db: Session) -> Optional[User]:
    try:
        token = get_token_from_request(request)
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            return get_user_by_id(db, int(payload["sub"]))
    except Exception:
        pass
    return None

def profile_db_to_schema(db_profile: ProfileDB) -> LearnerProfile:
    existing_skills_data = json.loads(db_profile.existing_skills_json or "[]")
    skill_gaps_data = json.loads(db_profile.skill_gaps_json or "[]")

    existing_skills = [SkillProficiency.model_validate(s) for s in existing_skills_data]
    skill_gaps = [SkillGapItem.model_validate(g) for g in skill_gaps_data]
    
    role_reqs, _ = calculate_skill_gaps(existing_skills, db_profile.target_role)

    return LearnerProfile(
        user_id=db_profile.user_id,
        name=db_profile.name,
        experience_level=db_profile.experience_level,
        target_role=db_profile.target_role,
        timeline_months=db_profile.timeline_months,
        hours_per_week=db_profile.hours_per_week,
        learning_style=db_profile.learning_style,
        existing_skills=existing_skills,
        target_skills=role_reqs,
        skill_gaps=skill_gaps,
        created_at=db_profile.updated_at.isoformat() if db_profile.updated_at else datetime.now().isoformat()
    )

def save_profile_to_db(db: Session, profile: LearnerProfile) -> ProfileDB:
    uid = str(profile.user_id)
    db_profile = db.query(ProfileDB).filter(ProfileDB.user_id == uid).first()
    existing_skills_json = json.dumps([s.model_dump() for s in profile.existing_skills])
    skill_gaps_json = json.dumps([g.model_dump() for g in profile.skill_gaps])

    if not db_profile:
        db_profile = ProfileDB(
            user_id=uid,
            name=profile.name,
            experience_level=profile.experience_level,
            target_role=profile.target_role,
            timeline_months=profile.timeline_months,
            hours_per_week=profile.hours_per_week,
            learning_style=profile.learning_style,
            existing_skills_json=existing_skills_json,
            skill_gaps_json=skill_gaps_json,
            updated_at=datetime.utcnow()
        )
        db.add(db_profile)
    else:
        db_profile.name = profile.name
        db_profile.experience_level = profile.experience_level
        db_profile.target_role = profile.target_role
        db_profile.timeline_months = profile.timeline_months
        db_profile.hours_per_week = profile.hours_per_week
        db_profile.learning_style = profile.learning_style
        db_profile.existing_skills_json = existing_skills_json
        db_profile.skill_gaps_json = skill_gaps_json
        db_profile.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_profile)
    return db_profile

def create_learner_profile(goal: GoalInput, user: Optional[User], db: Session) -> LearnerProfile:
    user_id = str(user.id) if user else "usr_demo_101"
    user_name = user.full_name if user else "Learner"

    if user and user.selected_learning_path and not goal.target_role:
        goal.target_role = PATH_TO_ROLE_MAP.get(user.selected_learning_path, "Full Stack Java Roadmap")

    parsed = parse_user_goal(goal)
    target_role = goal.target_role or parsed["target_role"]
    role_reqs, skill_gaps = calculate_skill_gaps(parsed["existing_skills"], target_role)

    profile = LearnerProfile(
        user_id=user_id,
        name=user_name,
        experience_level=parsed["experience_level"],
        target_role=target_role,
        timeline_months=parsed["timeline_months"],
        hours_per_week=parsed["hours_per_week"],
        learning_style=parsed["learning_style"],
        existing_skills=parsed["existing_skills"],
        target_skills=role_reqs,
        skill_gaps=skill_gaps,
        created_at=datetime.now().isoformat()
    )

    save_profile_to_db(db, profile)
    return profile

@router.post("/generate", response_model=LearnerProfile)
def generate_profile_from_goal(goal: GoalInput, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_obj(request, db)
    return create_learner_profile(goal, user, db)

@router.get("/me", response_model=LearnerProfile)
def get_current_profile(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_obj(request, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated."
        )

    if not user.selected_learning_path or user.selected_learning_path not in PATH_TO_ROLE_MAP:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid learning path selected."
        )

    user_id = str(user.id)
    expected_role = PATH_TO_ROLE_MAP[user.selected_learning_path]

    db_profile = db.query(ProfileDB).filter(ProfileDB.user_id == user_id).first()
    if db_profile:
        if db_profile.name != user.full_name or db_profile.target_role != expected_role:
            goal = GoalInput(
                raw_prompt=f"I want to master {expected_role}.",
                target_role=expected_role
            )
            profile = create_learner_profile(goal, user, db)
            from app.api.roadmap import save_roadmap_to_db
            new_roadmap = build_personalized_roadmap(profile)
            save_roadmap_to_db(db, new_roadmap)
            return profile

        return profile_db_to_schema(db_profile)

    goal = GoalInput(
        raw_prompt=f"I want to master {expected_role}.",
        target_role=expected_role
    )
    profile = create_learner_profile(goal, user, db)
    from app.api.roadmap import save_roadmap_to_db
    new_roadmap = build_personalized_roadmap(profile)
    save_roadmap_to_db(db, new_roadmap)
    return profile
