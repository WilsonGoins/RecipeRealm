import React, {useState, useEffect} from "react"
import "./LandingPage.css"
import api from '../api'
import RR_Food_On_Table from "./RR_Food_On_Table.jpg";

const LandingPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const fetchTransactions = async () => {
        const response = await api.get('/transactions/');
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    const handleCreateAccountSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', {name, email, password});
        await fetchTransactions();
        // reset the data
        setName('');
        setEmail('');
        setPassword('');
    };
    
    const handleLoginSubmit = () => {
        console.log("logging in!!");
    };

    return (
        <section className="bg-image" style={{backgroundImage: `url(${RR_Food_On_Table}`}}>

            <div className="title-container">
                <div className="title-text"> Recipe Realm</div>
            </div>

            <div className="container">
                <form onSubmit={handleCreateAccountSubmit}>
                    {/* Name textbox */}
                    <div className="text-entry-form" style={{top: "62vh"}}>
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
                                  Please Enter Your First Name.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* email textbox */}
                    <div className="text-entry-form" style={{top: "62vh"}}>
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
                                  Please Enter Your Email Address.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* password textbox */}
                    <div className="text-entry-form" style={{top: "62vh"}}>
                        <div className="row g-3 align-items-center form-control-lg">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                            </div>
                            <div className="col-auto" style={{position: "absolute", left: "20vh"}}>
                                <input type="password" id="inputPassword6" className="form-control"
                                       aria-describedby="passwordHelpInline"
                                       onChange={(event) => setPassword(event.target.value)}
                                       value={password}/>
                            </div>
                            <div className="col-auto" style={{position: "absolute", left: "50vh"}}>
                                <span id="passwordHelpInline" className="form-text" style={{color: "black"}}>
                                  Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-lg btn-dark create-account-btn">
                        Create Account
                    </button>

                    {/*<table className="table table-striped table-bordered table-hover">*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>User Name</th>*/}
                    {/*        <th>User Email</th>*/}
                    {/*        <th>User Password</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {transactions.map((transaction) => (*/}
                    {/*        <tr key={transaction.id}>*/}
                    {/*            <td>{transaction.name}</td>*/}
                    {/*            <td>{transaction.email}</td>*/}
                    {/*            <td>{transaction.password}</td>*/}
                    {/*        </tr>*/}
                    {/*    ))}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </form>
            </div>

            <div>
                <button type="submit" className="btn btn-dark btn-lg login-btn" onClick={handleLoginSubmit}>
                    Log In
                </button>
            </div>
        </section>
    )
}


export default LandingPage;
