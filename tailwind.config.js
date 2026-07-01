/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        primary: {
          light: "#2563EB",
          dark: "#60A5FA"
        },
        secondary: {
          light: "#14B8A6",
          dark: "#2DD4BF"
        }
      }
    }
  },
  plugins: []
};
