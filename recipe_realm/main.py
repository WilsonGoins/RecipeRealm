from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

#fastapi instance
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


#Pydantic model for request data
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

#Pydantic model for response data
class UserResponse(BaseModel):
    email: str

    class Config:
        orm_mode = True

#dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

#create tables
models.Base.metadata.create_all(bind=engine)

#api endpoint to create an item
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(db_dependency)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#api endpoint to read an item by id
@app.get("/users/{user_email}", response_model=List[UserResponse])
async def read_user(user_email: str, db: Session = Depends(db_dependency)):
    db_user = db.query(models.User).filter(models.User.email == user_email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user