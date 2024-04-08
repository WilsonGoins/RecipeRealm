from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from starlette.responses import JSONResponse

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

class RecipeModel(BaseModel):
    rec_id: int
    name: str

class IngredientModel(BaseModel):
    ing_id: int
    name: str
    amount: str

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

@app.post("/recipes/")
async def add_recipe(recipe: RecipeModel, ingredient: List[IngredientModel], db: Session = Depends(db_dependency)):
    db_recipe = models.Recipe(**recipe.dict())
    db_ingredients = [ingredient_item.dict() for ingredient_item in ingredient]
    db.add(db_recipe)
    db.bulk_insert_mappings(models.Ingredient, db_ingredients)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe, db_ingredients

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
@app.get("/users/", response_model=UserResponse)
async def read_user(email: str, password: str, db: Session = Depends(db_dependency)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user is None:
        return JSONResponse(status_code=404, content={'error': 'User not found'})
    if Hasher.verify_password(password, db_user.password) is False:
        return JSONResponse(status_code=404, content={'error': 'Incorrect Password'})
    return db_user



if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)