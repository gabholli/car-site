/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-image': "url('../assets/dark-highway.jpg')"
      },
      fontFamily: {
        'arial': ['Arial', 'Helvetica', 'sans-serif']
      },
      minHeight: {
        screen: ["100vh", "100svh"]
      }
    },
  },
  plugins: [],
}