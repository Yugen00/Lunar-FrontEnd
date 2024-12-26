import axios from "axios";

const customAxios = axios.create({
    //in vite process.env == import.meta.env
    baseURL: import.meta.env.VITE_BASE_URL, // Base URL for all requests
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
});

// Request interceptor (e.g., adding authorization token)
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;