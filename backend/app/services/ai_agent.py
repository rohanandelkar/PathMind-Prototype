import json
from typing import Dict, Any, List, Optional
from app.models.schemas import AssistantRequest, AssistantResponse, LearnerProfile, PersonalizedRoadmap
from app.core.config import settings

def answer_learning_query(
    request: AssistantRequest,
    profile: Optional[LearnerProfile] = None,
    roadmap: Optional[PersonalizedRoadmap] = None
) -> AssistantResponse:
    """
    Context-aware AI mentor assistant that answers user questions regarding their roadmap,
    prerequisites, career path rationale, and study strategies.
    Uses OpenAI GPT if configured, or a rich deterministic reasoning engine with predefined Q&A.
    """
    user_msg = request.message.lower().strip()
    target_role = profile.target_role if profile else "Java Backend Developer"
    progress = roadmap.overall_progress if roadmap else 35.0
    
    # ── 1. Try OpenAI if API Key present ──────────────────────────────────────
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            context_str = f"Target Role: {target_role}. Learner Level: {profile.experience_level if profile else 'Beginner'}."
            if roadmap:
                context_str += f" Current Roadmap Progress: {roadmap.overall_progress}%. Total Phases: {roadmap.total_phases}."

            system_prompt = f"""
You are an expert AI Personal Learning Mentor for PathMind (HCLTech Technology Challenge).
Answer the user's question contextually, concisely, and encouragingly.
Provide transparent explanations, study advice, project suggestions, or prerequisite justifications based on their profile.
Context: {context_str}
            """
            
            messages = [{"role": "system", "content": system_prompt}]
            for msg in request.history[-4:]:
                messages.append({"role": "user" if msg.sender == "user" else "assistant", "content": msg.content})
            messages.append({"role": "user", "content": request.message})

            response = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=messages,
                temperature=0.7
            )
            reply = response.choices[0].message.content
            return AssistantResponse(
                reply=reply,
                suggested_actions=["View Roadmap", "Take Quick Quiz", "Explore Projects"],
                explanation="Generated using real-time OpenAI GPT AI reasoning over your personalized learner graph."
            )
        except Exception as e:
            print(f"AI mentor fallback to predefined rule-engine due to OpenAI error: {e}")

    # ── 2. Rich Predefined Reasoning Engine (Rule-Engine) ─────────────────────
    
    # 1. Help with my current roadmap ("What should I learn next in my current roadmap?")
    if "learn next" in user_msg or ("roadmap" in user_msg and any(w in user_msg for w in ["what", "next", "help"])):
        in_progress_skill = "Core Fundamentals"
        if roadmap and roadmap.roadmap_items:
            for item in roadmap.roadmap_items:
                if item.status == "In-Progress":
                    in_progress_skill = item.skill_name
                    break
        reply = f"In your **{target_role}** (Progress: **{progress}%**), your primary focus is **{in_progress_skill}**. Master this module first, then proceed to the next phase on your interactive roadmap."
        explanation = "Extracted next active recommended phase from personalized roadmap graph."
        actions = ["View Roadmap", "Start Quiz"]

    # 2. Help with assessments ("Help me prepare for my upcoming quiz or assessment.")
    elif "prepare" in user_msg or "upcoming" in user_msg or ("assessment" in user_msg and "help" in user_msg):
        reply = f"To prepare for your upcoming **{target_role}** assessment, go to the **Interactive Skill Assessments** tab. Select your active topic, choose your difficulty level, set a timer, and click **Create Assessment**. You need >= 70% to pass and update your skill gap score!"
        explanation = "Assessment preparation overview & quiz creation guidance."
        actions = ["Create Assessment", "View Skill Gaps"]

    # 3. Explain a topic ("Explain a topic from my roadmap that I'm struggling with.")
    elif "explain" in user_msg or "struggling" in user_msg:
        in_progress_skill = "Core Architecture"
        if roadmap and roadmap.roadmap_items:
            for item in roadmap.roadmap_items:
                if item.status == "In-Progress":
                    in_progress_skill = item.skill_name
                    break
        reply = f"For **{target_role}**, a key topic in your active phase (**{in_progress_skill}**) involves mastering foundational design patterns, standard data structures, and production error handling. Break down code into small functions and practice building micro-projects!"
        explanation = "Concept breakdown & study strategy for active learning phase."
        actions = ["View Learning Resources", "Ask Follow-up"]

    # 4. Find my skill gaps ("What are my current skill gaps and how can I improve them?")
    elif "skill gap" in user_msg or "improve" in user_msg or "gaps" in user_msg:
        gap_names = []
        if profile and profile.skill_gaps:
            gap_names = [g.skill_name for g in profile.skill_gaps if g.status != "Proficient"][:3]
        if not gap_names:
            gap_names = ["Core Language Syntax", "Database Design", "API Architecture"]
        gaps_str = ", ".join([f"**{g}**" for g in gap_names])
        reply = f"Your highest priority skill gaps for **{target_role}** are: {gaps_str}. You can close these gaps by completing the corresponding roadmap modules and passing targeted AI skill assessments."
        explanation = "Extracted high priority skill gaps from learner profile database."
        actions = ["View Priority Gaps", "Take Assessment"]

    # Greetings & Introductions
    elif any(w in user_msg for w in ["hi", "hello", "hey", "who are you", "what can you do"]):
        reply = f"Hello! I am your AI Personal Learning Mentor for **{target_role}**. I track your prerequisite graph, active progress ({progress}%), and skill gaps. You can ask me about study strategies, project ideas, prerequisite reasons, or how to fast-track your roadmap!"
        explanation = "Greetings & AI Mentor capabilities overview."
        actions = ["View Roadmap", "Take Quiz", "Ask Question"]

    # Prerequisite & Learning Order
    elif any(k in user_msg for k in ["why", "order", "prerequisite", "before"]) and any(l in user_msg for l in ["java", "spring", "python", "sql", "html"]):
        reply = "Core language fundamentals (like Java OOP, Data Structures, or SQL) are critical prerequisites before jumping into framework abstractions (like Spring Boot or Microservices). Learning Java interfaces, generics, and annotations first prevents confusion when configuring dependency injection and REST APIs."
        explanation = "Prerequisite dependency analysis: Frameworks build directly on language OOP principles."
        actions = ["View Active Phase", "Check Prerequisites"]

    # Skipping & Fast-Tracking
    elif any(k in user_msg for k in ["skip", "already know", "fast track", "bypass"]):
        reply = "Yes! You can skip any module by clicking **'Already Know This'** on any roadmap node or providing feedback. Our DAG prerequisite engine will automatically re-evaluate your skill profile, unlock downstream dependent modules, and update your completion progress."
        explanation = "Dynamic DAG prerequisite solver capability."
        actions = ["Go to Roadmap", "Submit Skill Feedback"]

    # Project Recommendations
    elif any(k in user_msg for k in ["project", "build", "portfolio", "resume"]):
        reply = f"For your current phase in target role **{target_role}**, I recommend building a **Student & Course REST API** with Spring Boot, PostgreSQL, and Swagger documentation. This demonstrates hands-on CRUD operations, database ORM mapping, and API design for your portfolio."
        explanation = "Portfolio project recommendation tailored to active learning phase."
        actions = ["View Project Details", "Check Roadmap"]

    # Time Management & Busy Schedule
    elif any(k in user_msg for k in ["time", "busy", "schedule", "30 mins", "few hours", "minutes"]):
        reply = "If you are short on time today (e.g. 15-30 minutes), focus on completing the **Interactive Skill Quiz** for your active phase. This maintains your active learning streak and validates core concepts without needing a long coding setup."
        explanation = "Micro-learning strategy to maintain streak and retention."
        actions = ["Take 15-min Quiz", "View Schedule"]

    # Assessment & Quiz Queries
    elif any(k in user_msg for k in ["quiz", "test", "assessment", "score", "pass", "fail"]):
        reply = "Assessments test your conceptual mastery (>75% pass mark). If you pass, the system automatically unlocks the next phase! If you fail, the adaptive engine injects revision materials into your roadmap so you can review before retrying."
        explanation = "Assessment & adaptive path branch logic."
        actions = ["Take Quiz", "View Quiz Results"]

    # Platform & How PathMind Works
    elif any(k in user_msg for k in ["pathmind", "how it works", "hcltech", "platform", "system"]):
        reply = "PathMind is an AI-Powered Personalized Learning Path Recommender. It converts your career goal into a Directed Acyclic Graph (DAG) of skill prerequisites, calculates your skill gaps, and dynamically adapts your roadmap based on quiz performance and feedback."
        explanation = "System architecture & feature overview."
        actions = ["Explore Roadmap", "Update Goals"]

    # General Fallback
    else:
        reply = f"As your AI mentor for **{target_role}**, I am tracking your goal closely! Your current roadmap progress is **{progress}%**. Focus on your active recommended phase to stay on track for your target timeline."
        explanation = "General contextual mentor response."
        actions = ["View My Roadmap", "Take Assessment Quiz"]

    return AssistantResponse(
        reply=reply,
        suggested_actions=actions,
        explanation=explanation
    )

