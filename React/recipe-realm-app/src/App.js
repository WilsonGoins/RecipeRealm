import React, {useState, useEffect} from "react"
import api from './api'

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        calories: 0,
        description: "",
        is_healthy: false,
        date: ''
    });

    const fetchTransactions = async () => {
        const response = await api.get('/transactions/');
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', formData);
        fetchTransactions();
        setFormData({
            name: '',
            calories: 0,
            description: "",
            is_healthy: false,
            date: ''
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
                        <label htmlFor="name" className="form-label">
                            Recipe Name
                        </label>
                        <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} value={formData.name}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="calories" className="form-label">
                            Calories
                        </label>
                        <input type="number" className="form-control" id="calories" name="calories" onChange={handleInputChange} value={formData.calories}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Recipe Description
                        </label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleInputChange} value={formData.description}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="is_healthy" className="form-label">
                            Is This Recipe Healthy?
                        </label>
                        <input type="checkbox" id="is_healthy" name="is_healthy" onChange={handleInputChange} value={formData.is_healthy}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Date Added
                        </label>
                        <input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date}/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Recipe
                    </button>

                    <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Recipe Name</th>
                            <th>Calories</th>
                            <th>Description</th>
                            <th>Is It Healthy?</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.name}</td>
                                <td>{transaction.calories}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.is_healthy ? "Yes" : "No"}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </form>
            </div>

        </div>
    )
}


export default App;
