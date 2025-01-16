/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#2D2440",
        "hover-dark-purple": "#432F6B",
        "light-purple": "#E8E0FF",
        "dark-bg": "#1A1625",
        "light-bg": "#F8F6FF",
        white: "#FFFFFF",
        "light-purple-hover": "#A78BFA",
        "light-gray": "#D1D5DB",
      },
    },
  },
  plugins: [],
};
