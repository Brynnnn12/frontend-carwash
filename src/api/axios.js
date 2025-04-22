// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Sesuaikan dengan URL backend Anda
  withCredentials: true, // Untuk mengirim cookie
});

// Request interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk menangani error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kirim pesan error agar middleware bisa tangkap
    if (error.response?.status === 401) {
      const customError = new Error("Token tidak valid atau sudah kedaluwarsa");
      customError.response = error.response;
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
