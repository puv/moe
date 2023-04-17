/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    swcFileReading: true,
    swcMinify: true,
  },
  async rewrites() {
    return [
      {
        source: '/(^(?!api).*$)/:path*',
        destination: '/',
      },
    ];
  },
}