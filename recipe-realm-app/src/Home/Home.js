import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./Home.css"
import Template from "../Template/Template";
import SadChef_RR from "./SadChef_RR.jpg"


const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [recipes, setRecipes] = useState([]);


    const GetUserInfo = () => {         // TODO: retrieve name and recipes from backend
        setName("Wilson");
        setRecipes([]);                 // if they have no recipes
    }

    useEffect(() => {       // this get's called as soon as we open this page
        GetUserInfo();
    }, []);

    return (
        <>
            <Template />

            <div className="HM-title-container">
                <div className="HM-title-text">
                    Welcome to your RecipeRealm™, {name}
                </div>
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
                    </>
                )}

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
            </div>  
        </>
    )
}

export default Home