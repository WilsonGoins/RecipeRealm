import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./Template.css"

const Template = () => {
    const navigate = useNavigate();

    return (
        <div style={{background: "antiqueWhite"}}>

            {/* spacing */}
            <div className="TMP-empty-container bg-dark"></div>

            {/* title text */}
            <div className="TMP-title-container">
                <div className="TMP-title-text" style={{color: "antiquewhite"}} onClick={() => {navigate("/home")}}>
                    Recipe Realm
                </div>
            </div>

            {/* side navigation bar */}
            <div className="container-fluid">
                <div className="row">
                    <nav className="TMP-hover-white TMP-dropdown-menu col-md-3 col-lg-2 d-md-block bg-dark sidebar"
                         style={{width: "27vw", height: "75vh", color: "darkgrey"}}>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="TMP-nav-item nav-link" onClick={() => {navigate("/searchbydish")}}>
                                        Search By Dish
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="TMP-nav-item nav-link" onClick={() => {navigate("/findwithurl")}}>
                                        Find With URL
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="TMP-nav-item nav-link" onClick={() => {navigate("/buildyourown")}}>
                                        Build Your Own
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="TMP-nav-item nav-link" aria-current="page" onClick={() => {navigate("/shoppinglists")}}>
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
            <div className="TMP-credit-container">
                <div className="TMP-credit-text">
                    Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                </div>
            </div>
        </div>
    )
}

export default Template