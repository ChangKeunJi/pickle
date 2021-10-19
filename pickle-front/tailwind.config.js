module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Spoqa Han Sans Neo", "sans-serif"],
    },
    colors: {
      "light-main": "#FFFFFF",
      "dark-main": "#2F3437",
      "light-font": "#37352F",
      "dark-font": "#EAEBEB",
      "light-nav": "#F7F6F3",
      "dark-nav": "#373C3F",
      "light-nav-hover": "#DAD9D4",
      "dark-nav-hover": "#474C50",
      "user-profile": "#f5691e",
      "user-profile-hover": "#5bc771",
      white: "#FFFFFF",
      black: "#000000",
    },
    screens: {
      sm: "430px",
      md: "768px",
      lg: "1024px",
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
