import os
import uuid
import json
from datetime import datetime
from typing import List, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.user import User
from app.models.domain import GeneratedAssessmentDB, AssessmentResultDB, RoadmapDB
from app.services.seed_data import TARGET_ROLES_DATABASE

TOPICS_BY_PATH = {
    "C": [
        "C Fundamentals & Syntax",
        "Control Flow & Decision Making",
        "C Functions & Modular Programming",
        "Arrays & String Manipulation",
        "Pointers & Memory Architecture",
        "Structures & Unions",
        "Dynamic Memory Management (malloc/free)",
        "File Handling & I/O Streams",
        "Data Structures in C (Linked Lists, Trees)",
        "C Systems Programming Projects"
    ],
    "CPP": [
        "C++ Fundamentals & Types",
        "Object-Oriented Programming in C++",
        "Standard Template Library (STL) Containers & Iterators",
        "Advanced C++ (Templates, Smart Pointers, RAII)",
        "Data Structures & Algorithms (DSA) in C++",
        "Modern C++ Systems Projects"
    ],
    "FULL_STACK_JAVA": [
        "Programming Fundamentals",
        "Java Basics & OOP",
        "Java Collections & Exception Handling",
        "JDBC & ORM Hibernate",
        "Spring Boot & Dependency Injection",
        "RESTful API Architecture",
        "Security & JWT Authentication",
        "Spring Microservices & Cloud"
    ],
    "FULL_STACK_PYTHON": [
        "Python Programming Fundamentals",
        "Python Object-Oriented Programming (OOP)",
        "HTML5 & CSS3 Responsive Layouts",
        "JavaScript ES6+ & Asynchronous Logic",
        "React & Next.js Web Framework",
        "FastAPI Async Web Services",
        "PostgreSQL & Database Relational Architecture",
        "SQLAlchemy ORM & Alembic Migrations",
        "JWT Authentication & Security",
        "Pytest Automated Testing Strategy",
        "Docker Containerization & Deployment"
    ]
}

def get_topics_for_path(learning_path: str) -> List[str]:
    path_key = learning_path or "FULL_STACK_JAVA"
    return TOPICS_BY_PATH.get(path_key, TOPICS_BY_PATH["FULL_STACK_JAVA"])

