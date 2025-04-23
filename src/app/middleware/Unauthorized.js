// import { logoutUser } from "../features/authSlice";

// // middleware/handle401Middleware.js
// export const handle401Middleware = (store) => (next) => (action) => {
//   if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
//     console.log("🔐 Detected 401, performing logout");
//     localStorage.removeItem("token");
//     store.dispatch(logoutUser());
//   }

//   return next(action);
// };
