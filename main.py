from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from starlette.responses import JSONResponse
from sqlalchemy import text
from database import SessionLocal, engine
import models
from hashing import Hasher

#fastapi instance
app = FastAPI()

origins = [
    "https://reciperealm-three.vercel.app",
    'https://reciperealm-ghe7r2zrt-wilsongoins-projects.vercel.app',
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

#connection = engine.connect()

#Pydantic model for request and response data
class UserModel(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    password: str

# class NameResponse(BaseModel):
#     name: str

class RecipeModel(BaseModel):
    name: str
    servings: int
    time: int
    steps: str
    image : str
    email: str

class RecipeResponse(BaseModel):
    rec_id: int
    name: str
    servings: int       
    time: int
    steps: str
    image: str
    email: str

class IngredientModel(BaseModel):
    name: str
    aisle: str

class RecipeIngredientModel(BaseModel):
    rec_id: int
    ing_id: int

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
async def add_recipe(recipe: RecipeModel, ingredient: List[IngredientModel], recipe_ingredient: List[RecipeIngredientModel], db: Session = Depends(db_dependency)):

    rec_id_current = 0
    ing_id_current = 0

    #find max rec_id value in recipes table
    result = db.execute(text('SELECT MAX(rec_id) FROM recipes'))
    for element in result:
        #handle empty database case
        if element[0] is None:
            rec_id_current = 1
        else:
            #add one to max rec_id to get current rec_id
            rec_id_current = element[0] + 1

    #find max ing_id value in ingredients table
    result = db.execute(text('SELECT MAX(ing_id) FROM ingredients'))
    for element in result:
        #handle empty database case
        if element[0] is None:
            ing_id_current = 1
        else:
            #add one to max ing_id to get current ing_id
            ing_id_current = element[0] + 1

    #set up items to be added to recipes and ingredients tables
    db_recipe = models.Recipe(**recipe.dict())
    db_ingredients = [ingredient_item.dict() for ingredient_item in ingredient]

    #set up items to be added to recipes_ingredients intersection table
    for ingredient_item in ingredient:
        #set the ids for the recipes_ingredients table to the current id values and store in a dictionary
        recipe_ingredient_dict = {"rec_id": rec_id_current, "ing_id": ing_id_current}
        #create pydantic model object using the dictionary
        tmp = RecipeIngredientModel.model_validate(recipe_ingredient_dict)
        #add the object to the list
        recipe_ingredient.append(tmp)
        #increment ing_id_current to account for multiple ingredients being added to recipes_ingredients
        ing_id_current = ing_id_current + 1

    db_recipe_ingredients = [item.dict() for item in recipe_ingredient]

    #add entries to tables
    db.add(db_recipe)
    db.bulk_insert_mappings(models.Ingredient, db_ingredients)
    db.bulk_insert_mappings(models.RecipeIngredient, db_recipe_ingredients)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe, db_ingredients, db_recipe_ingredients

#get the recipe information based on the passed in rec_id
@app.get("/recipes/")
async def get_recipe(email: str, db: Session = Depends(db_dependency)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.email == email).all()
    return db_recipe

#get the ingredients for a recipe based on the passed in rec_id
@app.get("/ingredients/")
async def get_ingredients(rec_id: int, db: Session = Depends(db_dependency)):
    db_recipe_ingredients = db.query(models.RecipeIngredient).filter(models.RecipeIngredient.rec_id == rec_id).all()

    db_ingredients = []
    for item in db_recipe_ingredients:
        ing_id = item.ing_id
        db_tmp = db.query(models.Ingredient).filter(models.Ingredient.ing_id == ing_id).first()
        db_ingredients.append(db_tmp)
    return db_ingredients

@app.delete("/delete_recipe/")
async def delete_recipe(rec_id: int, db: Session = Depends(db_dependency)):
    #delete the recipe
    db_recipe = db.query(models.Recipe).filter(models.Recipe.rec_id == rec_id).first()
    db.delete(db_recipe)

    #delete the ingredients associated with the recipe
    db_recipe_ingredients = db.query(models.RecipeIngredient).filter(models.RecipeIngredient.rec_id == rec_id).all()
    for item in db_recipe_ingredients:
        ing_id = item.ing_id
        db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ing_id == ing_id).first()
        db.delete(db_ingredient)

    #delete the items in the intersection table associated with the recipe
    [db.delete(item) for item in db_recipe_ingredients]
    db.commit()
    return True


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
@app.get("/users/", response_model=UserModel) #response_model=UserResponse)
async def read_user(email: str, password: str, db: Session = Depends(db_dependency)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user is None:
        return JSONResponse(status_code=200, content={'error': 'User not found'}, headers={'Access-Control-Allow-Origin': 'https://reciperealm-ghe7r2zrt-wilsongoins-projects.vercel.app'})

    if Hasher.verify_password(password, db_user.password) is False:
        return JSONResponse(status_code=200, content={'error': 'Incorrect Password'}, headers={'Access-Control-Allow-Origin': 'https://reciperealm-ghe7r2zrt-wilsongoins-projects.vercel.app'})

    return db_user
