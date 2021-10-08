module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      title: ["Spartan"],
      sans: ["Poppins"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
