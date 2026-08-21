from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.config import settings
from app.core.security import create_access_token, decode_access_token
from app.schemas.auth import SignupRequest, LoginRequest, UserResponse, AuthSuccessResponse
from app.services.auth_service import register_new_user, authenticate_user, get_user_by_id
from app.models.user import User

router = APIRouter()

def get_token_from_request(request: Request) -> str:
    """Extracts JWT token from HttpOnly cookie or Authorization header."""
    token = request.cookies.get("access_token")
    if token:
        if token.startswith("Bearer "):
            return token[7:]
        return token

    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        return auth_header[7:]

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated."
    )

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    """FastAPI Dependency: Validates JWT token and fetches authenticated user from PostgreSQL."""
    token = get_token_from_request(request)
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token."
        )

    try:
        user_id = int(payload["sub"])
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user token payload."
        )

    user = get_user_by_id(db, user_id)
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is disabled."
        )
    return user

@router.post("/signup", response_model=AuthSuccessResponse, status_code=status.HTTP_201_CREATED)
def signup(signup_data: SignupRequest, db: Session = Depends(get_db)):
    """POST /api/auth/signup: Registers a new user account in PostgreSQL."""
    user = register_new_user(db, signup_data)
    return AuthSuccessResponse(
        success=True,
        message="Account created successfully",
        user=UserResponse.model_validate(user)
    )

@router.post("/login", response_model=AuthSuccessResponse)
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    """POST /api/auth/login: Authenticates user credentials and issues HttpOnly JWT cookie."""
    user = authenticate_user(db, login_data)
    
    # Generate JWT Token
    access_token = create_access_token(subject=user.id, email=user.email)

    # Set HttpOnly Cookie for Secure Authentication
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False  # Set to True in production HTTPS
    )

    return AuthSuccessResponse(
        success=True,
        message="Login successful",
        user=UserResponse.model_validate(user)
    )

@router.post("/logout", response_model=AuthSuccessResponse)
def logout(response: Response):
    """POST /api/auth/logout: Clears HttpOnly authentication cookie."""
    response.delete_cookie(key="access_token")
    return AuthSuccessResponse(
        success=True,
        message="Logged out successfully"
    )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """GET /api/auth/me: Returns current authenticated user profile."""
    return UserResponse.model_validate(current_user)
