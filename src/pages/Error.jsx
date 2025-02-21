import React, { useEffect } from 'react';

const Error = () => {
  // Add useEffect for animation delay timing
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Main Container */}
      <div className="text-center space-y-8 p-6 sm:p-8 md:p-10 bg-white shadow-xl rounded-xl border-2 border-gray-200 max-w-lg mx-auto overflow-hidden">

        {/* Animated Error Icon */}
        <div className="animate__animated animate__bounce animate__infinite text-5xl sm:text-6xl md:text-7xl text-red-500 mx-auto">
          <span role="img" aria-label="error">❌</span>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-caveat text-gray-800 fade-in animate__animated animate__fadeIn animate__delay-1s">
          {/* Oops! Something Went Wrong */}
          Work in progress will be adding this feature soon
        </h1>

        {/* Subtext with typing animation */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 fade-in font-diphylleia animate__animated animate__fadeIn animate__delay-1.5s">
          {/* The page you're looking for is not available. Please check the URL or return to the homepage. */}
          The page you're looking for is not available. We are working on it.
        </p>

        {/* Button */}
        <div>
          <a
            href="/"
            className="inline-block mt-6 bg-blue-500 text-white font-semibold text-base sm:text-lg md:text-xl py-2 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 fade-in animate__animated animate__fadeIn animate__delay-2s transform hover:scale-105"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
