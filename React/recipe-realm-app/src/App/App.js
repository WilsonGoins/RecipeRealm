import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import LandingPage2 from '../LandingPage/LandingPage2'
import Login from '../Login/Login';
import Home from '../Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
