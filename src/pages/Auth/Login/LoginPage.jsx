import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile, loginUser, logoutUser } from "./app/features/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
      });
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      {user ? (
        <div className="card w-full max-w-md bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome, {user.username}
          </h2>
          <button
            className="btn btn-error w-full"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="card w-full max-w-md bg-white shadow-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading && "loading"}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
