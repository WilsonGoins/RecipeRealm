import React, {useState, useEffect} from "react"
import "./FindWithURL.css"
import api from '../api'
import Template from "../Template/Template";
import QuestionMark_RR from "../SearchByDish/QuestionMark_RR.png";

const FindWithURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const [url, setUrl] = useState('');
    const [showRecipe, setShowRecipe] = useState(false);
    const [currRecipe, setCurrRecipe] = useState({});
    const helpText = "Enter the URL for a web page that details a recipe you want to use. We will visit that page, scrape the information, and then add the recipe's information to your desired folder!"

    const GetRecipeInfo = async (event) => {
        event.preventDefault();

        try {
            const endpoint = `https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${process.env.REACT_APP_API_KEY}`;

            const response = await fetch(endpoint);

            if (!response.ok) {         // if bad request
                ShowAlert("Sorry That Didn't Work!", "Check for typos in the URL")
            } else {                    // if good request
                const data = await response.json();

                if (data.length !== 0) {        // if we actually got information from the link
                    setShowRecipe(true);        // they searched for a recipe so we need to show it

                    var result = {};

                    result["name"] = data["title"];
                    result["id"] = data["id"];
                    result["time"] = data["readyInMinutes"];
                    result["image"] = data["image"];
                    result["servings"] = data["servings"];

                    // now let's also correctly format the ingredient list
                    var ingredients = [];
                    for (var i = 0; i < data["extendedIngredients"].length; i++) {
                        const tempRes = {"name": data["extendedIngredients"][i]["original"], "aisle": data["extendedIngredients"][i]["aisle"]}
                        ingredients.push(tempRes);
                    }
                    result["ingredients"] = ingredients;       

                    var instructions = [];
                    for (var i = 0; i < data["analyzedInstructions"][0]["steps"].length; i++) {
                        instructions.push(data["analyzedInstructions"][0]["steps"][i]["step"]);
                    }
                    result["steps"] = instructions;

                    setCurrRecipe(result);
                } else {
                    ShowAlert("Sorry We Weren't Able To Find Data!", "The website isn't formatted well for us, try a different recipe")
                };
            }
        } catch (error) {
            ShowAlert("Uh-Oh, Something Went Wrong", "");
        }
    }

    const AddRecipe = async () => {
        ShowAlert(currRecipe["name"] + " was succesfully added!", "");     // notify the user that the recipe was added

        // reset  variables
        setUrl("");
        setShowRecipe(false);

        let recipeToSend = currRecipe;
        delete recipeToSend["id"];                // delete the id key from the recipe because we don't need it
        recipeToSend["steps"] = recipeToSend["steps"].join('|');            // add delimiter to instructions
        
        await api.post('/recipes/',
            {
            recipe: {name: recipeToSend["name"], servings: recipeToSend["servings"], time: recipeToSend["time"], steps: recipeToSend["steps"], image: recipeToSend["image"], email: email},
            ingredient: recipeToSend["ingredients"],
            recipe_ingredient: []
            }
        ).then(setCurrRecipe({}));
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
        <div>
            <Template />

            {/* search bar */}
            <div className="FWU-search-bar container-fluid">
                <form className="d-flex" role="search" onSubmit={(event) => GetRecipeInfo(event)}>
                    <input className="form-control me-2" type="search" placeholder="Enter a URL" aria-label="Search"
                           onChange={(event) => setUrl(event.target.value)}
                           value={url}/>
                    <button className="btn btn-outline-success bg-dark" type="button" style={{color: "antiquewhite"}}
                            onClick={(event) => GetRecipeInfo(event)}>
                        Search
                    </button>
                </form>
            </div>

            {/* title text */}
            <div className="SBD-title-container">
                <div className="SBD-title-text">
                    Find With URL
                </div>
            </div>

            {/* a selected recipe */}
            <div>
                {showRecipe && (                // if they selected a recipe
                    <>
                        {/* display the recipe information */}
                        <div>        
                            <div className="FWU-selected-title-container">
                                <div className="FWU-selected-text" style={{fontWeigth: "bold", fontSize: "250%"}}>{currRecipe["name"]}</div>
                            </div>

                            <div className="FWU-image-btn-container">
                                <img className="FWU-selected-image" src={currRecipe["image"]} alt="Picture of Dish" />

                                {/* button to add the recipe */}
                                <div>
                                    <button className="btn btn-dark btn-lg FWU-add-recipe-btn" onClick={() => {AddRecipe()}}>
                                        Add Recipe
                                    </button>
                                </div>
                            </div>

                            <div className="FWU-selected-time-container">
                                <div className="FWU-selected-text">Ready in {currRecipe["time"]} minutes</div>
                            </div>

                            <div className="FWU-selected-servings-container">
                                <div className="FWU-selected-text">Serves: {currRecipe["servings"]} people</div>
                            </div>

                            <div className="FWU-ingredients-steps-container">
                                <div>
                                    <div className="FWU-selected-text" style={{fontWeight: "bold"}}>Ingredients:</div>
                                    <ul>
                                        {currRecipe["ingredients"]?.map((ingredient) => (
                                            <li className="FWU-selected-text"> {ingredient["name"]} </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <div className="FWU-selected-text" style={{fontWeight: "bold"}}>Instructions:</div>
                                    <ol>
                                        {currRecipe["steps"]?.map((step) => (
                                            <li className="FWU-selected-text" style={{width: "50vw"}}> {step} </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </>
                )}              
            </div>

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img"
                     onClick={() => ShowAlert(helpText, "")} />
            </div>
        </div>
    )
}

export default FindWithURL