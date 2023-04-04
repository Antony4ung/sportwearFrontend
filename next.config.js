/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com','lh3.googleusercontent.com','platform-lookaside.fbsbx.com',"scontent.frgn10-1.fna.fbcdn.net","avatars.githubusercontent.com"],
  },
  env: {
    BACKEND_API_URL: 'https://aungsportwear1.onrender.com',
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
