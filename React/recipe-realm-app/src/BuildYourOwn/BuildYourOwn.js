import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import TextboxList from "./TextboxList"
import "./BuildYourOwn.css"

const BuildYourOwn = () => {
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [servings, setServings] = useState('');

    const handleRecipeNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handlePrepTimeChange = (e) => {
        setPrepTime(e.target.value);
    };

    const handleServingsChange = (e) => {
        setServings(e.target.value);
    };




    return (
        <div style={{background: "antiqueWhite"}}>

            {/* spacing */}
            <div className="BYO-empty-container bg-dark"></div>

            {/* title text */}
            <div className="BYO-title-container">
                <div className="BYO-title-text" style={{color: "antiquewhite"}} onClick={() => {
                    navigate("/home")
                }}>
                    Recipe Realm
                </div>
            </div>

            {/* side navigation bar */}
            <div className="container-fluid">
                <div className="row">
                    <nav className="BYO-hover-white BYO-dropdown-menu col-md-3 col-lg-2 d-md-block bg-dark sidebar"
                         style={{width: "27vw", height: "300vh", color: "darkgrey"}}>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => {
                                        navigate("/searchbydish")
                                    }}>
                                        Search By Dish
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => {
                                        navigate("/findwithurl")
                                    }}>
                                        Find With URL
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" onClick={() => {
                                        navigate("/buildyourown")
                                    }}>
                                        Build Your Own
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="BYO-nav-item nav-link" aria-current="page" onClick={() => {
                                        navigate("/shoppinglists")
                                    }}>
                                        Create Shopping Lists
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            {/* TODO: Add file style organization of recipes */}

            {/*footer*/}
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
            <form>
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
                    <TextboxList/>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>


            </form>


        </div>
        /*<form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>*/


    )
}

export default BuildYourOwn