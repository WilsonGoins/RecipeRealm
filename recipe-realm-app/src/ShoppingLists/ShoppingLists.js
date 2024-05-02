import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./ShoppingLists.css"
import Template from "../Template/Template";

const ShoppingLists = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [shoppingList, setShoppingList] = useState([]);

    const GetRecipes = async () => {        
        var response = await api.get('/recipes/', {params: {email}});
        setRecipes(OrganizeRecipes(response.content.recipes));
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

    const GatherValidateFormatRecipes = async () => {           
        var result = [];

        for (var i = 0; i < recipes.length; i++) {
            for (var j = 0; j < 3; j++) {
                const currRecipe = recipes[i][j];
                if (currRecipe && currRecipe.clicked) {        // if the curr recipe was selected
                    const response = await api.get('/ingredients/', {params: {rec_id: currRecipe["rec_id"]}});
                    result.push({"name": currRecipe.name, "ingredients": response.content.ingredients});
                }
            }
        }

        if (result.length === 0) {
            ShowAlert("Please select one or more recipes.", "");
        } else {        // if we got a good result
            var tempRes = [];
            
            for (let recipe of result) {
                var recipeIngreds = {};
    
                for (let ingredient of recipe.ingredients) {
                    if (recipeIngreds.hasOwnProperty(ingredient.aisle)) {
                        recipeIngreds[ingredient.aisle].push(ingredient.name);
                    } else {
                        recipeIngreds[ingredient.aisle] = [ingredient.name];
                    }
                }
                tempRes.push({"name": recipe.name, "ingredients": recipeIngreds});
            }
            return tempRes;
        }

        return result;
    }

    const MakeList = async () => {
        var res = await GatherValidateFormatRecipes();

        if (res.length > 0) {          // if shopping list isn't empty (it will be empty if they did something wrong)
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
        if (email === null) {
            navigate("/");
        } else {
            GetRecipes();
        }
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
                                    recipe && recipe.name && (
                                        <div
                                            className="SL-singular-recipe-container"
                                            onClick={() => HandleSelect(outerIndex, innerIndex)}
                                            style={{ backgroundColor: !recipe.clicked ? '' : 'rgba(114, 109, 109, 0.8)', 
                                                    borderRadius: !recipe.clicked ? '' : '10px'}}
                                        >
                                            <div className="HM-recipe-text">{ReduceRecipeName(recipe.name)}</div>
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
                            <div className="SL-shopping-list-recipe-title"> {recipe.name} </div>
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