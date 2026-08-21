import json
from datetime import datetime
from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.schemas import PersonalizedRoadmap, RoadmapItem
from app.models.domain import RoadmapDB
from app.api.profile import get_current_profile, get_current_user_obj
from app.services.roadmap_generator import build_personalized_roadmap

router = APIRouter()

def roadmap_db_to_schema(db_roadmap: RoadmapDB) -> PersonalizedRoadmap:
    items_data = json.loads(db_roadmap.roadmap_items_json or "[]")
    items = [RoadmapItem.model_validate(item) for item in items_data]

    return PersonalizedRoadmap(
        roadmap_id=db_roadmap.roadmap_id,
        user_id=db_roadmap.user_id,
        target_role=db_roadmap.target_role,
        overall_progress=db_roadmap.overall_progress,
        total_phases=len(items),
        current_phase_index=0,
        roadmap_items=items,
        generated_at=db_roadmap.updated_at.isoformat() if db_roadmap.updated_at else datetime.now().isoformat()
    )

def save_roadmap_to_db(db: Session, roadmap: PersonalizedRoadmap) -> RoadmapDB:
    uid = str(roadmap.user_id)
    db_roadmap = db.query(RoadmapDB).filter(RoadmapDB.user_id == uid).first()
    items_json = json.dumps([item.model_dump() for item in roadmap.roadmap_items])

    if not db_roadmap:
        db_roadmap = RoadmapDB(
            roadmap_id=roadmap.roadmap_id,
            user_id=uid,
            target_role=roadmap.target_role,
            overall_progress=roadmap.overall_progress,
            roadmap_items_json=items_json,
            updated_at=datetime.utcnow()
        )
        db.add(db_roadmap)
    else:
        db_roadmap.target_role = roadmap.target_role
        db_roadmap.overall_progress = roadmap.overall_progress
        db_roadmap.roadmap_items_json = items_json
        db_roadmap.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_roadmap)
    return db_roadmap

@router.post("/generate", response_model=PersonalizedRoadmap)
def generate_roadmap(request: Request, db: Session = Depends(get_db)):
    profile = get_current_profile(request, db)
    roadmap = build_personalized_roadmap(profile)
    save_roadmap_to_db(db, roadmap)
    return roadmap

@router.get("/active", response_model=PersonalizedRoadmap)
def get_active_roadmap(request: Request, db: Session = Depends(get_db)):
    profile = get_current_profile(request, db)
    user_id = str(profile.user_id)

    db_roadmap = db.query(RoadmapDB).filter(RoadmapDB.user_id == user_id).first()
    if db_roadmap and db_roadmap.target_role == profile.target_role:
        return roadmap_db_to_schema(db_roadmap)

    return generate_roadmap(request, db)
