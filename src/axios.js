import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Adjust this if needed
});

// Add a request interceptor to include the token in headers
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log('Request token:', token); // Log the token for debugging
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
