/** @type {import('next').NextConfig} */
const options = require("./next.config.options.json");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return options.rewrites;
  },
  i18n: options.i18n,
};

module.exports = nextConfig;
