from database import Base
from sqlalchemy import Column, Integer, String


#Table for login info
class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=False)
    name = Column(String)
    password = Column(String)

#Table for recipes
class Recipe(Base):
    __tablename__ = 'recipes'

    rec_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    servings = Column(String)
    time = Column(String)
    steps = Column(String)
    email = Column(String)

#Table for ingredients
class Ingredient(Base):
    __tablename__ = 'ingredients'
    ing_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    aisle = Column(String)

#Intersection table
class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredient'
    key = Column(Integer, primary_key=True, index=True)
    rec_id = Column(Integer)
    ing_id = Column(Integer)