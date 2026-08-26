# PathMind
> **AI-Powered Personalized Learning Path Recommender**

PathMind is an intelligent, AI-powered personalized learning platform that understands a learner's career goals, current experience level, learning path preference, assessment performance, and real-time study habits to build a structured, adaptive, and prerequisite-aware learning journey.

---

## 🏆 HCLTech Challenge

PathMind was specifically developed as a solution for the **HCLTech Challenge** focused on:

> **"AI-Powered Personalized Learning Path Recommender"**

### Challenge Objectives & PathMind Alignment

The objective of the challenge is to build an intelligent learning assistant that solves the core problems of traditional self-directed learning. PathMind directly fulfills each challenge requirement:

| Challenge Objective | How PathMind Solves It |
|---|---|
| **Understands Learner Goals & Interests** | Captures natural language goals, preferred modalities, target roles, and target timelines via AI prompt onboarding (`/onboarding`). |
| **Builds a Learner Profile** | Persists comprehensive learner profile parameters (`learner_profiles` table) in PostgreSQL including commitment hours, experience level, and learning style. |
| **Identifies Learning Requirements** | Maps out required core competencies and topological skill prerequisites before advanced subjects are introduced. |
| **Recommends Relevant Learning Resources** | Maps curated, topic-specific YouTube video tutorials and official documentation directly to each roadmap module. |
| **Generates Structured Learning Paths** | Builds prerequisite-aware multi-phase roadmaps complete with AI explanations across **C**, **C++**, **Full Stack Java**, and **Full Stack Python** tracks. |
| **Provides AI-Powered Learning Assistance** | Offers an interactive AI Learning Mentor (`/assistant`) to explain concepts, answer technical questions, and guide learners through roadmap phases. |
| **Uses Assessments & Progress to Personalize** | Generates dynamic MCQ skill quizzes (`/assessment`), evaluates answers, stores attempts in PostgreSQL, and adapts overall roadmap progress upon passing (score >= 70%). |
| **Continuous Goal Improvement** | Real-time active tracking calculates ⏱️ **Time Invested** and 🔥 **Active Streak** to keep learners accountable toward their long-term career goals. |

---

## 1. Project Overview

### What is PathMind?
PathMind is an end-to-end adaptive learning ecosystem designed to guide self-driven learners and tech professionals from foundational concepts to industry readiness. Instead of delivering unstructured links or linear playlists, PathMind dynamically creates ordered learning roadmaps, assesses skill levels using AI-generated quizzes, provides an AI Learning Mentor, and tracks active learning time in real-time.

### What Problem Does It Solve?
Self-learning in modern technology domains is notoriously overwhelming. Beginners and intermediate developers face several critical hurdles:
- **Information Overload**: Tens of thousands of courses, video tutorials, and articles are available, making it difficult to select high-quality materials.
- **Lack of Prerequisite Clarity**: Learners frequently jump into advanced frameworks (e.g., Spring Boot, React, FastAPI) before mastering essential prerequisites (e.g., Java OOP, ES6+ JS, Data Structures).
- **One-Size-Fits-All Curricula**: Static learning paths ignore a learner's existing skills, causing redundant study or insurmountable difficulty spikes.
- **No Guidance or Accountability**: Without an interactive mentor or automated time tracking, self-directed learners lose momentum.

### How PathMind Personalizes the Experience
PathMind replaces static video playlists with an adaptive personal learning engine:
1. **Dynamic Path Selection**: Tailored learning paths for **C**, **C++**, **Full Stack Java**, and **Full Stack Python**.
2. **Prerequisite-Aware Roadmaps**: Topological phase progression ensuring prerequisite skills are unlocked systematically.
3. **Curated Resources**: High-quality YouTube video tutorials and official documentation linked directly to each specific roadmap topic.
4. **AI-Powered Skill Assessments**: Custom quiz generation with configurable topics, difficulties, question counts, and time limits, stored permanently in PostgreSQL.
5. **Real-Time Active Study Analytics**: Server-timestamped active session tracking that automatically pauses when tabs hide or go idle.

---

## 2. Problem Statement

