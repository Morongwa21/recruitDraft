// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://recruitment-portal-rl5g.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
