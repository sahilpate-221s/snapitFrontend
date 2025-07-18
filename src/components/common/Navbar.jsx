import React, { useState, useCallback, useMemo } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import logo from "../../assets/logo.png";
import snapit from "../../assets/SnapIt.png";
import { useSelector, shallowEqual } from "react-redux";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

// Navigation items outside the component to avoid re-creation on each render
const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Create", path: "/create" },
  // { name: "Collections", path: "/collection/all-Collections" },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth, shallowEqual);
  const { user } = useSelector((state) => state.profile, shallowEqual);
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized function to determine active link class
  const getNavLinkClass = useCallback(
    (path) =>
      location.pathname === path
        ? "bg-gradient-to-r from-gray-300 to-gray-400 text-black shadow-lg"
        : "text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105",
    [location.pathname]
  );

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const snaphandler = () => 
  {
    navigate('/');
  }

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md h-20 flex items-center w-full">
      <div className="container mx-auto flex justify-between items-center w-11/12 max-w-maxContent">
        {/* Left Section: Logo and Search or Navigation Links */}
        <div className="flex items-center space-x-4">
          <img src={snapit} alt="Logo" loading="lazy" className="h-10  md:h-10 cursor-pointer" onClick={snaphandler}/>
          {token ? (
            <div className="relative items-center hidden md:flex">
              <input
                type="text"
                placeholder="Search !working on it"
                className="font-serif h-8 md:w-40 lg:w-80 rounded-full p-2 border border-gray-300"
              />
              <div className="absolute right-2 bg-gray-200 p-1 rounded-full">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg focus:outline-none focus:ring-0 ${getNavLinkClass(
                    item.path
                  )}`}
                >
                  <p className="font-semibold">{item.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Navigation Links or ProfileDropdown */}
        <div className="flex items-center space-x-4 md:space-x-2">
          {token ? (
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-center md:px-1 lg:px-3 py-3 rounded-lg focus:outline-none focus:ring-0 ${getNavLinkClass(
                    item.path
                  )}`}
                >
                  <p className="font-semibold">{item.name}</p>
                </Link>
              ))}
              <ProfileDropdown />
            </div>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link
                to="/register"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="text-black md:hidden" onClick={toggleMenu}>
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <img src={snapit} alt="Logo" loading="lazy" className="h-8 rounded-full" />
          <button className="text-black" onClick={closeMenu}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4">
          {token && <ProfileDropdown />}

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-xl focus:outline-none focus:ring-0 ${
                location.pathname === item.path
                  ? "bg-gray-400 text-black"
                  : "text-gray-600 hover:text-black hover:rounded-xl"
              }`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {!token && (
          <div className="flex flex-col mt-4 space-y-2 px-4 border-t border-gray-300 pt-4">
            <Link
              to="/register"
              className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={closeMenu}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />
      )}
    </nav>
  );
};

export default Navbar;
