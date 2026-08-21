import re
import json
from typing import Dict, Any, List
from app.models.schemas import GoalInput, LearnerProfile, SkillProficiency, SkillGapItem, TargetRoleSkillRequirement
from app.services.seed_data import TARGET_ROLES_DATABASE
from app.core.config import settings

def parse_user_goal(goal_input: GoalInput) -> Dict[str, Any]:
    """
    Extracts structured learner information from natural language goal input.
    Uses OpenAI GPT if API key exists, otherwise runs structured regex/keyword heuristic parser.
    """
    raw_text = goal_input.raw_prompt.lower()
    
    # Target Role matching
    target_role = "Java Backend Developer"  # Default fallback
    if "ai" in raw_text or "data science" in raw_text or "machine learning" in raw_text:
        target_role = "AI & Data Science Engineer"
    elif "full stack" in raw_text or "fullstack" in raw_text or "frontend" in raw_text or "react" in raw_text:
        target_role = "Full-Stack Web Developer"
    elif "java" in raw_text or "backend" in raw_text or "spring" in raw_text:
        target_role = "Java Backend Developer"
        
    if goal_input.target_role and goal_input.target_role in TARGET_ROLES_DATABASE:
        target_role = goal_input.target_role

    # Experience level matching
    experience_level = "Beginner"
    if "intermediate" in raw_text or "some experience" in raw_text or "1 year" in raw_text or "2 years" in raw_text:
        experience_level = "Intermediate"
    elif "advanced" in raw_text or "senior" in raw_text or "5 years" in raw_text:
        experience_level = "Advanced"

    # Learning style matching
    learning_style = goal_input.preferred_style or "Hands-on Projects"
    if "video" in raw_text:
        learning_style = "Video Tutorials"
    elif "read" in raw_text or "book" in raw_text or "doc" in raw_text:
        learning_style = "Reading Documentation"
    elif "project" in raw_text or "hands-on" in raw_text or "code" in raw_text:
        learning_style = "Hands-on Projects"

    # Known skills extraction
    existing_skills: List[SkillProficiency] = []
    if "html" in raw_text:
        existing_skills.append(SkillProficiency(skill_name="HTML5 & CSS3 Responsive Design", category="Frontend", level="Beginner", score=40))
    if "sql" in raw_text:
        existing_skills.append(SkillProficiency(skill_name="SQL & Relational Databases", category="Databases", level="Intermediate", score=65))
    if "java" in raw_text and ("know basic java" in raw_text or "java basic" in raw_text):
        existing_skills.append(SkillProficiency(skill_name="Java Basics & OOP", category="Languages", level="Beginner", score=45))
    if "python" in raw_text:
        existing_skills.append(SkillProficiency(skill_name="Python Programming", category="Languages", level="Intermediate", score=60))
    if "git" in raw_text:
        existing_skills.append(SkillProficiency(skill_name="Git & Version Control", category="DevOps", level="Intermediate", score=60))

    # If OpenAI API Key is present, try standard LLM structured extraction
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            prompt_str = f"""
Extract structured learner profile JSON from this input:
"{goal_input.raw_prompt}"

Schema format:
{{
  "target_role": "Java Backend Developer | AI & Data Science Engineer | Full-Stack Web Developer",
  "experience_level": "Beginner | Intermediate | Advanced",
  "timeline_months": integer,
  "hours_per_week": float,
  "learning_style": "Hands-on Projects | Video Tutorials | Interactive Coding",
  "known_skills": [
     {{"skill_name": "string", "category": "string", "level": "Beginner/Intermediate/Advanced", "score": integer_0_to_100}}
  ]
}}
            """
            response = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": prompt_str}],
                response_format={"type": "json_object"}
            )
            parsed = json.loads(response.choices[0].message.content)
            if "target_role" in parsed and parsed["target_role"] in TARGET_ROLES_DATABASE:
                target_role = parsed["target_role"]
            if "experience_level" in parsed:
                experience_level = parsed["experience_level"]
            if "known_skills" in parsed and isinstance(parsed["known_skills"], list):
                llm_skills = []
                for s in parsed["known_skills"]:
                    llm_skills.append(SkillProficiency(
                        skill_name=s.get("skill_name", "General"),
                        category=s.get("category", "Core"),
                        level=s.get("level", "Beginner"),
                        score=s.get("score", 40)
                    ))
                if llm_skills:
                    existing_skills = llm_skills
        except Exception as e:
            print(f"OpenAI extraction fallback to rule-engine due to: {e}")

    return {
        "target_role": target_role,
        "experience_level": experience_level,
        "timeline_months": goal_input.timeline_months or 6,
        "hours_per_week": (goal_input.hours_per_day or 2.0) * 7,
        "learning_style": learning_style,
        "existing_skills": existing_skills
    }
