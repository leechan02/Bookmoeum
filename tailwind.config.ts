import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#353535",
      secondary: "#ededed",
      white: "#ffffff",
      black: "#000000",
      grey: {
        50: "#ededed",
        100: "#c7c7c7",
        200: "#acacac",
        300: "#868686",
        400: "#6e6e6e",
        500: "#4a4a4a",
        600: "#434343",
        700: "#353535",
        800: "#292929",
        900: "#1f1f1f",
      },
    },
    fontFamily: {
      sans: ["S-CoreDream", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
