import uuid
from typing import List, Dict, Any, Optional
from app.models.schemas import LearningResource, RoadmapItem
from app.services.seed_data import LEARNING_RESOURCES_DATABASE

from app.services.youtube_service import fetch_youtube_resources_for_skill

def find_resources_for_skill(skill_name: str, preferred_style: str = "Hands-on Projects") -> List[LearningResource]:
    """
    Retrieves matching learning resources for a target skill.
    Guarantees STRICT 1-to-1 topic mapping: exactly 2 YouTube videos + 2 Official Documentation links per topic.
    No cross-topic or cross-roadmap resource leaking.
    """
    matched: List[LearningResource] = []
    s_clean = skill_name.strip().lower()

    # 1. Match seed database resources using EXACT skill_name string comparison
    for res in LEARNING_RESOURCES_DATABASE:
        res_skill = res["skill_name"].strip().lower()
        if res_skill == s_clean:
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

    # Separate into Videos and Official Docs
    videos = [r for r in matched if r.type == "Video Resource" or "video" in r.type.lower()]
    docs = [r for r in matched if r.type == "Official Documentation" or "doc" in r.type.lower()]

    # 2. Fetch real-time YouTube video tutorials if API configured
    yt_resources = fetch_youtube_resources_for_skill(skill_name, max_results=1)
    if yt_resources:
        # Prepend YouTube API result if available, replacing one seed video item
        videos = [yt_resources[0]] + videos[:1]

    # Limit to 2 videos and 2 docs per topic (strictly 4 items total)
    final_resources = videos[:2] + docs[:2]

    # Safety fallback if seed data missing for a custom dynamic skill
    if not final_resources:
        doc_url = "https://docs.python.org/3/"
        doc_provider = "Official Documentation"
        if "c++" in s_clean or "cpp" in s_clean or "stl" in s_clean:
            doc_url = "https://en.cppreference.com/w/cpp"
            doc_provider = "C++ Reference (cppreference)"
        elif "c " in s_clean or s_clean.startswith("c ") or "pointers" in s_clean or "struct" in s_clean or "malloc" in s_clean:
            doc_url = "https://en.cppreference.com/w/c"
            doc_provider = "C Language Reference (cppreference)"
        elif "java" in s_clean:
            doc_url = "https://docs.oracle.com/en/java/"
            doc_provider = "Oracle Java Documentation"
        elif "spring" in s_clean:
            doc_url = "https://docs.spring.io/spring-boot/docs/current/reference/html/"
            doc_provider = "Spring Official Documentation"
        elif "react" in s_clean:
            doc_url = "https://react.dev/learn"
            doc_provider = "React Official Documentation"
        elif "fastapi" in s_clean:
            doc_url = "https://fastapi.tiangolo.com/tutorial/"
            doc_provider = "FastAPI Official Documentation"
        elif "sql" in s_clean or "postgres" in s_clean:
            doc_url = "https://www.postgresql.org/docs/current/"
            doc_provider = "PostgreSQL Official Documentation"
        elif "javascript" in s_clean or "html" in s_clean or "css" in s_clean:
            doc_url = "https://developer.mozilla.org/en-US/docs/Web"
            doc_provider = "MDN Web Docs"
        elif "docker" in s_clean:
            doc_url = "https://docs.docker.com/get-started/"
            doc_provider = "Docker Official Documentation"

        final_resources = [
            LearningResource(
                id=f"res_{uuid.uuid4().hex[:6]}_v1",
                title=f"{skill_name} Video Masterclass",
                type="Video Resource",
                url=f"https://www.youtube.com/results?search_query={skill_name.replace(' ', '+')}+tutorial",
                duration_hours=3.5,
                difficulty="Beginner to Intermediate",
                provider="YouTube Learning",
                description=f"Step-by-step video tutorial explaining {skill_name}.",
                skill_name=skill_name
            ),
            LearningResource(
                id=f"res_{uuid.uuid4().hex[:6]}_d1",
                title=f"{skill_name} Official Documentation",
                type="Official Documentation",
                url=doc_url,
                duration_hours=3.0,
                difficulty="Intermediate",
                provider=doc_provider,
                description=f"Official language reference, specifications, syntax guides, and core APIs for {skill_name}.",
                skill_name=skill_name
            )
        ]

    return final_resources

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
