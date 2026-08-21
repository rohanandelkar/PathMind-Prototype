from typing import List, Dict
from app.models.schemas import SkillProficiency, TargetRoleSkillRequirement, SkillGapItem
from app.services.seed_data import TARGET_ROLES_DATABASE

def calculate_skill_gaps(
    existing_skills: List[SkillProficiency],
    target_role: str
) -> tuple[List[TargetRoleSkillRequirement], List[SkillGapItem]]:
    """
    Compares current learner skills with target role requirements to compute missing or weak skills.
    """
    role_data = TARGET_ROLES_DATABASE.get(target_role, TARGET_ROLES_DATABASE["Java Backend Developer"])
    role_requirements: List[TargetRoleSkillRequirement] = []
    
    for item in role_data["skills"]:
        role_requirements.append(TargetRoleSkillRequirement(
            skill_name=item["skill_name"],
            category=item["category"],
            required_score=item["required_score"],
            importance=item["importance"],
            prerequisites=item["prerequisites"]
        ))

    # Map existing skills for fast lookup
    existing_map: Dict[str, int] = {}
    for s in existing_skills:
        existing_map[s.skill_name.lower()] = s.score

    skill_gaps: List[SkillGapItem] = []
    priority_counter = 1

    for req in role_requirements:
        cur_score = 0
        # Fuzzy match skill name
        req_name_lower = req.skill_name.lower()
        for known_name, score in existing_map.items():
            if known_name in req_name_lower or req_name_lower in known_name:
                cur_score = max(cur_score, score)

        gap = max(0, req.required_score - cur_score)
        
        if cur_score >= req.required_score:
            status = "Proficient"
        elif cur_score > 0:
            status = "Inadequate"
        else:
            status = "Missing"

        # Calculate Priority based on Importance & Prerequisite dependencies
        priority = 3
        if req.importance == "Critical":
            priority = 1 if status == "Missing" else 2
        elif req.importance == "Important":
            priority = 3
        else:
            priority = 4

        skill_gaps.append(SkillGapItem(
            skill_name=req.skill_name,
            category=req.category,
            current_score=cur_score,
            required_score=req.required_score,
            gap_score=gap,
            status=status,
            priority=priority,
            prerequisites=req.prerequisites
        ))

    # Sort gaps by Priority ascending (1 is highest priority), then gap score descending
    skill_gaps.sort(key=lambda x: (x.priority, -x.gap_score))

    return role_requirements, skill_gaps
