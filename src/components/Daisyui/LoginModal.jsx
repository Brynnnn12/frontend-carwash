import { useEffect, useState } from "react";
import { clearError, loginUser } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../app/features/profileSlice";

const LoginModal = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (status === "succeeded" && isAuthenticated) {
      document.getElementById("login_modal").close();
      navigate("/");
    }
  }, [dispatch, navigate, isAuthenticated, status, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      dispatch(fetchProfile());
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-6 text-center">Login</h3>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={status === "loading" || isAuthenticated}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <button className="link link-primary" onClick={onSwitchToRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
