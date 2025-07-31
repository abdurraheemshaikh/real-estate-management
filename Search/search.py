#source .venv/Scripts/activate
#uvicorn main:app --reload

from pydantic import BaseModel,EmailStr , Field
from datetime import datetime
from typing import List, Annotated,Literal,Optional
from sqlalchemy.orm import Session 
from sqlalchemy import desc
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError, jwt
from Database.Tables import User, Builder, Project, ProjectImage,Agent,Message,SavedItem, Project
from Database.Database_connection import db_dependency
from Search.models import BuilderCreate,Builder,List_Projects,Agent_create,Users,updateUser,Add_Projects,ConversationSchema,MessageSchema,MessageCreateSchema
router = APIRouter(
    prefix="/search",
    tags=["search"],
)
from collections import defaultdict

#------------------------------------------------------------   Api  -----------------------------------------------------------------------------


# Add saved item
@router.post("/saved/add")
def add_saved_item(customer_id: int, project_id: int, db: db_dependency):
    exists = db.query(SavedItem).filter_by(customer_id=customer_id, project_id=project_id).first()
    if exists:
        raise HTTPException(status_code=400, detail="Already saved")

    saved = SavedItem(customer_id=customer_id, project_id=project_id, saved_at=datetime.utcnow())
    db.add(saved)
    db.commit()
    return {"message": "Project saved"}

# Remove saved item
@router.delete("/saved/remove")
def remove_saved_item(customer_id: int, project_id: int, db: db_dependency):
    saved = db.query(SavedItem).filter_by(customer_id=customer_id, project_id=project_id).first()
    if not saved:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(saved)
    db.commit()
    return {"message": "Project unsaved"}





