import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { buildQueryString } from "../../utils/queryString";

// Async thunks for CRUD operations
// export const fetchServices = createAsyncThunk(
//   "services/fetchServices",
//   async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         `/services?page=${page}&limit=${limit}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(params, { page: 1, limit: 10 });

      const response = await axiosInstance.get(`/services${queryString}`);
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "services/fetchServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/services", serviceData);
      toast.success("Service created successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const { id: _, ...cleanData } = serviceData;
      const response = await axiosInstance.put(`/services/${id}`, cleanData);
      toast.success("Service berhasil diupdate");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/services/${id}`);
      toast.success("Service deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    currentService: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10,
    },
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetServiceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // <--- ini tambahan
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || 0,
          limit: action.payload.pagination?.limit || 10,
        };
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch services";
      })

      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload.data;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch service";
      })

      // Create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.services.unshift(action.payload.data);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create service";
      })

      // Update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedService = action.payload.data;
        const index = state.services.findIndex(
          (s) => s.id === updatedService.id
        );
        if (index !== -1) {
          state.services[index] = updatedService;
        }
        if (state.currentService?.id === updatedService.id) {
          state.currentService = updatedService;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update service";
      })

      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.services = state.services.filter(
          (service) => service.id !== action.payload
        );
        if (state.currentService?.id === action.payload) {
          state.currentService = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete service";
      });
  },
});

export const { resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
