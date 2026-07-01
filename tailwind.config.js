/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#1f2933",
        oasis: "#147c72",
        coral: "#d95f43",
        paper: "#fbfaf7"
      }
    }
  },
  plugins: []
};
