import re
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.db import init_db
from app.api import auth, profile, roadmap, assessments, feedback, assistant, dashboard, users, learning

# ── Allowed Origins ──────────────────────────────────────────────────────────
# Base origins for local development and explicit config settings
ALLOWED_ORIGINS = [
    settings.FRONTEND_ORIGIN,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

# Regex pattern matching any preview or production Vercel deployment URL
VERCEL_ORIGIN_REGEX = r"https://.*\.vercel\.app"

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Personalized Learning Path Recommender API - HCLTech Technology Challenge",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=VERCEL_ORIGIN_REGEX,
    allow_credentials=True,   # Required for HttpOnly cookie auth
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global Exception Handler ──────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    origin = request.headers.get("origin", "")
    headers = {}
    
    # Check against both explicit origins and Vercel regex pattern
    if origin in ALLOWED_ORIGINS or (origin and re.match(VERCEL_ORIGIN_REGEX, origin)):
        headers["Access-Control-Allow-Origin"] = origin
        headers["Access-Control-Allow-Credentials"] = "true"
        
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"},
        headers=headers,
    )

# ── Startup Event ─────────────────────────────────────────────────────────────
@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print(f"[DATABASE ERROR] {e}")

# ── API Routers ───────────────────────────────────────────────────────────────
app.include_router(auth.router,        prefix="/api/auth",            tags=["Authentication"])
app.include_router(users.router,       prefix="/api/users",           tags=["Users"])
app.include_router(users.router,       prefix=f"{settings.API_V1_STR}/users", tags=["Users"])
app.include_router(learning.router,    prefix="/api/learning",        tags=["Learning Sessions"])
app.include_router(learning.router,    prefix=f"{settings.API_V1_STR}/learning", tags=["Learning Sessions"])
app.include_router(profile.router,     prefix=f"{settings.API_V1_STR}/profile",     tags=["Learner Profile"])
app.include_router(roadmap.router,     prefix=f"{settings.API_V1_STR}/roadmap",     tags=["Personalized Roadmap"])
app.include_router(assessments.router, prefix=f"{settings.API_V1_STR}/assessments", tags=["Assessments"])
app.include_router(feedback.router,    prefix=f"{settings.API_V1_STR}/feedback",    tags=["Feedback"])
app.include_router(assistant.router,   prefix=f"{settings.API_V1_STR}/assistant",   tags=["AI Mentor"])
app.include_router(dashboard.router,   prefix=f"{settings.API_V1_STR}/dashboard",   tags=["Dashboard"])


@app.get("/")
def root():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
