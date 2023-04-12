/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  experimental: {
    // appDir: true,
    swcFileReading: true,
    swcMinify: true,
  },
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
}