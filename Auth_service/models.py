from datetime import datetime, timedelta
from typing import Annotated,Literal

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel ,EmailStr, Field, field_validator
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt

from Database.Database_connection import db_dependency
from Database.Tables import User


# Constants
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing context
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")

#-----------------------------------------------------------  PYDANTIC  ----------------------------------------------------------------------------------------------------

class Token(BaseModel):
    access_token: str
    token_type: str

def validate_password_strength(password: str) -> str:
    if not any(c.isupper() for c in password):
        raise ValueError("Password must contain at least one uppercase letter")
    if not any(c in "!@#$%^&*(),.?\":{}|<>" for c in password):
        raise ValueError("Password must contain at least one special character")
    return password

class CreateUserRequest(BaseModel):
    username: str = Field(..., pattern=r"^[a-zA-Z0-9_]+$", max_length=50)
    email: EmailStr
    password: str
    role: Literal["customer", "builder", "agent"] = "customer"

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        return validate_password_strength(v)

class UserLoginRequest(BaseModel):
    username: str = Field(..., pattern=r"^[a-zA-Z0-9_]+$", max_length=50)
    password: str = Field(..., min_length=8)

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        return validate_password_strength(v)

class UserOut(BaseModel):
    id: int
    username: str

    model_config = {
        "from_attributes": True  
    }

def create_access_token(username: str, user_id: int):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": username, "id": user_id, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)