// lib/axios.js
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://piqme.live/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios.interceptors.request.use(
//   (config) => {
//     const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      console.log('Unauthorized - maybe redirect to login');
    }
    return Promise.reject(error);
  }
);

export default Axios;
