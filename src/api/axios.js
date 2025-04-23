import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⛔ Token Expired / Unauthorized Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");

      // Dispatch logout jika bisa akses Redux store
      toast.error("Sesi anda telah berakhir");
      // Redirect manual ke login/home
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
