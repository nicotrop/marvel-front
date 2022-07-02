module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      variants: {
        fontFamily: {
          body: ["Courier Prime", "monospace"],
          Roboto: ["sans-serif"],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
