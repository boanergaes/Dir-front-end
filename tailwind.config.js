/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#1f1f56",
        "background-dark": "#0a0a0a",
        "editor-bg": "#14141e",
        "accent-blue": "#3b82f6",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
}
