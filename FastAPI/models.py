from database import Base
from sqlalchemy import Column, Integer, String


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String)
    email = Column(String)
    password = Column(String)
