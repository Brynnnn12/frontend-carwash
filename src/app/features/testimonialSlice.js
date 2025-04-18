import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

// Async thunks testimonial crud
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/testimonials?page=${page}&limit=${limit}`
      );

      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTestimonialById = createAsyncThunk(
  "testimonials/fetchTestimonialById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/testimonials/${id}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTestimonial = createAsyncThunk(
  "testimonials/createTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/testimonials",
        testimonialData
      );
      toast.success("Testimonial created successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/testimonials",
        testimonialData
      );
      toast.success("Testimonial updated successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/testimonials");
      toast.success("Testimonial Berhasil Dihapus");
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    currentTestimonial: null,
    pagination: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch testimonials";
      })

      // Fetch testimonial by ID
      .addCase(fetchTestimonialById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonialById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTestimonial = action.payload;
      })
      .addCase(fetchTestimonialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch testimonial";
      })

      // Create testimonial
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.unshift(action.payload);
        state.success = true;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create testimonial";
      })

      // Update testimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.map((testimonial) => {
          if (testimonial.id === action.payload.id) {
            return action.payload;
          }
          return testimonial;
        });
        state.currentTestimonial = action.payload;
        state.success = true;
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update testimonial";
      })

      // Delete testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== state.currentTestimonial?.id
        );
        state.currentTestimonial = null;
        state.success = true;
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete testimonial";
      });
  },
});

export const { clearError, resetSuccess } = testimonialSlice.actions;
export default testimonialSlice.reducer;
