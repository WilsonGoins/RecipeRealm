import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://reciperealm-backend-ff4e853245cd.herokuapp.com/',
});

export default api;