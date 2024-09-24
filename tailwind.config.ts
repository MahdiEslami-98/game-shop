import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { iransans: ["IRANSans", ...defaultTheme.fontFamily.sans] },
      colors: {
        primary: {
          "100": "rgba(255, 168, 38, 1)",
          "75": "rgba(255, 168, 38, 0.75)",
          "50": "rgba(255, 168, 38, 0.5)",
          "25": "rgba(255, 168, 38, 0.25)",
          "15": "rgba(255, 168, 38, 0.15)",
        },
        secondary: {
          "100": "rgba(151, 115, 255, 1)",
          "75": "rgba(151, 115, 255, 0.75)",
          "50": "rgba(151, 115, 255, 0.5)",
          "25": "rgba(151, 115, 255, 0.25)",
          "15": "rgba(151, 115, 255, 0.15)",
        },
        textcolor: {
          "100": "rgba(21, 18, 29, 1)",
          "75": "rgba(21, 18, 29, 0.75)",
          "50": "rgba(21, 18, 29, 0.5)",
          "25": "rgba(21, 18, 29, 0.25)",
          "15": "rgba(21, 18, 29, 0.15)",
        },
        description: {
          "100": "rgba(173, 173, 173, 1)",
          "75": "rgba(173, 173, 173, 0.75)",
          "50": "rgba(173, 173, 173, 0.5)",
          "25": "rgba(173, 173, 173, 0.25)",
          "15": "rgba(173, 173, 173, 0.15)",
        },
        alarm: {
          "100": "rgba(255, 94, 94, 1)",
          "75": "rgba(255, 94, 94, 0.75)",
          "50": "rgba(255, 94, 94, 0.5)",
          "25": "rgba(255, 94, 94, 0.25)",
          "15": "rgba(255, 94, 94, 0.15)",
        },
        deactBtn: "#D9D9D9",
        bgBoxCol: "#F5F5F5",
        star: "#FFC700",
        compare: "#FFC700",
        dark: {
          bodyColor: "#202023",
          boxColor: "#42425B",
          topOfHeader: "#3E3E40",
          primary: "#A585FF",
          secondary: "#FFAE34",
          textColor: "#FFFFFF",
          descriptionAndDeact: "#C7C7C7",
        },
      },
      backgroundImage: {
        "main-grad": "linear-gradient( #FFF5F7, #F5F9FF)",
        "right-1": "linear-gradient(to right, #F08EFC, #EE5166)",
        "right-2": "linear-gradient(to right, #A88BEB, #F8CEEC)",
        "right-3": "linear-gradient(to right, #FF5E5E, #FFA826)",
        "bottom-1": "linear-gradient(to bottom, #FF98FB, #BAB4FF)",
        "bottom-2": "linear-gradient(to bottom, #98AFFF, #32DAFF)",
        "bottom-3": "linear-gradient(to bottom, #4E95FF, #9CA0FF)",
        "bottom-4": "linear-gradient(to bottom, #9773FF, #E5ADFF)",
      },
    },
  },
  plugins: [],
};
export default config;
