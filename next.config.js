/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    appDir: true,
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
}