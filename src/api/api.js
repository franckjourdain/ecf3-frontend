// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/', // grâce au proxy dans package.json
});

// Intercepteur pour ajouter le token s’il existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
