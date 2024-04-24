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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<LandingPage />} />  //route for the landing page
                <Route path="/createaccount" exact element={<CreateAccount />} />   //route for create account
                <Route path="/login" exact element={<Login />} />   //route for login
                <Route path="/home" exact element={<Home />} /> //route to home
                <Route path="/searchbydish" exact element={<SearchByDish />} /> //route for search by dish
                <Route path="/findwithurl" exact element={<FindWithURL />} />   //route for find with url
                <Route path="/buildyourown" exact element={<BuildYourOwn />} /> //route for build your own
                <Route path="/shoppinglists" exact element={<ShoppingLists />} />   //route for shopping lists
            </Routes>
        </BrowserRouter>
    );
}

export default App;
