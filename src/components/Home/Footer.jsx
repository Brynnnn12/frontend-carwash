import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-6 md:p-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M5 13L6.5 10.5L8 13L11 7L13 10.5L14.5 8L16 10.5L19 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13H5C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-xl font-bold">QuickWash</span>
            </div>
            <p className="mt-2 text-sm">Cucian kilat, hasil maksimal</p>
          </div>

          {/* Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Layanan</h3>
            <div className="flex flex-col gap-2">
              <a className="hover:text-accent transition-colors">
                Cucian Express
              </a>
              <a className="hover:text-accent transition-colors">
                Cucian Premium
              </a>
              <a className="hover:text-accent transition-colors">
                Detailing Mobil
              </a>
              <a className="hover:text-accent transition-colors">Poles Body</a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Kontak</h3>
            <div className="flex flex-col gap-2">
              <p>Jl. Raya Cuci Mobil No. 123</p>
              <p>hello@quickwash.id</p>
              <p>(021) 9876-5432</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Media Sosial</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="btn btn-circle btn-accent text-white">
                {/* Facebook */}
                <FaFacebook />
              </button>
              <button className="btn btn-circle btn-accent text-white">
                {/* Instagram */}
                <FaInstagram />
              </button>
              <button className="btn btn-circle btn-accent text-white">
                {/* Twitter */}
                <FaTwitter />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-base-300 text-center text-sm">
          &copy; {new Date().getFullYear()} QuickWash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
