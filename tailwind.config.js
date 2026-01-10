/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Ensure this path correctly points to your React file location
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
        colors: {
             // Define our custom colors for use throughout the app
            'bg-dark': '#081023',
            'accent-cyan': '#38BDF8',
            'accent-gold': '#FCD34D',
        }
    },
  },
  plugins: [],
}
