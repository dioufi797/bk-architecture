/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'bk-architecture-api-production.up.railway.app' },
    ],
  },
}
module.exports = nextConfig
