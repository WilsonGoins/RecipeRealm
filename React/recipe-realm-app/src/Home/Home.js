import React from 'react';
import "./Home.css"

const Home = () => {
    const name = "Wilson";      // TODO: get name from backend

    let dropdown = document.getElementsByClassName("dropdown-btn");
    let i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }

    return (
        <div style={{background: "antiqueWhite"}}>
            {/* side navigation bar */}
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar" style={{width: "27vw", height: "100vh", color: "darkgrey"}}>
                        <div className="position-sticky">
                            <div className="HM-title-container">
                                <div className="HM-title-text" style={{color: "antiquewhite"}}>
                                    Recipe Realm
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item dropdown">
                                    <a className="HM-nav-item nav-link dropdown-toggle" aria-current="page" href="#"
                                       role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Add Recipes
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" href="#">Search By Name</a></li>
                                        <li><a className="dropdown-item" href="#">Find By URL</a></li>
                                        <li><a className="dropdown-item" href="#">Build Your Own</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                <a className="HM-nav-item nav-link" href="#">
                                        My Recipes
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="HM-nav-item nav-link" aria-current="page" href="#">
                                        Create Shopping Lists
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>


            {/*footer*/}
            <div className="HM-credit-container">
                <div className="HM-credit-text">
                    Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                </div>
            </div>
        </div>
    )
}

export default Home