def generate_ai_assessment(
    db: Session,
    user: User,
    topic: str,
    difficulty: str,
    num_questions: int,
    time_limit_minutes: int
) -> GeneratedAssessmentDB:
    path_key = user.selected_learning_path or "FULL_STACK_JAVA"
    
    # Generate Questions & Hidden Answer Keys
    public_questions, hidden_answers = _build_questions_with_ai_or_fallback(
        topic=topic,
        difficulty=difficulty,
        num_questions=num_questions,
        learning_path=path_key
    )
    
    assessment_id = f"assess_{uuid.uuid4().hex[:12]}"
    
    db_assessment = GeneratedAssessmentDB(
        id=assessment_id,
        user_id=str(user.id),
        learning_path=path_key,
        topic=topic,
        difficulty=difficulty,
        num_questions=len(public_questions),
        time_limit_minutes=time_limit_minutes,
        questions_json=json.dumps(public_questions),
        correct_answers_json=json.dumps(hidden_answers),
        created_at=datetime.utcnow()
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

def _build_questions_with_ai_or_fallback(
    topic: str,
    difficulty: str,
    num_questions: int,
    learning_path: str
) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    # Try calling OpenAI/Gemini if API key present
    if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "your_openai_api_key_here":
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            prompt = f"""Generate exactly {num_questions} multiple-choice questions for an assessment on topic '{topic}' in target track '{learning_path}'.
Difficulty Level: {difficulty}.
Return ONLY a valid JSON array of objects with schema:
[
  {{
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_option_index": 0,
    "explanation": "Short clear explanation of why this option is correct."
  }}
]
"""
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert technical interviewer and educator. Respond strictly in JSON format."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            raw_json = response.choices[0].message.content.strip()
            if raw_json.startswith("```json"):
                raw_json = raw_json[7:]
            if raw_json.endswith("```"):
                raw_json = raw_json[:-3]
            parsed = json.loads(raw_json)
            if isinstance(parsed, list) and len(parsed) >= 1:
                public_q = []
                hidden_a = {}
                for idx, q_obj in enumerate(parsed[:num_questions]):
                    q_id = f"q_{idx + 1}"
                    public_q.append({
                        "id": q_id,
                        "question": q_obj["question"],
                        "options": q_obj["options"]
                    })
                    hidden_a[q_id] = {
                        "correct_option_index": int(q_obj.get("correct_option_index", 0)),
                        "explanation": q_obj.get("explanation", "Correct answer based on technical principles.")
                    }
                return public_q, hidden_a
        except Exception as e:
            print(f"[ASSESSMENT AI FALLBACK] AI generation fallback due to: {e}")

    # High quality fallback rule engine for C, C++, Java, and Python topics
    return _generate_rule_based_questions(topic, difficulty, num_questions, learning_path)

def _generate_rule_based_questions(
    topic: str,
    difficulty: str,
    num_questions: int,
    learning_path: str
) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    public_q = []
    hidden_a = {}
    
    # Generic templates tailored to selected topic & difficulty
    for idx in range(1, num_questions + 1):
        q_id = f"q_{idx}"
        if "Pointer" in topic or "Memory" in topic or learning_path == "C":
            if idx % 3 == 1:
                q_text = f"[{difficulty}] In {topic}, what does dereferencing a pointer using '*ptr' perform?"
                opts = ["Returns the memory address itself", "Accesses the value stored at that memory location", "Deallocates memory dynamically", "Converts pointer to integer"]
                correct = 1
                exp = "Dereferencing '*ptr' accesses the actual value stored at the memory location pointed to by 'ptr'."
            elif idx % 3 == 2:
                q_text = f"[{difficulty}] Which standard library function in C allocates dynamic memory without initializing it to zero?"
                opts = ["calloc()", "malloc()", "realloc()", "free()"]
                correct = 1
                exp = "'malloc()' allocates requested bytes of uninitialized memory, whereas 'calloc()' clears memory to zero."
            else:
                q_text = f"[{difficulty}] What happens when trying to access memory after calling free(ptr) in C?"
                opts = ["Returns 0 cleanly", "Undefined behavior (Dangling pointer access)", "Triggers automatic garbage collection", "Reallocates the memory"]
                correct = 1
                exp = "Accessing freed memory results in undefined behavior due to dangling pointer dereference."
        elif "C++" in topic or "STL" in topic or learning_path == "CPP":
            if idx % 3 == 1:
                q_text = f"[{difficulty}] In C++ STL, which container provides O(1) average time complexity for key lookups?"
                opts = ["std::vector", "std::list", "std::unordered_map", "std::set"]
                correct = 2
                exp = "'std::unordered_map' uses hash tables providing O(1) average complexity for key lookups."
            elif idx % 3 == 2:
                q_text = f"[{difficulty}] What is RAII (Resource Acquisition Is Initialization) in C++?"
                opts = ["A compiler optimization for loops", "Managing resource lifetime via constructor and destructor bindings", "A design pattern replacing pointers", "An exception handling operator"]
                correct = 1
                exp = "RAII ensures resources (memory, file handles, locks) are automatically released in destructors when leaving scope."
            else:
                q_text = f"[{difficulty}] Which smart pointer in C++ guarantees exclusive single ownership of a resource?"
                opts = ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr"]
                correct = 2
                exp = "'std::unique_ptr' enforces exclusive ownership and cannot be copied, only moved."
        elif "Python" in topic or "FastAPI" in topic or learning_path == "FULL_STACK_PYTHON":
            if idx % 3 == 1:
                q_text = f"[{difficulty}] In {topic}, how does Python handle memory management for unused objects?"
                opts = ["Manual free() calls", "Reference counting combined with a generational Garbage Collector", "Stack allocation only", "Compiled static destructor calls"]
                correct = 1
                exp = "Python uses reference counting as primary memory manager and a generational GC for cyclic references."
            elif idx % 3 == 2:
                q_text = f"[{difficulty}] In FastAPI, which library provides automatic request data validation and schema serialization?"
                opts = ["Flask", "Django ORM", "Pydantic", "SQLAlchemy"]
                correct = 2
                exp = "FastAPI uses Pydantic for data parsing, type validation, and JSON schema generation."
            else:
                q_text = f"[{difficulty}] In Python, what is the key difference between list and tuple data types?"
                opts = ["Tuples are mutable; lists are immutable", "Lists are mutable; tuples are immutable", "Tuples cannot store strings", "Lists cannot be nested"]
                correct = 1
                exp = "Lists are mutable (modifiable in-place), whereas tuples are immutable once created."
        else: # Java / Default
            if idx % 3 == 1:
                q_text = f"[{difficulty}] In {topic}, which OOP principle hides implementation details and exposes public interfaces?"
                opts = ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"]
                correct = 1
                exp = "Encapsulation restricts direct field access and exposes getter/setter methods to protect object state."
            elif idx % 3 == 2:
                q_text = f"[{difficulty}] In Spring Boot, which annotation registers a class as a managed Singleton bean in the IoC Container?"
                opts = ["@Entity", "@Component", "@Transient", "@EventListener"]
                correct = 1
                exp = "'@Component' (or @Service/@Repository) registers a class as a Spring-managed bean in the ApplicationContext."
            else:
                q_text = f"[{difficulty}] Which collection interface in Java does NOT allow duplicate elements?"
                opts = ["java.util.List", "java.util.Set", "java.util.ArrayList", "java.util.Vector"]
                correct = 1
                exp = "'java.util.Set' interfaces (like HashSet/TreeSet) guarantee element uniqueness."

        public_q.append({
            "id": q_id,
            "question": q_text,
            "options": opts
        })
        hidden_a[q_id] = {
            "correct_option_index": correct,
            "explanation": exp
        }

    return public_q, hidden_a

def evaluate_and_save_submission(
    db: Session,
    user: User,
    assessment_id: str,
    user_answers: Dict[str, int],
    time_taken_seconds: float
) -> Dict[str, Any]:
    assessment = db.query(GeneratedAssessmentDB).filter(
        GeneratedAssessmentDB.id == assessment_id
    ).first()
    
    if not assessment:
        raise ValueError(f"Assessment '{assessment_id}' not found.")

    questions = json.loads(assessment.questions_json)
    hidden_answers = json.loads(assessment.correct_answers_json)
    
    total_questions = len(questions)
    correct_count = 0
    detailed_results = []
    
    for q in questions:
        q_id = q["id"]
        user_choice = user_answers.get(q_id)
        ans_info = hidden_answers.get(q_id, {"correct_option_index": 0, "explanation": "No explanation available."})
        correct_choice = ans_info["correct_option_index"]
        
        is_correct = (user_choice == correct_choice)
        if is_correct:
            correct_count += 1
            
        detailed_results.append({
            "question_id": q_id,
            "question": q["question"],
            "options": q["options"],
            "user_selected_index": user_choice,
            "correct_option_index": correct_choice,
            "is_correct": is_correct,
            "explanation": ans_info["explanation"]
        })
        
    score_percentage = round((correct_count / total_questions) * 100.0, 1) if total_questions > 0 else 0.0
    passed = score_percentage >= 70.0
    
    adaptation = f"Scored {score_percentage}%. "
    if passed:
        adaptation += f"Proficiency verified in '{assessment.topic}'. Roadmap skill gap updated."
    else:
        adaptation += f"Recommend reviewing '{assessment.topic}' before retaking."
        
    result_db = AssessmentResultDB(
        id=str(uuid.uuid4()),
        assessment_id=assessment_id,
        user_id=str(user.id),
        learning_path=assessment.learning_path,
        topic=assessment.topic,
        difficulty=assessment.difficulty,
        skill_name=assessment.topic,
        total_questions=total_questions,
        correct_count=correct_count,
        score_percentage=score_percentage,
        passed=passed,
        time_taken_seconds=round(time_taken_seconds, 1),
        user_answers_json=json.dumps(user_answers),
        detailed_results_json=json.dumps(detailed_results),
        adaptation_applied=adaptation,
        created_at=datetime.utcnow()
    )
    db.add(result_db)
    
    # Adaptive Roadmap Update: If user passed, mark matching skill gap as higher proficiency!
    _apply_roadmap_adaptation_if_passed(db, user, assessment.topic, score_percentage)
    
    db.commit()
    
    return {
        "assessment_id": assessment_id,
        "topic": assessment.topic,
        "difficulty": assessment.difficulty,
        "total_questions": total_questions,
        "correct_count": correct_count,
        "score_percentage": score_percentage,
        "passed": passed,
        "time_taken_seconds": round(time_taken_seconds, 1),
        "adaptation_applied": adaptation,
        "detailed_results": detailed_results
    }

def _apply_roadmap_adaptation_if_passed(db: Session, user: User, topic: str, score_percentage: float):
    user_id_str = str(user.id)
    roadmap = db.query(RoadmapDB).filter(RoadmapDB.user_id == user_id_str).first()
    if not roadmap:
        return
    try:
        items = json.loads(roadmap.roadmap_items_json)
        updated = False
        for item in items:
            if topic.lower() in item.get("skill_name", "").lower() or item.get("skill_name", "").lower() in topic.lower():
                if score_percentage >= 70.0:
                    item["status"] = "Completed"
                    updated = True
        if updated:
            completed = sum(1 for i in items if i.get("status") == "Completed")
            roadmap.overall_progress = round((completed / len(items)) * 100.0, 1)
            roadmap.roadmap_items_json = json.dumps(items)
            db.add(roadmap)
    except Exception as e:
        print(f"[ROADMAP ADAPTATION ERROR] {e}")
