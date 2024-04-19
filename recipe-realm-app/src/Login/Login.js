import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import api from '../api'
import "./Login.css"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (await validateLogin(email, password)) {
            // reset the data
            const nameRes = await api.get('/users/', {params: {email, password}});

            setEmail('');
            setPassword('');

            navigate(`/home?email=${email}&name=${nameRes.data.name}`);
        }
    };

    const ShowAlert = (strongText, additionalText) => {
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

    const validateLogin = async (email, password) => {
        if (email.trim() !== '') {
            if (/^\S{8,20}$/.test(password)) {
                const response = await api.get('/users/', {params: {email, password}});
                const result = response.data.error; // if info was correct there will be no error so '!result' returns true

                if (!result) {     // the email and password entered are correct
                    return true;                           // return false because that user already exists
                } else if (result === "User not found") {      // the email does not exist
                    ShowAlert("Incorrect email or password!", "Check for typos.");
                    return false;                                    // return true because it is a new account
                } else if (result === "Incorrect Password") {      // the email exists but the password is wrong
                    ShowAlert("Incorrect email or password!", "Check for typos.");
                    return false;                                   // return false because the user already exists
                }
            } else {
                ShowAlert("Password Invalid!", "Passwords must be 8-20 characters long");
                return false;
            }
        } else {
            ShowAlert("Email Invalid!", "Please enter a valid email address");
            return false;
        }
    };

    return (
        <div style={{background: "antiquewhite", width: "100vw", height: "100vh"}}>
            <div className="LGN-title-container">
                <div className="LGN-title-text">Recipe Realm</div>
            </div>
            <div className="LGN-welcome-container">
                <div className="LGN-welcome-text">Welcome Back</div>
            </div>


            <div className="container">
                <form onSubmit={(event) => handleLoginSubmit(event)}>
                    {/* email textbox */}
                    <div className="LGN-text-entry-form LGN-centered-container" style={{top: "50vh", left: "42.5vw"}}>
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
                    <div className="LGN-text-entry-form LGN-centered-container" style={{top: "50vh", left: "42.5vw"}}>
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

                    <button type="submit" className="btn btn-lg btn-dark LGN-login-btn">
                        Log In
                    </button>
                </form>
            </div>

            {/* eye image */}
            {/* <div>
                <img src={Eye_RR} alt="Show Password Icon" className="LGN-eye-icon" onClick={() => {setShowPass(!showPass)}}/>
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


export default Login