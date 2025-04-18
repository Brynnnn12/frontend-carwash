// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios"; // Gunakan axios instance custom
import toast from "react-hot-toast";

// Async Thunks menggunakan axiosInstance
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      toast.success("Registrasi berhasil");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      toast.success("Login berhasil");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success("Logout berhasil");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    // Sync reducers untuk inisialisasi state dari localStorage
    initializeAuth(state) {
      const token = localStorage.getItem("token");

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    // Clear error message
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Logout failed";
      });
  },
});

export const { initializeAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
