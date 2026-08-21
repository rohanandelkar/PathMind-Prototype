from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.schemas import AssistantRequest, AssistantResponse
from app.services.ai_agent import answer_learning_query
from app.api.profile import get_current_profile
from app.api.roadmap import get_active_roadmap

router = APIRouter()

@router.post("/chat", response_model=AssistantResponse)
def chat_with_assistant(request: AssistantRequest, req: Request, db: Session = Depends(get_db)):
    profile = get_current_profile(req, db)
    roadmap = get_active_roadmap(req, db)
    return answer_learning_query(request, profile, roadmap)

