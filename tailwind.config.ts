import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
import { Colors } from "./src/assets/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "src/components/SideBarNew.jsx",
    "src/components/common/SelectSearchNew.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      "custom-gradient": "linear-gradient(to right, #683FDB 0%, #A05AD8 100%)",
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: Colors,
    },
  },
  plugins: [nextui()],
};
export default config;
