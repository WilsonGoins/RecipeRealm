from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from hashing import Hasher

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


#Pydantic model for request and response data
class UserModel(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True


#dependency to get database session
#def get_db():
def db_dependency():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#db_dependency = Annotated[Session, Depends(get_db)]

#create tables
models.Base.metadata.create_all(bind=engine)

#api endpoint to create an item
@app.post("/users/", response_model=UserModel)
async def create_user(user: UserModel, db: Session = Depends(db_dependency)):
    # hash the password before storing it in the database
    user.password = Hasher.get_password_hash(user.password)
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#api endpoint to read an item by id
@app.get("/users/{user}", response_model=UserResponse)
async def read_user(email: str, password: str, db: Session = Depends(db_dependency)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    #db_user = db.query(models.User).filter(models.User.email == user_email).first()
    #print(db_user)
    if Hasher.verify_password(password, db_user.password) is False:
        raise HTTPException(status_code=404, detail='Incorrect Password')
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user



if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)