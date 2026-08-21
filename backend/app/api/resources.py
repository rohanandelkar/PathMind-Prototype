from typing import List
from fastapi import APIRouter, Query, HTTPException
from app.models.schemas import LearningResource
from app.services.youtube_service import fetch_youtube_resources_for_skill
from app.services.recommender import find_resources_for_skill

router = APIRouter()

@router.get("/search", response_model=List[LearningResource])
def search_learning_resources(
    skill: str = Query(..., description="Target skill name (e.g. Java, Python, Spring Boot, React)"),
    preferred_style: str = Query("Hands-on Projects", description="Learning style preference")
):
    """
    Returns aggregated learning resources for a skill including live YouTube Data API video tutorials.
    """
    if not skill:
        raise HTTPException(status_code=400, detail="Skill query parameter is required.")
    return find_resources_for_skill(skill_name=skill, preferred_style=preferred_style)

@router.get("/youtube", response_model=List[LearningResource])
def get_youtube_videos(
    query: str = Query(..., description="Search query for YouTube videos"),
    max_results: int = Query(3, ge=1, le=10)
):
    """
    Direct endpoint to query YouTube Data API v3 for video tutorials.
    """
    return fetch_youtube_resources_for_skill(skill_name=query, max_results=max_results)
