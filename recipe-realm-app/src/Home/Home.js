import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./Home.css"
import Template from "../Template/Template";
import api from '../api'
import SadChef_RR from "./SadChef_RR.jpg";
import RedX_RR from "./RedX_RR.png";
import QuestionMark_RR from "./QuestionMark_RR.png";
import Eye_RR from "./Eye_RR.png";


const Home = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showRecipes, setShowRecipes] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [recipeToDelete, setRecipeToDelete] = useState({});
    const helpText = "Welcome to the home page! Hover and click on a recipe to either view or delete it."
    

    const GetUserInfo = async () => {           // TODO: get name
        var tempName = urlParams.get("name");
        if (tempName) {
            tempName = tempName.charAt(0).toUpperCase() + tempName.slice(1);
            setName(tempName);
        }
        
        var recipesResponse = await api.get('/recipes/', {params: {email}});
        setRecipes(OrganizeRecipes(recipesResponse.data));
    }

    const ViewRecipe = async (recipe) => {    
        setShowRecipes(false);                      // don't show the recipes anymore
        var tempRecipe = recipe;

        // get the ingredients
        const response = await api.get('/ingredients/', {params: {rec_id: recipe["rec_id"]}});
        tempRecipe["ingredients"] = response.data;

        // turn the steps into a list
        tempRecipe["steps"] = tempRecipe["steps"].split('|');

        setSelectedRecipe(tempRecipe);                         // save the recipe they selected as the selected recipe
    }

    const DeleteRecipe = async (id) => {      
        await api.delete('/delete_recipe/', {params: {rec_id: id}});
        GetUserInfo();
        ShowAlert("Recipe Deleted!", "")       
    }

    const OrganizeRecipes = (recipes) => {    // so recipes is a 2d list. the outer list is groups of 3, the inner lists has individual recipes
        var result = [];
        for (var i = 0; i < recipes.length; i += 3) {
            var tempRes = [];
            for (var j = 0; j < 3; j++) {
                tempRes.push(recipes[i + j]);
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
            GetUserInfo();
        }
    }, []); 

    return (
        <div style={{backgroundColor: "antiquewhite"}}>
            <Template />


            <div className="HM-container">
                {/* <div className="HM-navbar-bg"></div> */}
                
                {/* title */}
                <div className="HM-title-text">
                    {name}'s RecipeRealm™
                </div>

                {/* help image */}
                <div>
                    <img src={QuestionMark_RR} alt="Small Question Mark Image" className="HM-help-img"
                        onClick={() => ShowAlert(helpText, "")}/>
                </div>

                {/* everything else */}
                <div>
                    {showRecipes && (           // if they have not selected a recipe
                        <>
                            {recipes.length > 0 && (                // if they have recipes to show
                                <>
                                    <div className="HM-heading-container">
                                        <div className="HM-heading-text">
                                            Your Recipes:
                                        </div>
                                    </div>

                                    <div className="HM-all-recipes-container">
                                        {recipes.map((list) => (                // go through the 1st dimension of the list (groups of 3)
                                            <div className="HM-row-recipes-container">
                                                {list.map((recipe) => (         // go through each recipe in group of 3
                                                    recipe && recipe.name && (
                                                        <div className="HM-singular-recipe-container">
                                                            <div className="HM-recipe-text"> {ReduceRecipeName(recipe.name)} </div>
                                                            <img className="HM-recipe-img" src={recipe.image} alt="Sorry, No Picture Available!" />     
                                                            <div className="HM-hover-options">
                                                                <img className="HM-Eye-img" src={Eye_RR} alt="View Recipe" onClick={() => ViewRecipe(recipe)}/>     
                                                                <img className="HM-RedX-img" src={RedX_RR} alt="Delete Recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setRecipeToDelete(recipe)}/>     
                                                            </div>                                           
                                                        </div>    
                                                    )
                                                ))}
                                            </div>
                                        ))} 
                                    </div>
                                </>
                            )}

                            {recipes.length === 0 && (              // if they don't have any recipes yet
                                <>
                                    <div className="HM-sad-chef-container">
                                        <img src={SadChef_RR} alt="Dissapointed Chef" className="HM-sad-chef-img"/>
                                    </div>

                                    <div className="HM-sad-text-container">
                                        <div className="HM-sad-text">
                                            You haven't added any recipes yet ☹
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>  
            </div>  

            {!showRecipes && (                // if they selected a recipe
                <>
                    <div className="HM-return-container" style={{cursor: "pointer"}} onClick={() => {setShowRecipes(true);}}>
                        <div className="HM-return-text">Return to Recipes</div>
                    </div>

                    {/* display the recipe information */}
                    <div className="HM-selected-recipe-container">       
                        <div className="HM-selected-title-container">
                            <div className="HM-selected-text" style={{fontWeight: "bold", fontSize: "250%"}}>{selectedRecipe["name"]}</div>
                        </div>

                        <img className="HM-selected-image" src={selectedRecipe["image"]} alt="Sorry, No Picture Available!" />

                        <div className="HM-selected-time-container">
                            <div className="HM-selected-text">Ready in {selectedRecipe["time"]} minutes</div>
                        </div>

                        <div className="HM-selected-servings-container">
                            <div className="HM-selected-text">Serves: {selectedRecipe["servings"]} people</div>
                        </div>

                        <div className="HM-ingredients-steps-container">
                            <div>
                                <div className="HM-selected-text" style={{fontWeight: "bold"}}>Ingredients:</div>
                                <ul>
                                    {selectedRecipe["ingredients"]?.map((ingredient) => (
                                        <li className="HM-selected-text"> {ingredient["name"]} </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="HM-selected-text" style={{fontWeight: "bold"}}>Instructions:</div>
                                <ol>
                                    {selectedRecipe["steps"]?.map((step) => (
                                        <li className="HM-selected-text" style={{width: "50vw"}}> {step} </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </>
            )}  

            {recipeToDelete && (            // if recipe to delete is not empty
                <>
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    Are you sure want to delete {recipeToDelete.name}?
                                    This cannot be undone!
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => DeleteRecipe(recipeToDelete.rec_id)}>Delete</button>
                                    <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home