// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://recruitment-portal-t6a3.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
