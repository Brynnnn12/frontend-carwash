// src/app/middleware/authMiddleware.js
import { logoutUser } from "../features/authSlice";
import toast from "react-hot-toast";

const authMiddleware = (store) => (next) => (action) => {
  // Jika action adalah reject dari asyncThunk dan ada error 401
  if (
    action?.type?.endsWith("rejected") &&
    action?.payload?.message === "Token tidak valid atau sudah kedaluwarsa"
  ) {
    toast.error("Sesi habis, silakan login kembali");
    store.dispatch(logoutUser());
  }

  return next(action);
};

export default authMiddleware;
