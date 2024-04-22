import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://reciperealm-backend-ff4e853245cd.herokuapp.com/'
    baseURL: 'https://reciperealm-backend-2i9s.onrender.com/'
});

export default api;