Modern technical education suffers from fundamental inefficiencies:
- **Resource Fragmentation**: High-quality tutorials are scattered across YouTube, official documentation sites, and tech blogs.
- **Unclear Learning Sequences**: Learners struggle to determine what to study first, resulting in gaps in foundational knowledge.
- **Heterogeneous Learner Backgrounds**: A computer science graduate and a career switcher require fundamentally different starting points and pacing.
- **Lack of Automated Diagnostics**: Traditional platforms cannot evaluate dynamic skill mastery or adapt future roadmap progression based on assessment performance.
- **Continuous Guidance Deficit**: Learners need an accessible, context-aware AI mentor to answer questions and clarify difficult concepts.

---

## 3. Our Solution

PathMind provides a unified, intelligent learning path recommendation system backed by FastAPI, Next.js, and PostgreSQL.

```mermaid
flowchart TD
    A[User Goal / Prompt Input] --> B[Learner Profile Generation]
    B --> C[Learning Path Selection: C / C++ / Java / Python]
    C --> D[Prerequisite-Aware Personalized Roadmap]
    D --> E[Topic-Specific Resources: YouTube & Docs]
    D --> F[AI Learning Mentor]
    D --> G[AI Skill Assessments & Quizzes]
    G --> H[PostgreSQL Assessment History & Evaluation]
    H --> I[Roadmap Adaptation & Progress Tracking]
    I --> J[Personalized Real-Time Learning Experience]
```

---

## 4. Key Features

- 🔐 **Secure JWT Authentication**: Sign up and log in using HttpOnly cookies with bcrypt password hashing.
- 🎯 **Target Track Selection**: Specialized learning tracks for **C Programming**, **C++**, **Full Stack Java**, and **Full Stack Python**.
- 🧭 **Phase-Based Roadmaps**: Sequential learning phases complete with descriptions, prerequisites, estimated duration, and human-readable AI explanations.
- 📚 **Topic-Specific Learning Resources**: Direct links to top-tier YouTube video tutorials and official documentation mapped to each skill topic.
- 🤖 **AI Learning Mentor**: Interactive chatbot interface for immediate guidance, topic explanations, and roadmap advice.
- ⚡ **Custom AI Assessment Engine**: On-demand multiple-choice quiz generator with configurable topics, difficulty levels (Easy, Medium, Hard), question counts, and time limits.
- 📊 **PostgreSQL Assessment History**: Detailed evaluation of completed quizzes, displaying total score, percentage, points earned, detailed question-by-question breakdown, and retake capabilities.
- ⏱️ **Real-Time Active Session Tracking**: Server-timestamped session tracking that updates time invested live on the dashboard, automatically pausing when the browser tab is hidden or idle for 5+ minutes.
- 🔥 **Timezone-Aware Active Streak**: Consecutive active learning calendar day calculation persisted in PostgreSQL.
- 🎨 **Adaptive Premium Theme**: Dynamic dark/light mode UI crafted with Tailwind CSS and responsive design components.

---

## 5. Complete User Journey

1. **User Access**: User visits PathMind and accesses the authentication portal (`/login` or `/signup`).
2. **JWT Authentication**: User registers or logs in; an HttpOnly `access_token` JWT cookie is established.
3. **Learning Path Selection**: User chooses a target track (`C`, `C++`, `Full Stack Java`, or `Full Stack Python`) on `/learning-path-selection`.
4. **AI Goal Customization**: User optionally specifies learning parameters (weekly hours, experience level, target timeline) via `/onboarding`.
5. **Personalized Roadmap Generation**: PathMind generates a multi-phase, prerequisite-ordered learning path accessible on `/roadmap`.
6. **Resource Study**: Learner studies topic-specific YouTube tutorials and official documentation linked to active roadmap modules.
7. **AI Mentor Interaction**: Learner uses `/assistant` to ask technical questions or seek career guidance.
8. **Custom Assessment Creation**: Learner navigates to `/assessment`, configures topic, difficulty, and question parameters, and launches a live quiz.
9. **Instant Evaluation**: PathMind evaluates answers against key solutions, persists results to PostgreSQL (`assessment_results`), and updates roadmap progress.
10. **Dashboard Real-Time Tracking**: Learner views `/dashboard` to monitor 🔥 **Active Streak**, live ⏱️ **Time Invested**, milestone breakdown, and recent **Assessment Activity**.
11. **Session Persistence**: When closing or switching tabs, active study time pauses and resumes seamlessly upon return.

---

## 6. System Architecture

