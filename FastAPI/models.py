from database import Base
from sqlalchemy import Column, Integer, String


#database model
class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=False)
    name = Column(String)
    password = Column(String)