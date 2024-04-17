import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuildYourOwn.css";
import {all} from "axios";

const BuildYourOwn = () => {
    const navigate = useNavigate();

    const initialIngredientData = Array.from({ length: 20 }, () => ({
        ingredientName: "",
        amount: "",
        unit: "",
        aisle: "faf" // Default aisle
    }));

    const initialStepData = Array.from({ length: 15 }, () => "");

    const [recipeName, setRecipeName] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [servings, setServings] = useState("");
    const [ingredientData, setIngredientData] = useState(initialIngredientData);
    const [stepData, setStepData] = useState(initialStepData);


    const handleRecipeNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handlePrepTimeChange = (e) => {
        setPrepTime(e.target.value);
    };

    const handleServingsChange = (e) => {
        setServings(e.target.value);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredientData = [...ingredientData];
        newIngredientData[index][field] = value;
        setIngredientData(newIngredientData);
        console.log(newIngredientData);
        if(ingredientData.hasOwnProperty("aisle")){

        };

    };

    const formatRecipeData = () => {
        const result = {};



        result["title"] = recipeName;
        result["time"] = prepTime;
        result["imageUrl"] = "";
        result["servings"] = servings;
        result["ingredients"] = ingredientData;

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
        console.log(allSteps);

        return result;
    };

    const handleStepChange = (index, value) => {
        const newStepData = [...stepData];
        newStepData[index] = value;
        setStepData(newStepData);


    };
    const handleSubmit = (e) => {
        e.preventDefault();


        // Format the recipe data
        const formattedRecipeData = formatRecipeData();

        setRecipeName('');
        setPrepTime('');
        setServings('');
        setIngredientData(initialIngredientData);
        setStepData(initialStepData);

    };

    return (
        <div style={{ background: "antiqueWhite" }}>
            {/* Your existing JSX */}
            <div className="BYO-empty-container bg-dark"></div>
            <div className="BYO-title-container">
                <div className="BYO-title-text" style={{ color: "antiquewhite" }} onClick={() => navigate("/home")}>
                    Recipe Realm
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="BYO-hover-white BYO-dropdown-menu col-md-3 col-lg-2 d-md-block bg-dark sidebar" style={{ width: "27vw", height: "300vh", color: "darkgrey" }}>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => navigate("/searchbydish")}>
                                        Search By Dish
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => navigate("/findwithurl")}>
                                        Find With URL
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => navigate("/buildyourown")}>
                                        Build Your Own
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" aria-current="page" onClick={() => navigate("/shoppinglists")}>
                                        Create Shopping Lists
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="BYO-credit-container">
                <div className="BYO-credit-text">
                    Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                </div>
            </div>
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
                    <div id="recipename" className="form-text">Please enter the name of your recipe.</div>
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
                    <div id="preparationtime" className="form-text">Please enter how long the recipe will take.</div>
                </div>
                <div className="BYO-servings-container">
                    <label htmlFor="servingnum" className="form-label"># of Servings</label>
                    <input
                        type="text"
                        value={servings}
                        onChange={handleServingsChange}
                        className="form-control"
                        id="servingnum"
                        aria-describedby="servings"
                    />
                    <div id="servings" className="form-text">Please enter how many servings.</div>
                </div>
                <div className="BYO-ingredients-container">
                    <h2>Ingredients List</h2>
                    {ingredientData.map((item, index) => (
                        <div key={index} className="textBoxContainer">
                            <label htmlFor={`ingredientName_${index}`}>Name:</label>
                            <input
                                type="text"
                                id={`ingredientName_${index}`}
                                value={item.ingredientName}
                                onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
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
                            <label htmlFor={`step_${index}`}>Step {index + 1}:</label>
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
