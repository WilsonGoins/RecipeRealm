import React, {useState, useEffect} from "react"
import "./SearchByDish.css"
import Template from "../Template/Template";

const SearchByDish = () => {

    return (
        <Template>
            <section>
                {/* search bar */}
                <div className="SBD-search-bar container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Type In Any Dish" aria-label="Search"/>
                        <button className="btn btn-outline-success bg-dark" type="submit" style={{color: "antiquewhite"}}>
                            Search
                        </button>
                    </form>
                </div>
            </section>
        </Template>
    )
}

export default SearchByDish