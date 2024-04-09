import React, {useState, useEffect} from "react"
import "./SearchByDish.css"
import Template from "../Template/Template";
import SPapi from "../SPapi"
import QuestionMark_RR from "./QuestionMark_RR.png"
import Arrow_Left_RR from "./Arrow_Left_RR.png"
import Arrow_Right_RR from "./Arrow_Right_RR.png"
import ShoppingList_RR from "../LandingPage/ShoppingList_RR.jpg";

const SearchByDish = () => {
    const [query, setQuery] = useState("");
    const [recipeOptions, setRecipeOptions] = useState([]);      // a list of recipes (each recipe is a dict)
    const [optionStage, setOptionStage] = useState("1-4");
    const [showOptions, setShowOptions] = useState(false);       // if we want to be showing them options
    const [currID, setCurrID] = useState("");                    // a recipe id they clicked on
    const [currRecipe, setCurrRecipe] = useState({});            // the recipe they clicked on
    const helpText = "Enter any common dish, and we will search the internet for recipes that match it. If we don't find anything you like, try finding a recipe online and then use our 'Find With URL' page!";

    const GetRecipeOptions = async (event) => {
        event.preventDefault();

        setOptionStage("1-4");

        try {
            const endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPapi}&number=12`;
            const response = await fetch(endpoint);

            // check if we got a bad response
            if (!response.ok) {
                ShowAlert("Uh-Oh, Something Went Wrong", "");
            } else {   // if we didn't, proceed...
                const data = await response.json();
                if (data.length === 0) {         // if we get an empty result
                    setRecipeOptions([]);
                    ShowAlert("Sorry No Results For This Query!", "Try something less specific");
                } else {            // if we did get results
                    setRecipeOptions(data.results);     // the issue was there is more than just the results returned by data
                    setShowOptions(true);
                }
            }
        } catch (error) {
            ShowAlert("Uh-Oh, Something Went Wrong", "");
        }
    }

    const HandleImageSelected = async (id) => {
        setShowOptions(false);              // we don't want to see options anymore
        setCurrID(id);                      // the current ID is what they selected
        // fetch the recipe information
        try {
            const endpoint = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${SPapi}`;
            const response = await fetch(endpoint);

            // check if we got a bad response
            if (!response.ok) {
                ShowAlert("Uh-Oh, Something Went Wrong", "");
            } else {   // if we didn't, proceed...
                const data = await response.json();
                if (data.length === 0) {         // if we get an empty result
                    setCurrRecipe({});
                    ShowAlert("Sorry we couldn't find information on this recipe!", "Try a different one!");
                } else {            // if we did get results
                    var result = {};

                    result["title"] = data["title"];
                    result["id"] = data["id"];
                    result["time"] = data["readyInMinutes"];
                    result["image"] = data["image"];
                    result["servings"] = data["servings"];

                    // now let's also correctly format the ingredient list
                    var ingredients = [];
                    for (var i = 0; i < data["extendedIngredients"].length; i++) {
                        ingredients.push(data["extendedIngredients"][i]["original"]);
                    }
                    result["ingredients"] = ingredients;       

                    var instructions = [];
                    for (var i = 0; i < data["analyzedInstructions"][0]["steps"].length; i++) {
                        instructions.push(data["analyzedInstructions"][0]["steps"][i]["step"]);
                    }
                    result["steps"] = instructions;

                    setCurrRecipe(result);
                }
            }
        } catch (error) {
            ShowAlert("Uh-Oh, Something Went Wrong", error);
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

    return (
        <div className="app-container">
            <Template />

            {/* search bar */}
            <div className="SBD-search-bar container-fluid">
                <form className="d-flex" role="search" onSubmit={(event) => GetRecipeOptions(event)}>
                    <input className="form-control me-2" type="search" placeholder="Enter Any Popular Dish" aria-label="Search"
                           onChange={(event) => setQuery(event.target.value)}
                           value={query}/>

                    <button className="btn btn-outline-success bg-dark" type="button" style={{color: "antiquewhite"}}
                            onClick={(event) => GetRecipeOptions(event)}>
                        Search
                    </button>
                </form>
            </div>

            {/* title text */}
            <div className="SBD-title-container">
                <div className="SBD-title-text">
                    Search By Dish
                </div>
            </div>

            {/* recipe options */}
            <div>
                {/* this is how we have to do conditional statements */}
                {showOptions && recipeOptions.length !== 0 && (          // if we want the user to pick from options
                    <>
                        <div className="SBD-options-title-container">
                            <div className="SBD-options-title-text">Options</div>
                        </div>

                        {optionStage === "1-4" && (
                            <>
                                <div className="SBD-options-items-container">
                                    {recipeOptions.slice(0, 4).map(recipe => (
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center", cursor: "pointer"}} onClick={() => HandleImageSelected(recipe.id)}>
                                            <div className="SBD-options-items-text">{recipe.title}</div>
                                            <img className="SBD-options-items-img" src={recipe.image} alt="Picture of Dish" />
                                        </div>
                                    ))}
                                </div>

                                <img src={Arrow_Right_RR} alt="Right Arrow Button" className="SBD-arrow-right"
                                onClick={() => {setOptionStage("5-8")}}/>
                            </>
                        )}

                        {optionStage === "5-8" && (
                            <>
                                <div className="SBD-options-items-container">
                                    {recipeOptions.slice(4, 8).map(recipe => (
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center", cursor: "pointer"}} onClick={() => HandleImageSelected(recipe.id)}>
                                            <div className="SBD-options-items-text">{recipe.title}</div>
                                            <img className="SBD-options-items-img" src={recipe.image}
                                                 alt="Picture of Dish"/>
                                        </div>
                                    ))}
                                </div>

                                <img src={Arrow_Left_RR} alt="Left Arrow Button" className="SBD-arrow-left"
                                     onClick={() => {setOptionStage("1-4")}}/>

                                <img src={Arrow_Right_RR} alt="Right Arrow Button" className="SBD-arrow-right"
                                     onClick={() => {setOptionStage("9-12")}}/>
                            </>
                        )}

                        {optionStage === "9-12" && (
                            <>
                                <div className="SBD-options-items-container">
                                    {recipeOptions.slice(8, 12).map(recipe => (
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center", cursor: "pointer"}} onClick={() => HandleImageSelected(recipe.id)}>
                                            <div className="SBD-options-items-text">{recipe.title}</div>
                                            <img className="SBD-options-items-img" src={recipe.image}
                                                 alt="Picture of Dish"/>
                                        </div>
                                    ))}
                                </div>

                                <img src={Arrow_Left_RR} alt="Left Arrow Button" className="SBD-arrow-left"
                                     onClick={() => {setOptionStage("5-8")}}/>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* a selected recipe */}
            <div>
                {!showOptions && currID && (                // if they selected a recipe
                    <>
                        <div className="SBD-return-title-container" style={{cursor: "pointer"}} onClick={() => {setShowOptions(true); setCurrID("");}}>
                            <div className="SBD-options-title-text">Return to Options</div>
                        </div>

                        {/* display the recipe information */}
                        <div>       
                            <div className="SBD-selected-title-container">
                                <div className="SBD-selected-text" style={{fontSize: "250%"}}>{currRecipe["title"]}</div>
                            </div>

                            <div className="SBD-selected-image-container">
                                <img className="SBD-selected-image" src={currRecipe["image"]} alt="Picture of Dish" />
                            </div>

                            <div className="SBD-selected-time-container">
                                <div className="SBD-selected-text">Ready in {currRecipe["time"]} minutes</div>
                            </div>

                            <div className="SBD-selected-servings-container">
                                <div className="SBD-selected-text">Serves: {currRecipe["servings"]} people</div>
                            </div>

                            <div className="SBD-ingredients-steps-container">
                                <div>
                                    <div className="SBD-selected-text">Ingredients:</div>
                                    <ul>
                                        {currRecipe["ingredients"]?.map((ingredient) => (
                                            <li className="SBD-selected-text"> {ingredient} </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <div className="SBD-selected-text">Instructions:</div>
                                    <ul>
                                        {currRecipe["steps"]?.map((step) => (
                                            <li className="SBD-selected-text" style={{width: "50vw"}}> {step} </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* button to add the recipe */}
                        <div>
                            <button className="btn btn-dark btn-lg SBD-add-recipe-btn">
                                Add Recipe
                            </button>
                        </div>
                    </>
                )}              
            </div>

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img"
                     onClick={() => ShowAlert(helpText, "")}/>
            </div>
        </div>
    )
}

export default SearchByDish