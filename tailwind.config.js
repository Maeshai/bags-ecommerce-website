import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#1476ff",
        secondary: "#f3f5ff",
        light: "#f9faff",
      },
    },
  },
  plugins: [],
});
