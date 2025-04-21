/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        bounceRight: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(50px)" },
          "100%": { transform: "translateX(0px)" },
        },
        bounceLeft: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(-50px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        bounceRight: "bounceRight 0.5s ease",
        bounceLeft: "bounceLeft 0.5s ease",
      },
    },
  },
  plugins: [],
};