```mermaid
graph TD
    Client[Web Browser / Client] -->|HTTPS / REST API| NextJS[Next.js 14 Frontend - App Router]
    NextJS -->|JWT Cookie / JSON| FastAPI[FastAPI Backend Server]
    
    subgraph FastAPI Backend
        AuthMod[Auth & JWT Module]
        UserMod[User & Profile Management]
        RoadmapMod[Roadmap & Path Engine]
        ResourceMod[Resource Resolver]
        AssessMod[Assessment & Evaluation Engine]
        MentorMod[AI Mentor Assistant]
        SessionMod[Real-time Learning Session Tracker]
    end

    FastAPI --> AuthMod
    FastAPI --> UserMod
    FastAPI --> RoadmapMod
    FastAPI --> ResourceMod
    FastAPI --> AssessMod
    FastAPI --> MentorMod
    FastAPI --> SessionMod

    SessionMod -->|Persist Sessions & Duration| Postgres[(PostgreSQL Database)]
    AssessMod -->|Save Results & Attempts| Postgres
    UserMod -->|User & Profile Records| Postgres
    RoadmapMod -->|Roadmap State| Postgres

    AssessMod -->|AI Question Generation| AIAPI[OpenAI / Gemini API / Rule Engine]
    MentorMod -->|AI Chat Responses| AIAPI
```

### Component Explanations
- **Next.js 14 Frontend**: Built with React 18 and Tailwind CSS, managing application routing, real-time UI state, and user activity detection.
- **FastAPI Backend**: Asynchronous Python web server providing REST endpoints for authentication, profile generation, roadmap adaptation, assessment evaluation, and session tracking.
- **PostgreSQL Database**: Relational database storing user credentials, profiles, roadmaps, assessment attempts, detailed evaluation breakdowns, and learning sessions.
- **AI & Rule Engine**: Generates multiple-choice quiz questions, formats explanations, and powers the interactive AI mentor.

---

## 7. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 14 (App Router) | Client-side rendering, routing, and UI layout |
| **Frontend Language** | TypeScript | Type-safe React components and API integration |
| **Styling & UI** | Tailwind CSS & Lucide Icons | Responsive modern styling and UI icons |
| **State & Context** | React Context (`Auth`, `Theme`, `ActivityTracker`) | Session, theme, and real-time timer state management |
| **Backend Framework** | FastAPI (Python 3.11) | High-performance asynchronous REST API server |
| **Database** | PostgreSQL | Persistent relational data storage |
| **Database ORM** | SQLAlchemy v2 | Python ORM mapping database models to SQL tables |
| **Security & Auth** | PyJWT / Passlib (bcrypt) | Secure password hashing and HttpOnly JWT cookie auth |
| **AI Integration** | OpenAI GPT API / Rule Engine Fallback | AI question generation and mentor assistant responses |
| **Containerization** | Docker & Docker Compose | Container orchestration for application services |

---

## 8. AI Architecture

PathMind utilizes an AI pipeline supported by high-quality rule-engine fallbacks to ensure zero-downtime reliability.

```mermaid
flowchart LR
    A[User Input / Prompt] --> B[Learner Context & Selected Track]
    B --> C[AI Prompt Construction]
    C --> D{AI Service / Fallback Engine}
    D -->|OpenAI / Gemini API| E[Structured JSON Generation]
    D -->|Rule-Engine Engine| E
    E --> F[Assessment Quiz / Mentor Response]
    F --> G[Evaluation & PostgreSQL Storage]
    G --> H[Roadmap Progress Adaptation]
```

### Implementation Details
- **Assessment Generation**: When an assessment is requested, the system constructs a prompt specifying topic, difficulty, and question count. The response is parsed into structured JSON questions and answer keys. If external AI services are unreachable, the system seamlessly uses a built-in domain rule engine.
- **AI Mentor**: Receives conversation history and user learning context to deliver tailored, educational responses.

---

## 9. Personalization Engine

PathMind tailors every aspect of the learning experience using:
- **Target Role & Learning Path**: Tailors roadmap phases, topics, and resources to the selected track (`C`, `C++`, `Full Stack Java`, or `Full Stack Python`).
- **Target Timeline & Commitment**: Adapts phase durations based on user-configured weekly hours and target months.
- **Assessment Performance**: Scoring >= 70% automatically marks related roadmap items as completed and recalculates overall roadmap completion.
- **Real-time Session Activity**: Persists active learning sessions to track study frequency and active streaks accurately.

---

## 10. Learning Roadmaps

