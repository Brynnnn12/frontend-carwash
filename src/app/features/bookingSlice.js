// src/features/booking/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// Helper function for consistent error handling
const handleAsyncError = (error) => {
  return (
    error.response?.data || {
      message: error.message || "Terjadi kesalahan pada server",
    }
  );
};

// Async Thunks
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bookings", bookingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "booking/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bookings");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getBookingById = createAsyncThunk(
  "booking/getById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookings/${bookingId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/bookings/${id}`, bookingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/bookings/${id}/status`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (bookingId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`);
      return bookingId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  todayBookingsCount: 0,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    resetBookingState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ✅ 1. addCase dulu semua
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.unshift(action.payload);
        state.todayBookingsCount += 1;
      })

      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";

        // 💡 Antisipasi bentuk data { data, pagination } dari response
        if (Array.isArray(action.payload.data)) {
          state.bookings = action.payload.data;
          state.pagination = action.payload.pagination || state.pagination;
        } else {
          // Kalau ternyata API return langsung array
          state.bookings = action.payload;
        }
      })

      .addCase(getBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBooking = action.payload;
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        );
        state.currentBooking = action.payload;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        );
        if (state.currentBooking?.id === action.payload.id) {
          state.currentBooking = action.payload;
        }
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
        if (state.currentBooking?.id === action.payload) {
          state.currentBooking = null;
        }
      })

      // ✅ 2. Baru panggil addMatcher setelah semua addCase
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload?.message || "Terjadi kesalahan";
        }
      );
  },
});

export const { clearBookingError, resetCurrentBooking, resetBookingState } =
  bookingSlice.actions;

export default bookingSlice.reducer;
