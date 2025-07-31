from fastapi import FastAPI,Path, HTTPException,Query
from fastapi.middleware.cors import CORSMiddleware
import json
from pydantic import BaseModel,EmailStr
from typing import List, Annotated
from Database import Tables as search_models
from Auth_service import models as auth_models

from sqlalchemy.orm import Session
from Search import search as search
from Auth_service import auth as auth_service
from Review import review as review_service


app = FastAPI()
app.include_router(auth_service.router)
app.include_router(search.router)
app.include_router(review_service.router)

origin = "http://localhost:5173"  # Adjust this to your frontend URL

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)