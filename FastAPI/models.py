from database import Base
from sqlalchemy import Column, Integer, Boolean, String


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    calories = Column(Integer)
    description = Column(String)
    is_healthy = Column(Boolean)
    date = Column(String)
