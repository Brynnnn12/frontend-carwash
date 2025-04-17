// src/features/booking/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// Async Thunks
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Gagal membuat booking" }
      );
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "booking/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bookings");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Gagal mengambil data booking" }
      );
    }
  }
);

export const getBookingById = createAsyncThunk(
  "booking/getById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Booking tidak ditemukan" }
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Gagal mengupdate booking" }
      );
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Gagal mengupdate status booking" }
      );
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
      return rejectWithValue(
        error.response?.data || { message: "Gagal menghapus booking" }
      );
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  status: "idle",
  error: null,
  todayBookingsCount: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.unshift(action.payload.data);
        state.todayBookingsCount += 1;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Get All Bookings
      .addCase(getUserBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload.data;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Get Booking By ID
      .addCase(getBookingById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBooking = action.payload.data;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Update Booking
      .addCase(updateBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.bookings.findIndex(
          (b) => b.id === action.payload.data.id
        );
        if (updatedIndex !== -1) {
          state.bookings[updatedIndex] = action.payload.data;
        }
        state.currentBooking = action.payload.data;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.bookings.findIndex(
          (b) => b.id === action.payload.data.id
        );
        if (updatedIndex !== -1) {
          state.bookings[updatedIndex] = action.payload.data;
        }
        if (state.currentBooking?.id === action.payload.data.id) {
          state.currentBooking = action.payload.data;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
        state.currentBooking = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      });
  },
});

export const { clearBookingError, resetCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
