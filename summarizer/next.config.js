/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/summarizer.html',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;