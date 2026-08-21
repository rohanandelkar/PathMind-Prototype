from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.schemas import GoalInput
from app.schemas.auth import LearningPathUpdateRequest, LearningPathResponse
from app.services.seed_data import PATH_TO_ROLE_MAP
from app.api.profile import create_learner_profile

router = APIRouter()

ALLOWED_LEARNING_PATHS = {"C", "CPP", "FULL_STACK_JAVA", "FULL_STACK_PYTHON"}

@router.get("/me/learning-path", response_model=LearningPathResponse)
def get_user_learning_path(current_user: User = Depends(get_current_user)):
    """
    GET /api/users/me/learning-path
    Returns the authenticated user's selected learning path, or null if unselected.
    """
    return LearningPathResponse(selected_learning_path=current_user.selected_learning_path)

@router.put("/me/learning-path", response_model=LearningPathResponse)
def update_user_learning_path(
    payload: LearningPathUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    PUT /api/users/me/learning-path
    Updates the authenticated user's selected learning path in PostgreSQL.
    Validates that the input is one of: C, CPP, FULL_STACK_JAVA, FULL_STACK_PYTHON.
    """
    path = payload.learning_path.strip().upper()
    if path not in ALLOWED_LEARNING_PATHS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid learning path '{payload.learning_path}'. Allowed values: {', '.join(sorted(ALLOWED_LEARNING_PATHS))}"
        )

    # 1. Update user record
    current_user.selected_learning_path = path
    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    # 2. Synchronize profile and roadmap to chosen path
    target_role = PATH_TO_ROLE_MAP.get(path)
    if target_role:
        try:
            goal = GoalInput(
                raw_prompt=f"I want to follow the {target_role} curriculum and master all core milestones.",
                target_role=target_role
            )
            profile = create_learner_profile(goal, current_user, db)
            from app.services.roadmap_generator import build_personalized_roadmap
            from app.api.roadmap import save_roadmap_to_db
            new_roadmap = build_personalized_roadmap(profile)
            save_roadmap_to_db(db, new_roadmap)
        except Exception as e:
            print(f"[LEARNING PATH SYNC WARNING] Failed to auto-generate roadmap: {e}")

    return LearningPathResponse(selected_learning_path=current_user.selected_learning_path)