PathMind provides specialized roadmaps across four main technology tracks:

### C Programming Track
1. **C Fundamentals & Syntax**: Data types, variables, operators, and basic I/O.
2. **Control Flow & Decision Making**: Conditionals, loops, and switch statements.
3. **C Functions & Modular Programming**: Function definitions, scope, pass-by-value vs reference.
4. **Arrays & String Manipulation**: One-dimensional/multi-dimensional arrays and string functions.
5. **Pointers & Memory Architecture**: Pointer arithmetic, memory addresses, and dereferencing.
6. **Structures & Unions**: Custom data types and memory alignment.
7. **Dynamic Memory Management**: `malloc()`, `calloc()`, `realloc()`, and `free()`.
8. **File Handling & I/O Streams**: Reading/writing files and stream buffers.
9. **Data Structures in C**: Linked lists, stacks, queues, and binary trees.
10. **C Systems Projects**: Low-level systems programming projects.

### C++ Track
1. **C++ Fundamentals & Types**: Modern C++ syntax, namespaces, and standard I/O.
2. **Object-Oriented Programming**: Classes, inheritance, polymorphism, encapsulation, and abstraction.
3. **Standard Template Library (STL)**: Vectors, maps, sets, iterators, and algorithms.
4. **Advanced C++**: Templates, RAII, smart pointers (`std::unique_ptr`, `std::shared_ptr`), and move semantics.
5. **Data Structures & Algorithms in C++**: Algorithm complexity, sorting, searching, and graph algorithms.
6. **Modern C++ Systems Projects**: Building real-world C++ applications.

### Full Stack Java Track
1. **Programming Fundamentals**: Logic building, variables, and control structures.
2. **Java Basics & OOP**: Classes, objects, inheritance, interfaces, and polymorphism.
3. **Java Collections & Exception Handling**: `List`, `Set`, `Map`, and try-catch architecture.
4. **JDBC & ORM Hibernate**: Database connectivity, relational mapping, and queries.
5. **Spring Boot & Dependency Injection**: IoC container, `@Component`, `@Service`, `@Autowired`.
6. **RESTful API Architecture**: Building REST controllers, request mapping, and JSON responses.
7. **Security & JWT Authentication**: Spring Security, filters, and JWT validation.
8. **Spring Microservices & Cloud**: Service discovery, API gateways, and microservice architecture.

### Full Stack Python Track
1. **Python Programming Fundamentals**: Syntax, data structures, functions, and modules.
2. **Python OOP**: Classes, inheritance, magic methods, and encapsulation.
3. **HTML5 & CSS3 Responsive Layouts**: Semantic HTML, Flexbox, and CSS Grid.
4. **JavaScript ES6+ & Asynchronous Logic**: Promises, async/await, DOM manipulation.
5. **React & Next.js Web Framework**: Component state, props, hooks, and App Router.
6. **FastAPI Async Web Services**: Path parameters, Pydantic schemas, dependency injection.
7. **PostgreSQL & Database Relational Architecture**: Tables, foreign keys, and indexes.
8. **SQLAlchemy ORM & Alembic Migrations**: Model mapping and database schema migrations.
9. **JWT Authentication & Security**: Password hashing with bcrypt, JWT token verification.
10. **Pytest Automated Testing Strategy**: Unit tests, fixtures, and API testing.
11. **Docker Containerization & Deployment**: Dockerfiles, multi-stage builds, and Docker Compose.

---

## 11. Resource System

PathMind maps curated learning resources directly to each roadmap topic:
- **YouTube Tutorials**: Links to video guides for visual learners.
- **Official Documentation**: Links to authoritative documentation (e.g., Python Docs, Spring Docs, cppreference, MDN Web Docs) for in-depth study.

Each resource is strictly bound to its corresponding skill topic, preventing unrelated materials from appearing on learning modules.

---

## 12. AI Assessment System

PathMind includes an evaluation engine allowing learners to test their knowledge at any point.

```mermaid
flowchart TD
    A[Topic Selection] --> B[Difficulty Selection: Easy / Medium / Hard]
    B --> C[Question Count & Time Limit Config]
    C --> D[AI Quiz Generation]
    D --> E[Interactive MCQ Quiz Runner]
    E --> F[Answer Submission & Server Evaluation]
    F --> G[Score & Detailed Breakdown Calculation]
    G --> H[PostgreSQL Storage: assessment_results]
    H --> I[Roadmap Auto-Adaptation]
```

