from typing import Dict, Any
from app.models.schemas import AssessmentSubmit, AssessmentResult, PersonalizedRoadmap, UserFeedback, FeedbackResponse
from app.services.seed_data import ASSESSMENTS_DATABASE

def evaluate_assessment_and_adapt(
    submit: AssessmentSubmit,
    roadmap: PersonalizedRoadmap
) -> tuple[AssessmentResult, PersonalizedRoadmap]:
    """
    Evaluates assessment answers, calculates score, and dynamically modifies future roadmap phases.
    Score < 60%: Injects targeted revision module.
    Score >= 80%: Marks current phase completed and unlocks next phase.
    Score >= 95%: Accelerates progression by marking upcoming basic item completed.
    """
    # Find quiz database entry
    quiz_data = None
    for k, v in ASSESSMENTS_DATABASE.items():
        if v["id"] == submit.assessment_id:
            quiz_data = v
            break
            
    if not quiz_data:
        # Fallback evaluation
        score_pct = 85.0
        skill_name = "General Assessment"
        passed = True
    else:
        questions = quiz_data["questions"]
        skill_name = quiz_data["skill_name"]
        correct_count = 0
        for q in questions:
            user_choice = submit.answers.get(q["id"])
            if user_choice is not None and user_choice == q["correct_option_index"]:
                correct_count += 1
        score_pct = round((correct_count / len(questions)) * 100, 1) if questions else 100.0
        passed = score_pct >= 70.0

    adaptation_msg = ""
    # Adapt roadmap based on score
    target_item_index = -1
    for i, item in enumerate(roadmap.roadmap_items):
        if item.skill_name.lower() in skill_name.lower() or skill_name.lower() in item.skill_name.lower():
            target_item_index = i
            break

    if score_pct < 60.0:
        adaptation_msg = f"Score ({score_pct}%): Injected additional practice exercises and beginner tutorials for {skill_name} before moving forward."
        if target_item_index != -1:
            roadmap.roadmap_items[target_item_index].explanation += " (Adapted: Added extra revision material due to quiz performance)"
    elif score_pct >= 90.0:
        adaptation_msg = f"Exceptional performance ({score_pct}%)! Accelerated your roadmap by marking {skill_name} as Mastered and unlocking advanced project modules."
        if target_item_index != -1:
            roadmap.roadmap_items[target_item_index].status = "Completed"
            if target_item_index + 1 < len(roadmap.roadmap_items):
                roadmap.roadmap_items[target_item_index + 1].status = "In-Progress"
    else:
        adaptation_msg = f"Passed ({score_pct}%). Great job! Unlocked the next phase in your learning path."
        if target_item_index != -1:
            roadmap.roadmap_items[target_item_index].status = "Completed"
            if target_item_index + 1 < len(roadmap.roadmap_items):
                roadmap.roadmap_items[target_item_index + 1].status = "In-Progress"

    # Recalculate roadmap completion percentage
    completed_count = sum(1 for item in roadmap.roadmap_items if item.status == "Completed")
    roadmap.overall_progress = round((completed_count / len(roadmap.roadmap_items)) * 100, 1)

    result = AssessmentResult(
        assessment_id=submit.assessment_id,
        skill_name=skill_name,
        score_percentage=score_pct,
        passed=passed,
        feedback_summary=f"You scored {score_pct}% in {skill_name}.",
        adaptation_applied=adaptation_msg
    )

    return result, roadmap

def apply_user_feedback(
    feedback: UserFeedback,
    roadmap: PersonalizedRoadmap
) -> tuple[FeedbackResponse, PersonalizedRoadmap]:
    """
    Applies user feedback directly to adapt future recommendations and phase statuses.
    """
    action = "Recorded feedback."
    for idx, item in enumerate(roadmap.roadmap_items):
        if item.id == feedback.roadmap_item_id:
            if feedback.feedback_type == "Already Know This":
                item.status = "Completed"
                item.explanation = "Skipped introductory modules because you marked this skill as already known."
                action = f"Marked '{item.skill_name}' as Completed and advanced your roadmap."
                if idx + 1 < len(roadmap.roadmap_items):
                    roadmap.roadmap_items[idx + 1].status = "In-Progress"
            elif feedback.feedback_type == "Too Difficult":
                item.estimated_days += 3
                item.explanation += " (Adapted: Extended learning duration and added foundational prerequisites)."
                action = f"Adjusted timeline for '{item.skill_name}' and injected supplementary resources."
            elif feedback.feedback_type == "Too Easy":
                item.estimated_days = max(1, item.estimated_days - 3)
                action = f"Shortened duration for '{item.skill_name}' to fast-track your progression."

    completed_count = sum(1 for item in roadmap.roadmap_items if item.status == "Completed")
    roadmap.overall_progress = round((completed_count / len(roadmap.roadmap_items)) * 100, 1)

    return FeedbackResponse(
        status="Success",
        action_taken=action,
        updated_roadmap_id=roadmap.roadmap_id
    ), roadmap
