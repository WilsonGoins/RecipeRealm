import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage'
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
                {/*<Route path="/" exact element={<LandingPage />} />*/}

                <Route path="/" exact element={<Home />} />

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
