import React, {useState, useEffect} from "react"
import "./Login.css"
import api from '../api'
import RR_Food_On_Table from "./RR_Food_On_Table.jpg";

const Login = () => {
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


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', {name, email, password});
        await fetchTransactions();
        // reset the data
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <section className="bg-image" style={{ backgroundImage: `url(${RR_Food_On_Table}` }}>
            <div className="container">
                <form onSubmit={handleFormSubmit}>

                    {/* Name textbox */}
                    <div className="row g-3 align-items-center form-control-lg dark-background">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">First Name</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="inputPassword6" className="form-control"
                                   aria-describedby="passwordHelpInline"
                                   onChange={(event) => setName(event.target.value)}
                                   value={name}/>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text" style={{color: "#fff"}}>
                              Please Enter Your First Name.
                            </span>
                        </div>
                    </div>

                    {/* email textbox */}
                    <div className="row g-3 align-items-center form-control-lg dark-background">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Email</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="inputPassword6" className="form-control"
                                   aria-describedby="passwordHelpInline"
                                   onChange={(event) => setEmail(event.target.value)}
                                   value={email}/>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text" style={{color: "#fff"}}>
                              Please Enter Your Email Address.
                            </span>
                        </div>
                    </div>

                    {/* password textbox */}
                    <div className="row g-3 align-items-center form-control-lg dark-background">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" id="inputPassword6" className="form-control"
                                   aria-describedby="passwordHelpInline"
                                   onChange={(event) => setPassword(event.target.value)}
                                   value={password}/>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text" style={{color: "#fff"}}>
                              Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Create Account
                    </button>

                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Password</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.name}</td>
                                <td>{transaction.email}</td>
                                <td>{transaction.password}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </section>
    )
}


export default Login;
