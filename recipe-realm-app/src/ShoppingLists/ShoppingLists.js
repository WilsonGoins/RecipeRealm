import React, {useState, useEffect} from "react"
import "./ShoppingLists.css"
import Template from "../Template/Template";

const ShoppingLists = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [listType, setListType] = useState("separate");


    const GetRecipes = () => {         // TODO: retrieve name and recipes from backend
        var userRecipes = GenerateTestRecipes()
        .then(userRecipes => {
            setRecipes(OrganizeRecipes(userRecipes));
        })
    }

const GenerateTestRecipes = async () => {
        var res = [
           {
               "title": "Recipe 1",
               "id": 1,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 4,
               "time": 30,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 2",
               "id": 2,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 2,
               "time": 45,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 3",
               "id": 3,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 6,
               "time": 60,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 4",
               "id": 4,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 3,
               "time": 25,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 5",
               "id": 5,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 8,
               "time": 35,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 6",
               "id": 6,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 5,
               "time": 50,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 7",
               "id": 7,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 2,
               "time": 20,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 8",
               "id": 8,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 4,
               "time": 40,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 9",
               "id": 9,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 7,
               "time": 55,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           },
           {
               "title": "Recipe 10",
               "id": 10,
               "image": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
               "servings": 3,
               "time": 30,
               "ingredients": [
                   {"item": "Ingredient 1", "aisle": "Aisle 1"},
                   {"item": "Ingredient 2", "aisle": "Aisle 2"},
                   {"item": "Ingredient 3", "aisle": "Aisle 3"}
               ],
               "steps": [
                   "Step 1: Do this",
                   "Step 2: Do that",
                   "Step 3: Do something else"
               ]
           }
       ]
       
       return res;
    }

   const OrganizeRecipes = (recipes) => {    // so recipes is a 2d list. the outer list is groups of 3, the inner lists has individual recipes
        var result = [];
        for (var i = 0; i < recipes.length; i += 3) {
            var tempRes = [];
            for (var j = 0; j < 3; j++) {
                if (i + j < recipes.length) {
                    let currRecipe = recipes[i + j];
                    if (!currRecipe.hasOwnProperty('clicked')) {
                        currRecipe['clicked'] = false;
                    }
                    tempRes.push(currRecipe);
                }
            }
            result.push(tempRes);
        }
        return result;
    }

   const ReduceRecipeName = (title) => {
       if (title.length > 25) {
           return title.substring(0, 25) + '...';
         } else {
           return title;
       }    
    }

    const HandleSelect = (outerIndex, innerIndex) => {
        // change the clicked attribute
        var tempRecipes = [...recipes];
        tempRecipes[outerIndex][innerIndex].clicked = !tempRecipes[outerIndex][innerIndex].clicked;
        setRecipes(tempRecipes);
    }

    const MakeList = () => {
        
    }

    useEffect(() => {       // this get's called as soon as we open this page
        GetRecipes();
    }, []);

    return (
        <>
            <Template />

            <div className="SL-prompt-container">
                <div className="SL-heading">Welcome To Your Shopping List Creator</div>

                <div className="SL-prompt">Please select the recipes that you want to make a shopping list for:</div>

                <div className="SL-all-recipes-container">
                    {recipes.map((list, outerIndex) => (                // go through the 1st dimension of the list (groups of 3)
                        <div className="HM-row-recipes-container">
                            {list.map((recipe, innerIndex) => (         // go through each recipe in group of 3
                                recipe && recipe.title && (
                                    <div
                                        className="SL-singular-recipe-container"
                                        onClick={() => HandleSelect(outerIndex, innerIndex)}
                                        style={{ backgroundColor: !recipe.clicked ? '' : 'rgba(114, 109, 109, 0.8)', 
                                                borderRadius: !recipe.clicked ? '' : '10px'}}
                                    >
                                        <div className="HM-recipe-text">{ReduceRecipeName(recipe.title)}</div>
                                        <img className="HM-recipe-img" src={recipe.image} alt="Sorry, No Picture Available!" />
                                    </div> 
                                )
                            ))}
                        </div>
                    ))} 
                </div>

                <div className="SL-prompt2-container"> 
                    <div className="SL-prompt">How do you want your shopping list organized?</div>

                    <select class="SL-dropdown form-select" aria-label="Default select example" onChange={(event) => {setListType(event.target.value)}}>
                        <option selected>Open this select menu</option>
                        <option value="separate">Separate ingredients by recipe</option>
                        <option value="combined">Combine all ingredients into one list</option>
                    </select>
                </div>

                <div style={{textAlign: "center"}}>
                    <button className="btn btn-dark btn-lg SL-submit-btn" onClick={() => MakeList()}>
                        Make My Shopping List!
                    </button>
                </div>
            </div>
        </>

    )
}

export default ShoppingLists