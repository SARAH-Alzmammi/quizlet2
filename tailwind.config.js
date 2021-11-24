module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      opacity: ["disabled"],
      colors: {
        // Configure your color palette here
        primary: "#4854B4",
        yellow: "#FCDC64",
        cyan: "#3CCCCC"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
