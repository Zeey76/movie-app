/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': "600px",
        'md': "700px",
        'lg': "950px",
      },
      colors: {
        "dark-purple": "#2D2440",
        "hover-dark-purple": "#432F6B",
        "light-purple": "#E8E0FF",
        "dark-bg": "#1A1625",
        "light-bg": "#F8F6FF",
        white: "#FFFFFF",
        "light-purple-hover": "#A78BFA",
        "light-gray": "#D1D5DB",
        "gray-purple": "#6B617F",
        "nav-dark": "#B8B5C3"
      },
    },
  },
  plugins: [],
};
