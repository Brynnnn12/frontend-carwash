import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

import toast from "react-hot-toast";
import { buildQueryString } from "../../utils/queryString";

// GET ALL
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(params, { page: 1, limit: 10 });
      const res = await axios.get(`/transactions${queryString}`);
      return {
        data: res.data.data,
        pagination: res.data.pagination,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// GET BY ID
export const getTransactionById = createAsyncThunk(
  "transaction/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/transactions/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// CREATE
export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/transactions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal membuat transaksi");
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE
export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/transactions/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      return res.data.transaction;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal memperbarui transaksi");
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE STATUS
export const updatePaymentStatus = createAsyncThunk(
  "transaction/updateStatus",
  async ({ id, isPaid }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/transactions/${id}/payment-status`, {
        isPaid,
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal memperbarui status");
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE
export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/transactions/${id}`);
      toast.success("Transaksi berhasil dihapus");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus transaksi");
      return rejectWithValue(err.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    items: [],
    current: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTransaction: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (tx) => tx.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (tx) => tx.id === action.payload.id
        );
        if (index !== -1) state.items[index].isPaid = action.payload.isPaid;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((tx) => tx.id !== action.payload);
      });
  },
});

export const { clearCurrentTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
