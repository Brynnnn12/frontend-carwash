import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/bookingSlice";
import servicePriceReducer from "./features/servicePrice";
import serviceReducer from "./features/serviceSlice";
import testimonialReducer from "./features/testimonialSlice";
import profileReducer from "./features/profileSlice";
import transactionsReducer from "./features/transactionSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    servicePrices: servicePriceReducer,
    services: serviceReducer,
    testimonials: testimonialReducer,
    profile: profileReducer,
    transaction: transactionsReducer,
  },
});
