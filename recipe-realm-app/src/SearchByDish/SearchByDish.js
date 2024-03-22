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
    const helpText = "Enter any common dish, and we will search the internet for recipes that match it. If we don't find anything you like, try finding a recipe online and then use our 'Find With URL' page!";

    const GetRecipeOptions = async (event) => {
        event.preventDefault();
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
                }
            }
        } catch (error) {
            ShowAlert("Uh-Oh, Something Went Wrong", "");
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
        <div>
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
                {recipeOptions.length !== 0 && (          // if we have options to choose from
                    <>
                        <div className="SBD-options-title-container">
                            <div className="SBD-options-title-text">Options</div>
                        </div>

                        {optionStage === "1-4" && (
                            <>
                                <div className="SBD-options-items-container">
                                    {recipeOptions.slice(0, 4).map(recipe => (
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center"}}>
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
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center"}}>
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
                                        <div key={recipe.id} style={{marginRight: "100px", alignContent: "center"}}>
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

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img"
                     onClick={() => ShowAlert(helpText, "")}/>
            </div>
        </div>
    )
}

export default SearchByDish