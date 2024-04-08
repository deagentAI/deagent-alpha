/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
  },
  reactStrictMode: false,

  webpack: (config, options) => {
    config.plugins.push(new MiniCssExtractPlugin());
    return config;
  },
  typescript: {
    ignoreBuildErrors:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
  },
};

module.exports = nextConfig;
