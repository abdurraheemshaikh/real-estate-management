
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from Database.database import Base
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class SavedItem(Base):
    __tablename__ = 'saved_items'

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    saved_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    builder_id = Column(Integer, ForeignKey("builders.id"), nullable=False)
    customer_id = Column(Integer,nullable=False)  # Assuming customer_id is an integer
    customer_name = Column(String(100), nullable=False)  # Name of the customer
    sender = Column(String, nullable=False)  # 'Customer' or 'Builder'
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    read = Column(Boolean, default=False)

    
    builders= relationship("Builder", back_populates="messages")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="customer")  
    is_active = Column(Boolean, default=True)
  


class Builder(Base):
    __tablename__ = "builders"

    id = Column(Integer, ForeignKey("users.id"), nullable=False,unique=True,primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    company_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    address = Column(String(200))
    city = Column(String(50))
    rating = Column(Float, default=0.0)
    bio = Column(Text)
    price = Column(Float, default=0.0)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", backref="builders")
    projects = relationship("Project", back_populates="builder")
    messages = relationship("Message", back_populates="builders", cascade="all, delete-orphan")

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base  # adjust import based on your project structure

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    builder_id = Column(Integer, ForeignKey("builders.id"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    location = Column(String(100))
    city= Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)
    price = Column(Float, nullable=True)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    sqft = Column(Integer, nullable=True)

    builder = relationship("Builder", back_populates="projects")
    images = relationship("ProjectImage", back_populates="project")



class ProjectImage(Base):
    __tablename__ = "project_images"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"))

    project = relationship("Project", back_populates="images")


class Agent(Base):
    __tablename__ = "agents"
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    username = Column(String(50),  primary_key=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    agency_name = Column(String(100))
    license_number = Column(String(50), nullable=True)
    address = Column(String(200))
    city = Column(String(50))
    rating = Column(Float, default=0.0)
    bio = Column(Text)
    is_verified = Column(Boolean, default=False)

    user = relationship("User", backref="agents")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewer_name= Column(Text, nullable=True)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to user
    user = relationship("User", backref="reviews")