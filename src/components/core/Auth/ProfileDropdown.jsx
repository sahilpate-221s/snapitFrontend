import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import CreateCollection from "../../collections/CreateCollection"; // Import the CreateCollection component

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const modalRef = useRef(null); // Reference for modal
  const dropdownRef = useRef(null); // Reference for dropdown

  const user = useSelector((state) => state.profile.user);
  const profilePictureUrl =
    user?.profilePicture || "https://via.placeholder.com/150";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  // Function to open the CreateCollection modal
  const handleCollection = () => {
    setIsModalOpen(true); // Open modal
    setIsOpen(false); // Close dropdown
  };

  // Close dropdown and modal when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) // Check if click is outside dropdown
      ) {
        setIsOpen(false); // Close dropdown if click is outside
      }

      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) // Check if click is outside modal
      ) {
        setIsModalOpen(false); // Close modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isModalOpen]);

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="border-2 border-black rounded-full p-0.5">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <FaCaretDown className="text-black" />
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 sm:w-60 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              {/* <div
                onClick={handleCollection}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Create Collections
              </div> */}
              <div
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Create Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm">
          {/* Modal Container */}
          <div
            ref={modalRef}
            className="w-full max-w-md p-4 bg-traparent mx-auto rounded-lg shadow-lg transform transition-all scale-100"
          >
            <CreateCollection onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileDropdown;
