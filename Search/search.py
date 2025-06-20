from pydantic import BaseModel,EmailStr , Field
from datetime import datetime
from typing import List, Annotated,Literal,Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError, jwt
from Database.Tables import User, Builder, Project, ProjectImage,Agent
from Database.Database_connection import db_dependency
from Search.models import BuilderCreate,Builder,List_Projects,Agent_create
router = APIRouter(
    prefix="/search",
    tags=["search"],
)

#------------------------------------------------------------   Api  -----------------------------------------------------------------------------

@router.post("/Create_builders", status_code=status.HTTP_201_CREATED)
async def create_Builder(db: db_dependency, user:BuilderCreate):
    existing_user = db.query(Builder).filter(Builder.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
        return {"error": "Username already registered"}
    
    new_user = Builder(
        user_id=user.user_id,
        username=user.username,
        company_name=user.company_name,
        phone=user.phone,
        email=user.email,
        address=user.address,
        city=user.city,
        rating=0.0,
        price=user.price,
        is_verified=False,
        created_at=user.created_at,
        updated_at=user.updated_at,
        bio=user.bio
    )
    db.add(new_user)
    db.commit() 
    db.refresh(new_user)
    return new_user


@router.get("/builders", response_model=List[BuilderCreate])
async def get_builders(db: db_dependency):
    builders = db.query(Builder).all()
    if not builders:
        raise HTTPException(status_code=404, detail="No builders found")
    return builders

@router.get("/builders/{city}", response_model=List[BuilderCreate])
async def get_builder_by_city(city: str, db: db_dependency):
    builder = db.query(Builder).filter(Builder.city == city).all()
    if not builder:
        raise HTTPException(status_code=404, detail="Builder not found")
    return builder

@router.get("/projects/{builder_id}", response_model=List[List_Projects])
async def get_projects_by_builder(builder_id: int, db: db_dependency):
    projects = db.query(Project).filter(Project.builder_id == builder_id).all()

    result = []
    for project in projects:
        
        image_urls = db.query(ProjectImage).filter(ProjectImage.project_id == project.id).all()
        
        project_dict = {
            "id": project.id,
            "builder_id": project.builder_id,
            "title": project.title,
            "description": project.description,
            "location": project.location,
            "start_date": project.start_date,
            "end_date": project.end_date,
            "image_urls": image_urls
        }
        result.append(project_dict)

    return result

@router.post("/Agent", status_code=status.HTTP_201_CREATED)
async def create_agent(db:db_dependency, user:Agent_create):
     
    existing_user = db.query(Agent).filter(Agent.username == user.username).first()
    get_user=db.query(User).filter(User.id==user.user_id).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
     
    new_user = Agent(
        user_id=get_user.id,
        username=get_user.username,
        full_name=user.full_name,
        phone=user.phone,
        email=user.email,
        agency_name=user.agency_name,
        license_number=user.license_number,
        address=user.address,
        city=user.city,
        rating=0.0,
        is_verified=False,
        bio=user.bio
    )

    db.add(new_user)
    db.commit() 
    db.refresh(new_user)
    return new_user


@router.post("/Update_Agent", status_code=status.HTTP_201_CREATED)
async def update_agent(db:db_dependency, user:Agent_create):
     
    existing_user = db.query(Agent).filter(Agent.username == user.username).first()
    
    existing_user.user_id=user.user_id
    existing_user.username=user.username
    existing_user.full_name=user.full_name
    existing_user.phone=user.phone
    existing_user.email=user.email
    existing_user.agency_name=user.agency_name
    existing_user.license_number=user.license_number
    existing_user.address=user.address
    existing_user.city=user.city
    existing_user.rating= 0.0 
    existing_user.is_verified=False 
    existing_user.bio=user.bio
    
    db.commit() 
    db.refresh(existing_user)
    return ("User Updated Succesfully")

@router.get("/Agents", response_model=List[Agent_create])
async def get_Agents(db: db_dependency):
    builders = db.query(Agent).all()
    if not builders:
        raise HTTPException(status_code=404, detail="No Agents found")
    return builders

@router.get("/Agents/{city}", response_model=List[Agent_create])
async def get_builder_by_city(city: str, db: db_dependency):
    builder = db.query(Agent).filter(Agent.city == city).all()
    if not builder:
        raise HTTPException(status_code=404, detail="Builder not found")
    return builder