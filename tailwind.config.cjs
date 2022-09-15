/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(180px, 1fr))",
      },
      colors: {
        brandGrey: {
          DEFAULT: "#333333",
          orange: "rgb(255, 82, 77);",
          darkOrange: "#E13834",
        },
      },
      backgroundImage: {
        aiven: "linear-gradient(12.96deg, #FF7700 0%, #FF3554 75.96%)",
        hoverAiven: "linear-gradient(45deg, #FF3554 0%, #E13834 100%)",
      },
      boxShadow: {
        orangeShadow: "0px 0px 0px 4px #ffdcdb;",
      },
    },
  },
  plugins: [],
};
