import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./CreateAccount.css"
import Eye_RR from "./Eye_RR.png";

const CreateAccount = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {

    }, []);


    const handleCreateAccountSubmit = async (event) => {
        event.preventDefault();

        if (await validateAccountCreation(name, email, password)) {
            setName(name.charAt(0).toUpperCase() + name.slice(1));

            await api.post('/users/', {name, email, password});

            // reset the data
            setName('');
            setEmail('');
            setPassword('');   

            navigate(`/home?email=${email}&name=${name}`);
        }
    };

    const validateAccountCreation = async (name, email, password) => {
        if (/^[A-Za-z]+$/.test(name)) {
            if (email.trim() !== '') {
                if (/^\S{8,20}$/.test(password)) {
                    const response = await api.get('/users/', {params: {email, password}});
                    const result = response.data.error;

                    if (!result) {     // the email and password entered already exist
                        ShowAlert("An account with this email already exists!", "Try a different email.");
                        return false;                           // return false because that user already exists
                    } else if (result === "User not found") {      // the email does not exist
                        return true;                                    // return true because it is a new account
                    } else if (result === "Incorrect Password") {      // the email exists but the password is wrong
                        ShowAlert("An account with this email already exists!", "Try a different email.");
                        return false;                                   // return false because the user already exists
                    }
                } else {
                    ShowAlert("Password Invalid!", "Passwords must be 8-20 characters long");
                    return false;
                }
            } else {
                ShowAlert("Email Invalid!", "Please enter a valid email address")
                return false;
            }
        } else {
            ShowAlert("Name Invalid!", "Names must be one word long and may only contain letters")
            return false;
        }
    };

    const ShowAlert = (strongText, additionalText) => {
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

    return (
        <div style={{background: "antiquewhite", width: "100vw", height: "100vh"}}>
            <div className="CR-title-container">
                <div className="CR-title-text">Recipe Realm</div>
            </div>

            <div className="container">
                <form onSubmit={(event) => handleCreateAccountSubmit(event)}>
                    {/* Name text box */}
                    <div className="CR-text-entry-form CR-centered-container" style={{top: "50vh", left: "42.5vw"}}>
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
                    <div className="CR-text-entry-form CR-centered-container" style={{top: "50vh", left: "42.5vw"}}>
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
                    <div className="CR-text-entry-form CR-centered-container" style={{top: "50vh", left: "42.5vw"}}>
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

                    <button type="submit" className="btn btn-lg btn-dark CR-create-account-btn">
                        Create Account
                    </button>
                </form>
            </div>

            {/* eye image
            <div>
                <img src={Eye_RR} alt="Show Password Icon" className="CR-eye-icon" onClick={() => {setShowPass(!showPass)}}/>
            </div> */}

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


export default CreateAccount