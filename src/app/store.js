import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
  },
});
