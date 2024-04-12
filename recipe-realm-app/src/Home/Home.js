import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./Home.css"
import Template from "../Template/Template";
import SadChef_RR from "./SadChef_RR.jpg"


const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [recipes, setRecipes] = useState([]);
    const nums = [0, 1, 2];


    const GetUserInfo = () => {         // TODO: retrieve name and recipes from backend
        setName("Wilson");

        var recipesResult = []
        var resFromBackEnd = [{"title": "Chicken", "url": "???.com", "time": 80, "servings": 44, "steps": ["uhhhh idk", "chicken?"], "ingredients":[{"name": "1 cup of water", "aisle": "water"}, {"name": "2 chickens of chicken", "aisle": "meats"}]}];                 // if they have no recipes
        for (var i = 0; i < resFromBackEnd.length; i += 3) {
            var tempRes = [];
            for (var j = 0; j < 3; j++) {
                tempRes.push(resFromBackEnd[i + j]);
            }
            recipesResult.push(tempRes);
        }

        console.log(recipesResult);
        setRecipes(recipesResult);
        // so recipes is a 2d list. the outer list is groups of 3, the inner lists has individual recipes
    }

    const ReduceRecipeName = (title) => {
        if (title.length > 25) {
            return title.substring(0, 25) + '...';
          } else {
            return title;
        }    
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
                                                    <img className="HM-recipe-img" src={recipe.image} alt="Picture of Dish" />                                                </div>
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

export default Home