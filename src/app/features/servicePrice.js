import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

// Async Thunks
export const getServicePrices = createAsyncThunk(
  "servicePrices/getAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/service-price?page=${page}&limit=${limit}`
      );
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch service prices" }
      );
    }
  }
);

export const getServicePriceById = createAsyncThunk(
  "servicePrices/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/service-price/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch service price" }
      );
    }
  }
);

export const createServicePrice = createAsyncThunk(
  "servicePrices/create",
  async (servicePriceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/service-price",
        servicePriceData
      );
      toast.success("Service price created successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to create service price" }
      );
    }
  }
);

export const updateServicePrice = createAsyncThunk(
  "servicePrices/update",
  async ({ id, servicePriceData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/service-price/${id}`,
        servicePriceData
      );
      toast.success("Service price updated successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to update service price" }
      );
    }
  }
);

export const deleteServicePrice = createAsyncThunk(
  "servicePrices/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/service-price/${id}`);
      toast.success("Service price deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete service price" }
      );
    }
  }
);

// Initial state
const initialState = {
  servicePrices: [],
  currentServicePrice: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// Slice
const servicePriceSlice = createSlice({
  name: "servicePrices",
  initialState,
  reducers: {
    clearCurrentServicePrice: (state) => {
      state.currentServicePrice = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all service prices
      .addCase(getServicePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicePrices.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePrices = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getServicePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get service price by ID
      .addCase(getServicePriceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicePriceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentServicePrice = action.payload;
      })
      .addCase(getServicePriceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create service price
      .addCase(createServicePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServicePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePrices.unshift(action.payload);
      })
      .addCase(createServicePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update service price
      .addCase(updateServicePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServicePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePrices = state.servicePrices.map((price) =>
          price.id === action.payload.id ? action.payload : price
        );
        if (state.currentServicePrice?.id === action.payload.id) {
          state.currentServicePrice = action.payload;
        }
      })
      .addCase(updateServicePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete service price
      .addCase(deleteServicePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServicePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePrices = state.servicePrices.filter(
          (price) => price.id !== action.payload
        );
      })
      .addCase(deleteServicePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentServicePrice, clearError } =
  servicePriceSlice.actions;
export default servicePriceSlice.reducer;
