from pydantic import BaseModel,EmailStr , Field
from datetime import datetime
from typing import List, Annotated,Literal,Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError, jwt
from Database.Tables import User, Builder, Project, ProjectImage,Agent
from Database.Database_connection import db_dependency

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#-----------------------------------------------------------  PYDANTIC  ----------------------------------------------------------------------------------------------------
class Users(BaseModel):
    id: int
    company_name:Optional[str]
    phone: str
    email: EmailStr
    username: str
    address: Optional[str] = None
    city:str
    rating: float = Field(0.0, ge=0.0, le=5.0)
    price: float = Field(0.0, ge=0.0)
    is_verified: bool
    bio: str

class updateUser(BaseModel):
    company_name: Optional[str] = None
    phone: Optional[str] = Field(None, pattern=r'^\+?[0-9]{7,15}$', description="Phone number must be in E.164 format")
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    city: Optional[Literal[
        "Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan",
        "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Sialkot"
    ]] = None
    price: Optional[float] = Field(None, ge=0.0)
    bio: Optional[str] = None

class BuilderCreate(BaseModel):
    id: int  
    company_name: str = "Private Builder"
    phone: str = Field(..., pattern=r'^\+?[0-9]{7,15}$', description="Phone number must be in E.164 format")
    email: EmailStr
    username: str = Field(..., max_length=50, description="Username must be unique and up to 50 characters")
    address: Optional[str] = None
    city: Literal[
        "Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan",
        "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Sialkot"
    ] = "Lahore"
    rating: float = Field(0.0, ge=0.0, le=5.0)
    price: float = Field(0.0, ge=0.0)
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    bio: Optional[str] = None

    class Config:
        orm_mode = True

class Search_Project(BaseModel):
    id :int
    builder_id :int

    class Config:
        orm_mode = True

class ProjectImageOut(BaseModel):
    id: int
    image_url: str

    class Config:
        orm_mode = True

class List_Projects(BaseModel):
    id :int 
    builder_id :int
    title :str
    description:str
    location:str 
    bedrooms: int = Field(0, ge=0)
    bathrooms: int = Field(0, ge=0)
    sqft: int = Field(0, ge=0)
    price: float = Field(0.0, ge=0.0)
    created_at: datetime
    city: str
    image_urls :List[ProjectImageOut]
    class Config:
        orm_mode = True

class Add_Projects(BaseModel): 
    builder_id :int
    title :str
    description:str
    location:str 
    city: str
    bedrooms: int = Field(0, ge=0)
    bathrooms: int = Field(0, ge=0)
    sqft: int = Field(0, ge=0)
    price: float = Field(0.0, ge=0.0)
    image_urls :List[ProjectImageOut]
    class Config:
        orm_mode = True

class ProjectCreate(BaseModel):
    title: str
    builder_id: int = Field(..., ge=1, description="Builder ID must be a positive integer")
    description: Optional[str]
    location: Optional[str]
    city: Literal[
        "Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan",
        "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Sialkot"
    ] = "Lahore"
    price: Optional[float] = Field(0.0, ge=0.0)
    bedrooms: Optional[int] = Field(0, ge=0)
    bathrooms: Optional[int] = Field(0, ge=0)
    sqft: Optional[int] = Field(0, ge=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    image_url: Optional[str]
    class Config:
        orm_mode = True

class Agent_create(BaseModel):
    user_id :int=Field(ge=1)
    username :str=Field(..., pattern=r"^[a-zA-Z0-9_]+$", max_length=50)
    full_name :str
    phone :str= Field(..., pattern=r'^\+?[0-9]{7,15}$', description="Phone number must be in E.164 format")
    email :EmailStr
    agency_name :str
    license_number:str=Field(...,pattern=r"^[a-zA-Z0-9 -]+$",description="license number shoulde only contain alphabets and number seperated by -")
    address :str
    city :Literal[
        "Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan",
        "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Sialkot"
    ] = "Lahore"
    rating : float = Field(0.0, ge=0.0, le=5.0)
    bio :str
    is_verified:bool
    class Config:
        orm_mode = True
    





from pydantic import BaseModel
from datetime import datetime
from typing import List

class MessageSchema(BaseModel):
    sender: str
    message: str
    timestamp: datetime
    read: bool

    class Config:
        orm_mode = True

class ConversationSchema(BaseModel):
    customer_id: int
    customer_name: str
    messages: List[MessageSchema]
class MessageCreateSchema(BaseModel):
    builder_id: int
    customer_id: int
    customer_name: str
    sender: str  # "Customer" or "Builder"
    message: str

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SavedItemSchema(BaseModel):
    id: int
    customer_id: int
    project_id: int
    saved_at: datetime

    class Config:
        orm_mode = True

class SavedProjectSchema(BaseModel):
    id: int
    title: str
    location: str
    price: int
    bedrooms: int
    bathrooms: int
    sqft: int

    class Config:
        orm_mode = True
