import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; // Importing necessary components from react-router-dom
import LandingPage from '../LandingPage/LandingPage' // Importing components for different routes
import CreateAccount from "../CreateAccount/CreateAccount";
import Login from '../Login/Login';
import Home from '../Home/Home';
import SearchByDish from "../SearchByDish/SearchByDish";
import BuildYourOwn from "../BuildYourOwn/BuildYourOwn";
import FindWithURL from "../FindWithURL/FindWithURL";
import ShoppingLists from "../ShoppingLists/ShoppingLists";

//In order
//route for the landing page
//route for create account
//route for login
//route to home
//route for search by dish
//route for find with url
//route for build your own
//route for shopping lists

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/createaccount" exact element={<CreateAccount />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/searchbydish" exact element={<SearchByDish />} />
                <Route path="/findwithurl" exact element={<FindWithURL />} />
                <Route path="/buildyourown" exact element={<BuildYourOwn />} />
                <Route path="/shoppinglists" exact element={<ShoppingLists />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
