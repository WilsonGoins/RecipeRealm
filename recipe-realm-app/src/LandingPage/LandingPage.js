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
        <div style={{background: "lightgrey"}}>
            {/*background image section*/}
            <section className="LP-bg-image" style={{backgroundImage: `url(${FoodOnTable_RR}`}}>

                <div className="LP-title-container">
                    <div className="LP-title-text"> Recipe Realm</div>
                </div>

                <div className="LP-heading-container">
                    <div className="LP-heading-text">
                        Your personal tool for finding, organizing, and preparing recipes
                    </div>
                </div>

                {/*find button*/}
                <button className="btn btn-dark btn-lg LP-create-account-btn"
                        onClick={() => navigate("/createaccount")}>
                    Create Account
                </button>

                {/*learn more button*/}
                <button className="btn btn-dark btn-lg LP-learn-more-btn"
                        onClick={() => learnMoreRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>
                    Learn More
                </button>

                {/*create shopping list*/}
                <button className="btn btn-dark btn-lg LP-login-btn"
                        onClick={() => navigate("/login")}>
                    Log In
                </button>
            </section>

            {/*first image + text*/}
            <div>
                <img src={SearchBar_RR} alt="Search Bar Image" className="LP-search-bar-img" ref={learnMoreRef}/>

                <div className="LP-search-bar-text-container">
                    <div className="LP-image-text"> Search For Your Favorite Dishes</div>
                </div>
            </div>

            {/*second image + text*/}
            <div>
                <img src={FoodDish_RR} alt="Food Dish Image" className="LP-food-dish-img"/>

                <div className="LP-food-dish-text-container">
                    <div className="LP-image-text"> Pick From A</div>
                    <div className="LP-image-text"> Huge Selection</div>
                </div>
            </div>

            {/*third image + text*/}
            <div>
                <img src={OrganizedFiles_RR} alt="Organized Files Image" className="LP-files-img"/>

                <div className="LP-files-text-container">
                    <div className="LP-image-text"> Organize Hundreds</div>
                    <div className="LP-image-text"> Of Recipes</div>
                </div>
            </div>

            {/*fourth image + text*/}
            <div>
                <img src={ShoppingList_RR} alt="Shopping List Image" className="LP-shopping-list-img"/>

                <div className="LP-shopping-list-text-container">
                    <div className="LP-image-text"> Generate Shopping</div>
                    <div className="LP-image-text"> Lists With Ease</div>
                </div>
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

            {/*footer*/}
            <nav className="navbar fixed-bottom bg-dark" style={{position: "relative", marginTop: "7%"}}>
            <div className="container-fluid d-flex justify-content-between">
                    <p className="navbar-text text-white mb-0">
                        Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default LandingPage;
