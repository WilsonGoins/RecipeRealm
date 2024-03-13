from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

<<<<<<< HEAD
URL_DATABASE = 'sqlite:///./recipes.db'
=======
URL_DATABASE = 'sqlite:///./users.db'
>>>>>>> origin/Wilson

engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

<<<<<<< HEAD
Base = declarative_base()
=======
Base = declarative_base()
>>>>>>> origin/Wilson
