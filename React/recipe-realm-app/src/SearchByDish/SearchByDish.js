import React, {useState, useEffect} from "react"
import "./SearchByDish.css"
import Template from "../Template/Template";
import ShoppingList_RR from "../LandingPage/ShoppingList_RR.jpg";
import QuestionMark_RR from "./QuestionMark_RR.png"

const SearchByDish = () => {
    const helpText = "Enter any common dish, and we will search the internet for recipes that match it. If we don't find anything you like, try finding a recipe online and then use our 'Find With URL' page!"

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
                    />

                    <button className="btn btn-outline-success bg-dark" type="submit" style={{color: "antiquewhite"}}>
                        Search
                    </button>
                </form>
            </div>

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img" onClick={() => ShowAlert(helpText, "")}/>
            </div>
        </div>
    )
}

export default SearchByDish