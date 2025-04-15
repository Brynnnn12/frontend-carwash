import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
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

      {/* Login/Register + hamburger */}
      <div className="navbar-end">
        <div className="hidden lg:flex items-center">
          <a className="btn btn-ghost text-white hover:text-yellow-300 mr-2">
            Login
          </a>
          <a className="btn bg-yellow-400 hover:bg-yellow-500 text-blue-800 border-none">
            Register
          </a>
        </div>

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
            <div className="flex flex-col gap-2 mt-4">
              <a className="btn btn-ghost border-white text-white hover:bg-blue-700 w-full">
                Login
              </a>
              <a className="btn bg-yellow-400 hover:bg-yellow-500 text-blue-800 border-none w-full">
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