### Features
- **Configurable Parameters**: Select specific topics, difficulty level, 1-20 questions, and 1-60 minute time limits.
- **MCQ Format**: Questions present multiple-choice options with deterministic seed shuffling.
- **Detailed Evaluation**: Shows correct answers, user choices, score percentage, points earned (out of 10), and detailed explanations for every question.
- **History & Retakes**: Every attempt is recorded in PostgreSQL and viewable in the **Assessment Activity** dashboard section or `/assessment` history tab.

---

## 13. AI Learning Mentor

Accessible via the `/assistant` tab, the AI Learning Mentor provides interactive support:
- **Topic Clarification**: Explains complex concepts with code examples.
- **Roadmap Guidance**: Advises on prerequisites and next learning steps.
- **Assessment Review**: Explains why specific assessment options are correct or incorrect.

---

## 14. Database Architecture

```mermaid
erDiagram
    USERS ||--o{ LEARNER_PROFILES : owns
    USERS ||--o{ PERSONALIZED_ROADMAPS : has
    USERS ||--o{ GENERATED_ASSESSMENTS : creates
    USERS ||--o{ ASSESSMENT_RESULTS : achieves
    USERS ||--o{ LEARNING_SESSIONS : records
    USERS ||--o{ USER_FEEDBACKS : submits

    USERS {
        int id PK
        string full_name
        string email
        string hashed_password
        string selected_learning_path
        boolean is_active
        datetime created_at
    }

    LEARNER_PROFILES {
        string user_id PK
        string name
        string experience_level
        string target_role
        int timeline_months
        float hours_per_week
        string learning_style
        text existing_skills_json
        text skill_gaps_json
        datetime updated_at
    }

    PERSONALIZED_ROADMAPS {
        string roadmap_id PK
        string user_id FK
        string target_role
        float overall_progress
        text roadmap_items_json
        datetime updated_at
    }

    GENERATED_ASSESSMENTS {
        string id PK
        string user_id FK
        string learning_path
        string topic
        string difficulty
        int num_questions
        int time_limit_minutes
        text questions_json
        text correct_answers_json
        datetime created_at
    }

    ASSESSMENT_RESULTS {
        string id PK
        string assessment_id FK
        string user_id FK
        string learning_path
        string topic
        string difficulty
        string skill_name
        int total_questions
        int correct_count
        float score_percentage
        boolean passed
        float points_earned
        int attempt_number
        float time_taken_seconds
        text user_answers_json
        text detailed_results_json
        text adaptation_applied
        datetime created_at
    }

    LEARNING_SESSIONS {
        int id PK
        string user_id FK
        string learning_path
        datetime started_at
        datetime last_active_at
        datetime ended_at
        float duration_seconds
        string activity_type
        datetime created_at
    }

    USER_FEEDBACKS {
        string id PK
        string roadmap_item_id
        string feedback_type
        text comment
        datetime created_at
    }
```

---

## 15. Real-Time Learning Analytics

PathMind features server-timestamped tracking for study analytics:

- **Active Session Heartbeat**: While a learner is active on the tab, the frontend sends periodic 5-second heartbeats (`/api/v1/learning/session/heartbeat`).
- **Server Timestamp Accumulation**: Session duration is computed strictly on the backend via server timestamps (`datetime.utcnow()`), preventing client-side timer manipulation.
- **Automatic Pause on Inactivity**: Session tracking pauses when:
  - The browser tab is hidden or minimized (`visibilitychange` / `document.hidden`).
  - The browser window loses focus or closes (`beforeunload`).
  - The user remains idle without mouse or keyboard interaction for 5 minutes (300 seconds).
- **Timezone-Aware Active Streak**: Calculates consecutive active learning calendar days from actual PostgreSQL session timestamps in the user's timezone. Page refreshes do not inflate streak counts.
- **Live Dashboard Updates**: Time Invested updates in real time on the dashboard while active on the platform.

---

## 16. API Architecture

### Authentication & User Management
- `POST /api/auth/signup`: Registers a new user account in PostgreSQL.
- `POST /api/auth/login`: Authenticates credentials and sets an HttpOnly JWT cookie.
- `POST /api/auth/logout`: Clears the authentication cookie.
- `GET /api/auth/me`: Returns current authenticated user details.
- `PUT /api/users/me/learning-path`: Updates user's selected learning path.

