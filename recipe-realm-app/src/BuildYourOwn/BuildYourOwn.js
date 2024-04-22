import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BuildYourOwn.css";
import api from '../api'
import Template from "../Template/Template";

const BuildYourOwn = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const navigate = useNavigate();

    const initialIngredientData = Array.from({ length: 20 }, () => ({       // declare an initial array of dicts of length 20 
        name: "",               // each ingredient has a name and an aisle
        aisle: "" 
    }));

    const initialStepData = Array.from({ length: 15 }, () => "");       // declare an initial array of length 15 that is a list of strings

    const [recipeName, setRecipeName] = useState("");       // set the name of their inputted recipe to an empty string
    const [prepTime, setPrepTime] = useState("");           // set the prep time of their inputted recipe to an empty string
    const [servings, setServings] = useState("");           // set the num of servings of their inputted recipe to an empty string
    const [ingredientData, setIngredientData] = useState(initialIngredientData);        // set their ingredients to what we defined above
    const [stepData, setStepData] = useState(initialStepData);      // set their steps to what we defined above


    const handleRecipeNameChange = (e) => {         // change the recipe name to what they inputted
        setRecipeName(e.target.value);
    };

    const handlePrepTimeChange = (e) => {           // change prep time to what the inputted
        setPrepTime(e.target.value);
    };

    const handleServingsChange = (e) => {            // change num servings to what the inputted
        setServings(e.target.value);
    };

    const handleIngredientChange = (index, field, value) => {       // update the ingredients to what they just entered
        const newIngredientData = [...ingredientData];          // make a temp variable with the current ingredients
        newIngredientData[index][field] = value;                // and the new ingredient
        setIngredientData(newIngredientData);               // set the variable to the temp
        if(ingredientData.hasOwnProperty("aisle")){};

    };

    const formatRecipeData = () => {                // format the recipe to send to the backend
        const result = {};

        if (recipeName && recipeName.length > 0) {
            result["name"] = recipeName;
        } else {
            ShowAlert("Please enter a name for this recipe.", "");
            return {};
        }

        if (prepTime && servings && servings.length > 0 && prepTime.length > 0) {
            result["time"] = parseInt(prepTime);
            result["servings"] = parseInt(servings);
            
            if (isNaN(result["time"]) || isNaN(result["servings"])) {
                ShowAlert("Please enter an integer for time and serving inputs.", "");
                return {};
            }
        } else {
            ShowAlert("Please enter time and serving inputs.", "");
            return {};
        }

        result["image"] = "https://media01.stockfood.com/largepreviews/Nzg1NDAzNg==/00253356-Gloved-hand-holding-plate-with-plate-cover.jpg";
        
        var tempIngRes = []
        for (let item of ingredientData) {
            if (item.name !== "") {
                tempIngRes.push({"name": item.name, "aisle": item.aisle})
            }
        }
        result["ingredients"] = tempIngRes;

        if (result["ingredients"].length <= 0) {
            ShowAlert("Please enter 1 or more ingredients.", "");
            return {};
        }

        let allSteps = "";
        stepData.forEach((step, index) => {
            if (step.trim() !== "") { // Check if step is not empty
                allSteps += `${step}|`; // Add step with "|" delimiter
            }
        });
        // Remove trailing "|" delimiter if there are steps
        if (allSteps !== "") {
            allSteps = allSteps.slice(0, -1); // Remove last character (which is "|")
        }
        result["steps"] = allSteps;

        if (result["steps"].length <= 0) {
            ShowAlert("Please enter 1 or more steps.", "");
            return {};
        }

        return result;
    };

    const handleStepChange = (index, value) => {
        const newStepData = [...stepData];
        newStepData[index] = value;
        setStepData(newStepData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Format the recipe data
        const formattedRecipeData = formatRecipeData();

        if (formattedRecipeData.name) {
            await api.post('/recipes/',
                {
                recipe: {name: formattedRecipeData["name"], servings: formattedRecipeData["servings"], time: formattedRecipeData["time"], steps: formattedRecipeData["steps"], image: formattedRecipeData["image"], email: email},
                ingredient: formattedRecipeData["ingredients"],
                recipe_ingredient: []
                }
            )

            ShowAlert(formattedRecipeData["name"] + " was successfully added!", "");

            setRecipeName('');
            setPrepTime('');
            setServings('');
            setIngredientData(initialIngredientData);
            setStepData(initialStepData);
        } 

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });   
    };

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
        } 
    }, []); 

    return (
        <div style={{ background: "antiqueWhite" }}>
            <Template />
            
            <div className="BYO-title-container-specific">
                <div className="BYO-title-text-specific">
                    Build Your Own
                </div>
            </div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="BYO-name-of-recipe-container">
                    <label htmlFor="nameofrecipe" className="form-label">Recipe Name</label>
                    <input
                        type="text"
                        value={recipeName}
                        onChange={handleRecipeNameChange}
                        className="form-control"
                        id="nameofrecipe"
                        aria-describedby="recipename"
                    />
                    <div id="recipename" className="form-text">Please enter the name of your recipe</div>
                </div>
                <div className="BYO-prep-time-container">
                    <label htmlFor="preptime" className="form-label">Preparation Time</label>
                    <input
                        type="text"
                        value={prepTime}
                        onChange={handlePrepTimeChange}
                        className="form-control"
                        id="preptime"
                        aria-describedby="preparationtime"
                    />
                    <div id="preparationtime" className="form-text">Please enter how long the recipe will take in minutes</div>
                </div>
                <div className="BYO-servings-container">
                    <label htmlFor="servingnum" className="form-label">Number of Servings</label>
                    <input
                        type="text"
                        value={servings}
                        onChange={handleServingsChange}
                        className="form-control"
                        id="servingnum"
                        aria-describedby="servings"
                    />
                    <div id="servings" className="form-text">Please enter how many servings this recipe makes</div>
                </div>
                <div className="BYO-ingredients-container">
                    <h2>Ingredients List</h2>
                    {ingredientData.map((item, index) => (
                        <div key={index} className="textBoxContainer">
                            <label htmlFor={`name_${index}`}>Name:</label>
                            <input
                                type="text"
                                id={`name_${index}`}
                                value={item.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                className="form-control textBox"
                                placeholder="Ex. (2 tablespoons of salt)"
                            />

                            <label htmlFor={`aisle_${index}`}>Aisle:</label>
                            <select
                                id={`aisle_${index}`}
                                value={item.aisle}
                                onChange={(e) => handleIngredientChange(index, 'aisle', e.target.value)}
                                className="dropdown"
                            >
                                <option value="Baking">Baking</option>
                                <option value="Health Foods">HealthFoods</option>
                                <option value="Spices and Seasonings">Spices and Seasonings</option>
                                <option value="Pasta and Rice">Pasta and Rice</option>
                                <option value="Bakery/Bread">Bakery/Bread</option>
                                <option value="Refrigerated">Refrigerated</option>
                                <option value="Canned and Jarred">Canned and Jarred</option>
                                <option value="Frozen">Frozen</option>
                                <option value="Nut butters, Jams, and Honey">Nut butters, Jams, and Honey</option>
                                <option value="Oil, Vinegar, Salad Dressing">Oil, Vinegar, Salad Dressing</option>
                                <option value="Condiments">Condiments</option>
                                <option value="Savory Snacks">Savory Snacks</option>
                                <option value="Milk, Eggs, Other Dairy">Milk, Eggs, Other Dairy</option>
                                <option value="Ethnic Foods">Ethnic Foods</option>
                                <option value="Tea and Coffee">Tea and Coffee</option>
                                <option value="Meat">Meat</option>
                                <option value="Gourmet">Gourmet</option>
                                <option value="Sweet Snacks ">Sweet Snacks</option>
                                <option value="Gluten Free ">Gluten Free</option>
                                <option value="Alcoholic Beverages ">Alcoholic Beverages</option>
                                <option value="Cereal ">Cereal</option>
                                <option value="Nuts ">Nuts</option>
                                <option value="Beverages ">Beverages</option>
                                <option value="Produce ">Produce</option>
                                <option value="Not in Grocery Store/Homemade ">Not in Grocery Store/Homemade</option>
                                <option value="Seafood ">Seafood</option>
                                <option value="Cheese ">Cheese</option>
                                <option value="Dried Fruits ">Dried Fruits</option>
                                <option value="Online ">Online</option>
                                <option value="Grilling Supplies ">Grilling Supplies</option>
                                <option value="Bread ">Bread</option>
                            </select>
                        </div>
                    ))}
                </div>
                <div className="BYO-steps-container">
                    <h2>Steps</h2>
                    {stepData.map((step, index) => (
                        <div key={index} className="textBoxContainer">
                            <label htmlFor={`step_${index}`} style={{width: "8%"}}>Step {index + 1}:</label>
                            <textarea
                                id={`step_${index}`}
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                className="form-control bigTextBox"
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-dark btn-lg BYO-submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default BuildYourOwn;