from datetime import datetime, timedelta
from typing import Optional, Any
from jose import jwt, JWTError
import bcrypt
import hashlib
from app.core.config import settings

# We use bcrypt directly (bypassing passlib) to avoid the passlib/bcrypt
# version incompatibility where passlib's internal 72-byte detection test
# crashes with newer bcrypt builds that strictly enforce the limit.
# Passwords are SHA-256 pre-hashed → 64-char hex string, always < 72 bytes.


def _prepare(password: str) -> bytes:
    """SHA-256 pre-hash so bcrypt never hits the 72-byte limit."""
    return hashlib.sha256(password.encode("utf-8")).hexdigest().encode("utf-8")


def hash_password(password: str) -> str:
    """Hashes plain text password securely (SHA-256 → bcrypt)."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(_prepare(password), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain text password against stored hash."""
    return bcrypt.checkpw(_prepare(plain_password), hashed_password.encode("utf-8"))

def create_access_token(subject: Any, email: str, expires_delta: Optional[timedelta] = None) -> str:
    """Generates signed JWT access token containing sub and email."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "sub": str(subject),
        "email": email,
        "exp": expire
    }
    
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    """Decodes and validates JWT token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
