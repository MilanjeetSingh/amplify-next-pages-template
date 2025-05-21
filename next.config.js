/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure images from placeholder domains are allowed
  images: {
    domains: ["placeholder.com", "example.com"],
    unoptimized: true,
  },
  // For AWS Amplify deployment
  output: "standalone",
  // Ignore build errors for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
