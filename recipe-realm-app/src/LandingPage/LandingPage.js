import React, {useRef} from "react"
import {useNavigate} from "react-router-dom";
import "./LandingPage.css"
import FoodOnTable_RR from "./FoodOnTable_RR.jpg";
import SearchBar_RR from "./SearchBar_RR.jpg";
import FoodDish_RR from "./FoodDish_RR.jpg";
import OrganizedFiles_RR from "./OrganizedFiles_RR.png"
import ShoppingList_RR from "./ShoppingList_RR.jpg"

const LandingPage = () => {
    const navigate = useNavigate();
    const learnMoreRef = useRef(null);

    return (
        <div className="LP-page-container">
            {/* background image section */}
            <div className="LP-bg-image">
                <div className="LP-title-container">
                    <div className="LP-title-text"> Recipe Realm</div>
                </div>

                <div className="LP-heading-container">
                    <div className="LP-heading-text">
                        Your personal tool for finding, organizing, and preparing recipes
                    </div>
                </div>

                <div className="LP-buttons-container">
                    {/* create account button */}
                    <button className="btn btn-dark btn-lg LP-create-account-btn"
                            onClick={() => navigate("/createaccount")}>
                        Create Account
                    </button>

                    {/* learn more button */}
                    <button className="btn btn-dark btn-lg LP-learn-more-btn"
                            onClick={() => learnMoreRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>
                        Learn More
                    </button>

                    {/* log in */}
                    <button className="btn btn-dark btn-lg LP-login-btn"
                            onClick={() => navigate("/login")}>
                        Log In
                    </button>
                </div>
            </div>

            <div className="LP-info-section-big">
                {/*first image + text*/}
                <div className="LP-text-and-picture">
                    <img src={SearchBar_RR} alt="Search Bar Image" className="LP-picture" ref={learnMoreRef}/>

                    <div className="LP-picture-textbox">
                        <div className="LP-picture-text">Search For Your Favorite Dishes</div>
                    </div>
                </div>

                {/*second image + text*/}
                <div className="LP-text-and-picture">
                    <div className="LP-picture-textbox"> 
                        <div className="LP-picture-text">Pick From A Huge Selection </div> 
                    </div>

                    <img src={FoodDish_RR} alt="Food Dish Image" className="LP-picture"/>
                </div>

                {/*third image + text*/}
                <div className="LP-text-and-picture">
                    <img src={OrganizedFiles_RR} alt="Organized Files Image" className="LP-picture"/>

                    <div className="LP-picture-textbox">
                        <div className="LP-picture-text"> Organize Hundreds Of Recipes</div>
                    </div>
                </div>

                {/*fourth image + text*/}
                <div className="LP-text-and-picture">
                    <div className="LP-picture-textbox">
                        <div className="LP-picture-text"> Generate Shopping Lists With Ease</div>
                    </div>

                    <img src={ShoppingList_RR} alt="Shopping List Image" className="LP-picture"/>
                </div>
                
                {/*create or login text*/}
                <div className="LP-initiative-container">
                    <div className={"LP-initiative-text LP-clickable-initiative-text"} onClick={() => {navigate("/createaccount")}}>
                        Create An Account
                    </div> 

                    <div className={"LP-initiative-text"}>
                        Or
                    </div>

                    <div className={"LP-initiative-text LP-clickable-initiative-text"} onClick={() => {navigate("/login")}}>
                        Log In
                    </div>
                    
                    <div className={"LP-initiative-text"}>
                        To Learn More
                    </div>
                </div>
            </div>

            {/*footer*/}
            <div className="LP-navbar">
                <nav className="bg-dark">
                    <p className="navbar-text text-white mb-0">
                        Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                    </p>
                </nav>
            </div>
        </div>
    )
}

export default LandingPage;
