from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

URL_DATABASE = "postgresql://postgres:0000@localhost:5432/Builders"
engine = create_engine(URL_DATABASE)

sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
