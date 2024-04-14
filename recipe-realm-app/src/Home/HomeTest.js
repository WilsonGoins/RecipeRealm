import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./Home.css"
import Template from "../Template/Template";
import SPapi from "../SPapi"
import SadChef_RR from "./SadChef_RR.jpg"


const HomeTest = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [recipes, setRecipes] = useState([]);

    const GetUserInfo = () => {         // TODO: retrieve name and recipes from backend
        setName("Wilson");

        var userRecipes = GenerateTestRecipes()
        .then(userRecipes => {
            setRecipes(OrganizeRecipes(userRecipes));
        })

        // console.log(userRecipes);
        // userRecipes = OrganizeRecipes(userRecipes);         // organize them correctly

        // setRecipes(userRecipes);
   
    }

    const GenerateTestRecipes = async () => {
        var queryRes = [];
        try {
            const endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=ravioli&apiKey=${SPapi}&number=12`;
            const response = await fetch(endpoint);

            // check if we got a bad response
            if (!response.ok) {
                ShowAlert("Uh-Oh, Something Went Wrong", "");
            } else {   // if we didn't, proceed...
                const data = await response.json();
                if (data.length === 0) {         // if we get an empty result
                    queryRes = [];
                    ShowAlert("Sorry No Results For This Query!", "Try something less specific");
                } else {            // if we did get results
                    queryRes = data.results;
                }
            }
        } catch (error) {
            ShowAlert("Uh-Oh, Something Went Wrong", "");
        }
        return queryRes;
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
        GetUserInfo();
    }, []);

    return (
        <>
            <Template />

            <div className="HM-container">
                <div className="HM-title-text">
                    {name}'s RecipeRealm™
                </div>

                {/* user's recipes */}
                <div>
                    {recipes.length !== 0 && (                // if they selected a recipe
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
                                            recipe && recipe.title && (
                                                <div className="HM-singular-recipe-container">
                                                    <div className="HM-recipe-text"> {ReduceRecipeName(recipe.title)} </div>
                                                    <img className="HM-recipe-img" src={recipe.image} alt="Sorry, No Picture Available!" />                                                </div>
                                            )
                                        ))}
                                    </div>
                                ))} 
                            </div>
                        </>
                    )}
                </div>  
            </div>

            {/* this doesn't need to be inside the div */}
            {recipes.length === 0 && (
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
    )
}

export default HomeTest