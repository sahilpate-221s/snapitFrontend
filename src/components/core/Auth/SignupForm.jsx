import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { register } from "../../../services/operations/authAPI";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log("Form submission started");
    dispatch(register(name, email, password, confirmPassword, navigate));
    toast.success("Signup Successful!");
    console.log("Signup successful:", formData);

    // Reset the form
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Success message
    toast.success("Signup Successful!");
  };

  return (
    <div className="flex justify-center items-center h-[24rem]  mt-1 pt-0">
      <div className="bg-white rounded-lg p-3 w-full max-w-md sm:w-[90%] sm:mx-6 md:mx-0">
        <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
          {/* Name Field */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Your full name"
              className="w-full p-2 pr-10 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
            <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
              👤
            </span>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="example@example.com"
              className="w-full p-2 pr-10 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
            <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
              ✉️
            </span>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="w-full p-2 pr-10 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
            <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
              🔒
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Confirm Password
            </label>
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm your password"
              className="w-full p-2 pr-10 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
            <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
              🔐
            </span>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 px-6 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-300 to-gray-900 hover:from-black hover:to-gray-500 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            Sign Up
          </button>

          {/* Already Have an Account */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline transition-all"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
