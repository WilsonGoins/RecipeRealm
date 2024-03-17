import React, {useState, useEffect} from "react"
import "./FindWithURL.css"
import Template from "../Template/Template";
import SPapi from "../SPapi"
import QuestionMark_RR from "../SearchByDish/QuestionMark_RR.png";

const FindWithURL = () => {
    const [url, setUrl] = useState('');
    const [recipeName, setRecipeName] = useState('No Recipe Found')
    const helpText = "Enter the URL for a web page that details a recipe you want to use. We will visit that page, scrape the information, and then add the recipe's information to your desired folder!"

    const SendURL = async (event) => {
        event.preventDefault();

        console.log(url);

        const endpoint = `https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${SPapi}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setRecipeName(data['title']);
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

    return (
        <div>
            <Template />

            {/* search bar */}
            <div className="SBD-search-bar container-fluid">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Enter a URL" aria-label="Search"
                           onChange={(event) => setUrl(event.target.value)}
                           value={url}/>
                    <button className="btn btn-outline-success bg-dark" type="button" style={{color: "antiquewhite"}}
                            onClick={(event) => SendURL(event)}>
                        Search
                    </button>
                </form>
            </div>

            <div style={{position: "absolute", left: "50%", top: "50%"}}>
                {recipeName}
            </div>

            {/* help image */}
            <div>
                <img src={QuestionMark_RR} alt="Small Question Mark Image" className="SBD-help-img"
                     onClick={() => ShowAlert(helpText, "")} />
            </div>

            TODO: Add the same file storage we have on the home page. But instead of being able to click into recipes,
                  They will select a folder to put this new recipe into
        </div>
    )
}

export default FindWithURL