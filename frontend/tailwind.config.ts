import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deagent-ai-footer-bg-color": "var(--deagent-ai-footer-bg-color)",
        "deagent-ai-title-bg-color": "var(--deagent-ai-title-bg-color)",
        "deagent-ai-active-bg-color": "var(--deagent-ai-active-bg-color)",
      },
      screens: {
        phone: { max: "1024px" },
        pc: { min: "1025px" },
        pcRange: { min: "1025px", max: "1919px" },
      },
      gridTemplateColumns: {
        "custom-col-329": "repeat(3, minmax(329px, 1fr))",
      },
      fontFamily: {
        unageo: ["unageo"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        pcHeight: "calc(100vh - 78px)",
        mobileHeight: "calc(100vh - 200px)",
        pcChatHeight: "calc(100vh - 88px)",
        mobileChatBodyHeight: "calc(100% - 165px)",
        pcChatBodyHeight: "calc(100% - 190px)",
      },
      keyframes: {
        dotPulse: {
          "0%": {
            boxShadow:
              "9984px 0 0 -5px #fff,9999px 0 0 0 #fff,10014px 0 0 2px #fff",
          },
          "25%": {
            "box-shadow":
              "9984px 0 0 0 #fff,9999px 0 0 2px #fff,10014px 0 0 0 #fff",
          },
          "50%": {
            "box-shadow":
              "9984px 0 0 2px #fff,9999px 0 0 0 #fff,10014px 0 0 -5px #fff",
          },
          "75%": {
            "box-shadow":
              "9984px 0 0 0 #fff,9999px 0 0 -5px #fff,10014px 0 0 0 #fff",
          },
          "100%": {
            "box-shadow":
              "9984px 0 0 -5px #fff,9999px 0 0 0 #fff,10014px 0 0 2px #fff",
          },
        },
      },
      animation: {
        dotPulse: "dotPulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
