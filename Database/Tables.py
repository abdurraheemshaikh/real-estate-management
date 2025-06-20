
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from Database.database import Base
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

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

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
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


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    builder_id = Column(Integer, ForeignKey("builders.id"))
    title = Column(String(100), nullable=False)
    description = Column(Text)
    location = Column(String(100))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    image_url = Column(String(255))

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
