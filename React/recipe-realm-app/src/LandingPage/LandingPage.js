import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./LandingPage.css"
import FoodOnTable_RR from "./FoodOnTable_RR.jpg";
import SearchBar_RR from "./SearchBar_RR.jpg";
import FoodDish_RR from "./FoodDish_RR.jpg";
import OrganizedFiles_RR from "./OrganizedFiles_RR.png"
import ShoppingList_RR from "./ShoppingList_RR.jpg"

const LandingPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const fetchTransactions = async () => {
        const response = await api.get('/transactions/');
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    const handleCreateAccountSubmit = async (event) => {
        event.preventDefault();

        if (validateAccountCreation(name, email, password)) {
            await api.post('/transactions/', {name, email, password});
            await fetchTransactions();
            // reset the data
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    const isNewUser = (email) => {
        if (email) {
            return true;
        } else {
            return false;
        }
    };

    const showAlert = (strongText, additionalText) => {
        // Create a new alert element
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
        alertElement.innerHTML = `
        <strong>${strongText}</strong> ${additionalText}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // set the css styles
        alertElement.style.position = 'fixed';
        alertElement.style.top = '0';
        alertElement.style.left = '50%';
        alertElement.style.transform = 'translateX(-50%)';

        // Append the alert element to the body or a specific container
        document.body.appendChild(alertElement);

        // // Optionally, you can set a timeout to automatically dismiss the alert after a certain duration
        // setTimeout(() => {
        //     alertElement.remove();
        // }, 5000); // Remove the alert after 5 seconds (adjust as needed)
    };

    const validateAccountCreation = (name, email, password) => {
        if (/^[A-Za-z]+$/.test(name)) {
            if (email.trim() !== '') {
                if (/^\S{8,20}$/.test(password)) {
                    if (isNewUser(email)) {
                        console.log("Valid");
                        return true;
                    } else {
                        showAlert("Email Already Exists!", "Try an email that isn't already linked with a Recipe Realm account")
                        console.log("Existing User")
                    }
                } else {
                    showAlert("Password Invalid!", "Passwords must be 8-20 characters long")
                    console.log("Password Invalid")
                }
            } else {
                showAlert("Email Invalid!", "Please enter a valid email address")
                console.log("Email Invalid")
            }
        } else {
            showAlert("Name Invalid!", "Names must be one word long and may only contain letters")
            console.log("Name Invalid")
        }
        return false;
    };

    return (
        <div style={{background: "lightgrey"}}>
            {/*background image section*/}
            <section className="bg-image" style={{backgroundImage: `url(${FoodOnTable_RR}`}}>

                <div className="title-container">
                    <div className="title-text"> Recipe Realm</div>
                </div>

                <div className="container">
                    <form onSubmit={handleCreateAccountSubmit}>
                        {/* Name textbox */}
                        <div className="text-entry-form" style={{top: "62vh"}}>
                            <div className="row g-3 align-items-center form-control-lg">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label">First Name</label>
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "20vh"}}>
                                    <input type="text" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline"
                                           style={{left: "50%"}}
                                           onChange={(event) => setName(event.target.value)}
                                           value={name}
                                    />
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "50vh"}}>
                                    <span id="passwordHelpInline" className="form-text" style={{color: "black"}}>
                                      Please Enter Your First Name.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* email textbox */}
                        <div className="text-entry-form" style={{top: "62vh"}}>
                            <div className="row g-3 align-items-center form-control-lg">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label">Email</label>
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "20vh"}}>
                                    <input type="text" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline"
                                           onChange={(event) => setEmail(event.target.value)}
                                           value={email}/>
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "50vh"}}>
                                    <span id="passwordHelpInline" className="form-text" style={{color: "black"}}>
                                      Please Enter Your Email Address.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* password textbox */}
                        <div className="text-entry-form" style={{top: "62vh"}}>
                            <div className="row g-3 align-items-center form-control-lg">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "20vh"}}>
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline"
                                           onChange={(event) => setPassword(event.target.value)}
                                           value={password}/>
                                </div>
                                <div className="col-auto" style={{position: "absolute", left: "50vh"}}>
                                    <span id="passwordHelpInline" className="form-text" style={{color: "black"}}>
                                      Must be 8-20 characters long.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-lg btn-dark create-account-btn">
                            Create Account
                        </button>

                        {/*<table className="table table-striped table-bordered table-hover">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>User Name</th>*/}
                        {/*        <th>User Email</th>*/}
                        {/*        <th>User Password</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {transactions.map((transaction) => (*/}
                        {/*        <tr key={transaction.id}>*/}
                        {/*            <td>{transaction.name}</td>*/}
                        {/*            <td>{transaction.email}</td>*/}
                        {/*            <td>{transaction.password}</td>*/}
                        {/*        </tr>*/}
                        {/*    ))}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </form>
                </div>

                <div>
                    <button type="submit" className="btn btn-dark btn-lg login-btn" onClick={() => navigate('/Login')}>
                        Log In
                    </button>
                </div>
            </section>

            {/*first image + text*/}
            <div>
                <img src={SearchBar_RR} alt="Search Bar Image" className="search-bar-img"/>

                <div className="search-bar-text-container">
                    <div className="image-text"> Search For Your Favorite Dishes</div>
                </div>
            </div>

            {/*second image + text*/}
            <div>
                <img src={FoodDish_RR} alt="Food Dish Image" className="food-dish-img"/>

                <div className="food-dish-text-container">
                    <div className="image-text"> Pick From A</div>
                    <div className="image-text"> Huge Selection</div>
                </div>
            </div>

            {/*third image + text*/}
            <div>
                <img src={OrganizedFiles_RR} alt="Organized Files Image" className="files-img"/>

                <div className="files-text-container">
                    <div className="image-text"> Organize Hundreds</div>
                    <div className="image-text"> Of Recipes</div>
                </div>
            </div>

            {/*fourth image + text*/}
            <div>
                <img src={ShoppingList_RR} alt="Shopping List Image" className="shopping-list-img"/>

                <div className="shopping-list-text-container">
                    <div className="image-text"> Generate Shopping</div>
                    <div className="image-text"> Lists With Ease</div>
                </div>
            </div>

            {/*footer*/}
            <nav className="navbar fixed-bottom bg-dark" style={{position: "relative", marginTop: "50px"}}>
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
