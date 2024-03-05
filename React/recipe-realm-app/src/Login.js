import React, {useState, useEffect} from "react"
import api from './api'

const Login = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: ''
    });

    const fetchTransactions = async () => {
        const response = await api.get('/transactions/');
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', formData);
        await fetchTransactions();
        setFormData({
            firstName: '',
            email: '',
            password: ''
        });
    };

    return (
        <div>

            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>
                        Recipe Realm
                    </a>
                </div>
            </nav>

            <div className="container">
                <form onSubmit={handleFormSubmit}>

                    <div className="mb-3 mt-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleInputChange} value={formData.firstName}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input type="text" className="form-control" id="email" name="email" onChange={handleInputChange} value={formData.email}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input type="text" className="form-control" id="password" name="password" onChange={handleInputChange} value={formData.password}/>
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
                                    <td>{transaction.firstName}</td>
                                    <td>{transaction.email}</td>
                                    <td>{transaction.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>

        </div>
    )
}


export default Login;
