/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'fool-news.s3.ap-northeast-2.amazonaws.com',
      'ahgnod-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
