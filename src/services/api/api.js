import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// ADD THIS: The Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // This injects the token into the header right before the call is made
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;