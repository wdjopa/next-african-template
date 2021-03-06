/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "dashboard.genuka.com", "bucket-my-store.s3.eu-west-3.amazonaws.com", "genuka.com"],
  },
};

module.exports = nextConfig;
