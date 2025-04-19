import React, { useState, useEffect } from "react";
import LoginModal from "../Daisyui/LoginModal";
import RegisterModal from "../Daisyui/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/features/authSlice"; // Add logout action
import { Link } from "react-router-dom";
import { clearProfile } from "../../app/features/profileSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false); // State for avatar dropdown
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth); // Fetch user and authentication state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsAvatarDropdownOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const switchToRegister = () => {
    document.getElementById("login_modal").close();
    document.getElementById("register_modal").showModal();
  };

  const switchToLogin = () => {
    document.getElementById("register_modal").close();
    document.getElementById("login_modal").showModal();
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Call logout action
    dispatch(clearProfile());
    setIsAvatarDropdownOpen(false);
  };

  return (
    <>
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-10 shadow-md ${
          isScrolled
            ? "bg-blue-600 text-white py-2"
            : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-4"
        }`}
      >
        {/* Logo */}
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-bold">
            <span className="text-white">Shine</span>
            <span className="text-yellow-300">Wash</span>
          </a>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                onClick={() => scrollToSection("home")}
                className="font-medium text-white hover:text-yellow-300"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="font-medium text-white hover:text-yellow-300"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("services")}
                className="font-medium text-white hover:text-yellow-300"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("testimonial")}
                className="font-medium text-white hover:text-yellow-300"
              >
                Testimonial
              </button>
            </li>
          </ul>
        </div>

        {/* Login/Register + avatar + hamburger */}
        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="flex items-center">
              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsAvatarDropdownOpen((prev) => !prev);
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-ghost text-white hover:text-yellow-300"
                >
                  <div className="avatar w-10 h-10 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=3" alt="avatar" />
                  </div>
                </button>
                {isAvatarDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2 w-48">
                    <Link
                      to="/dashboard"
                      className="block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center">
              <button
                onClick={() =>
                  document.getElementById("login_modal").showModal()
                }
                className="btn btn-ghost text-white hover:text-yellow-300 mr-2"
              >
                Login
              </button>
              <button
                onClick={() =>
                  document.getElementById("register_modal").showModal()
                }
                className="btn bg-yellow-400 hover:bg-yellow-500 text-blue-800 border-none"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-600 px-4 py-6 z-40 rounded-b-xl shadow-md">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-lg font-medium text-white hover:text-yellow-300 text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-lg font-medium text-white hover:text-yellow-300 text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-lg font-medium text-white hover:text-yellow-300 text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonial")}
                className="text-lg font-medium text-white hover:text-yellow-300 text-left"
              >
                Testimonial
              </button>
              {isAuthenticated ? null : (
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("login_modal").showModal();
                    }}
                    className="btn btn-ghost border-white text-white hover:bg-blue-700 w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("register_modal").showModal();
                    }}
                    className="btn bg-yellow-400 hover:bg-yellow-500 text-blue-800 border-none w-full"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal onSwitchToRegister={switchToRegister} />
      <RegisterModal onSwitchToLogin={switchToLogin} />
    </>
  );
};

export default Navbar;
