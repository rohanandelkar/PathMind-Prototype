from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SignupRequest(BaseModel):
    full_name: str = Field(..., min_length=2, example="John Doe")
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., min_length=8, example="Password123")
    confirm_password: str = Field(..., min_length=8, example="Password123")

class LoginRequest(BaseModel):
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="Password123")

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    selected_learning_path: Optional[str] = None
    is_active: bool = True
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AuthSuccessResponse(BaseModel):
    success: bool
    message: str
    user: Optional[UserResponse] = None

class LearningPathUpdateRequest(BaseModel):
    learning_path: str

class LearningPathResponse(BaseModel):
    selected_learning_path: Optional[str] = None

