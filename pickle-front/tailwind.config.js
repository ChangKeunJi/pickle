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
      "light-nav-hover-dark": "rgba(218,217,212,0.58)",
      "dark-nav-hover": "#474C50",
      "user-profile": "#f5691e",
      white: "#FFFFFF",
      black: "#000000",
      red: "#da1515",
    },
    screens: {
      sm: "600px",
      md: "820px",
      lg: "1080px",
      xl: "1500px",
      "2xl": "1724px",
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
