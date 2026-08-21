from typing import List, Dict, Set
from app.models.schemas import SkillGapItem, TargetRoleSkillRequirement

def solve_prerequisite_dag(
    role_requirements: List[TargetRoleSkillRequirement],
    skill_gaps: List[SkillGapItem]
) -> List[str]:
    """
    Performs topological sort on the Directed Acyclic Graph (DAG) of skill dependencies.
    Skills that are already mastered or proficient are flagged to be skipped or shortened.
    """
    # Map of skill -> prerequisites
    adj_prereqs: Dict[str, List[str]] = {}
    mastered_skills: Set[str] = set()

    for item in skill_gaps:
        if item.status == "Proficient":
            mastered_skills.add(item.skill_name.lower())

    for req in role_requirements:
        adj_prereqs[req.skill_name] = req.prerequisites

    visited: Set[str] = set()
    temp_mark: Set[str] = set()
    ordered_sequence: List[str] = []

    def visit(node: str):
        if node in temp_mark:
            # Cycle detected or already visiting
            return
        if node not in visited:
            temp_mark.add(node)
            prereqs = adj_prereqs.get(node, [])
            for prereq in prereqs:
                # Find matching target skill requirement
                for req in role_requirements:
                    if prereq.lower() in req.skill_name.lower() or req.skill_name.lower() in prereq.lower():
                        visit(req.skill_name)
            temp_mark.remove(node)
            visited.add(node)
            ordered_sequence.append(node)

    for req in role_requirements:
        if req.skill_name not in visited:
            visit(req.skill_name)

    return ordered_sequence
