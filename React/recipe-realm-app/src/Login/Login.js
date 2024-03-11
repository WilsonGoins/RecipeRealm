import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./Login.css"
import Eye_RR from "../LandingPage/Eye_RR.png";
const Login = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
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
            // TODO: backend stuff to log them in
            // reset the data
            setName('');
            setEmail('');
            setPassword('');
            navigate('/home');
        }
    };

    const validateCredentials = (email, password) => {      // TODO: Add checks through backend
        if (email && password) {
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
                    if (validateCredentials(email, password)) {        // we do NOT want new users bc we are in login page
                        return true;
                    } else {
                        showAlert("Email Does Not Exist!", "Check For Typos")
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
        <div style={{background: "floralwhite", width: "100vw", height: "100vh"}}>
            <div className="login-title-container">
                <div className="login-title-text">Recipe Realm</div>
            </div>
            <div className="login-welcome-container">
                <div className="login-welcome-text">Welcome Back</div>
            </div>


            <div className="container">
                <form onSubmit={handleCreateAccountSubmit}>
                    {/* Name text box */}
                    <div className="text-entry-form" style={{top: "45vh", left: "50vh"}}>
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
                                      Please Enter Your First Name
                                    </span>
                            </div>
                        </div>
                    </div>

                    {/* email textbox */}
                    <div className="text-entry-form" style={{top: "45vh", left: "50vh"}}>
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
                                      Please Enter Your Email Address
                                    </span>
                            </div>
                        </div>
                    </div>

                    {/* password textbox */}
                    <div className="text-entry-form" style={{top: "45vh", left: "50vh"}}>
                        <div className="row g-3 align-items-center form-control-lg">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                            </div>
                            <div className="col-auto" style={{position: "absolute", left: "20vh"}}>
                                {showPass ? (
                                    <input type="text" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline"
                                           onChange={(event) => setPassword(event.target.value)}
                                           value={password}/>
                                ) : (
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline"
                                           onChange={(event) => setPassword(event.target.value)}
                                           value={password}/>
                                )}
                            </div>
                            <div className="col-auto" style={{position: "absolute", left: "50vh"}}>
                                    <span id="passwordHelpInline" className="form-text" style={{color: "black"}}>
                                      Must be 8-20 characters long
                                    </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-lg btn-dark login-login-btn">
                        Login
                    </button>
                </form>
            </div>

            {/*eye image*/}
            <div>
                <img src={Eye_RR} alt="Show Password Icon" className="login-eye-icon" onClick={() => {setShowPass(!showPass)}}/>
            </div>

            {/*footer*/}
            <nav className="navbar fixed-bottom bg-dark" style={{position: "absolute", bottom: "0vh"}}>
                <div className="container-fluid d-flex justify-content-between">
                    <p className="navbar-text text-white mb-0">
                        Created by Wilson Goins, Allison Barfield, Ajay Patel, and Ethan Durand
                    </p>
                </div>
            </nav>
        </div>
    )
}


export default Login