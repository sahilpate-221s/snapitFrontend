import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
    {/* Email field */}
    <label className="w-full">
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
        Email Address <sup className="text-red-300">*</sup>
      </p>
      <input
        type="email"
        required
        name="email"
        value={email}
        onChange={handleOnChange}
        placeholder="Enter your email address"
        className="w-full rounded-lg bg-white p-3 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent shadow-md"
      />
    </label>
  
    {/* Password field */}
    <div className="relative">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>
      <input
        required
        type={showPassword ? "text" : "password"}
        name="password"
        value={password}
        onChange={handleOnChange}
        placeholder="Enter your password"
        aria-label="Enter your password"
        className="w-full rounded-lg bg-white p-3 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent shadow-md"
      />
      {/* <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? "Hide" : "Show"}
      </button> */}
    </div>
  
    {/* Forgot Password Link */}
    <div className="mb-4 text-right">
      <Link
        to="/forgot-password"
        className="text-sm text-gray-700 hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
  
    {/* Login Button */}
    <button
      type="submit"
      className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-gray-300 to-gray-900 hover:from-black hover:to-gray-500 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  
    {/* Don't have an account? Text */}
    <p className="mt-4 text-center text-sm text-gray-700">
      Don't have an account?{" "}
      <Link to="/register" className="text-black font-semibold hover:underline">
        Sign up here
      </Link>
    </p>
  </form>
  
  );
};

export default LoginForm;
