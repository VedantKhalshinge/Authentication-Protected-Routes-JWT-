import axios from 'axios';

// Create an Axios instance with credentials included for httpOnly cookies
const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Adjusted to match backend PORT 5000
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const signupService = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const loginService = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutService = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getProfileService = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export const getDashboardService = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export default api;
