/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        diphylleia: ["Diphylleia", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      animation: {
        slideUp: "slideUp 0.8s ease-out forwards",
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(50px)",  // Starts from 50px below
            opacity: "0",  // Starts invisible
          },
          "100%": {
            transform: "translateY(0)",  // Moves to its final position
            opacity: "1",  // Ends up fully visible
          },
        },
      },
    },
  },
  plugins: [],
};