### Profile & Roadmap
- `GET /api/v1/profile/me`: Fetches learner profile details.
- `POST /api/v1/profile/generate`: Generates profile from natural language prompt.
- `GET /api/v1/roadmap/active`: Fetches current active roadmap.
- `POST /api/v1/roadmap/generate`: Generates personalized roadmap.

### Assessments
- `GET /api/v1/assessments/topics`: Retrieves available assessment topics for selected path.
- `POST /api/v1/assessments/generate`: Generates a custom assessment quiz.
- `GET /api/v1/assessments/history`: Retrieves user's past assessment attempts from PostgreSQL.
- `GET /api/v1/assessments/{assessment_id}`: Retrieves public details for an assessment.
- `POST /api/v1/assessments/evaluate`: Evaluates quiz submission and records results in PostgreSQL.

### Learning Sessions & Analytics
- `POST /api/v1/learning/session/start`: Starts or resumes an active learning session.
- `POST /api/v1/learning/session/heartbeat`: Receives active heartbeat and updates duration.
- `POST /api/v1/learning/session/pause`: Pauses active session on tab hide/idle.
- `POST /api/v1/learning/session/end`: Closes active learning session.
- `GET /api/v1/learning/session/current`: Returns current active session info.
- `GET /api/v1/learning/stats`: Retrieves accumulated learning stats and streak.

### Dashboard & Assistant
- `GET /api/v1/dashboard/metrics`: Fetches metrics for the main analytics dashboard.
- `POST /api/v1/assistant/chat`: Interacts with the AI Learning Mentor.
- `POST /api/v1/feedback/submit`: Submits feedback on roadmap items.

---

## 17. Project Structure

```
PathMind/
├── backend/
│   ├── alembic/                      # Database migration scripts
│   ├── app/
│   │   ├── api/                      # FastAPI route controllers
│   │   │   ├── assessments.py        # Assessment generation & history endpoints
│   │   │   ├── assistant.py          # AI mentor chatbot endpoint
│   │   │   ├── auth.py               # Authentication & JWT management
│   │   │   ├── dashboard.py           # Dashboard metrics endpoint
│   │   │   ├── feedback.py            # User feedback endpoint
│   │   │   ├── learning.py            # Real-time session tracking endpoints
│   │   │   ├── profile.py             # Profile management endpoints
│   │   │   ├── resources.py           # Topic learning resources
│   │   │   ├── roadmap.py             # Roadmap management endpoints
│   │   │   └── users.py               # User preferences endpoint
│   │   ├── core/                     # Core application configuration
│   │   │   ├── config.py             # Environment configuration settings
│   │   │   ├── db.py                 # SQLAlchemy engine & session setup
│   │   │   └── security.py           # JWT encoding/decoding & bcrypt hashing
│   │   ├── models/                   # SQLAlchemy database models
│   │   │   ├── domain.py             # Domain models (Profile, Roadmap, Assessment, Session)
│   │   │   ├── schemas.py            # Pydantic schemas
│   │   │   └── user.py               # User authentication database model
│   │   ├── schemas/                  # Pydantic request/response validation schemas
│   │   └── services/                 # Core business logic services
│   │       ├── adaptive.py           # Roadmap adaptation logic
│   │       ├── assessment_service.py # Quiz evaluation & AI generation
│   │       ├── auth_service.py       # Auth registration & verification
│   │       ├── learning_service.py   # Real-time session heartbeat & streak calculations
│   │       └── seed_data.py          # Curated learning path seed data & resources
│   ├── main.py                       # FastAPI application entry point
│   ├── create_db.py                  # PostgreSQL database initialization script
│   ├── Dockerfile                    # Backend Docker container configuration
│   └── requirements.txt              # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/                      # Next.js App Router pages
│   │   │   ├── assessment/           # Assessment generator & quiz runner page
│   │   │   ├── assistant/            # AI Learning Mentor chatbot page
│   │   │   ├── dashboard/            # Analytics dashboard page
│   │   │   ├── learning-path-selection/ # Target learning track selection page
│   │   │   ├── login/                # Sign in authentication page
│   │   │   ├── onboarding/           # AI goal onboarding prompt page
│   │   │   ├── profile/              # Learner profile page
│   │   │   ├── roadmap/              # Interactive roadmap page
│   │   │   ├── signup/               # Registration page
│   │   │   ├── globals.css           # Global Tailwind CSS styling & theme variables
│   │   │   └── layout.tsx            # Root layout with context providers
│   │   ├── components/               # React UI components
│   │   │   ├── AppNavbar.tsx         # Navigation header component
│   │   │   ├── AssessmentActivity.tsx # PostgreSQL assessment history list
│   │   │   ├── AssessmentHistory.tsx  # Quiz attempt history breakdown component
│   │   │   ├── AssessmentRunnerModal.tsx # Interactive quiz runner modal
│   │   │   ├── CreateAssessmentCard.tsx # Custom quiz generator form
│   │   │   ├── ProgressChart.tsx     # Roadmap completion gauge component
│   │   │   └── SkillGapChart.tsx     # Recharts skill radar visualizer
│   │   ├── context/                  # React Context providers
│   │   │   ├── ActivityTrackerContext.tsx # Real-time session heartbeat & activity tracker
│   │   │   ├── AuthContext.tsx       # Authentication & user state context
│   │   │   └── ThemeContext.tsx      # Dark/light theme context
│   │   └── lib/                      # Helper libraries & API integration
│   │       ├── api.ts                # Frontend API fetch service functions
│   │       ├── mockData.ts           # Fallback mock data structures
│   │       └── types.ts              # TypeScript interface definitions
│   ├── package.json                  # Frontend Node.js dependencies
│   └── tailwind.config.js            # Tailwind CSS configuration
├── docker-compose.yml                # Multi-container Docker Compose configuration
└── README.md                         # Project documentation
```

