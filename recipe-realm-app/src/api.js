import axios from 'axios';

const api = axios.create({
    baseURL: 'https://reciperealm-backend-ff4e853245cd.herokuapp.com/'
});

export default api;