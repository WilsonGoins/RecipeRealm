import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage'
import CreateAccount from "../CreateAccount/CreateAccount";
import Login from '../Login/Login';
import Home from '../Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" exact element={<LandingPage />} />*/}

                <Route path="/" exact element={<Home />} />

                <Route path="/createaccount" exact element={<CreateAccount />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
