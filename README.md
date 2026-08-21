# AI-Powered Personalized Learning Path Recommender (HCLTech Technology Challenge)

PathMind is an intelligent learning mentor application that converts natural language career goals into structured, prerequisite-aware, adaptive, and explainable learning roadmaps.

---

## Technical Stack Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts for analytics, Lucide Icons.
- **Backend**: Python 3.11, FastAPI, Pydantic v2, SQLAlchemy.
- **AI & RAG Engine**: LangGraph, OpenAI GPT-4o / Embeddings, pgvector / SQLite vector similarity search.
- **Containerization**: Docker & Docker Compose.

---

## Quick Start & Verification

### Option 1: Standalone Local Run (Backend + Frontend)

#### 1. Backend Setup
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
Backend API will run at `http://localhost:8000` (Docs at `http://localhost:8000/docs`).

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at `http://localhost:3000`.

---

### Option 2: Docker Compose Single-Command Run
```bash
docker-compose up --build
```

---

## Verified End-to-End User Journey

1. **AI Goal Onboarding (`/onboarding`)**:
   - Input natural language prompt: *"I am a beginner in programming. I know basic HTML and SQL. I want to become a Java backend developer in 6 months."*
   - AI parses target role (`Java Backend Developer`), experience level (`Beginner`), known skills (`HTML`, `SQL`), and timeline (`6 months`).
2. **Skill Gap Analysis (`/dashboard`)**:
   - Calculates missing skills (`Java OOP`, `Spring Boot`, `REST APIs`) vs known skills (`SQL`).
   - Renders radar and bar charts using Recharts.
3. **Prerequisite-Aware Roadmap (`/roadmap`)**:
   - Generates topological DAG ordering: Programming Fundamentals -> Java OOP -> Collections -> Spring Boot -> REST API -> Security.
   - Provides clear human-readable AI explanation for every step.
4. **Adaptive Evaluation (`/assessment`)**:
   - Take quiz -> High score (>90%) fast-tracks roadmap; Low score (<60%) injects revision tutorials.
5. **Feedback Loop & AI Mentor (`/assistant`)**:
   - Click "Already Know This" or ask context-aware questions in chat.
