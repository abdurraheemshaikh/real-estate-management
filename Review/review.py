from pydantic import BaseModel,EmailStr , Field
from datetime import datetime
from typing import List, Annotated,Literal,Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError, jwt
from Database.Tables import User, Builder, Project, ProjectImage,Agent,Review
from Database.Database_connection import db_dependency
from Review.models import create_review
router = APIRouter(
    prefix="/review",
    tags=["review"],
)

@router.post("/add_review/",status_code=status.HTTP_201_CREATED)
async def add_review(db:db_dependency,review:create_review):
    new_id= db.query(Review).count() + 1
    new_review = Review(
        id=new_id,
        user_id=review.user_id,
        reviewer_name=review.reviewer_name,
        comment=review.comment,
        created_at=datetime.utcnow()

    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review


@router.get("/get_review/{user_id}",response_model=List[create_review])
async def get_review(db:db_dependency,user_id=int):
    existing_review = db.query(Review).filter(Review.user_id == user_id).all()
    if not existing_review:
        raise HTTPException(status_code=404, detail="Review not found")
    return existing_review
