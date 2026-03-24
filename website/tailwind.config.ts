import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        primary: "#7D9E8C",
        primaryLight: "#EBF2EE",
        secondary: "#C4714A",
        secondaryLight: "#FAF0EA",
        textPrimary: "#2C2C2C",
        textSecondary: "#7A7A72",
        cardBackground: "#FFFFFF",
        border: "#E0DDD8",
        inCall: "#2C2C2C",
        warmGrey: "#7A7A72",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "999px",
      },
      boxShadow: {
        card: "0px 4px 24px rgba(44, 44, 44, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
