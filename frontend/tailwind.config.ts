import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px", // small phones
      sm: "640px", // phones
      md: "768px", // tablets
      lg: "1024px", // laptops
      xl: "1280px", // desktops
      "2xl": "1536px", // large screens
    },
    extend: {
      colors: {
        background: "rgba(var(--background-color))",
        primaryColor: "rgba(var(--primary-color))",
        secondaryColor: "rgba(var(--secondary-color))",
        primaryTextColor: "rgba(var(--primary-text-color))",
        secondaryTextColor: "rgba(var(--secondary-text-color))",
        darkColor: "rgba(var(--dark-color))",
      },
    },
    fontFamily: {
      sans: ["var(--font-poppins)"],
    },
  },
};
export default config;