---

## 18. Security

- **JWT Cookie Authentication**: Issued tokens are stored in secure HttpOnly cookies (`access_token`), protecting against Cross-Site Scripting (XSS) attacks.
- **Password Security**: User passwords are encrypted using bcrypt hashing via Passlib before storage in PostgreSQL.
- **Protected Routes & Endpoints**: Frontend pages use `<ProtectedRoute>` wrappers, and backend endpoints enforce `Depends(get_current_user)` authentication checks.
- **Environment Isolation**: API keys, database credentials, and secret keys are stored strictly in environment variables (`.env`).

---

## 19. Setup & Installation

### Prerequisites
- **Python**: 3.11+
- **Node.js**: 18+ & npm
- **PostgreSQL**: Local instance running on port `5432` (or Docker)

### Option 1: Standalone Local Setup

#### 1. Database Setup
Ensure PostgreSQL is running, then create the database:
```bash
python backend/create_db.py
```
*(Or create manually in PostgreSQL CLI: `CREATE DATABASE personalized_learning_db;`)*

#### 2. Backend Setup
```bash
cd backend
python -m venv venv

# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Backend server will run at `http://localhost:8000` (Swagger API docs at `http://localhost:8000/docs`).

#### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Frontend application will run at `http://localhost:3000`.

---

### Option 2: Docker Compose Single-Command Setup

Run the entire application stack (Frontend + Backend) with Docker:
```bash
docker-compose up --build
```

---

## 20. Environment Variables

Create a `.env` file in the `backend/` directory using placeholders:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/personalized_learning_db

# Security & JWT Configuration
SECRET_KEY=your_jwt_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

For the frontend, optionally create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## 👥 Team Information & Contributions

### Team Project Metadata
- **Project Name**: PathMind
- **Project Type**: AI-Powered Personalized Learning Path Recommender
- **Challenge**: HCLTech Challenge

### Project Team at a Glance

| Member | Role | Primary Contribution |
|---|---|---|
| **Sujal Belkhode** | Team Leader & Lead Developer | Overall development, integration, architecture & core implementation |
| **Rohan Bandu Andelkar** | Backend Contributor | Backend, APIs & server-side development |
| **Tanushree Rameshwar Uikey** | Frontend & Architecture Contributor | Frontend, typography & system architecture |
| **Riya Meshram** | UI & Component Developer | UI design & reusable components |



## 🚀 Future Enhancements

- **Vector-Based RAG Resource Search**: Incorporate vector database embeddings (e.g. pgvector) for semantic searching across documentation libraries.
- **Collaborative Study Groups**: Enable peer-to-peer roadmap sharing and group assessment challenges.
- **Gamified Achievements**: Award badges and certificates upon completing full learning tracks.
- **Mobile Application**: Native mobile experience built with React Native for learning on the go.
  
