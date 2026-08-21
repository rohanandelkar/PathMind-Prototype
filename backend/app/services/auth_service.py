import re
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.auth import SignupRequest, LoginRequest
from app.core.security import hash_password, verify_password

def validate_password_policy(password: str) -> None:
    """
    Validates password requirements:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    """
    if len(password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long."
        )
    if not re.search(r"[A-Z]", password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must contain at least one uppercase letter."
        )
    if not re.search(r"[a-z]", password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must contain at least one lowercase letter."
        )
    if not re.search(r"[0-9]", password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must contain at least one number."
        )

def register_new_user(db: Session, signup_data: SignupRequest) -> User:
    """Registers a new user in PostgreSQL with hashed password."""
    # 1. Confirm passwords match
    if signup_data.password != signup_data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match."
        )

    # 2. Validate password complexity
    validate_password_policy(signup_data.password)

    # 3. Normalize email
    normalized_email = signup_data.email.strip().lower()

    # 4. Check for existing user in PostgreSQL
    existing_user = db.query(User).filter(User.email == normalized_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    # 5. Hash password securely
    hashed_pwd = hash_password(signup_data.password)

    # 6. Create user record
    new_user = User(
        full_name=signup_data.full_name.strip(),
        email=normalized_email,
        password_hash=hashed_pwd,
        is_active=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, login_data: LoginRequest) -> User:
    """Authenticates a user against stored password hash in PostgreSQL."""
    normalized_email = login_data.email.strip().lower()
    user = db.query(User).filter(User.email == normalized_email).first()
    
    # Generic error message to prevent account enumeration
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive."
        )

    return user

def get_user_by_id(db: Session, user_id: int) -> User:
    """Fetches user profile by primary key ID."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    return user
