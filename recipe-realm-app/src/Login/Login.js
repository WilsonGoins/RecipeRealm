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
            const nameRes = await api.get('/users/', {
                params: {email, password},
                headers: {
                    'Access-Control-Allow-Origin': 'https://reciperealm-three.vercel.app'
                }
            });

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
                const response = await api.get('/users/', {
                    params: {email, password},
                    headers: {
                        'Access-Control-Allow-Origin': 'https://reciperealm-three.vercel.app'
                    }
                });
                const result = response.data.error; // if info was correct there will be no error so '!result' returns true

                if (result === "No Error") {     // the email and password entered are correct
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
        <div className="CR-page-container">
            <div className="CR-title-container">
                <div className="CR-title-text">Recipe Realm</div>
            </div>

            <form className="CR-form-container" onSubmit={(event) => handleLoginSubmit(event)}>
                {/* email textbox */}
                <div className="CR-text-entry-form ">
                    <div className="row g-3 align-items-center form-control-lg">
                        <div className="CR-text-first col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Email</label>
                        </div>
                        <div className="CR-text-second col-auto">
                            <input type="text" id="inputPassword6" className="form-control"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}/>
                        </div>
                    </div>
                </div>

                {/* password textbox */}
                <div className="CR-text-entry-form ">
                    <div className="row g-3 align-items-center form-control-lg">
                        <div className="CR-text-first col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="CR-text-second col-auto">
                            <input type="password" id="inputPassword6" className="form-control"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}/>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-lg btn-dark CR-create-account-btn">
                    Log In
                </button>
            </form>
        </div>
    )
}


export default Login