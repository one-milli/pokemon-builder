module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "1rem" }],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
