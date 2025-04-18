import { useEffect, useState } from "react";
import { clearError, registerUser } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (status === "succeeded" && isAuthenticated) {
      document.getElementById("register_modal").close();
      navigate("/");
    }
  }, [dispatch, navigate, isAuthenticated, status, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  return (
    <dialog id="register_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-6 text-center">Create Account</h3>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          <div className="form-control w-full mb-4">
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
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <button className="link link-primary" onClick={onSwitchToLogin}>
              Login here
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

export default RegisterModal;
