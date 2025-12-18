import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./lib/**/*.{ts,tsx}","./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","Inter","Segoe UI","Roboto","Arial","Noto Sans","sans-serif"],
        serif: ["ui-serif","Georgia","Cambria","Times New Roman","Times","serif"],
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.25)" }
    },
  },
  plugins: [],
} satisfies Config;
