import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic routing
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";

function Template({ title, description, formType }) {
  const [isOpen, setIsOpen] = useState(true); // State to manage modal visibility
  const modalRef = useRef(null); // Reference for modal content
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  // Close modal and navigate to home if clicked outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false); // Close the modal
      navigate("/"); // Navigate to home route
    }
  };

  // Set up event listener when modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup event listener when the component is unmounted or modal is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null; // If the modal is closed, render nothing

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 sm:mx-6 md:mx-0">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full sm:max-w-md sm:mx-6 md:mx-0 lg:mx-0  "
      >
        <h2 className="md:text-2xl sm:text-sm font-semibold mb-3 font-diphylleia text-center">
          {title}
        </h2>
        <p className="mb-6 font-diphylleia text-center sm:text-xs md:text-sm ">
          {description}
        </p>

        {formType === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Template;
