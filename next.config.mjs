/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure images from placeholder domains are allowed
  images: {
    domains: ['placeholder.com', 'example.com'],
    unoptimized: true,
  },
  // Amplify specific configuration
  // This helps with Amplify's handling of Next.js routing
  trailingSlash: false,
  // For AWS Amplify deployment
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
