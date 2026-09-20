import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#202024] border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo / About */}
          <div>
            <h2 className="text-3xl font-bold">
              Anime <span className="text-cyan-300">Bond</span>
              <span className="text-red-500">.to</span>
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Discover your favorite anime, keep track of what you watch, and
              explore new worlds with AnimeBond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Navigation</h3>

            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="hover:text-cyan-400 transition">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/watchlist"
                  className="hover:text-cyan-400 transition"
                >
                  Watchlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className="hover:text-cyan-400 transition"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Explore</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Trending Anime
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Popular Anime
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Genres
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Follow Us</h3>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-cyan-600 transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-cyan-600 transition"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-cyan-600 transition"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-cyan-600 transition"
              >
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © 2026 AnimeBond.to. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">Made with ❤️ for anime lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
