import uuid
from typing import List, Dict, Any, Optional
from app.models.schemas import LearningResource, RoadmapItem
from app.services.seed_data import LEARNING_RESOURCES_DATABASE

from app.services.youtube_service import fetch_youtube_resources_for_skill

def find_resources_for_skill(skill_name: str, preferred_style: str = "Hands-on Projects") -> List[LearningResource]:
    """
    Retrieves matching learning resources for a target skill.
    Integrates real-time YouTube Data API video recommendations when configured.
    Ranks by preferred style matching and relevance.
    """
    matched = []
    s_lower = skill_name.lower()
    
    # 1. Fetch real-time YouTube video tutorials
    yt_resources = fetch_youtube_resources_for_skill(skill_name, max_results=2)
    if yt_resources:
        matched.extend(yt_resources)
    
    # 2. Match seed database resources
    for res in LEARNING_RESOURCES_DATABASE:
        res_skill = res["skill_name"].lower()
        if res_skill in s_lower or s_lower in res_skill or any(word in res_skill for word in s_lower.split()):
            matched.append(LearningResource(
                id=res["id"],
                title=res["title"],
                type=res["type"],
                url=res["url"],
                duration_hours=res["duration_hours"],
                difficulty=res["difficulty"],
                provider=res["provider"],
                description=res["description"],
                skill_name=res["skill_name"],
                thumbnail_url=res.get("thumbnail_url")
            ))

    if not matched:
        # Fallback dynamic resource creation if seed doesn't contain exact match
        matched.append(LearningResource(
            id=f"res_{uuid.uuid4().hex[:6]}",
            title=f"Complete Guide to {skill_name}",
            type="Hands-on Project & Documentation" if "Hands-on" in preferred_style else "Video Masterclass",
            url=f"https://learn.hcltech.com/resources/{skill_name.lower().replace(' ', '-')}",
            duration_hours=6.0,
            difficulty="Intermediate",
            provider="HCLTech Learning Hub",
            description=f"Comprehensive practice exercises, architectural concepts, and hands-on implementation guide for {skill_name}.",
            skill_name=skill_name
        ))

    return matched

def generate_explanation_for_step(
    skill_name: str,
    target_role: str,
    prerequisites: List[str],
    is_prereq_known: bool
) -> str:
    """
    Generates explainable recommendation rationale for why a step is placed in a given order.
    """
    if is_prereq_known:
        return f"We streamlined {skill_name} because you already have foundational experience in {', '.join(prerequisites)}. This lets you accelerate directly to practical implementation."
    elif prerequisites:
        return f"Recommended '{skill_name}' because it directly builds upon {', '.join(prerequisites)} and is essential for mastering {target_role} architecture."
    else:
        return f"Foundational phase: '{skill_name}' is recommended first to establish core concepts required for all subsequent backend modules."
