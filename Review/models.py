from pydantic import BaseModel,EmailStr , Field,PositiveInt
from datetime import datetime
from typing import List, Annotated,Literal,Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError, jwt
from Database.Tables import User, Builder, Project, ProjectImage,Agent
from Database.Database_connection import db_dependency

class create_review(BaseModel):
    id :PositiveInt
    user_id :PositiveInt
    reviewer_name:str
    comment :str
    created_at:datetime

