/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#FFF",
        "primary": "#B8E0F2",
        "accent": "#21A2DC",
        "text": "#000",
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light"]
  }
}

