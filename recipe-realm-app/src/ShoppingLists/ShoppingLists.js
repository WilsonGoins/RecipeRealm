import React, {useState, useEffect, useRef} from "react";
import "./ShoppingLists.css"
import Template from "../Template/Template";

const ShoppingLists = () => {
    const [recipes, setRecipes] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [shoppingList, setShoppingList] = useState([]);

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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"},
                   {"name": "Ingredient 4", "aisle": "Aisle 2"},
                   {"name": "Ingredient 5", "aisle": "Aisle 2"},
                   {"name": "Ingredient 6", "aisle": "Aisle 1"},
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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
                   {"name": "Ingredient 1", "aisle": "Aisle 1"},
                   {"name": "Ingredient 2", "aisle": "Aisle 2"},
                   {"name": "Ingredient 3", "aisle": "Aisle 3"}
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

    const GatherAndValidateRecipes = () => {            // TODO: backend
        var result = [];

        for (var i = 0; i < recipes.length; i++) {
            for (var j = 0; j < 3; j++) {
                const currRecipe = recipes[i][j];
                if (currRecipe && currRecipe.clicked) {        // if the curr recipe was selected
                    result.push({"title": currRecipe.title, "ingredients": currRecipe.ingredients});

                    // TODO: this is where the logic goes to retrieve the ingredients  
                    // var tempIngredients = [];
                    // tempRecipe["ingredients"] = tempIngredients;
                }
            }
        }

        if (result.length === 0) {
            ShowAlert("Please select one or more recipes.", "");
        }
        return result;
    }

    const FormatIngredients = (recipesList) => {
        var tempRes = [];
        
        for (let recipe of recipesList) {
            var recipeIngreds = {};

            for (let ingredient of recipe.ingredients) {
                if (recipeIngreds.hasOwnProperty(ingredient.aisle)) {
                    recipeIngreds[ingredient.aisle].push(ingredient.name);
                } else {
                    recipeIngreds[ingredient.aisle] = [ingredient.name];
                }
            }
            tempRes.push({"title": recipe.title, "ingredients": recipeIngreds});
        }

        return tempRes;
    }

    const MakeList = () => {
        var res = GatherAndValidateRecipes();
        res = FormatIngredients(res);
        console.log(res);

        if (res.length !== 0) {          // if shopping list isn't empty (it will be empty if they did something wrong)
            setShoppingList(res);
            setShowShoppingList(true);
        } 

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const ShowAlert = (strongMessage, weakMessage) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-primary', 'alert-dismissible', 'fade', 'show');
        alertElement.innerHTML = `
            <strong>${strongMessage}</strong> ${weakMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

        alertElement.style.position = 'fixed';
        alertElement.style.top = '0';
        alertElement.style.left = '50%';
        alertElement.style.transform = 'translateX(-50%)';

        document.body.appendChild(alertElement);
    }

    useEffect(() => {       // this get's called as soon as we open this page
        GetRecipes();
    }, []);

    return (
        <>
            <Template />

            {!showShoppingList && (
                <div className="SL-prompt-container">
                    <div className="SL-heading">Shopping List Creator</div>

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

                    <div style={{textAlign: "center"}}>
                        <button className="btn btn-dark btn-lg SL-submit-btn" onClick={() => MakeList()}>
                            Make My Shopping List!
                        </button>
                    </div>
                </div>
            )}

            {showShoppingList && (
                <div className="SL-prompt-container">
                    {shoppingList.map((recipe) => (
                        <div className="SL-shopping-list-container-small">
                            <div className="SL-shopping-list-recipe-title"> {recipe.title} </div>
                            <ul>
                                {Object.entries(recipe.ingredients).map(([aisle, ingredients]) => (
                                    <li key={aisle}>
                                        <div className="SL-shopping-list-aisle"> {aisle} </div>
                                        <ul>
                                            {ingredients.map((ingredient, index) => (
                                                <li className="SL-shopping-list-ingredient" key={index}> {ingredient} </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>                            
                        </div>
                    ))}
                </div>
            )}
        </>

    )
}

export default ShoppingLists