import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={LandingPage} />
                <Route path="/login" element={Login} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;