import React, {useState, useEffect} from "react"
import "./SearchByDish.css"
import Template from "../Template/Template";
import SPapi from "../SPapi"
import QuestionMark_RR from "./QuestionMark_RR.png"

const SearchByDish = () => {
    const [query, setQuery] = useState("")
    const [recipeOptions, setRecipeOptions] = useState([])      // a list of recipes (each recipe is a dict)
    const helpText = "Enter any common dish, and we will search the internet for recipes that match it. If we don't find anything you like, try finding a recipe online and then use our 'Find With URL' page!"

    const GetRecipeOptions = async (event) => {
        event.preventDefault();
        try {
            const endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPapi}`;
            const response = await fetch(endpoint);

            // check if we got a bad response
            if (!response.ok) {
                ShowAlert("Uh-Oh, Something Went Wrong", "");
            } else {   // if we didn't, proceed...
                const data = await response.json();
                if (data.length !== 0) {         // if we didn't get an empty result
                    setRecipeOptions(data);
                } else {            // if we did, show them a message
                    setRecipeOptions([])
                    ShowAlert("Sorry No Results For This Query!", "Try something less specific")
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
                <form className="d-flex" role="search">
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
                {recipeOptions.length === 0 && (          // if we have options to choose from
                    <>
                        <div className="SBD-options-title-container">
                            <div className="SBD-options-title-text">Options</div>
                        </div>

                        <div>
                            {recipeOptions.map((recipe, index) => (
                                <div key={index} className="SBD-options-items-container">
                                    <div className="SBD-options-items-text">Title: {recipe.title}</div>
                                    <div className="SBD-options-items-text">ID: {recipe.id}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img" onClick={() => ShowAlert(helpText, "")}/>
            </div>
        </div>
    )
}

export default SearchByDish