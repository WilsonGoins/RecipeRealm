import React, {useState, useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./LandingPage.css"
import FoodOnTable_RR from "./FoodOnTable_RR.jpg";
import SearchBar_RR from "./SearchBar_RR.jpg";
import FoodDish_RR from "./FoodDish_RR.jpg";
import OrganizedFiles_RR from "./OrganizedFiles_RR.png"
import ShoppingList_RR from "./ShoppingList_RR.jpg"
import Eye_RR from "./Eye_RR.png"

const LandingPage2 = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const findRef = useRef(null);
    const organizeRef = useRef(null);
    const createRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);


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
            navigate('/home');
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
    };

    const validateAccountCreation = (name, email, password) => {
        if (/^[A-Za-z]+$/.test(name)) {
            if (email.trim() !== '') {
                if (/^\S{8,20}$/.test(password)) {
                    if (isNewUser(email)) {
                        return true;
                    } else {
                        showAlert("Email Already Exists!", "Try an email that isn't already linked with a Recipe Realm account")
                    }
                } else {
                    showAlert("Password Invalid!", "Passwords must be 8-20 characters long")
                }
            } else {
                showAlert("Email Invalid!", "Please enter a valid email address")
            }
        } else {
            showAlert("Name Invalid!", "Names must be one word long and may only contain letters")
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

                {/*<button type="submit" className="btn btn-lg btn-dark create-account-btn" style={{*/}
                {/*    position: "absolute",*/}
                {/*    left: "88%",*/}
                {/*    top: "2%"}}>*/}
                {/*    Create Account*/}
                {/*</button>*/}

                <div className="heading-container">
                    <div className="heading-text">
                        Your personal tool for finding, organizing, and preparing recipes.
                    </div>
                </div>

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

                {/*/!*log in button*!/*/}
                {/*<button type="submit" className="btn btn-dark btn-lg login-btn"*/}
                {/*        onClick={() => navigate('/login')}>*/}
                {/*    Log In*/}
                {/*</button>*/}

                {/*find button*/}
                <button className="btn btn-dark btn-lg LP-find-btn"
                        onClick={() => findRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>
                    Create Account
                </button>

                {/*learn more button*/}
                <button className="btn btn-dark btn-lg LP-organize-btn"
                        onClick={() => findRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>
                    Learn More
                </button>

                {/*create shopping list*/}
                <button className="btn btn-dark btn-lg LP-prepare-btn"
                        onClick={() => createRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>
                    Log In
                </button>
            </section>

            {/*first image + text*/}
            <div>
                <img src={SearchBar_RR} alt="Search Bar Image" className="search-bar-img" ref={findRef}/>

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

                <div className="files-text-container" ref={organizeRef}>
                    <div className="image-text"> Organize Hundreds</div>
                    <div className="image-text"> Of Recipes</div>
                </div>
            </div>

            {/*fourth image + text*/}
            <div>
                <img src={ShoppingList_RR} alt="Shopping List Image" className="shopping-list-img"/>

                <div className="shopping-list-text-container" ref={createRef}>
                    <div className="image-text"> Generate Shopping</div>
                    <div className="image-text"> Lists With Ease</div>
                </div>
            </div>

            {/*create or login text*/}
            <div className="initiative-container">
                <div className={"initiative-text"}>
                    Create An Account Or Log In To Learn More
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

export default LandingPage2;
