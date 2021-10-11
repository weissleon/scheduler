module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: { negative: -1 },

      animation: {
        "spin-harsh": "spin 1s cubic-bezier(0.6,-0.07, 0.32, 1.63) infinite",
      },
    },
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
