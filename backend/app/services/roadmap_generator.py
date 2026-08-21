import uuid
from datetime import datetime
from typing import List, Dict
from app.models.schemas import (
    LearnerProfile, PersonalizedRoadmap, RoadmapItem, SkillGapItem, TargetRoleSkillRequirement
)
from app.services.prerequisite_engine import solve_prerequisite_dag
from app.services.recommender import find_resources_for_skill, generate_explanation_for_step
from app.services.seed_data import ASSESSMENTS_DATABASE

def build_personalized_roadmap(profile: LearnerProfile) -> PersonalizedRoadmap:
    """
    Generates an ordered, prerequisite-aware, explainable roadmap tailored to the user profile.
    """
    ordered_skills = solve_prerequisite_dag(profile.target_skills, profile.skill_gaps)
    roadmap_items: List[RoadmapItem] = []
    
    # Map skill status for quick lookup
    status_map: Dict[str, str] = {gap.skill_name.lower(): gap.status for gap in profile.skill_gaps}
    prereq_map: Dict[str, List[str]] = {req.skill_name.lower(): req.prerequisites for req in profile.target_skills}

    phase_index = 1
    completed_count = 0

    for idx, skill_name in enumerate(ordered_skills):
        s_lower = skill_name.lower()
        gap_status = status_map.get(s_lower, "Missing")
        prereqs = prereq_map.get(s_lower, [])

        # Determine item status
        if gap_status == "Proficient":
            item_status = "Completed"
            completed_count += 1
        elif phase_index == 1 or (idx > 0 and roadmap_items[idx-1].status == "Completed"):
            item_status = "In-Progress"
        else:
            item_status = "Locked"

        # Check if prerequisites are known
        is_prereq_known = any(status_map.get(p.lower()) == "Proficient" for p in prereqs)
        explanation = generate_explanation_for_step(skill_name, profile.target_role, prereqs, is_prereq_known)

        # Retrieve curated learning resources
        resources = find_resources_for_skill(skill_name, profile.learning_style)

        # Associated project prompt & quiz assessment ID
        project_prompt = f"Build a hands-on {skill_name} mini-project implementing real-world patterns."
        assessment_id = None
        for quiz_name, quiz_data in ASSESSMENTS_DATABASE.items():
            if quiz_name.lower() in s_lower or s_lower in quiz_name.lower():
                assessment_id = quiz_data["id"]
                break

        roadmap_items.append(RoadmapItem(
            id=f"item_{phase_index}_{uuid.uuid4().hex[:6]}",
            phase_number=phase_index,
            phase_title=f"Phase {phase_index}: {skill_name}",
            skill_name=skill_name,
            description=f"Master {skill_name} concepts, best practices, hands-on implementation, and performance tuning.",
            status=item_status,
            estimated_days=7 if gap_status == "Missing" else 3,
            prerequisites=prereqs,
            explanation=explanation,
            resources=resources,
            project_prompt=project_prompt,
            assessment_id=assessment_id,
            completion_criteria=f"Score > 75% in the {skill_name} assessment and complete the hands-on project."
        ))
        
        phase_index += 1

    total_phases = len(roadmap_items)
    overall_progress = round((completed_count / total_phases) * 100, 1) if total_phases > 0 else 0.0

    return PersonalizedRoadmap(
        roadmap_id=f"roadmap_{uuid.uuid4().hex[:8]}",
        user_id=profile.user_id,
        target_role=profile.target_role,
        overall_progress=overall_progress,
        total_phases=total_phases,
        current_phase_index=min(completed_count + 1, total_phases),
        roadmap_items=roadmap_items,
        generated_at=datetime.now().isoformat()
    )