@router.get("/Get_Profile/{username}", response_model=Users)
async def get_profile(username: str, db: db_dependency):
    
    user = db.query(User).filter(User.username== username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "builder":
        builder = db.query(Builder).filter(Builder.id == user.id).first()
        if not builder:
            raise HTTPException(status_code=404, detail="Builder not found")
        response=Users(
            id=builder.id,
            username=builder.username,
            company_name=builder.company_name,
            phone=builder.phone,
            email=builder.email,
            address=builder.address,
            city=builder.city,
            rating=builder.rating,
            price=builder.price,
            is_verified=builder.is_verified,
            bio=builder.bio,
        )
    elif user.role == "agent":
        agent = db.query(Agent).filter(Agent.user_id == user.id).first()
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        response=Users(
            id=agent.user_id,
            username=agent.username,
            company_name=agent.agency_name,
            phone=agent.phone,
            email=agent.email,
            address=agent.address,
            city=agent.city,
            rating=agent.rating,
            price=0.0,  # Assuming agents don't have a price field
            is_verified=agent.is_verified,
            bio=agent.bio,
        )
    else:
        response = Users(
            id=user.id,
            username=user.username,
            company_name="customer",
            phone="03005450070",
            email=user.email,
            address="house no 123, street 456",
            city="Lahore",
            rating=0.0,  # Assuming customers don't have a rating field
            price=0.0,  # Assuming customers don't have a price field
            is_verified=False,  # Assuming customers are not verified
            bio=""
        )

    return response


@router.post("/Create_builders", status_code=status.HTTP_201_CREATED)
async def create_Builder(db: db_dependency, user:BuilderCreate):
    existing_user = db.query(Builder).filter(Builder.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
        return {"error": "Username already registered"}
    
    new_user = Builder(
        id=user.id,
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

@router.post("/Update_builders/{id}", status_code=status.HTTP_201_CREATED)
async def update_Builder(id:int,db: db_dependency, user:updateUser):
    existing_user = db.query(Builder).filter(Builder.id == id).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="not found")

    existing_user.id=existing_user.id
    existing_user.username=existing_user.username
    existing_user.company_name=user.company_name,
    existing_user.phone=user.phone,
    existing_user.email=user.email,
    existing_user.address=user.address,
    existing_user.city=user.city,
    existing_user.rating=existing_user.rating,
    existing_user.price=user.price,
    existing_user.is_verified=existing_user.is_verified
    existing_user.created_at=existing_user.created_at,
    existing_user.updated_at=datetime.utcnow()  # Update the updated_at field to current time
    existing_user.bio=user.bio
    
    
    db.commit() 
    db.refresh(existing_user)
    return existing_user

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
async def get_projects_by_builder(builder_id:str,db: db_dependency):
    projects = db.query(Project).filter(Project.builder_id==builder_id).all()

    result = []
    for project in projects:
        image_urls = db.query(ProjectImage).filter(ProjectImage.project_id == project.id).all()

        project_dict = {
            "id": project.id,
            "builder_id": project.builder_id,
            "title": project.title,
            "description": project.description,
            "location": project.location,
            "created_at": project.created_at,
            "city": project.city,
            "price": project.price,
            "bedrooms": project.bedrooms,
            "bathrooms": project.bathrooms,
            "sqft": project.sqft,
            "image_urls": image_urls
        }

        result.append(project_dict)

    return result

@router.get("/prpperties/featured", response_model=List[List_Projects])
async def get_featured_projects(db: db_dependency):
    # Fetch top 3 most recent projects
    projects = db.query(Project).order_by(Project.created_at.desc()).limit(3).all()

    result = []
    for project in projects:
        image_records = db.query(ProjectImage).filter(ProjectImage.project_id == project.id).all()

        # If image model has a URL field
        image_urls = [img.image_url for img in image_records]

        project_dict = {
            "id": project.id,
            "builder_id": project.builder_id,
            "title": project.title,
            "description": project.description,
            "location": project.location,
            "created_at": project.created_at,
            "city": project.city,
            "price": project.price,
            "bedrooms": project.bedrooms,
            "bathrooms": project.bathrooms,
            "sqft": project.sqft,
            "image_urls": image_urls
        }

        result.append(project_dict)

    return result



@router.get("/projects", response_model=List[List_Projects])
async def get_projects_by_builder(db: db_dependency):
    projects = db.query(Project).all()

    result = []
    for project in projects:
        image_urls = db.query(ProjectImage).filter(ProjectImage.project_id == project.id).all()

        project_dict = {
            "id": project.id,
            "builder_id": project.builder_id,
            "title": project.title,
            "description": project.description,
            "location": project.location,
            "created_at": project.created_at,
            "city": project.city,
            "price": project.price,
            "bedrooms": project.bedrooms,
            "bathrooms": project.bathrooms,
            "sqft": project.sqft,
            "image_urls": image_urls
        }

        result.append(project_dict)

    return result

@router.get("/projects_city/{city}", response_model=List[List_Projects])
async def get_projects_by_builder(city:str,db: db_dependency):
    projects = db.query(Project).filter(Project.city==city).all()

    result = []
    for project in projects:
        image_urls = db.query(ProjectImage).filter(ProjectImage.project_id == project.id).all()

        project_dict = {
            "id": project.id,
            "builder_id": project.builder_id,
            "title": project.title,
            "description": project.description,
            "location": project.location,
            "created_at": project.created_at,
            "city": project.city,
            "price": project.price,
            "bedrooms": project.bedrooms,
            "bathrooms": project.bathrooms,
            "sqft": project.sqft,
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


@router.get("/builders/featured", response_model=List[BuilderCreate])
async def get_builders(db: db_dependency):
    builders = db.query(Builder).all()
    if not builders:
        raise HTTPException(status_code=404, detail="No builders found")
    return builders

@router.get("/agents/featured", response_model=List[Agent_create])
async def get_featured_agents(db: db_dependency):
    agents = db.query(Agent).order_by(desc(Agent.rating)).limit(2).all()
    if not agents:
        raise HTTPException(status_code=404, detail="No featured agents found")
    return agents

@router.get("/Agents/{city}", response_model=List[Agent_create])
async def get_builder_by_city(city: str, db: db_dependency):
    builder = db.query(Agent).filter(Agent.city == city).all()
    if not builder:
        raise HTTPException(status_code=404, detail="Builder not found")
    return builder
@router.get("/Agents_city_rating/{city}/{rating}", response_model=List[Agent_create])
async def get_Agent_by_rating(city: str,rating:float, db: db_dependency):
    builder = db.query(Agent).filter(Agent.city == city and Agent.rating>rating).all()
    if not builder:
        raise HTTPException(status_code=404, detail="Builder not found")
    return builder

@router.get("/Agent_rating", response_model=List[Agent_create])
async def get_Agent_by_rating(rating: float, db: db_dependency):
    builder = db.query(Agent).filter(Agent.rating > rating).all()
    if not builder:
        raise HTTPException(status_code=404, detail="Builder not found")
    return builder


@router.post("/projects/create", status_code=status.HTTP_201_CREATED)
async def create_project(db: db_dependency, project: Add_Projects):
    last_project = db.query(Project).order_by(Project.id.desc()).first()
    new_project = Project(
        id=last_project.id + 1 if last_project else 1,
        builder_id=project.builder_id,
        title=project.title,
        description=project.description,
        location=project.location,
        city=project.city,
        price=project.price,
        bedrooms=project.bedrooms,
        bathrooms=project.bathrooms,
        sqft=project.sqft,
        created_at=datetime.utcnow()
    )
    if project.image_urls:
        for image in project.image_urls:
            new_image = ProjectImage(
                project_id=new_project.id,
                image_url=image.image_url
            )
            db.add(new_image)

    else:
        raise HTTPException(status_code=400, detail="At least one image URL is required")
    
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    
    return new_project


@router.get("/messages/{builder_id}", response_model=List[ConversationSchema])
def get_conversations(builder_id: int, db: db_dependency):
    messages = db.query(Message).filter(Message.builder_id == builder_id).order_by(Message.timestamp).all()

    grouped = defaultdict(lambda: {
        "customer_id": None,
        "customer_name": "",
        "messages": []
    })

    for msg in messages:
        customer_id = msg.customer_id
        grouped[customer_id]["customer_id"] = customer_id
        grouped[customer_id]["customer_name"] = msg.customer_name
        grouped[customer_id]["messages"].append({
            "sender": msg.sender,
            "message": msg.message,
            "timestamp": msg.timestamp,
            "read": msg.read
        })

    return list(grouped.values())

@router.post("/messages/send")
def send_message(message: MessageCreateSchema, db: db_dependency):
    try:
        new_message = Message(
            builder_id=message.builder_id,
            customer_id=message.customer_id,
            customer_name=message.customer_name,
            sender=message.sender,
            message=message.message,
            timestamp=datetime.utcnow(),
            read=False
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        return {"success": True, "message_id": new_message.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))